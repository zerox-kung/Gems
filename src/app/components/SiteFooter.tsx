import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="siteFooter">
      <Link className="brand" href="/">
        <span>G</span>emora
      </Link>
      <p>Rare stones, thoughtfully sourced.</p>
      <Link href="/contact">Start a conversation ↗</Link>
    </footer>
  );
}
