import { Fragment, type ReactNode } from 'react';

/**
 * A small Markdown renderer for blog posts. Covers what the posts use:
 * ## and ### headings, paragraphs, - and 1. lists, pipe tables, blockquotes,
 * links, **bold**, *italic*, and `code`. Output is React elements, so post
 * text is never injected as raw HTML.
 */

type Block =
  | { type: 'heading'; level: 2 | 3 | 4; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'table'; head: string[]; rows: string[][] }
  | { type: 'quote'; text: string }
  | { type: 'rule' };

const isTableRow = (line: string) => /^\s*\|.*\|\s*$/.test(line);
const isTableDivider = (line: string) => /^\s*\|(\s*:?-+:?\s*\|)+\s*$/.test(line);
const listMarker = /^\s*([-*]|\d+\.)\s+/;

function splitRow(line: string): string[] {
  const inner = line.trim().replace(/^\|/, '').replace(/\|$/, '');
  const cells: string[] = [];
  let cell = '';
  for (let i = 0; i < inner.length; i++) {
    if (inner[i] === '\\' && inner[i + 1] === '|') {
      cell += '|';
      i++;
    } else if (inner[i] === '|') {
      cells.push(cell.trim());
      cell = '';
    } else {
      cell += inner[i];
    }
  }
  cells.push(cell.trim());
  return cells;
}

export function parseBlocks(source: string): Block[] {
  const lines = source.replace(/\r\n/g, '\n').split('\n');
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i++;
      continue;
    }

    const heading = /^(#{2,4})\s+(.*)$/.exec(line);
    if (heading) {
      blocks.push({ type: 'heading', level: heading[1].length as 2 | 3 | 4, text: heading[2].trim() });
      i++;
      continue;
    }

    if (/^\s*(-{3,}|\*{3,})\s*$/.test(line)) {
      blocks.push({ type: 'rule' });
      i++;
      continue;
    }

    if (isTableRow(line) && i + 1 < lines.length && isTableDivider(lines[i + 1])) {
      const head = splitRow(line);
      const rows: string[][] = [];
      i += 2;
      while (i < lines.length && isTableRow(lines[i])) {
        rows.push(splitRow(lines[i]));
        i++;
      }
      blocks.push({ type: 'table', head, rows });
      continue;
    }

    if (listMarker.test(line)) {
      const ordered = /^\s*\d+\./.test(line);
      const items: string[] = [];
      while (i < lines.length && lines[i].trim()) {
        if (listMarker.test(lines[i])) {
          items.push(lines[i].replace(listMarker, ''));
        } else {
          // A wrapped continuation line belongs to the previous item.
          items[items.length - 1] += ' ' + lines[i].trim();
        }
        i++;
      }
      blocks.push({ type: 'list', ordered, items });
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quoted: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quoted.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      blocks.push({ type: 'quote', text: quoted.join(' ') });
      continue;
    }

    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^#{2,4}\s/.test(lines[i]) &&
      !listMarker.test(lines[i]) &&
      !isTableRow(lines[i]) &&
      !/^>\s?/.test(lines[i])
    ) {
      para.push(lines[i].trim());
      i++;
    }
    blocks.push({ type: 'paragraph', text: para.join(' ') });
  }

  return blocks;
}

// Order matters: code first so nothing inside backticks is parsed, then links,
// then bold before italic.
const inlinePatternSource = /`([^`]+)`|\[([^\]]+)\]\(((?:[^()\s]|\([^()\s]*\))+)\)|\*\*(.+?)\*\*|\*([^*\s][^*]*?)\*/g;

export function renderInline(text: string): ReactNode[] {
  // A fresh regex per call, since renderInline recurses into link and bold text.
  const inlinePattern = new RegExp(inlinePatternSource);
  const out: ReactNode[] = [];
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  while ((m = inlinePattern.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      out.push(<code key={key++}>{m[1]}</code>);
    } else if (m[2] !== undefined) {
      const href = m[3];
      const external = /^https?:\/\//.test(href);
      out.push(
        <a key={key++} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {renderInline(m[2])}
        </a>,
      );
    } else if (m[4] !== undefined) {
      out.push(<strong key={key++}>{renderInline(m[4])}</strong>);
    } else if (m[5] !== undefined) {
      out.push(<em key={key++}>{renderInline(m[5])}</em>);
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** Heading text to a URL fragment, so sections can be linked directly. */
export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export function Markdown({ source }: { source: string }) {
  return (
    <>
      {parseBlocks(source).map((block, i) => {
        switch (block.type) {
          case 'heading': {
            const Tag = `h${block.level}` as 'h2' | 'h3' | 'h4';
            return (
              <Tag key={i} id={block.level === 2 ? slugify(block.text) : undefined}>
                {renderInline(block.text)}
              </Tag>
            );
          }
          case 'paragraph':
            return <p key={i}>{renderInline(block.text)}</p>;
          case 'list': {
            const Tag = block.ordered ? 'ol' : 'ul';
            return (
              <Tag key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </Tag>
            );
          }
          case 'table':
            return (
              <div key={i} className="table-scroll" tabIndex={0} role="region" aria-label="Table">
                <table>
                  <thead>
                    <tr>
                      {block.head.map((cell, j) => (
                        <th key={j} scope="col">
                          {renderInline(cell)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr key={j}>
                        {row.map((cell, k) => (
                          <td key={k}>{renderInline(cell)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case 'quote':
            return <blockquote key={i}>{renderInline(block.text)}</blockquote>;
          case 'rule':
            return <hr key={i} />;
          default:
            return <Fragment key={i} />;
        }
      })}
    </>
  );
}
