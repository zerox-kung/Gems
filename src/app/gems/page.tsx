"use client";

import Link from "next/link";
import { useState } from "react";
import gems from "../../../data/gems.json";

export default function GemsPage() {
  const [activeType, setActiveType] = useState("All stones");
  const [search, setSearch] = useState("");
  const types = ["All stones", "Sapphire", "Emerald", "Ruby", "Other gems"];
  const filteredGems = gems.filter((gem) => {
    const matchesType =
      activeType === "All stones" ||
      (activeType === "Other gems" ? gem.type === "Other" : gem.type === activeType);
    const matchesSearch =
      search.trim() === "" ||
      `${gem.name} ${gem.type} ${gem.origin} ${gem.colour}`
        .toLowerCase()
        .includes(search.trim().toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <main className="catalogPage">
      <section className="catalogHero">
        <p className="eyebrow">The Gemora gallery</p>
        <h1>Stones with a point of view.</h1>
        <p>Explore natural gemstones selected for origin, character, and enduring beauty.</p>
      </section>
      <section className="catalogToolbar">
        <label>
          <span>Search the archive</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Name, origin or colour"
          />
        </label>
        <div className="catalogTools" aria-label="Gemstone categories">
          {types.map((type) => (
            <button
              type="button"
              key={type}
              className={activeType === type ? "active" : ""}
              onClick={() => setActiveType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </section>
      <section className="catalogGrid">
        {filteredGems.map((gem) => (
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
        {filteredGems.length === 0 && (
          <p className="emptyState">No stones match your search.</p>
        )}
      </section>
    </main>
  );
}
