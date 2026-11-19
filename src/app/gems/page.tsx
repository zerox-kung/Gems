"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import gems from "../../../data/gems.json";

type SortOrder = "featured" | "price-asc" | "price-desc";

function getNumericPrice(price: string) {
  const amount = Number(price.replace(/[^\d.]/g, ""));
  return Number.isFinite(amount) && amount > 0 ? amount : null;
}

export default function GemsPage() {
  const [activeType, setActiveType] = useState("All stones");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("featured");
  const types = ["All stones", "Sapphire", "Emerald", "Ruby", "Other gems"];

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setSearch(searchInput), 250);
    return () => window.clearTimeout(timeoutId);
  }, [searchInput]);

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
  const sortedGems = [...filteredGems].sort((first, second) => {
    if (sortOrder === "featured") return first.id - second.id;

    const firstPrice = getNumericPrice(first.price);
    const secondPrice = getNumericPrice(second.price);
    if (firstPrice === null) return secondPrice === null ? first.id - second.id : 1;
    if (secondPrice === null) return -1;

    return sortOrder === "price-asc"
      ? firstPrice - secondPrice
      : secondPrice - firstPrice;
  });

  return (
    <main className="catalogPage">
      <section className="catalogHero">
        <div className="catalogHeroCopy reveal">
          <p className="eyebrow">The Gemora gallery</p>
          <h1>Stones with a point of view.</h1>
          <p>Explore natural gemstones selected for origin, character, and enduring beauty.</p>
        </div>
        <span className="catalogGem" aria-hidden="true" />
      </section>
      <section className="catalogToolbar">
        <label>
          <span>Search the archive</span>
          <input
            type="search"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Name, origin or colour"
          />
        </label>
        <div className="catalogControls">
          <div className="catalogTools" aria-label="Gemstone categories">
            {types.map((type) => (
              <button
                type="button"
                key={type}
                className={activeType === type ? "active" : ""}
                aria-pressed={activeType === type}
                onClick={() => setActiveType(type)}
              >
                {type}
              </button>
            ))}
          </div>
          <label className="sortControl">
            <span>Sort by</span>
            <select
              value={sortOrder}
              onChange={(event) => {
                const value = event.target.value;
                if (
                  value === "featured" ||
                  value === "price-asc" ||
                  value === "price-desc"
                ) {
                  setSortOrder(value);
                }
              }}
              aria-label="Sort gemstones"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to high</option>
              <option value="price-desc">Price: High to low</option>
            </select>
          </label>
        </div>
      </section>
      <section className="catalogResults">
        <p className="resultCount" aria-live="polite">
          {sortedGems.length} {sortedGems.length === 1 ? "stone" : "stones"} in the archive
        </p>
        <div className="catalogGrid">
          {sortedGems.map((gem) => (
            <Link className="card reveal" href={`/gems/${gem.id}`} key={gem.id}>
              <div className={`gemImage gem${gem.id}`} role="img" aria-label={gem.name}>
                <span>View stone ↗</span>
              </div>
              <div className="cardBody">
                <h3>{gem.name}</h3>
                <p>{gem.type} · {gem.origin}</p>
                <div className="cardMeta">
                  <span>{gem.carat}</span>
                  <strong>{gem.price}</strong>
                </div>
              </div>
            </Link>
          ))}
          {sortedGems.length === 0 && (
            <p className="emptyState">No stones match your search. Try another name, colour or origin.</p>
          )}
        </div>
      </section>
    </main>
  );
}
