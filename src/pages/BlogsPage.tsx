import { ContactCta } from "../components/sections/ContactCta";
import { Seo } from "../components/system/Seo";
import { ButtonLink } from "../components/ui/ButtonLink";
import { Reveal } from "../components/ui/Reveal";
import { blogPosts } from "../data";

export default function BlogsPage() {
  return (
    <>
      <Seo title="Blog" description="Compact field notes and founder reflections from Drith Infra." path="/blogs" />

      <section className="section blog-showcase-section">
        <div className="shell">
          <header className="blog-showcase-heading">
            <h1>Blog</h1>
          </header>

          <div className="blog-card-grid">
            {blogPosts.map((post, index) => (
              <Reveal key={post.title} className="blog-card glass-panel" delay={index * 0.06}>
                <div className="blog-card__image">
                  <img src={post.image} alt={post.alt} width="1600" height="1000" loading="lazy" decoding="async" />
                </div>
                <div className="blog-card__copy">
                  <p className="eyebrow">{post.category}</p>
                  <h2>{post.title}</h2>
                  <div className="blog-card__meta" aria-label="Blog metadata">
                    <span>{post.author}</span>
                    <span>{post.date}</span>
                    <span>{post.time}</span>
                    <span>{post.place}</span>
                  </div>
                  <p>{post.body}</p>
                  {post.href ? (
                    <ButtonLink to={post.href} variant="text">Read article</ButtonLink>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
