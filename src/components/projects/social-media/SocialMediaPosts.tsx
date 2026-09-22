import type { ProjectImage } from "@/data/projects";
import { Reveal } from "../shared/Reveal";
import { ProjectImg } from "../shared/ProjectImg";

interface SocialMediaPostsProps {
  posts: ProjectImage[];
}

export function SocialMediaPosts({ posts }: SocialMediaPostsProps) {
  return (
    <section className="cs-section sm-posts" aria-label="Selected social media posts">
      <p className="cs-label">Social Media Posts</p>
      <h2 className="cs-phrase">Selected Posts.</h2>
      <div className="sm-posts-grid">
        {posts.map((post, i) => (
          <Reveal key={`${post.src}-${i}`} className="sm-post">
            <ProjectImg image={post} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default SocialMediaPosts;
