interface SocialMediaOverviewProps {
  overview?: {
    heading: string;
    intro?: string;
    categories: string[];
  };
}

export function SocialMediaOverview({ overview }: SocialMediaOverviewProps) {
  if (!overview) return null;

  return (
    <section className="cs-section sm-overview" aria-label="Content overview">
      <p className="cs-label">Content Overview</p>
      <h2 className="cs-phrase sm-overview-title">{overview.heading}</h2>
      {overview.intro && <p className="sm-overview-intro">{overview.intro}</p>}
      <ul className="sm-cats" aria-label="Content categories">
        {overview.categories.map((cat) => (
          <li key={cat} className="sm-cat">
            <span className="sm-cat-dot" aria-hidden="true" />
            {cat}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default SocialMediaOverview;
