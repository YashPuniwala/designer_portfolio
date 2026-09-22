import type { SocialMediaProject as SocialMediaProjectType } from "@/data/projects";
import { SocialMediaOverview } from "./SocialMediaOverview";
import { SocialMediaPosts } from "./SocialMediaPosts";
import { SocialMediaStories } from "./SocialMediaStories";

interface SocialMediaProjectProps {
  project: SocialMediaProjectType;
}

export function SocialMediaProject({ project }: SocialMediaProjectProps) {
  const posts = project.socialPosts ?? [];
  const stories = project.storiesReels ?? [];
  const overview = project.contentOverview;

  return (
    <div className="cs-body sm-body">
      {/* ─── CONTENT OVERVIEW ────────────────────────────────────────────────── */}
      <SocialMediaOverview overview={overview} />

      {/* ─── SELECTED POSTS ─────────────────────────────────────────────────── */}
      <SocialMediaPosts posts={posts} />

      {/* ─── STORIES & REELS ────────────────────────────────────────────────── */}
      <SocialMediaStories stories={stories} />
    </div>
  );
}

export default SocialMediaProject;
