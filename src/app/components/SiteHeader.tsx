import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="siteHeader">
      <Link className="brand" href="/" aria-label="Gemora home">
        <span>G</span>emora
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/gems">Gallery</Link>
        <Link href="/#story">Our story</Link>
        <Link href="/contact" className="navButton">Contact us</Link>
      </nav>
    </header>
  );
}
