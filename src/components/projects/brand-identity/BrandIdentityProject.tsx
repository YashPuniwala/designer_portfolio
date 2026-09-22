import type { BrandIdentityProject as BrandIdentityProjectType } from "@/data/projects";
import { BrandIdentityProcess } from "./BrandIdentityProcess";
import { BrandIdentityLogo } from "./BrandIdentityLogo";
import { BrandIdentityTypography } from "./BrandIdentityTypography";
import { BrandIdentityMockups } from "./BrandIdentityMockups";

interface BrandIdentityProjectProps {
  project: BrandIdentityProjectType;
}

export function BrandIdentityProject({ project }: BrandIdentityProjectProps) {
  return (
    <div className="cs-body">
      {/* ─── PROCESS ────────────────────────────────────────────────────────── */}
      <BrandIdentityProcess />

      {/* ─── LOGO ───────────────────────────────────────────────────────────── */}
      <BrandIdentityLogo logos={project.logos} />

      {/* ─── TYPOGRAPHY + COLOR ─────────────────────────────────────────────── */}
      <BrandIdentityTypography
        typography={project.typography}
        colors={project.colors}
      />

      {/* ─── MOCKUPS ────────────────────────────────────────────────────────── */}
      <BrandIdentityMockups />
    </div>
  );
}

export default BrandIdentityProject;
