import { Link } from "react-router-dom";
import { blogPosts } from "../../data";
import { ButtonLink } from "../ui/ButtonLink";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

const latestPosts = blogPosts.slice(0, 3);

export function BlogPreviewSection() {
  return (
    <section className="section about-blog-section">
      <div className="shell">
        <SectionHeading
          eyebrow="Latest perspectives"
          title="Ideas shaping our work."
          body="Field observations, founder reflections, and research-led thinking from the Drith Infra journey."
        />

        <div className="about-blog-grid">
          {latestPosts.map((post, index) => (
            <Reveal key={post.title} className="about-blog-card glass-panel" delay={index * 0.05}>
              <article>
                <div className="about-blog-card__image">
                  <img
                    src={post.image}
                    alt={post.alt}
                    width="1200"
                    height="760"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="about-blog-card__copy">
                  <p className="eyebrow">{post.category}</p>
                  <p className="about-blog-card__date">{post.date}</p>
                  <h3>
                    {post.href ? <Link to={post.href}>{post.title}</Link> : post.title}
                  </h3>
                  <p>{post.body}</p>
                  {post.href ? (
                    <ButtonLink to={post.href} variant="text">Read article</ButtonLink>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="about-blog-section__action">
          <ButtonLink to="/blogs" variant="secondary">View all blogs</ButtonLink>
        </div>
      </div>
    </section>
  );
}
