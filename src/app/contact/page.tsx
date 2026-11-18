export default function ContactPage() {
  return (
    <main className="contactPage">
      <section className="contactIntro reveal">
        <p className="eyebrow">Begin your search</p>
        <h1>Looking for something <em>specific?</em></h1>
        <p>Tell us what you are drawn to. We will look through our private archive and find the stone that feels like yours.</p>
      </section>
      <form className="contactForm reveal delayOne" action="mailto:hello@gemora.example" method="post" encType="text/plain">
        <label>Name<input name="name" required placeholder="Your name" /></label>
        <label>Email<input name="email" type="email" required placeholder="you@example.com" /></label>
        <label>What are you looking for?<textarea name="message" required rows={5} placeholder="Stone, origin, size or occasion..." /></label>
        <button className="button" type="submit">Start a conversation ↗</button>
      </form>
    </main>
  );
}
