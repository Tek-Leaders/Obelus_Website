import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/seo/Seo';
import {
  aiGuardNav,
  aiGuardHero,
  aiGuardChallenge,
  aiGuardCapabilities,
  aiGuardSolution,
  aiGuardArchitecture,
  aiGuardMatrix,
} from '../data/aiGuard';
import '../styles/ai-guard.css';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'OBELUS AI Guard',
  applicationCategory: 'SecurityApplication',
  operatingSystem: 'Web',
  description:
    'The unified AI security and governance layer for the enterprise: real-time visibility, inline control, and audit-ready proof across people, apps, autonomous agents, models, and MCP tools.',
  brand: { '@type': 'Brand', name: 'OBELUS' },
};

/**
 * Dedicated landing page for AI Guard, ported from the standalone
 * OBELUS_AI_Guard.html brief. It carries its own in-page nav/hero/section
 * styling (scoped under .aig-page in styles/ai-guard.css so none of it leaks
 * onto the rest of the site) and sits below the site's shared Header and
 * AnnouncementBar, which Layout.jsx renders on every route - this page has
 * two navs on purpose, matching the brief as given.
 */
export default function AiGuard() {
  const [activeFilter, setActiveFilter] = useState('all');
  const rows = aiGuardMatrix.rows.filter((row) => activeFilter === 'all' || row.cat === activeFilter);

  return (
    <div className="aig-page">
      <Seo
        title="AI Guard: Enterprise AI Security & Governance"
        description="OBELUS AI Guard unifies AI security and governance: real-time visibility, inline control, and audit-ready proof across people, apps, autonomous agents, models, and MCP tools."
        path="/products/ai-guard"
        structuredData={structuredData}
      />

      {/* ---------- This page's own in-page nav (see Agent turn notes) ---------- */}
      <header className="aig-topnav">
        <div className="aig-container aig-topnav-inner">
          <ul className="aig-navmenu">
            {aiGuardNav.links.map((link) => (
              <li className="aig-navitem" key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* ---------- Hero ---------- */}
      <section className="aig-hero" id="top">
        <div className="aig-hero-grid-bg" aria-hidden="true" />
        <div className="aig-container aig-hero-content">
          <div className="aig-eyebrow-pill">
            <span>{aiGuardHero.eyebrow.toUpperCase()}</span>
          </div>
          <h1 className="aig-hero-title">
            <span className="aig-gradient-wordmark">{aiGuardHero.titleLine1}</span>
            <br />
            {aiGuardHero.titleLine2}
          </h1>
          <p className="aig-hero-sub">{aiGuardHero.body}</p>
          <div className="aig-hero-ctas">
            <Link to={aiGuardHero.primaryCta.href} className="btn btn-primary">
              {aiGuardHero.primaryCta.label} &rarr;
            </Link>
            <a href={aiGuardHero.secondaryCta.href} className="btn btn-outline">
              {aiGuardHero.secondaryCta.label}
            </a>
          </div>

          <div className="aig-pillar-bar">
            {aiGuardHero.pillars.map((pillar) => (
              <div className="aig-pillar-pill" key={pillar.num}>
                <span className={`aig-pillar-num aig-num-${pillar.tone}`}>{pillar.num}</span>
                <span>{pillar.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- The Challenge ---------- */}
      <section id="challenge">
        <div className="aig-container">
          <div className="aig-section-header">
            <span className="aig-section-kicker">{aiGuardChallenge.kicker}</span>
            <h2>{aiGuardChallenge.title}</h2>
            <p>{aiGuardChallenge.body}</p>
          </div>

          <div className="aig-grid-3">
            {aiGuardChallenge.items.map((item) => (
              <div className="aig-card" key={item.num}>
                <span className="aig-card-num">{item.num}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Closing the AI Governance Gap ---------- */}
      <section id="capabilities" className="aig-section-alt">
        <div className="aig-container">
          <div className="aig-section-header">
            <span className="aig-section-kicker">{aiGuardCapabilities.kicker}</span>
            <h2>{aiGuardCapabilities.title}</h2>
            <p>{aiGuardCapabilities.body}</p>
          </div>

          <div className="aig-grid-2">
            {aiGuardCapabilities.items.map((item) => (
              <div className="aig-cap-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- The Solution ---------- */}
      <section id="solution">
        <div className="aig-container">
          <div className="aig-section-header">
            <span className="aig-section-kicker">{aiGuardSolution.kicker}</span>
            <h2>{aiGuardSolution.title}</h2>
            <p>{aiGuardSolution.body}</p>
          </div>

          <div className="aig-solution-grid">
            {aiGuardSolution.columns.map((col) => (
              <div className={`aig-sol-card aig-sol-${col.tone}`} key={col.title}>
                <span className="aig-sol-tag">{col.tag}</span>
                <h3>{col.title}</h3>
                <ul className="aig-sol-list">
                  {col.items.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="aig-design-principle">
            <strong>{aiGuardSolution.principle.label}</strong> {aiGuardSolution.principle.body}
          </div>
        </div>
      </section>

      {/* ---------- Unified Platform Architecture ---------- */}
      <section id="architecture" className="aig-section-alt">
        <div className="aig-container">
          <div className="aig-section-header">
            <span className="aig-section-kicker">{aiGuardArchitecture.kicker}</span>
            <h2>{aiGuardArchitecture.title}</h2>
            <p>{aiGuardArchitecture.body}</p>
          </div>

          <div className="aig-arch-wrapper">
            <div className="aig-arch-col">
              <div className="aig-arch-col-label">{aiGuardArchitecture.sources.label}</div>
              {aiGuardArchitecture.sources.items.map((item) => (
                <div className="aig-arch-node" key={item.title}>
                  <h4>{item.title}</h4>
                  <span>{item.sub}</span>
                </div>
              ))}
            </div>

            <div className="aig-arch-hub">
              <div className="aig-hub-header">
                <h3>{aiGuardArchitecture.hub.title}</h3>
                <p>{aiGuardArchitecture.hub.sub}</p>
              </div>
              <div className="aig-hub-grid">
                {aiGuardArchitecture.hub.modules.map((mod) => (
                  <div className="aig-hub-module" key={mod.title}>
                    <h4>{mod.title}</h4>
                    <p>{mod.body}</p>
                  </div>
                ))}
              </div>
              <div className="aig-hub-foundation">{aiGuardArchitecture.hub.foundation}</div>
            </div>

            <div className="aig-arch-col">
              <div className="aig-arch-col-label">{aiGuardArchitecture.outputs.label}</div>
              {aiGuardArchitecture.outputs.items.map((item) => (
                <div className="aig-arch-node" key={item.title}>
                  <h4>{item.title}</h4>
                  <span>{item.sub}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="aig-ecosystem">
            <p className="aig-ecosystem-heading">{aiGuardArchitecture.ecosystem.heading}</p>
            <div className="aig-stack-grid">
              {aiGuardArchitecture.ecosystem.groups.map((group) => (
                <div className="aig-stack-box" key={group.title}>
                  <h4>{group.title}</h4>
                  <div className="aig-stack-tags">
                    {group.tags.map((tag) => (
                      <span className="aig-stack-tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Threat-to-Evidence Matrix ---------- */}
      <section id="matrix">
        <div className="aig-container">
          <div className="aig-section-header">
            <span className="aig-section-kicker">{aiGuardMatrix.kicker}</span>
            <h2>{aiGuardMatrix.title}</h2>
            <p>{aiGuardMatrix.body}</p>
          </div>

          <div className="aig-filter-bar">
            {aiGuardMatrix.filters.map((filter) => (
              <button
                type="button"
                key={filter.key}
                className={`aig-filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter.key)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="aig-table-wrap">
            <table>
              <thead>
                <tr>
                  <th className="aig-col-threat">{aiGuardMatrix.columns[0]}</th>
                  <th className="aig-col-detect">{aiGuardMatrix.columns[1]}</th>
                  <th className="aig-col-enforce">{aiGuardMatrix.columns[2]}</th>
                  <th className="aig-col-prove">{aiGuardMatrix.columns[3]}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.cells[0]}>
                    <td className="aig-threat-cell">{row.cells[0]}</td>
                    <td>{row.cells[1]}</td>
                    <td>{row.cells[2]}</td>
                    <td>{row.cells[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </div>
  );
}
