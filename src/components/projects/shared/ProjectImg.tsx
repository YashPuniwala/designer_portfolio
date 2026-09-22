import type { ProjectImage } from "@/data/projects";

interface ProjectImgProps {
  image: ProjectImage;
  className?: string;
}

export function ProjectImg({ image, className = "" }: ProjectImgProps) {
  return (
    <img src={image.src} alt={image.alt} loading="lazy" className={className} />
  );
}

export default ProjectImg;
