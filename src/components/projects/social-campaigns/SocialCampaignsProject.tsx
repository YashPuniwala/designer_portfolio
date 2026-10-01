import { motion } from "framer-motion";
import type { SocialCampaignsProject as SocialCampaignsProjectType, CampaignBrand } from "@/data/projects";

interface Props {
  project: SocialCampaignsProjectType;
}

// Reveal wrapper — same animation as the shared Reveal component
function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Individual brand campaign section
function BrandSection({ brand, isFirst }: { brand: CampaignBrand; isFirst: boolean }) {
  const hasPosts = brand.posts.length > 0;

  return (
    <section className="sc-brand-section cs-section" aria-label={`Campaign — ${brand.name}`}>
      {/* Brand header */}
      <Reveal className="sc-brand-header">
        <p className="cs-label">{brand.num}</p>
        <h2 className="sc-brand-name">{brand.name}</h2>
        <p className="sc-brand-category">{brand.category}</p>
        <p className="sc-brand-desc">{brand.description}</p>
      </Reveal>

      {/* Instagram grid OR coming-soon placeholder */}
      {hasPosts ? (
        <div className="sc-ig-grid" aria-label={`${brand.name} Instagram posts`}>
          {brand.posts.map((post, i) => (
            <Reveal
              key={`${post.src}-${i}`}
              className="sc-ig-post"
            >
              <div className="sc-ig-post-inner">
                <img
                  src={post.src}
                  alt={post.alt}
                  loading={isFirst && i < 6 ? "eager" : "lazy"}
                  decoding="async"
                  className="sc-ig-post-img"
                />
              </div>
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal>
          <div className="sc-placeholder-grid" aria-label="Upcoming campaign">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="sc-placeholder-post">
                <div className="sc-placeholder-inner">
                  <span className="sc-placeholder-text">Coming Soon</span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      )}
    </section>
  );
}

export function SocialCampaignsProject({ project }: Props) {
  return (
    <div className="cs-body sc-body">

      {/* ── Project introduction ─────────────────────────────────────── */}
      <section className="sc-intro-section cs-section" aria-label="Project introduction">
        <Reveal>
          <p className="cs-label">Social Media / Brand Campaigns</p>
          <h2 className="sc-intro-title">
            Social Media<br />Campaigns
          </h2>
          <p className="sc-intro-tagline">{project.introTagline}</p>
        </Reveal>

        {/* Campaign index */}
        <Reveal className="sc-campaign-index">
          {project.brands.map((brand) => (
            <div key={brand.num} className="sc-campaign-index-row">
              <span className="sc-index-num">{brand.num}</span>
              <span className="sc-index-name">{brand.name}</span>
              <span className="sc-index-cat">{brand.category}</span>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Thin divider */}
      <div className="sc-divider" />

      {/* ── Brand campaigns ──────────────────────────────────────────── */}
      {project.brands.map((brand, i) => (
        <BrandSection key={brand.num} brand={brand} isFirst={i === 0} />
      ))}

    </div>
  );
}

export default SocialCampaignsProject;
