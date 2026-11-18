import gems from "../../data/gems.json";

export default function Home() {
  return (
    <main>
      <nav className="nav" aria-label="Main navigation">
        <a className="brand" href="#top"><span>G</span>emora</a>
        <div className="navLinks">
          <a href="#collection">Gallery</a>
          <a href="#story">Our story</a>
          <a href="#journal">Journal</a>
          <a className="button small" href="#contact">Enquire</a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div>
          <p className="eyebrow">The natural archive · Est. 1998</p>
          <h1>Find the <em>extraordinary</em> in every stone.</h1>
          <p className="heroCopy">A considered collection of rare gemstones, selected for their character, colour, and the stories held within them.</p>
          <a className="button" href="#collection">Explore the collection ↗</a>
        </div>
        <aside>
          <span className="goldLine" />
          <p>“A gem is not merely found.<br />It is recognised.”</p>
          <small>— The Gemora philosophy</small>
        </aside>
      </section>

      <section className="collection" id="collection">
        <p className="eyebrow">The Gemora gallery</p>
        <div className="headingRow">
          <h2>Stones with a point of view.</h2>
          <p>Explore our current selection of natural and responsibly sourced gems.</p>
        </div>
        <div className="grid">
          {gems.map((gem) => (
            <article className="card" key={gem.id}>
              <div className={`gemImage gem${gem.id}`} role="img" aria-label={gem.name} />
              <div className="cardBody">
                <h3>{gem.name}</h3>
                <p>{gem.type} · {gem.origin}</p>
                <strong>{gem.carat}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="story" id="story">
        <p className="eyebrow">A slower kind of luxury</p>
        <h2>Beauty, with a story worth telling.</h2>
        <p>Gemora began with a simple belief: the most beautiful things should be chosen with patience. We work with trusted partners who share our respect for the natural world.</p>
      </section>

      <section className="journal" id="journal">
        <p className="eyebrow">From the journal</p>
        <h2>Notes on the natural world.</h2>
      </section>

      <footer id="contact">
        <a className="brand" href="#top"><span>G</span>emora</a>
        <p>© 2026 Gemora. Naturally considered.</p>
        <a href="mailto:hello@gemora.example">hello@gemora.example</a>
      </footer>
    </main>
  );
}
