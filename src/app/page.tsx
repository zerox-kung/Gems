import Link from "next/link";
import gems from "../../data/gems.json";

export default function Home() {
  return (
    <main>
      <section className="hero" id="top">
        <div className="heroContent reveal">
          <p className="eyebrow">The natural archive · Est. 1998</p>
          <h1>Find the <em>extraordinary</em> in every stone.</h1>
          <p className="heroCopy">A considered collection of rare gemstones, selected for their character, colour, and the stories held within them.</p>
          <Link className="button" href="/gems">Explore the collection <span>↗</span></Link>
        </div>
        <aside className="heroAside reveal delayOne">
          <span className="goldLine" />
          <p>“A gem is not merely found.<br />It is recognised.”</p>
          <small>— The Gemora philosophy</small>
        </aside>
      </section>

      <section className="introStrip">
        {[
          ["01", "Curated with intent", "Each stone is hand-selected for its natural personality."],
          ["02", "Origin matters", "Traceable sourcing and trusted partners, always."],
          ["03", "Made to last", "Independent certification and expert guidance included."],
        ].map(([number, title, copy]) => (
          <article key={number} className="feature">
            <strong>{number}</strong>
            <div><h3>{title}</h3><p>{copy}</p></div>
          </article>
        ))}
      </section>

      <section className="story" id="story">
        <div className="storyVisual reveal" aria-hidden="true"><span>Since 1998</span></div>
        <div className="storyCopy reveal delayOne">
          <p className="eyebrow">A slower kind of luxury</p>
          <h2>Beauty, with a story worth telling.</h2>
          <p>Gemora began with a simple belief: the most beautiful things should be chosen with patience. We work with trusted partners who share our respect for the natural world.</p>
          <Link className="textLink" href="/contact">Learn about our sourcing ↗</Link>
        </div>
      </section>

      <section className="featured">
        <div className="sectionHeading">
          <div><p className="eyebrow">Selected stones</p><h2>From the archive</h2></div>
          <Link className="textLink" href="/gems">View all gemstones ↗</Link>
        </div>
        <div className="grid">
          {gems.slice(0, 3).map((gem) => (
            <Link className="card reveal" href={`/gems/${gem.id}`} key={gem.id}>
              <div className={`gemImage gem${gem.id}`} role="img" aria-label={gem.name}>
                <span>View stone ↗</span>
              </div>
              <div className="cardBody">
                <h3>{gem.name}</h3>
                <p>{gem.type} · {gem.origin}</p>
                <strong>{gem.carat}</strong>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
