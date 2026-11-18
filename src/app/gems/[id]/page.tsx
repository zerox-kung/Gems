import Link from "next/link";
import { notFound } from "next/navigation";
import gems from "../../../../data/gems.json";

export function generateStaticParams() {
  return gems.map((gem) => ({ id: String(gem.id) }));
}

export default async function GemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const gem = gems.find((item) => item.id === Number(id));
  if (!gem) notFound();

  return (
    <main className="detailPage">
      <div className={`detailVisual gem${gem.id} reveal`}>
        <span className="detailMark">Natural gemstone</span>
      </div>
      <section className="detailCopy reveal delayOne">
        <Link className="backLink" href="/gems">← Back to gallery</Link>
        <p className="eyebrow">{gem.type} · {gem.origin}</p>
        <h1>{gem.name}</h1>
        <p className="detailDescription">{gem.description}</p>
        <dl className="detailList">
          <div><dt>Weight</dt><dd>{gem.carat}</dd></div>
          <div><dt>Colour</dt><dd>{gem.colour}</dd></div>
          <div><dt>Origin</dt><dd>{gem.origin}</dd></div>
          <div><dt>Availability</dt><dd>Private viewing</dd></div>
        </dl>
        <Link className="button" href={`/contact?gem=${encodeURIComponent(gem.name)}`}>Enquire about this stone ↗</Link>
      </section>
    </main>
  );
}
