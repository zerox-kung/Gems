import Image from "next/image";
import Link from "next/link";
import gems from "../../data/gems.json";

export default function Home() {
  return (
    <main>
      <section className="hero" id="top">
        <div className="heroContent reveal">
          <p className="eyebrow">Gemora · A small gemstone archive</p>
          <h1>For the stones you <em>remember.</em></h1>
          <p className="heroCopy">Colour, cut, origin, and the details that make a stone itself. Start with six pieces in our first collection.</p>
          <Link className="button" href="/gems">Browse the collection <span>↗</span></Link>
        </div>
        <figure className="heroFigure reveal delayOne">
          <div className="heroImageFrame">
            <Image
              src="/images/seafoam-tourmaline.jpg"
              alt="Blue gemstones set in jewellery on a green leaf"
              fill
              priority
              sizes="(max-width: 760px) 100vw, 48vw"
              className="editorialImage"
            />
          </div>
          <figcaption><span>Collection study</span><span>01 / 06</span></figcaption>
        </figure>
      </section>

      <section className="introStrip">
        {[
          ["01", "Six stones to start", "A compact collection exploring colour and cut."],
          ["02", "Details that matter", "Weight, dimensions and treatment notes in one place."],
          ["03", "Room to ask", "Use the enquiry form to ask about a particular stone."],
        ].map(([number, title, copy]) => (
          <article key={number} className="feature">
            <strong>{number}</strong>
            <div><h3>{title}</h3><p>{copy}</p></div>
          </article>
        ))}
      </section>

      <section className="story" id="story">
        <figure className="storyVisual reveal">
          <Image
            src="/images/midnight-sapphire.jpg"
            alt="Gold jewellery arranged on pale stones in natural light"
            fill
            sizes="(max-width: 760px) 100vw, 45vw"
            className="editorialImage"
          />
          <figcaption>Light, texture, and a closer look</figcaption>
        </figure>
        <div className="storyCopy reveal delayOne">
          <p className="eyebrow">A note on the collection</p>
          <h2>Good stones invite a closer look.</h2>
          <p>Gemora is a simulated gemstone storefront. This first collection is a place to explore how colour, cut and origin shape a stone—and how a product page can be useful without pretending sample details are a real appraisal.</p>
          <Link className="textLink" href="/contact">Ask us about a stone ↗</Link>
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
              <div className="gemImage">
                <Image
                  src={gem.image}
                  alt={`${gem.name} illustrative collection photograph`}
                  fill
                  sizes="(max-width: 600px) 90vw, (max-width: 900px) 45vw, 28vw"
                  className="editorialImage"
                />
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
