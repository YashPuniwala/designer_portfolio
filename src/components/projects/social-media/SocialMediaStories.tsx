import type { SocialStory } from "@/data/projects";
import { Reveal } from "../shared/Reveal";
import { ProjectImg } from "../shared/ProjectImg";

interface SocialMediaStoriesProps {
  stories: SocialStory[];
}

export function SocialMediaStories({ stories }: SocialMediaStoriesProps) {
  if (!stories || stories.length === 0) return null;

  return (
    <section className="cs-section sm-stories" aria-label="Stories and reels">
      <p className="cs-label">Stories &amp; Reels</p>
      <h2 className="cs-phrase">Stories in motion.</h2>
      <div className="sm-stories-row">
        {stories.map((story, i) => (
          <Reveal key={`${story.src}-${i}`} className="sm-story">
            <span className="sm-story-frame">
              <ProjectImg image={story} />
              {story.isVideo && (
                <span className="sm-play" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5" opacity="0.9" />
                    <path d="M10 8.5L15.5 12L10 15.5V8.5Z" fill="currentColor" />
                  </svg>
                </span>
              )}
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default SocialMediaStories;
