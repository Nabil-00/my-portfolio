# GEO Audit Report: Nabeel Ismail

**URL**: https://nabil.is-a.dev
**Date**: 2026-09-11
**Business Type**: Agency (Portfolio/Services)
**Scoring Model**: v2

---

## GEO Score: 51/100 (Grade C: Developing)

| Dimension | Score | Weight | Weighted |
|-----------|-------|--------|----------|
| Technical Accessibility | 81/100 | 20% | 16.2 |
| Content Citability | 40/100 | 35% | 14.0 |
| Structured Data | 64/100 | 20% | 12.8 |
| Entity & Brand | 30/100 | 25% | 7.5 |
| **Composite** | | | **51/100** |

Your site has strong technical foundations (81/100) with excellent crawler access and meta signals, but content citability (40/100) and brand signals (30/100) are dragging down the overall score. The biggest gaps: no Q+A content patterns, zero statistics, no FAQ schema, and weak third-party presence. These are fixable within 2-4 weeks.

---

## Critical Issues

None — no single issue is losing >15 weighted points.

## High Priority Issues

- **No Q+A content patterns** (Citability, -7 raw pts): AI systems prefer content that directly answers questions. Your site has zero Q+A structures, FAQ sections, or definitional content blocks.
- **Zero quantitative data** (Citability, -5 raw pts): No metrics like "built 3 production systems" or "trained 50+ developers" anywhere on the site.
- **Technical jargon undefined** (Citability, -5 raw pts): RBAC, LLM, JWT, SIWES, Prisma used without expansion.
- **CSR rendering** (Technical, -12 raw pts): React SPA means <50% of content is in initial HTML. AI crawlers may miss dynamic content.
- **No LinkedIn presence** (Brand, -6 raw pts): Primary professional platform is missing.
- **No third-party directory listings** (Brand, -13 raw pts): Not in Crunchbase, Clutch, or any tech directories.
- **Name inconsistency** (Brand, -3 raw pts): "Nabeel" on site vs "Nabil" on GitHub confuses entity resolution.

## Medium Priority Issues

- **No speakable property** (Schema, -5 raw pts): Missing from Person and ProfilePage schemas.
- **ProfessionalService missing logo + contactPoint** (Schema, -5 raw pts).
- **No FAQPage schema** (Schema, -6 raw pts, N/A currently).
- **No publication dates** (Citability, -2 raw pts).
- **No expert quotes or testimonials** (Citability, -4 raw pts).
- **No video transcripts** (Technical, -3 raw pts).

---

## Detailed Analysis

### 1. Technical Accessibility (81/100)

#### Sub-scores
- AI Crawler Access: 31/35
- Rendering & Content Delivery: 10/22
- Speed & Accessibility: 18/18
- Meta & Header Signals: 13/13
- Multimedia Accessibility: 9/12

**Key Strengths:**
- 13 AI crawlers explicitly allowed in robots.txt (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.)
- HTTPS, compression, sitemap, mobile viewport all working
- Complete meta tags (title, description, OG, Twitter, canonical)
- Descriptive alt text on images

**Main Weakness:**
- Pure CSR (React SPA) — content rendered via JavaScript, not in initial HTML. This is the #1 technical fix needed.

### 2. Content Citability (40/100)

#### Sub-scores
- Answer Block Quality: 2/20
- Self-Containment: 10/18
- Statistical Density: 3/17
- Structural Clarity: 16/17
- Expertise Signals: 5/13
- AI Query Alignment: 4/15

#### Top Citable Passages
1. > "MRTB Operations Management System, an office-management platform with approval workflows, procurement, document verification, and geofenced attendance built with React, TypeScript, Fastify, Prisma, and PostgreSQL"
2. > "He teaches as well: annual SIWES industrial-training workshops, an ongoing AI-assisted web development class, and tech education content on TikTok."
3. > "TypeScript, JavaScript, Python, Dart, PHP, SQL on the language side; React, Next.js, Flutter, Tailwind CSS on the frontend"

#### Improvement Opportunities

**Before:**
> "I design and build enterprise systems, AI-powered tools, and full-stack web applications for organizations in Kano and beyond."

**After (suggested):**
> "Nabeel Ismail is a software engineer in Kano, Nigeria who builds enterprise systems, AI-powered tools, and full-stack web applications. He has delivered 5+ production systems for organizations including DefendHub Enterprise and Hama Academy, specializing in React, Node.js, PostgreSQL, and LLM integration."

### 3. Structured Data (64/100)

#### Sub-scores
- Core Identity Schema: 19/30
- Content Schema: 10/25
- AI-Boost Schema: 17/25
- Schema Quality: 18/20

**Strengths:**
- 4 schema types: Person, WebSite, ProfilePage, ProfessionalService
- Valid JSON-LD with correct @context and cross-references
- sameAs links to 3 platforms
- areaServed: Kano, Nigeria

**Missing:**
- logo and contactPoint on ProfessionalService
- SearchAction on WebSite
- speakable property
- datePublished on ProfilePage

### 4. Entity & Brand (30/100)

#### Sub-scores
- Entity Recognition: 5/30
- Third-Party Presence: 0/25
- Community Signals: 7/25
- Cross-Source Consistency: 18/20

#### Platform Presence Map

| Platform | Status | Quality | Link |
|----------|--------|---------|------|
| Website | ✅ Active | Complete | nabil.is-a.dev |
| GitHub | ✅ Active | 20+ repos | github.com/Nabil-00 |
| TikTok | ✅ Active | Tech content | @i_nabeel_ |
| Facebook | ✅ Active | Personal | nabil.ismail.5855 |
| LinkedIn | ❌ Missing | Locked | — |
| Wikipedia | ❌ Missing | None | — |
| Crunchbase | ❌ Missing | None | — |
| YouTube | ❌ Wrong entity | Different person | — |
| Reddit | ❌ Wrong entity | Different person | — |
| Industry Directories | ❌ Missing | None | — |

---

## Platform-Specific Recommendations

### ChatGPT Optimization
- Add Wikipedia/Wikidata entity (long-term, high impact)
- Expand acronyms inline for better entity recognition
- Add quantitative metrics to strengthen authority signals

### Perplexity Optimization
- Create blog content with fresh, citeable statistics
- Get listed on Reddit, Hacker News, and tech forums
- Add datePublished to all content

### Gemini Optimization
- Organization schema with logo and contactPoint
- Brand consistency across all platforms
- Fix name inconsistency (Nabeel vs Nabil)

### Google AI Overviews
- FAQ schema with 3+ questions
- speakable property on key content
- LocalBusiness/ProfessionalService with complete properties

### Claude Optimization
- Self-contained passages with inline definitions
- Original statistics and data points
- Source attribution for all claims

---

## Quick Wins

1. **Add FAQ section + FAQPage schema** — expected +12 citability points
2. **Add quantitative metrics to bio/about** ("5+ systems built", "50+ students trained") — expected +6 citability points
3. **Expand all acronyms on first use** (RBAC, LLM, JWT, SIWES) — expected +3 citability points
4. **Add logo + contactPoint to ProfessionalService schema** — expected +5 schema points
5. **Add speakable property to Person schema** — expected +5 schema points

---

## 30-Day Roadmap

### Week 1: Foundation
- Add FAQ section to homepage with 5+ questions targeting "web developer in Kano", "AI tools in Kano"
- Add FAQPage schema
- Fix ProfessionalService schema (add logo, contactPoint)
- Add speakable property
- Add datePublished to ProfilePage

### Week 2: Content
- Rewrite hero bio with quantitative metrics
- Expand all acronyms on first use
- Add client testimonials with specific outcomes
- Create first blog post: "How I Built the MRTB Operations System in Kano"

### Week 3: Authority
- Unlock and optimize LinkedIn profile
- Create Crunchbase profile
- List on Nigerian tech directories
- Get GitHub profile linked from all platforms

### Week 4: Optimization
- Monitor AI visibility with geo-monitor
- Submit to Google Search Console
- Create second blog post targeting long-tail keywords
- Test AI citation with ChatGPT/Perplexity queries

---

## AI Visibility Measurement

### Track Your Progress with AIvsRank.com

This audit identifies what to fix. **AIvsRank.com** measures how visible you actually are across AI platforms — tracking mentions in ChatGPT, Claude, Perplexity, Gemini, and Google AI Overviews.

**What you get:**
- Real-time AI visibility score
- Platform-by-platform citation tracking
- Competitor benchmarking
- Historical trend analysis

**Get your AI visibility score**: [aivsrank.com](https://aivsrank.com?ref=geo-audit)

---

*Generated by [geo-audit](https://github.com/Cognitic-Labs/geoskills) — an open-source GEO diagnostic skill*
*Scoring methodology based on research from Princeton, Georgia Tech, BrightEdge, and 101 industry sources*

<!-- GEO-AUDIT-META
scoring_model: v2
url: https://nabil.is-a.dev
date: 2026-09-11
business_type: Agency
geo_score: 51
grade: C
technical: 81
citability: 40
schema: 64
brand: 30
GEO-AUDIT-META -->
