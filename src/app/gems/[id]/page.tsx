import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import gems from "../../../../data/gems.json";

export function generateStaticParams() {
  return gems.map((gem) => ({ id: String(gem.id) }));
}

export default function GemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<main className="detailPage" aria-busy="true"><p className="eyebrow">Loading stone details…</p></main>}>
      <GemDetails params={params} />
    </Suspense>
  );
}

async function GemDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const gem = gems.find((item) => item.id === Number(id));
  if (!gem) notFound();

  return (
    <main className="detailPage">
      <figure className="detailVisual reveal">
        <Image
          src={gem.image}
          alt={`${gem.name} illustrative collection photograph`}
          fill
          priority
          sizes="(max-width: 760px) 100vw, 48vw"
          className="editorialImage"
        />
        <figcaption className="detailMark">Illustrative collection photograph</figcaption>
      </figure>
      <section className="detailCopy reveal delayOne">
        <Link className="backLink" href="/gems">← Back to gallery</Link>
        <p className="eyebrow">{gem.type} · {gem.origin}</p>
        <h1>{gem.name}</h1>
        <p className="detailDescription">{gem.description}</p>
        <dl className="detailList">
          <div><dt>Weight</dt><dd>{gem.carat}</dd></div>
          <div><dt>Colour</dt><dd>{gem.colour}</dd></div>
          <div><dt>Cut</dt><dd>{gem.cut}</dd></div>
          <div><dt>Clarity</dt><dd>{gem.clarity}</dd></div>
          <div><dt>Dimensions</dt><dd>{gem.dimensions}</dd></div>
          <div><dt>Treatment</dt><dd>{gem.treatment}</dd></div>
          <div><dt>Origin</dt><dd>{gem.origin}</dd></div>
        </dl>
        <aside className="reportNote" aria-label="Sample report information">
          <p className="eyebrow">Sample record · {gem.sampleId}</p>
          <p>{gem.reportNote}</p>
        </aside>
        <Link className="button" href={`/contact?gem=${encodeURIComponent(gem.name)}`}>Enquire about this stone ↗</Link>
      </section>
    </main>
  );
}
