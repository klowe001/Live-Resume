"""Builds the web-sized media in attached_assets/web/ from the originals.

Run from the repo root (needs Pillow, plus ffmpeg for the golf clip):

    python3 script/optimize-media.py
    python3 script/optimize-media.py --portrait attached_assets/headshot.png --erode 0

The portrait step takes a transparent PNG. For a photo with a background, make
one first with `swift script/cutout.swift photo.jpg /tmp/cutout.png`. --keep-top
crops it to the top fraction of its height, for full-length photos that need
to become a head-and-shoulders crop.
"""

import argparse
import shutil
import subprocess
from pathlib import Path

from PIL import Image, ImageFilter, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "attached_assets"
OUT = SRC / "web"

# (source file, output name, longest edge in px)
PHOTOS = [
    ("wanderluxe-product-clean.jpeg", "wanderluxe.webp", 1600),
    ("cpfdance-clean.jpeg", "cpfdance.webp", 1600),
    ("cardcaddie-product.jpeg", "cardcaddie.webp", 900),
    ("image_1773102218588.jpeg", "drone.webp", 1200),
    ("Skiing.jpg", "skiing.webp", 1400),
    ("Travel Advisor.jpg", "travel-advisor.webp", 1400),
    ("Le Cordon Bleu.JPG", "baking-le-cordon-bleu.webp", 900),
    ("Tarte Citron.JPG", "baking-tarte-citron.webp", 900),
    ("Savarin.JPG", "baking-savarin.webp", 900),
    ("Hazelnut Cake.JPG", "baking-hazelnut-cake.webp", 900),
    ("Croissants.JPG", "baking-croissants.webp", 900),
    ("Chocolate Cake.JPG", "baking-chocolate-cake.webp", 900),
]


def save_webp(img: Image.Image, dest: Path, quality: int) -> None:
    img.save(dest, "WEBP", quality=quality, method=6)
    print(f"  {dest.relative_to(ROOT)}  {img.width}x{img.height}  {dest.stat().st_size // 1024} KB")


def photos() -> None:
    for src_name, out_name, edge in PHOTOS:
        img = ImageOps.exif_transpose(Image.open(SRC / src_name)).convert("RGB")
        img.thumbnail((edge, edge), Image.LANCZOS)
        save_webp(img, OUT / out_name, 78)


def logos() -> None:
    """Makes the white in each logo transparent (color-to-alpha against white).

    Every pixel is un-blended from white, so on any light background the logo
    looks exactly like mix-blend-multiply would make it, without depending on
    blend modes (which stop working inside an isolated stacking context, like
    the hero). White parts of a mark become see-through, so these files are
    for light backgrounds only.
    """
    out_dir = OUT / "logos"
    out_dir.mkdir(exist_ok=True)
    for src in sorted((SRC / "logos").glob("*.png")):
        img = Image.open(src).convert("RGB")
        rgba = Image.new("RGBA", img.size)
        out = rgba.load()
        px = img.load()
        for y in range(img.height):
            for x in range(img.width):
                r, g, b = px[x, y]
                a = max(255 - r, 255 - g, 255 - b) / 255
                if a < 0.02:
                    out[x, y] = (0, 0, 0, 0)
                    continue
                un = lambda c: max(0, min(255, round((c - 255 * (1 - a)) / a)))
                out[x, y] = (un(r), un(g), un(b), round(a * 255))

        bbox = rgba.getchannel("A").getbbox()
        if bbox:
            rgba = rgba.crop(bbox)
        dest = out_dir / src.name
        rgba.save(dest, optimize=True)
        print(f"  {dest.relative_to(ROOT)}  {rgba.width}x{rgba.height}  {dest.stat().st_size // 1024} KB")


def portrait(path: Path, keep_top: float, erode: int) -> None:
    img = Image.open(path).convert("RGBA")
    if erode:
        # Pull the mask edge in a pixel or two to drop background fringe.
        alpha = img.getchannel("A").filter(ImageFilter.MinFilter(erode * 2 + 1))
        img.putalpha(alpha.filter(ImageFilter.GaussianBlur(0.6)))
    if keep_top < 1:
        img = img.crop((0, 0, img.width, round(img.height * keep_top)))
    bbox = img.getchannel("A").getbbox()
    if bbox:
        img = img.crop(bbox)
    img.thumbnail((1600, 1600), Image.LANCZOS)
    save_webp(img, OUT / "portrait.webp", 86)


def golf() -> None:
    if not shutil.which("ffmpeg"):
        print("  ffmpeg not found, skipping golf.mp4")
        return
    src = SRC / "Golf.mov"
    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-i", str(src), "-vf", "scale=720:-2",
         "-c:v", "libx264", "-crf", "27", "-preset", "slow", "-pix_fmt", "yuv420p",
         "-an", "-movflags", "+faststart", str(OUT / "golf.mp4")],
        check=True,
    )
    poster = OUT / "golf-poster.jpg"
    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-ss", "0.5", "-i", str(src), "-frames:v", "1",
         "-vf", "scale=720:-2", str(poster)],
        check=True,
    )
    img = Image.open(poster).convert("RGB")
    poster.unlink()
    save_webp(img, OUT / "golf-poster.webp", 78)
    print(f"  attached_assets/web/golf.mp4  {(OUT / 'golf.mp4').stat().st_size // 1024} KB")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--portrait", type=Path, help="transparent PNG from script/cutout.swift")
    parser.add_argument("--keep-top", type=float, default=1.0)
    parser.add_argument("--erode", type=int, default=1, help="px to trim from the mask edge")
    parser.add_argument("--logos", action="store_true", help="only rebuild the transparent logos")
    args = parser.parse_args()

    OUT.mkdir(exist_ok=True)
    if args.portrait:
        portrait(args.portrait, args.keep_top, args.erode)
        return
    if args.logos:
        logos()
        return
    photos()
    logos()
    golf()


if __name__ == "__main__":
    main()
