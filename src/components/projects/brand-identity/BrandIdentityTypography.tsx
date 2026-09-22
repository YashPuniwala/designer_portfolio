import type { ColorSwatch, Typeface } from "@/data/projects";

interface BrandIdentityTypographyProps {
  typography: Typeface[];
  colors: ColorSwatch[];
}

export function BrandIdentityTypography({
  typography,
  colors,
}: BrandIdentityTypographyProps) {
  return (
    <section className="cs-section cs-typecolor" aria-label="Typography and Color">
      <div className="cs-type">
        <p className="cs-label">Typography</p>
        <div className="cs-type-list">
          {typography.map((t) => (
            <div key={t.name} className="cs-type-row">
              <span className="cs-type-specimen">{t.specimen}</span>
              <div className="cs-type-meta">
                <span className="cs-type-name">{t.name}</span>
                <span className="cs-type-role">
                  {t.role}
                  {t.weight ? ` • ${t.weight}` : ""}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="cs-color">
        <p className="cs-label">Color</p>
        <div className="cs-swatches">
          {colors.map((c) => (
            <div key={c.hex} className="cs-swatch">
              <span className="cs-swatch-chip" style={{ background: c.hex }} />
              <span className="cs-swatch-hex">{c.hex}</span>
              <span className="cs-swatch-name">{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BrandIdentityTypography;
