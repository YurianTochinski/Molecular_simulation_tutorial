// Render PDF slides page by page inside
//   <div class="slide-viewer" data-src="ja.pdf" data-src-en="en.pdf">.
// data-src is the Japanese (default) deck; data-src-en is optional and adds a language switch.
// pdf.js is loaded only on pages that contain a slide viewer.
(function () {
  const PDFJS_BASE = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/";
  const LANG_KEY = "slide-viewer-lang";
  const LANG_LABELS = { ja: "日本語", en: "English" };

  function loadPdfJs() {
    if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = PDFJS_BASE + "pdf.min.js";
      script.onload = () => {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_BASE + "pdf.worker.min.js";
        resolve(window.pdfjsLib);
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // The chosen language is remembered across pages; storage may be unavailable.
  function savedLang() {
    try {
      return localStorage.getItem(LANG_KEY);
    } catch (err) {
      return null;
    }
  }

  function saveLang(lang) {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch (err) {}
  }

  function setupViewer(root, pdfjsLib) {
    const sources = { ja: root.dataset.src };
    if (root.dataset.srcEn) sources.en = root.dataset.srcEn;
    const langs = Object.keys(sources);
    const langButtons = langs.length > 1
      ? `<span class="slide-lang">${langs.map((l) =>
          `<button type="button" data-lang="${l}">${LANG_LABELS[l]}</button>`).join("")}</span>`
      : "";

    root.innerHTML = `
      <div class="slide-stage"><canvas></canvas><p class="slide-error" hidden></p></div>
      <div class="slide-controls">
        <button type="button" data-act="prev" aria-label="前のスライド">&#9664;</button>
        <span class="slide-counter">- / -</span>
        <button type="button" data-act="next" aria-label="次のスライド">&#9654;</button>
        <button type="button" data-act="full" aria-label="全画面表示">&#x26F6;</button>
        ${langButtons}
      </div>`;
    root.tabIndex = 0;
    const stage = root.querySelector(".slide-stage");
    const canvas = root.querySelector("canvas");
    const error = root.querySelector(".slide-error");
    const counter = root.querySelector(".slide-counter");

    let pdf = null;
    let current = 1;
    let renderTask = null;
    let loadId = 0;

    async function render() {
      if (!pdf) return;
      const page = await pdf.getPage(current);
      const base = page.getViewport({ scale: 1 });
      // Fit the slide to the stage width (and height in fullscreen).
      let scale = stage.clientWidth / base.width;
      if (document.fullscreenElement === root) {
        scale = Math.min(scale, stage.clientHeight / base.height);
      }
      const ratio = window.devicePixelRatio || 1;
      const viewport = page.getViewport({ scale: scale * ratio });
      if (renderTask) renderTask.cancel();
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.style.width = `${viewport.width / ratio}px`;
      canvas.style.height = `${viewport.height / ratio}px`;
      renderTask = page.render({ canvasContext: canvas.getContext("2d"), viewport });
      try {
        await renderTask.promise;
      } catch (err) {
        if (err.name !== "RenderingCancelledException") throw err;
      }
      counter.textContent = `${current} / ${pdf.numPages}`;
    }

    async function load(lang) {
      const id = ++loadId;
      const src = sources[lang];
      root.querySelectorAll("[data-lang]").forEach((b) =>
        b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
      let doc;
      try {
        doc = await pdfjsLib.getDocument(src).promise;
      } catch (err) {
        if (id !== loadId) return;
        pdf = null;
        canvas.hidden = true;
        error.hidden = false;
        error.innerHTML = `スライドを読み込めませんでした。<a href="${src}" target="_blank" rel="noopener">PDFを直接開く</a>`;
        counter.textContent = "- / -";
        return;
      }
      // Ignore a load that finished after the user switched language again.
      if (id !== loadId) {
        doc.destroy();
        return;
      }
      if (pdf) pdf.destroy();
      pdf = doc;
      current = 1;
      canvas.hidden = false;
      error.hidden = true;
      render();
    }

    function go(delta) {
      if (!pdf) return;
      const next = Math.min(Math.max(current + delta, 1), pdf.numPages);
      if (next !== current) {
        current = next;
        render();
      }
    }

    root.addEventListener("click", (e) => {
      const button = e.target.closest("button");
      const act = button?.dataset.act;
      if (button?.dataset.lang) {
        saveLang(button.dataset.lang);
        load(button.dataset.lang);
      } else if (act === "prev") go(-1);
      else if (act === "next") go(1);
      else if (act === "full") {
        if (document.fullscreenElement) document.exitFullscreen();
        else root.requestFullscreen();
      } else if (e.target === canvas) {
        // Click on the left/right half of the slide to move back/forward.
        const rect = canvas.getBoundingClientRect();
        go(e.clientX - rect.left < rect.width / 2 ? -1 : 1);
      }
    });
    root.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") { go(-1); e.preventDefault(); }
      if (e.key === "ArrowRight") { go(1); e.preventDefault(); }
    });
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(render, 150);
    });
    document.addEventListener("fullscreenchange", render);

    const lang = savedLang();
    load(sources[lang] ? lang : "ja");
  }

  document.addEventListener("DOMContentLoaded", () => {
    const viewers = document.querySelectorAll(".slide-viewer[data-src]");
    if (viewers.length === 0) return;
    loadPdfJs().then((pdfjsLib) => viewers.forEach((v) => setupViewer(v, pdfjsLib)));
  });
})();
