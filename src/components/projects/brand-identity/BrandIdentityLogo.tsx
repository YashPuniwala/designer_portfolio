import type { ProjectImage } from "@/data/projects";
import { Reveal } from "../shared/Reveal";
import { ProjectImg } from "../shared/ProjectImg";

interface BrandIdentityLogoProps {
  logos: ProjectImage[];
}

export function BrandIdentityLogo({ logos }: BrandIdentityLogoProps) {
  return (
    <section className="cs-section" aria-label="Logo">
      <p className="cs-label">Logo</p>
      <div className="cs-logos">
        {logos.map((logo, i) => (
          <Reveal key={i} className="cs-logo-item">
            <ProjectImg image={logo} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default BrandIdentityLogo;
