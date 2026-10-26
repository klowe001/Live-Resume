---
title: "Hard Tech Weekly, October 5, 2026"
date: 2026-10-05
summary: "AMD agreed to buy World Labs for $8.2B, Starship reached orbit on Flight 14, and the FCC moved to open 1,000+ MHz for satellite broadband."
tldr: "AMD is buying World Labs for $8.2B to bring world models to robotics, Starship reached orbit on Flight 14, and the FCC moved to open 1,000+ MHz for satellite broadband. BVLOS drones still wait on FAA Part 108."
---

Atoms, not bits. Week of September 28 to October 5, 2026.

## Top of the week

- AMD is buying **World Labs** for **$8.2B all-stock** (announced Sept 28) with Fei-Fei Li joining as EVP and chief scientist, the largest chipmaker bet yet on world models as the substrate for robotics ([Data Center Knowledge](https://www.datacenterknowledge.com/data-center-chips/amd-to-acquire-world-labs-for-8-2b-to-advance-ai-models-and-robotics))
- Starship reached orbit for the first time on Flight 14 (Sept 28, V3 stack), though the ship came down at 3h08m instead of the planned 9h50m and broke up after splashdown ([Space.com](https://www.space.com/space-exploration/launches-spacecraft/spacex-starship-megarocket-flight-14-orbital-launch-success))
- FAA Part 108 is still sitting in White House review, eight months past the EO 14307 deadline, which keeps every scaled BVLOS business on waivers for at least another quarter ([DroneXL](https://dronexl.co/bvlos/))
- The FCC moved at its Sept 30 meeting to open **1,000+ MHz across 12.7 GHz and 42 GHz** for satellite broadband, plus new Ku-, Ka- and D-band allocations and dedicated spacecraft-control spectrum ([Federal Register](https://www.federalregister.gov/documents/2026/09/29/2026-19920/sunshine-act-open-commission-meeting-wednesday-september-30-2026))
- A US–Korea framework commits **$120B** to eight Westinghouse-technology reactors (two APR1400, six AP1000) with construction starts targeted by 2030, and Korea angling for a minority stake in Westinghouse ([Exchange Monitor](https://www.exchangemonitor.com/u-s-south-korea-advance-efforts-to-build-eight-large-reactors/))

## Regulatory changes

### FAA: Part 108 BVLOS, still no final rule
The rule text entered White House review on July 10, 2026 and has not emerged. The EO 14307 deadline of Feb 1, 2026 lapsed without publication, and DOT is framing the delay as deliberate, saying it does not want to write "today's technology into a decade-long rule." TSA's closed-door operator security roundtables, with applications due **Oct 19**, are explicitly gated on the final rule publishing first. Affects every drone delivery, inspection and survey operator scaling past waiver-by-waiver approvals. No effective date exists yet. ([Status tracker](https://dronexl.co/bvlos/))

### FCC: Satellite Spectrum Abundance (Sept 29 notice, Sept 30 meeting)
The Commission took up orders and NPRMs to unlock more than 1,000 MHz in the **12.7 GHz and 42 GHz** bands for satellite broadband, add Ku-, Ka- and D-band capacity, and designate new bands for spacecraft control and space operations. Affects NGSO and GSO constellation operators and ground-segment vendors. Comment deadlines follow from the individual NPRMs rather than the meeting notice. ([FR 2026-19920](https://www.federalregister.gov/documents/2026/09/29/2026-19920/sunshine-act-open-commission-meeting-wednesday-september-30-2026))

### NRC: Palisades SMR construction permit moves to substance
The NRC began four consecutive weeks of public notice on Oct 1 for the first part of SMR, LLC's phased construction permit application and limited work authorization for **Pioneer Units 1 and 2**, twin SMR-300s (about 300 MWe / 1,050 MWt each) at the Palisades site in Michigan. Holtec filed the Preliminary Safety Analysis Report on Oct 2. Draft safety evaluation report for the LWA is expected December 2026; units are targeted online in the early 2030s. ([FR 2026-20094](https://www.federalregister.gov/documents/2026/10/01/2026-20094/smr-llc-palisades-smr-llc-pioneer-units-1-and-2-phased-construction-permit-application-limited-work), [WNN](https://www.world-nuclear-news.org/articles/second-part-of-construction-permit-application-submitted-for-pioneer-smrs))

### NRC: modernization rule effective date confirmed
Published Sept 30, correcting and confirming the rulemaking-procedure, FACA-alignment, access and security modernization package. **Effective Oct 26, 2026.** Changes information-withholding provisions and post-promulgation comment periods, which matters for anyone filing proprietary design data. ([FR 2026-19963](https://www.federalregister.gov/documents/2026/09/30/2026-19963/nrc-modernization-rulemaking-procedure-federal-advisory-committee-act-alignment-access-and-security))

### FAA: Relativity Terran R cleared NEPA at the Cape
FONSI and Record of Decision published Sept 28 for the Terran R launch program at Cape Canaveral SFS, removing the environmental gate ahead of vehicle licensing. ([FR 2026-19716](https://www.federalregister.gov/documents/2026/09/28/2026-19716/notice-of-availability-on-the-finding-of-no-significant-impact-and-record-of-decision-for-relativity))

### Robot safety: ANSI/A3 R15.08-3-2026 published
A3 released the final part of the industrial mobile robot safety series, covering user responsibilities and lifecycle risk management for IMR applications. Not a federal rule, but it is the document OSHA inspectors and insurers will reference for AMR and mobile-manipulator deployments, so integrators should expect it in customer requirements. ([Automation World](https://www.automationworld.com/factory/robotics/news/55408868/association-for-advancing-automation-new-ansi-standard-completes-industrial-mobile-robot-safety-series))

### Quiet this week
BIS published nothing in the Federal Register in the window, so no new entity-list designations or EAR amendments. NHTSA issued only a defect-petition denial (DP26-005, Honda Odyssey airbags) and a recall-outreach meeting notice, with no movement on an AV framework. No new Section 232 action on robotics and industrial machinery, where the investigation opened Sept 2, 2025 and the statutory report deadline passed around June 29, 2026 with no proclamation yet. That last one is the open tail risk on imported machine tools and automation hardware.

### Adjacent to the window, worth tracking
**EASA Opinion 06/2026** (published Sept 21, one week before this window) is now with the European Commission and would drop the EU registration threshold from 250g to **100g**, mandate direct remote ID at 100g and above in the open category, and require a take-off prevention function when the operator registration number is not loaded. Transitional carve-outs apply to units under 900g and to models marketed before 12 months after entry into force. Any US drone maker selling into the EU should be designing to this now. ([Opinion](https://www.easa.europa.eu/en/document-library/opinions/opinion-no-062026))

China's suspension of the 0.1% de minimis rule on rare-earth export controls **lapses Nov 10, 2026**, which is the single biggest supply-chain date on the calendar for magnet-dependent hardware. ([Tech Times](https://www.techtimes.com/articles/328392/20261002/rare-earth-magnets-chinas-november-10-deadline-us-gap-money-cant-close.htm))

## Deals and funding

| Company | Deal | Amount | Why it matters |
|---|---|---|---|
| [World Labs](https://www.datacenterknowledge.com/data-center-chips/amd-to-acquire-world-labs-for-8-2b-to-advance-ai-models-and-robotics) / AMD | M&A, all-stock | $8.2B | AMD buys a world-model team rather than build one; Fei-Fei Li becomes EVP and chief scientist. AMD pegs physical AI at $200B by 2035. Closes end of 2026. |
| [Synaptics](https://www.onsemi.com/company/newsroom/news-and-insights/onsemi-and-synaptics-announce-revised-merger-agreement) / onsemi | Revised merger, all-cash | $5.7B | $123/share cash, down from the roughly $7B June agreement. Both stocks rose on the switch, a signal that cash-and-accretion is beating stock-and-story right now. |
| [Varda Space](https://payloadspace.com/varda-raises-251m-series-d/) | Series D | $251M | $1.6B valuation, co-led by Lux Capital and Natural Capital. In-space pharma manufacturing plus hypersonic reentry testing, the rare orbital business with two revenue lines. |
| [Hertha Metals](https://www.businesswire.com/news/home/20260929199684/en/Hertha-Metals-Secures-$133.65M-Series-A-to-Produce-High-Purity-Iron-for-Domestic-Rare-Earth-Magnets) | Series A (Sept 29) | $133.65M | Includes a **$65M US government equity investment**. Single-step high-purity iron for domestic rare-earth magnets, ahead of a $100M commercial plant. DoD equity in materials startups has become routine. |
| [Astro Digital](https://satnews.com/2026/09/30/astro-digital-to-go-public-via-587-million-spac-merger-with-proem-acquisition-corp-i/) | SPAC, Proem Acquisition Corp I | $587M EV | About $180M gross proceeds, Nasdaq (ASTR) targeted Q1 2027. Satellite manufacturing takes the SPAC route again as the conventional IPO window stays selective. |
| [Fortem Technologies](https://dronelife.com/2026/09/30/fortem-technologies-funding-50m-series-b/) | Series B (Sept 30) | $50M | Led by **Lockheed Martin**, six months after its first check. A prime moving from strategic investor to lead is the clearest counter-UAS demand signal of the week. |
| [SiMa.ai](https://semiengineering.com/chip-industry-week-in-review-158/) | Growth round | $150M | Physical-AI silicon at 1,000+ TOPS. Edge inference for robots is now funded as its own category rather than a datacenter derivative. |
| [CScale](https://semiengineering.com/chip-industry-week-in-review-158/) and Volantis | Stealth exit; round | $145M; $88M | Two optical-interconnect raises in one week (Volantis on integrated micro-VCSELs). Interconnect is where the capital is rotating as compute scaling hits reticle and power limits. |
| [Efficient Computer](https://semiengineering.com/chip-industry-week-in-review-158/) | Round | $97M | Energy-efficient general-purpose processors, the embedded side of the same power-wall thesis. |
| [Samsung Electro-Mechanics](https://semiengineering.com/chip-industry-week-in-review-158/) | Capex | ~$4.9B | FCBGA package-substrate capacity in Korea and Vietnam. Substrate capacity is the live bottleneck for AI server builds. |
| [Falcata](https://washingtontechnology.com/contracts/2026/10/blackstones-new-defense-tech-company-and-more-capital-markets-action-highlight/416391) (Blackstone) | Platform formation | n/d | TSC plus Applied Systems Engineering, covering seekers, radar, guidance electronics, CAS, GPS-denied nav and launchers. Brandon Wolfson CEO, Jonathan Moneymaker (ex-BlueHalo) chairman. PE is rolling up interceptor subsystems. |
| [Constellation](https://www.world-nuclear-news.org/articles/constellation-amazon-agree-nuclear-focused-power-purchase-deal) / Amazon | 20-year PPA (Sept 30) | $3B capex | Underwrites a roughly $3B uprate and expansion at Calvert Cliffs in Maryland. Hyperscaler offtake is now financing existing-fleet uprates, which land years before any SMR does. |
| [Space seed cohort](https://payloadspace.com/news/) | Seed / pre-seed | $5–11M each | Hop Aero $11M (suborbital point-to-point logistics), Satlyt $8M (orbital data centers), Charter Space $5M (spacecraft insurance), Foundational £8.2M pre-seed (satellite laser ranging), Blackswan Space €2.5M (RPO kit). The money is going to ground segment and services. |
| [Certo Aerospace](https://techstartups.com/2026/10/02/startup-funding-news-today-october-2-2026-palebluedot-ai-certo-aerospace-drivex-more) | Equity (Oct 2) | £5M | 600kg-class autonomous coaxial VTOL, flying since 2023, through UK CAA trials and MoD demos. Small round, real flight hours. |

Excluded as out-of-window despite trade-press coverage this week: Maven Robotics' $100M Series A (announced Sept 10) and SoftBank's agreement to acquire the Robotics and AI Institute from Hyundai (announced Sept 18, now in CFIUS review, alongside SoftBank's separate $5.3B purchase of ABB's robotics division).

## Robotics

- **IDC put H1 2026 humanoid shipments near 25,000 units, up 432% year over year**, with China at 77.9% of the global total and Agibot leading at roughly 8,600 units. Chinese firms lead the shipment table while US firms lead on valuation ([Robotics and Automation News](https://roboticsandautomationnews.com/2026/10/02/idc-data-shows-agibot-led-global-humanoid-robot-shipments-in-h1-2026/105463/))
- Related, from Sept 29: China set **three new criteria for humanoid robot IPOs** that few current players meet, which should slow the domestic listing pipeline even as shipments climb ([CNBC](https://cnbc.com/2026/09/29/china-criteria-humanoid-robot-ipos.html))
- **Agility Robotics and FORT** expanded their engagement into a three-part integrated safety architecture for Digit 5 (Oct 4). Functional safety is becoming a procurement gate for humanoids in real facilities ([Robotics and Automation News](https://roboticsandautomationnews.com/2026/10/))
- **Runway released Praxis-1**, a world action model for robotics, with open weights (Oct 2). Open-weight robot foundation models compress the moat for anyone selling a proprietary policy stack ([The Robot Report](https://www.therobotreport.com/))
- FMC³ Robotics, Vector and PEM Motion signed an MOU for an embodied-AI joint venture building standardized data infrastructure for industrial robots (Oct 2), and Cyngn won a repeat DriveMod Tugger order from a Fortune 100 manufacturer (Oct 4) ([Robotics and Automation News](https://roboticsandautomationnews.com/2026/10/))

## Drones and autonomy

- **Flytrex launched rooftop drone docks** with predictive dispatch, claiming a 60% reduction in delivery cost (Oct 1). Worth treating the number as vendor-stated until independently measured ([Robotics and Automation News](https://roboticsandautomationnews.com/2026/10/01/flytrex-launches-rooftop-drone-docks-and-predictive-ai-to-cut-delivery-costs-by-60-percent/105406/))
- Fortem's $50M led by Lockheed Martin (see deals) plus Mobix Labs acquiring Vision Aerial mark continued consolidation on both sides of the counter-UAS and airframe stack ([Govly](https://app.govly.com/public/signals/183350))
- Operators keep expanding on waivers rather than waiting for Part 108, including a Hillsborough County blood-delivery program going live in October. The cost of the regulatory delay is showing up as waiver-engineering headcount ([DroneXL](https://dronexl.co/bvlos/))

## Space

- **Starship Flight 14** (Sept 28, 8:48am EDT, Starbase) put a V3 Starship in orbit for the first time. Super Heavy made a controlled Gulf splashdown about seven minutes in despite several engine shutdowns. The planned six-orbit, 9h50m profile was cut to 3h08m with a northern Pacific splashdown; the ship toppled and exploded on impact. Next milestones are tower catches of both stages and orbital refueling ([Space.com](https://www.space.com/space-exploration/launches-spacecraft/spacex-starship-megarocket-flight-14-orbital-launch-success))
- **Blue Origin's New Glenn was added to NASA's Launch Services II contract** through June 2030 (Sept 29), rated at 45 metric tons to LEO under a 23-foot fairing. A second heavy-lift option on the NASA catalog changes the bidding dynamics for science missions ([Starlust](https://starlust.org/space-weekly-recap-september-26-october-2-2026-key-stories-you-may-have-missed/))
- **Crew-13 launched Oct 1** after a Sept 30 flight readiness review and docked at Harmony forward, and SpaceX flew NROL-97 for the National Reconnaissance Office on Sept 30 ([NASA](https://www.nasa.gov/blogs/commercialcrew/2026/09/30/nasa-spacex-conclude-review-crew-13-go-for-launch/))
- **Artemis III's twin SLS solid rocket boosters are stacked** with nose cones at KSC, supplying about three quarters of the 8.8 million pounds of liftoff thrust. Core stage integration is the remaining long pole ([Starlust](https://starlust.org/space-weekly-recap-september-26-october-2-2026-key-stories-you-may-have-missed/))

## Semis, energy and manufacturing

- **TSMC is evaluating a multibillion-dollar Texas campus** on top of its Arizona buildout. Capacity siting is now diversifying within the US as well as away from Taiwan ([Semiconductor Engineering](https://semiengineering.com/chip-industry-week-in-review-158/))
- Back-end and substrate capacity moved more than front-end this week: Infineon opened phase one of its Bangkok backend hub, TOPPAN opened its first overseas FC-BGA site in Singapore, VSMC (VIS–NXP JV) opened a 300mm Singapore fab and is weighing a second, and Air Liquide committed over $193M to ultra-pure gas units in southern Japan ([Semiconductor Engineering](https://semiengineering.com/chip-industry-week-in-review-158/))
- **DOE opened a call for up to $400M** in Office of Science basic research for FY2027 (announced Oct 1–2). Non-dilutive capital for frontier energy and materials work ([DOE](https://www.energy.gov/articles/energy-department-announces-400-million-basic-research-advance-frontiers-science))
- On the grid side, GIGA Storage took its 350 MW / 1.4 GWh Albatross project in Lower Saxony to construction-ready (Oct 2), and SEMI warned the US could need 88,000 additional semiconductor engineers by 2029 with nearly 30% of Europe's semi workforce retiring by 2030 ([ESS News](https://www.ess-news.com/2026/10/02/giga-storage-advances-350-mw-1-4-gwh-albatross-project-in-lower-saxony-to-construction-ready-stage/), [Semiconductor Engineering](https://semiengineering.com/chip-industry-week-in-review-158/))

## Week ahead

- **Oct 5–9.** IAC 2026, Antalya, Turkey (NEST Congress Center). Artemis Accords principals are meeting on the margins on lunar debris ([Space Agenda](https://www.spaceagenda.com/event/iac-2026/))
- **Oct 5.** Falcon 9 from Vandenberg with 21 SDA Tranche 1 Transport Layer A satellites, 08:17 UTC ([RocketLaunch.org](https://rocketlaunch.org/launch-schedule))
- **Oct 7.** KSLV-2 Nuri from Naro with NeonSat-2 through 6, 03:23 UTC. Korea's domestic launcher carrying its own EO constellation
- **Oct 9.** Long March 12 from Wenchang, payload undisclosed, 19:25 UTC
- **Oct 10.** Starlink Group 15-25, 27 satellites, Falcon 9 from Vandenberg, 23:00 UTC
- **Oct 13.** CRS-2 SpX-35 ISS resupply, Falcon 9 from Cape Canaveral, 10:33 UTC
- **Oct 15.** TSMC Q3 2026 earnings call, 14:00 Taipei. The read on 2027 capex and advanced-packaging allocation ([TSMC calendar](https://investor.tsmc.com/english/financial-calendar))
- **Oct 19.** TSA deadline for operator applications to the Part 108 security roundtables, which only convene once the final rule publishes. Apply regardless of whether the rule has moved
- **Oct 19.** H3 Flight F10 from Tanegashima, 19:41 UTC, carrying JAXA's MMX Martian Moons eXploration orbiter and the Idefix rover
- **Oct 20–21.** RoboBusiness 2026, Santa Clara. Eli Lilly and Purdue are presenting field data on worker perception of robots in manufacturing ([agenda](https://www.robobusiness.com/schedule-at-a-glance/))
- **Oct 26.** NRC modernization rule takes effect (information withholding, post-promulgation comment periods, security criteria)
- **Nov 10.** China's rare-earth 0.1% de minimis suspension lapses. The date to plan magnet inventory against
- **Dec 2026.** NRC draft safety evaluation report due on the Palisades Pioneer limited work authorization

No confirmed regulatory comment deadlines in hard tech fall inside the Oct 5–15 window. Launch times are provider-stated and slip routinely.
