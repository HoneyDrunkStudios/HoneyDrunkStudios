# 🐝 HoneyDrunk Studios — Hive Operations Manifest v4.0  

Application source lives in `honeydrunk-website/src/`; public assets, scripts and framework configuration remain at the application root. The `@/` import alias resolves to `src/`.
*(HoneyDrunk.OS • The Grid • Build-in-Public Cyberpunk Edition)*  

(Founder-Controlled • AI-Advised • Copilot-Powered • Cyberpunk-Aesthetic • Build-in-Public • Agentic-Driven)  

## Website maintenance — October 3, 2026

The Next.js application lives in `honeydrunk-website/`. Install the lockfile with `npm ci`, then use `npm run dev`, `npm run lint`, `npx tsc --noEmit` and `npm run build` from that directory.

HoneyDrunk.Studio owns current priorities, living product requirements, game design and learning evidence. This website publishes a dated, bounded summary; its catalog and signal feed do not authorize work or establish product acceptance. The longer manifesto below describes studio aspirations, not a list of shipped features.

- `src/components/CurrentFocus.tsx` presents the five selected tracks.
- `src/data/schema/nodes.json` and `signals.json` hold public project descriptions and dated updates. Separate private prototypes, local implementation, merged code, package publication and founder acceptance.
- Signal feed tags use existing sector IDs/names from `sectors.json` or registered entity IDs/names from `nodes.json`, `modules.json` and `services.json`, matching the feed's sector resolver. Do not invent editorial tags such as `studio-update` or `packages`. Use one label per referenced entity. `npm run validate:signals` checks the whole feed before each build; `npm run test:signals` exercises rejection cases. Six older entries retain their exact historical `Pulse`/`HoneyHub` aliases; these are entry-specific exceptions, not allowed tags for new updates.
- Shared navigation lives in `src/components/Header.tsx` and `LandingFooter.tsx`; `src/app/sitemap.ts` owns the static sitemap. Keep route removals consistent across these sources, Grid controls, schema metadata and links.
- Publish studio material only. Private prototype URLs and personal-site promotion do not belong in public navigation or content.

## Hosting — Cloudflare Workers (October 17, 2026)

honeydrunkstudios.com is served by the `honeydrunk-website` Cloudflare Worker, built from `honeydrunk-website/` with the OpenNext Cloudflare adapter (`@opennextjs/cloudflare`). This replaces Vercel hosting. `vercel.json` is gone. Worker responses take the security headers from `next.config.ts`. Static assets take the same headers, and `/_next/static/*` takes a one-year immutable cache, from `honeydrunk-website/public/_headers`.

- `honeydrunk-website/wrangler.jsonc` holds the Worker name, account, custom domains (apex and `www`), static assets, the Images binding that serves `next/image`, and observability. Public configuration only; no secrets.
- `honeydrunk-website/public/_headers` is the Cloudflare Workers static-asset header file. Cloudflare serves `robots.txt`, images and `/_next/static/*` without invoking the Worker, so the `next.config.ts` headers do not apply to them. The file sets `X-Content-Type-Options`, `X-Frame-Options` and `X-XSS-Protection` on every static asset, and `Cache-Control: public, max-age=31536000, immutable` on `/_next/static/*`.
- `honeydrunk-website/open-next.config.ts` configures no incremental cache. Every route is static, SSG or a route handler over bundled JSON. Add an R2 or KV cache before introducing ISR or `revalidate`.
- From `honeydrunk-website/`: `npm run preview` builds the Worker and serves it locally in workerd; `npm run deploy` builds and deploys from a logged-in Wrangler session; `npm run cf-typegen` regenerates binding types; `npx wrangler deploy --dry-run` validates the configuration without an account.
- `next/image` requests go through the Cloudflare Images binding. The Free plan includes 5,000 unique transformations per month and refuses new ones beyond that rather than billing. The site has two `next/image` call sites, so ordinary traffic stays well inside the allowance.

Production deploys run on Cloudflare Workers Builds from `main`. No API token or GitHub secret is involved. Dashboard settings: Compute (Workers & Pages) → Create → Import a repository → `HoneyDrunkStudios/HoneyDrunkStudios`; root directory `honeydrunk-website`; build command `npx opennextjs-cloudflare build`; deploy command `npx opennextjs-cloudflare deploy`; production branch `main`; non-production branch builds off. `NEXT_PUBLIC_SITE_URL` defaults to the production URL in code; set it as a build variable only if it must differ.

### Cutover from Vercel

The first production deploy is the cutover, and it has to start immediately after the Vercel DNS records are gone. Cloudflare will not create a Worker custom domain on a hostname that already has a CNAME. Workers Builds runs Wrangler non-interactively and leaves existing records in place, so a first deploy made while those records remain fails and honeydrunkstudios.com stays on Vercel.

Finish every step that leaves DNS alone before touching the zone. The downtime window opens when the Vercel records are deleted and closes when the Worker custom domains are live, so delete the records only when the Workers Builds import is filled in and waiting on the confirm button, then confirm it in the same sitting.

1. Record the current Vercel DNS records for the apex and `www` in the honeydrunkstudios.com zone (type, name, target, proxy status). They are the rollback. Leave them in place.
2. Optional: verify the bundle locally with `npm run preview`. Do this before deleting any DNS records.
3. Open Workers Builds and fill in the settings above (repository `HoneyDrunkStudios/HoneyDrunkStudios`, root directory, build command, deploy command, production branch `main`, non-production branch builds off). Do not confirm the import. Confirming it starts the first deploy. The site is still served by Vercel.
4. Immediately before that deploy, delete the Vercel DNS records recorded in step 1 for `honeydrunkstudios.com` and `www`. This opens the downtime window.
5. Confirm the Workers Builds import so the first build and deploy start at once. Wrangler creates the apex and `www` custom domains on the hostnames cleared in step 4.
6. Verify on the live domain: home, `/grid`, `/nodes/<id>`, `/services/<id>`, `/api/nodes/stats`, `/sitemap.xml`, an unknown path returns the site 404, and the header logo and gallery images render. Document responses and static assets (`/robots.txt`, `/honeydrunk.png`, `/_next/static/*`) carry `X-Content-Type-Options`, `X-Frame-Options` and `X-XSS-Protection`. `/_next/static/*` also carries `Cache-Control: public, max-age=31536000, immutable`.
7. Rollback, if needed: remove both custom domains from the Worker (Settings → Domains & Routes), recreate the records from step 1 in the DNS tab, and the Vercel deployment serves again. Code-level rollback: Workers → honeydrunk-website → Deployments → roll back to a previous version.
8. After a clean day, remove the project from Vercel.


---

## 🎯 Mission
**Build the HoneyDrunk Grid** — interlinked systems, SDKs, creative tools, embodied agents, and original games that feel handcrafted, alive, and deliberate.  
Internally, this network operates as **HoneyDrunk.OS** — the operating system powering every Node and agent.  

> **Structure meets soul. Code meets art.**

---

## 💡 Public-First Philosophy
HoneyDrunk is a **build-in-public studio**. Each Node is both **system** and **story**.  
**Public Name:** *The Grid* | **Internal System Name:** *HoneyDrunk.OS*  

> Externally = *The Grid* (mythos + map)  
> Internally = *HoneyDrunk.OS* (runtime + architecture)

---

## 🧮 Cost Discipline Protocol
Follow the **Zero-Bloat Directive.**  
Azure free tiers · Static sites · Central YAMLs · Open-source tooling.  
> **Cost is a design constraint, not a limitation.**

---

## ⚙️ HoneyDrunk.OS Architecture
| Layer | Purpose | Core Nodes |
|-------|----------|------------|
| Identity | Unified Auth + XP + Telemetry | Auth, Vault, Pulse |
| Infrastructure | Domain primitives + Transport | Kernel, Transport, Web.Rest |
| Framework | SDKs + Agents + Runtime Orchestration | HoneyDrunk.AI, Tools, SDKs |
| Interface | Creator Portals + Dashboards | HoneyHub (Web/Desktop), Admin |
| Network | Public visibility + social layer | HoneyDrunkStudios.com, Hive, Signal |

---

## 🕹️ Divisions
### 🧠 HoneyHub — Creator OS
Project orchestration, learning, and AI assistance.  
> *“The creative command center of the Hive.”*

### 🕹️ HoneyPlay — Game Division
> “We built the Grid. Now we play in it.”  
Covers all games under HoneyDrunk — visual novels, sims, strategy, sandbox, and experimental AI titles.

### 🦾 Cyberware — Robotics & Embodied Systems
> “Where code meets matter.”  
Advanced robotics, simulation, and embodied AI agents powered by Vault, Pulse, and Transport.  
Cyberware covers both **HoneyMech’s** legacy mission and new embodied-tech Nodes.

### 🔐 HoneyNet — Security & Defense Sector
> "Run the sim. Guard the Hive."  
Security research, SDKs, and experiments in resilience.  
Home to **BreachLab.exe** (white-hat experimental labs) and **HoneyDrunk.Sentinel** (secure-by-default SDK).  
Connected to **Vault** and **Pulse** for secrets management and telemetry.

---

## 🎮 Game Dev Stack Expansion Plan
| Category | Node / SDK | Purpose |
|-----------|-------------|----------|
| Auth / Profile | HoneyDrunk.Auth | Unified player identity + XP |
| Telemetry | HoneyPulse | Analytics + game events |
| Vault | HoneyVault | Config + cloud saves |
| Transport | HoneyTransport | Multiplayer / event bus |
| Forge | HoneyForge | Asset registry + import pipeline |
| AI | HoneyDrunk.AI | Procedural narrative, testing agents |
| 🆕 PlayKit | Unity / Unreal SDK | Client integration for Grid services |

---

## 💰 Sustainability & Monetization
**Open Core. Paid Orchestration.**

| Node | Free Tier | Pro Tier |
|------|------------|----------|
| HoneyHub | Base project mgmt | Advanced analytics + team workspaces |
| Pulse | Basic telemetry | Full observability suite |
| Vault | Local config | Multi-region cloud hosting |
| Forge | Free uploads | Marketplace hosting |
| PlayKit | SDK | Cloud leaderboards + metrics |
| Agents | Basic copilots | Multi-agent orchestration |

> Paid layers sustain the Grid and fund innovation.

---

## 🤖 AI Integration Directive
AI is the **neural fabric** of HoneyDrunk.OS.  
Agents amplify creators and automate flow.

| Class | Function |
|-------|-----------|
| Strategic | Long-term planning + node coordination |
| Operational | CI/CD, documentation, testing |
| Creative | Asset + narrative generation |
| Embodied | Robotics + simulation control |
| Community | Content + signal management |

Principles: augmentation over automation · federated memory · transparent models.

---

## 🌍 External Adoption & Developer Ecosystem
HoneyDrunk.OS = **Public Creative Infrastructure.**  
> The Grid becomes the connective tissue of indie creation.

### Adoption Path
1. Internal validation (core nodes)  
2. Public SDK release (C#, TS, Unity/Unreal)  
3. Optional shared identity integration  
4. Paid cloud tiers (Pulse, Vault, AI orchestration)  
5. Federated “Hives” run by other studios

Cultural Directive → *Empower, don’t enclose.*

---

## 🧱 Governance & Licensing
- Core SDKs: open-source (MIT-style).  
- Hosted + orchestration layers: commercial license.  
- Governance: all nodes versioned + tracked in The Hive heartbeat.  
- Change control: public RFCs for major updates.

---

## 🧩 Developer Experience & Distribution
- Packages on **NuGet / NPM / GitHub Packages**.  
- Future dev portal: *developers.honeydrunkstudios.com*.  
- CLI: `hd` or `hivectl` for scaffolding nodes.  
- Template repos: Starter Node (SaaS, Game, Agent).

---

## 🔐 Data & Privacy Charter
- Creator data belongs to creators.  
- Metrics are anonymized and opt-in.  
- No resale, no hidden tracking.  
- XP and profiles sync only when users consent.

---

## ⚖️ AI Ethics & Oversight
1. Human-in-loop for all creative outputs.  
2. Agents must log actions + prompt context.  
3. Model transparency: declared model + version.  
4. Deterministic seeds for reproducibility.

---

## 🔄 Hive Governance Cycle
```
Build → Test → RFC → Review → Merge → Version bump
```
- Every node update reflected in The Hive heartbeat.  
- Community RFCs define next phases of HoneyDrunk.OS.

---

## 🪙 Creator Economy & Reward Layer
- XP converts into **Grid Credits** redeemable for hosting or Pro features.  
- Agents + creators earn XP for contributions.  
- Marketplace royalties handled via Forge + Ledger nodes.

---

## 🕶️ Aesthetic Charter
Cyberpunk realism • Techno-Art Fusion • Human Core  
Palette → Gold ⚡ Violet ⚡ Blue ⚡ **Matrix Green (HoneyNet)**  
**Mantra:** Boot · Build · Refactor · Evolve.

---

## 🧠 Operating Roles
| Role | Function |
|------|-----------|
| Oleg / TattedDev | Edge Runner & Architect |
| ChatGPT | Strategic Copilot (architecture + cohesion) |
| GitHub Copilot | Engineering assistant |
| Azure DevOps | Build + release grid |
| The Hive | Dependency + progress tracker |
| HoneyDrunkStudios.com | Public Grid map + signal feed |

> Agents amplify. They never replace.

---

## 🪐 Workflow
```
1️⃣ Node Initiation → define purpose + MVP  
2️⃣ Scoping → architecture + CI/CD plan  
3️⃣ Implementation → build & iterate  
4️⃣ Review → update Hive  
5️⃣ Signal → publish on HoneyDrunkStudios.com
```
Whenever “**What’s next for HoneyDrunk?**” is asked,  
Read **HoneyDrunk.Studio current focus**, then the selected living PRD, GDD or learning tracker. The website is a public summary, not execution authority.

---

## ⚙️ Node States
Planning 🟡 | In Progress 🔵 | In Review 🟠 | Linked 🟣 | Complete 🟢  
Synced through The Hive heartbeat → mirrored publicly.

---

## 🧾 Command Syntax
```
Start Node     → "Let's start Vault."
Scope Node     → "Scope Pulse."
Add Detail     → "Add audit logging."
Mark Complete  → "Mark Vault complete."
Next Node      → "What follows Pulse?"
```

---

## 🗂 Hive Tracker
Refer to **HoneyDrunk.Studio** for selected priorities and source evidence. The website’s *Signal* and *Node* pages are dated public summaries; they do not replace the owning documents.

---

## 🔮 Long-Term Vision
HoneyDrunk evolves into a multi-agent, multi-node creative OS connecting SDKs, SaaS, Games, and Robotics.  

**Internally:** HoneyDrunk.OS — structured, agentic, interoperable.  
**Publicly:** The Grid — visual, narrative, alive.  

> The OS powers imagination.  
> The Grid tells its story.  
> HoneyPlay gives it soul.  
> **Cyberware gives it form.**  
> **HoneyNet guards its mind.**

**Precision is our art. Aesthetic is our architecture. Transparency is our marketing.**
