/* Synthesis — vanilla JS, no build step.
   Edit the ARTICLES list below to publish new work. */

const EDITOR_EMAIL = "editors@example.org"; // <-- change this

// Each article: id must be unique. contentHtml can be plain HTML (keep it simple).
const ARTICLES = [
  {
    id: "dialectics-and-science-001",
    title: "Dialectical Materialism as a Method of Scientific Inquiry",
    authors: ["Editorial Collective"],
    date: "2026-01-01",
    tags: ["dialectical-materialism", "method", "philosophy-of-science"],
    abstract:
      "A short orientation on contradiction, process, and the unity of theory and practice—without turning dialectics into a slogan.",
    contentHtml: `
      <p>
        Dialectical materialism is not a decorative “worldview.” It is a method for grasping
        motion, contradiction, and development in nature and society. The test of the method
        is whether it helps us explain and predict real processes—and intervene effectively.
      </p>
      <h2>Three working theses</h2>
      <ol>
        <li><strong>Processes, not things:</strong> treat entities as stabilized moments of a changing whole.</li>
        <li><strong>Contradiction, not equilibrium:</strong> locate the tensions that drive transformation.</li>
        <li><strong>Practice as criterion:</strong> theory must be checked against collective activity and results.</li>
      </ol>
      <p>
        This journal exists to publish work that takes those theses seriously in the natural sciences
        and in revolutionary strategy.
      </p>
      <h2>Suggested citation</h2>
      <pre><code>Synthesis Editorial Collective (2026). Dialectical Materialism as a Method of Scientific Inquiry.
Synthesis: Nature, History, and Revolution.</code></pre>
    `
  },
  {
    id: "ecology-contradiction-002",
    title: "Contradiction in Ecology: Metabolism, Limits, and Historical Development",
    authors: ["A. Researcher"],
    date: "2025-11-15",
    tags: ["ecology", "metabolism", "history"],
    abstract:
      "How ecological systems develop through opposing tendencies—growth and constraint, stability and disruption—under specific historical conditions.",
    contentHtml: `
      <p>
        Ecology is often taught as “balance,” but real systems are shaped by conflict among
        processes: competition and cooperation, accumulation and depletion, disturbance and recovery.
      </p>
      <p>
        A dialectical approach asks: what are the dominant contradictions in a given ecosystem,
        and how do they shift with climate, land use, and class society’s metabolism with nature?
      </p>
      <h2>Notes</h2>
      <ul>
        <li>Add your figures as images (PNG/JPG) stored in the repo, and reference them with <code>&lt;img&gt;</code>.</li>
        <li>If you want footnotes, keep it simple with numbered endnotes.</li>
      </ul>
    `
  },
  {
    id: "revolutionary-science-003",
    title: "The Science of Revolution: Hypotheses, Organization, and Mass Practice",
    authors: ["C. Organizer", "D. Analyst"],
    date: "2025-08-01",
    tags: ["revolution", "strategy", "mass-line"],
    abstract:
      "Treating strategy as an empirical problem: what we can observe, test, and learn from struggle.",
    contentHtml: `
      <p>
        Revolutionary strategy is not a set of eternal formulas. It is a body of hypotheses
        tested in the laboratory of class struggle.
      </p>
      <h2>What we publish</h2>
      <ul>
        <li>Case studies (campaigns, strikes, mutual aid, anti-colonial struggles)</li>
        <li>Methodological notes (metrics, observation protocols, surveys, experiment design)</li>
        <li>Critical reviews (what worked, what failed, why)</li>
      </ul>
    `
  }
];

// ---------- App ----------
const $ = (sel) => document.querySelector(sel);

function parseDate(d) {
  // YYYY-MM-DD; fallback to original string
  const m = /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : null;
  return m ? new Date(m + "T00:00:00Z") : null;
}

function formatDate(d) {
  const dt = parseDate(d);
  if (!dt) return d;
  return dt.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
}

function uniq(arr) {
  return [...new Set(arr)];
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function sortByDateDesc(list) {
  return [...list].sort((a, b) => {
    const da = parseDate(a.date)?.getTime() ?? 0;
    const db = parseDate(b.date)?.getTime() ?? 0;
    return db - da;
  });
}

function articleUrl(a) {
  return `./?id=${encodeURIComponent(a.id)}`;
}

function renderArticleCard(a) {
  const authors = (a.authors || []).join(", ");
  const tags = (a.tags || []).map(t => `<span class="tag">#${escapeHtml(t)}</span>`).join("");
  return `
    <a class="article card" href="${articleUrl(a)}">
      <div class="article-title"><strong>${escapeHtml(a.title)}</strong></div>
      <div class="article-meta">
        <span>${escapeHtml(authors || "—")}</span>
        <span aria-hidden="true">·</span>
        <span>${escapeHtml(formatDate(a.date))}</span>
      </div>
      <p class="muted" style="margin:10px 0 0;">${escapeHtml(a.abstract || "")}</p>
      <div class="tags" aria-label="Tags">${tags}</div>
    </a>
  `;
}

function renderList(targetEl, list) {
  if (!targetEl) return;
  if (!list.length) {
    targetEl.innerHTML = `<div class="card muted">No matching articles.</div>`;
    return;
  }
  targetEl.innerHTML = list.map(renderArticleCard).join("");
}

function renderArticlePage(a) {
  const main = $("#main");
  const authors = (a.authors || []).join(", ");
  const tags = (a.tags || []).map(t => `<span class="tag">#${escapeHtml(t)}</span>`).join("");
  document.title = `${a.title} — Synthesis`;
  main.innerHTML = `
    <section class="article-page">
      <div class="container">
        <a class="button button-ghost" href="./" aria-label="Back to home">← Home</a>
        <h1>${escapeHtml(a.title)}</h1>
        <div class="byline">
          <span>${escapeHtml(authors || "—")}</span>
          <span aria-hidden="true"> · </span>
          <span>${escapeHtml(formatDate(a.date))}</span>
        </div>
        <div class="tags" style="margin-top:10px;">${tags}</div>

        <div class="card article-content" style="margin-top:16px;">
          ${a.contentHtml || ""}
        </div>

        <p class="muted" style="margin-top:16px;">
          <a href="./#submit">Submit your work</a> · <a href="./">Browse all articles</a>
        </p>
      </div>
    </section>
  `;
}

function buildTagOptions() {
  const sel = $("#tag");
  if (!sel) return;
  const tags = uniq(ARTICLES.flatMap(a => a.tags || [])).sort((a,b) => a.localeCompare(b));
  for (const t of tags) {
    const opt = document.createElement("option");
    opt.value = t;
    opt.textContent = `#${t}`;
    sel.appendChild(opt);
  }
}

function applyFilters() {
  const q = ($("#q")?.value || "").trim().toLowerCase();
  const tag = ($("#tag")?.value || "").trim();

  const matches = sortByDateDesc(ARTICLES).filter(a => {
    const hay = [
      a.title,
      (a.authors || []).join(" "),
      (a.tags || []).join(" "),
      a.abstract
    ].join(" ").toLowerCase();

    const okQ = !q || hay.includes(q);
    const okTag = !tag || (a.tags || []).includes(tag);
    return okQ && okTag;
  });

  // "Latest" = newest 6
  renderList($("#latestList"), matches.slice(0, 6));
  // "Archive" = all matches
  renderList($("#archiveList"), matches);
}

function initMailto() {
  const a = $("#mailtoLink");
  if (!a) return;
  const subject = encodeURIComponent("Synthesis submission");
  const body = encodeURIComponent(
`Title:
Author(s):
Date (YYYY-MM-DD):
Tags (3–6):
Abstract (2–5 sentences):
Link to draft (optional):

Paste your text below (or attach it):
`
  );
  a.href = `mailto:${EDITOR_EMAIL}?subject=${subject}&body=${body}`;
}

function init() {
  $("#year").textContent = String(new Date().getFullYear());
  initMailto();

  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  if (id) {
    const found = ARTICLES.find(a => a.id === id);
    if (found) {
      renderArticlePage(found);
    } else {
      // fallback
      location.href = "./";
    }
    return;
  }

  buildTagOptions();
  applyFilters();
  $("#q")?.addEventListener("input", applyFilters);
  $("#tag")?.addEventListener("change", applyFilters);
}

document.addEventListener("DOMContentLoaded", init);
