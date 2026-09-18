import { InfiniteTextMarquee } from "@/components/ui/infinite-text-marquee";

const MARQUEE_TEXT =
  "OPERATOR.X — BRAND — GRAPHIC — WEB — DIGITAL EXPERIENCE —";

const TOOLTIP_TEXT = "LET'S MAKE SOMETHING BETTER. ✦";

type MarqueeSectionProps = {
  /** Render as a `section` (standalone) or a `div` (composed inside another section). */
  as?: "section" | "div";
  /** Optional extra class for the wrapper. */
  className?: string;
};

/**
 * Reusable marquee outro. Contains ONLY the marquee experience — the
 * former "Say Hello" label has been removed. Compose it wherever needed
 * (e.g. as the outro of Services) instead of duplicating its markup.
 */
export default function MarqueeSection({
  as: Tag = "section",
  className = "",
}: MarqueeSectionProps) {
  return (
    <Tag
      id="marquee"
      aria-label="Operator.X marquee"
      className={`marquee-section${className ? ` ${className}` : ""}`}
    >
      <InfiniteTextMarquee
        text={MARQUEE_TEXT}
        link="#home"
        speed={26}
        tooltipText={TOOLTIP_TEXT}
        fontSize="clamp(2.6rem, 10vw, 8rem)"
        textColor="#ffffff"
        hoverColor="#ff8a3c"
        showTooltip={true}
      />
    </Tag>
  );
}
