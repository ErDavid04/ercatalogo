/* =========================================================
   ErCatálogo · main.js
   - Datos del catálogo (categorías → álbumes de Yupoo)
   - Filtros por deporte y por liga, buscador y ordenación
   - Estado sincronizado con la URL (?grupo=&categoria=&q=&orden=)
   ========================================================= */

// Datos de categorías con imágenes locales
// Campos: id, name, group ("futbol" | "otrosDeportes"), url, icon, img
// Opcional: keywords (términos extra para el buscador)
const categoriesData = [
    // ----- FÚTBOL -----
    {
        id: "worldcup",
        name: "World Cup 2026",
        group: "futbol",
        url: "https://1022669895.x.yupoo.com/categories/5070592",
        icon: "fas fa-earth-americas",
        img: "img/worldcup.png",
        keywords: "mundial 2026 selecciones fifa copa del mundo"
    },
    {
        id: "laliga",
        name: "La Liga",
        group: "futbol",
        url: "https://1022669895.x.yupoo.com/categories/3923254",
        icon: "fas fa-futbol",
        img: "img/laliga.png",
        keywords: "españa espana liga española real madrid barcelona atletico betis sevilla"
    },
    {
        id: "premier",
        name: "Premier League",
        group: "futbol",
        url: "https://1022669895.x.yupoo.com/categories/2777511",
        icon: "fas fa-futbol",
        img: "img/premier.png",
        keywords: "inglaterra liga inglesa manchester liverpool arsenal chelsea"
    },
    {
        id: "bundesliga",
        name: "Bundesliga",
        group: "futbol",
        url: "https://1022669895.x.yupoo.com/categories/3293731",
        icon: "fas fa-futbol",
        img: "img/bundesliga.png",
        keywords: "alemania liga alemana bayern dortmund"
    },
    {
        id: "ligue1",
        name: "Ligue 1",
        group: "futbol",
        url: "https://1022669895.x.yupoo.com/categories/3297315",
        icon: "fas fa-futbol",
        img: "img/ligue1.png",
        keywords: "francia liga francesa psg marsella"
    },
    {
        id: "seriea",
        name: "Serie A",
        group: "futbol",
        url: "https://1022669895.x.yupoo.com/categories/2777483",
        icon: "fas fa-futbol",
        img: "img/seriea.png",
        keywords: "italia liga italiana juventus milan inter roma napoli"
    },
    {
        id: "portugal",
        name: "Liga Portugal",
        group: "futbol",
        url: "https://1022669895.x.yupoo.com/categories/3289463",
        icon: "fas fa-futbol",
        img: "img/portugal.png",
        keywords: "portugal liga portuguesa benfica oporto porto sporting"
    },
    {
        id: "mls",
        name: "MLS",
        group: "futbol",
        url: "https://1022669895.x.yupoo.com/categories/4089028",
        icon: "fas fa-futbol",
        img: "img/mls.png",
        keywords: "estados unidos usa inter miami la galaxy"
    },
    {
        id: "shorts",
        name: "Shorts",
        group: "futbol",
        url: "https://879322886k.x.yupoo.com/albums?tab=gallery",
        icon: "fas fa-person-running",
        img: "img/shorts.png",
        keywords: "pantalon pantalones cortos"
    },
    {
        id: "chaquetas",
        name: "Chaquetas",
        group: "futbol",
        url: "https://xionghaishuangmian.x.yupoo.com/albums?tab=gallery",
        icon: "fas fa-shirt",
        img: "img/chaquetas.png",
        keywords: "chaqueta abrigo cortavientos"
    },
    {
        id: "conjuntos_manga_larga",
        name: "Conjuntos de manga larga",
        group: "futbol",
        url: "https://aosendi.x.yupoo.com/collections/789575",
        icon: "fas fa-shirt",
        img: "img/conjuntos-manga-larga.png",
        keywords: "chandal chándal entrenamiento"
    },
    {
        id: "conjuntos_manga_corta",
        name: "Conjuntos de manga corta",
        group: "futbol",
        url: "https://aosendi.x.yupoo.com/collections/3926493",
        icon: "fas fa-shirt",
        img: "img/conjuntos-manga-corta.png",
        keywords: "entrenamiento training"
    },

    // ----- OTROS DEPORTES -----
    {
        id: "nba",
        name: "NBA",
        group: "otrosDeportes",
        url: "https://pifajersey.x.yupoo.com/albums?tab=gallery",
        icon: "fas fa-basketball",
        img: "img/nba.png",
        keywords: "baloncesto basket lakers celtics warriors"
    },
    {
        id: "f1",
        name: "F1",
        group: "otrosDeportes",
        url: "https://www.yupoo.store/categories/44?isSubCate=true",
        icon: "fas fa-flag-checkered",
        img: "img/f1.png",
        keywords: "formula 1 fórmula uno ferrari red bull mercedes aston martin"
    },
    {
        id: "nfl",
        name: "NFL",
        group: "otrosDeportes",
        url: "https://www.yupoo.store/categories/726?isSubCate=true",
        icon: "fas fa-football",
        img: "img/nfl.png",
        keywords: "futbol americano fútbol americano super bowl"
    },
    {
        id: "mlb",
        name: "MLB",
        group: "otrosDeportes",
        url: "https://eryiqiuyi111.x.yupoo.com/albums?tab=gallery",
        icon: "fas fa-baseball",
        img: "img/mlb.png",
        keywords: "beisbol béisbol yankees dodgers"
    }
];

// Orden en que se muestran las colecciones
const filterOrder = [
    "worldcup",
    "laliga",
    "premier",
    "bundesliga",
    "ligue1",
    "seriea",
    "portugal",
    "mls",
    "shorts",
    "chaquetas",
    "conjuntos_manga_larga",
    "conjuntos_manga_corta",
    "nba",
    "f1",
    "nfl",
    "mlb"
];

// Grupos (secciones del catálogo)
const groupInfo = {
    futbol: {
        title: "Fútbol",
        subtitle: "Ligas, selecciones y ropa de entrenamiento",
        label: "Fútbol",
        styleClass: "section-futbol",
        icon: "fas fa-futbol"
    },
    otrosDeportes: {
        title: "Otros deportes",
        subtitle: "NBA · F1 · NFL · MLB",
        label: "Otros deportes",
        styleClass: "section-otrosDeportes",
        icon: "fas fa-trophy"
    }
};

let orderedCategories = [];

for (let key of filterOrder) {
    const found = categoriesData.find(c => c.id === key);
    if (found) orderedCategories.push(found);
}

categoriesData.forEach(cat => {
    if (!filterOrder.includes(cat.id)) {
        orderedCategories.push(cat);
    }
});

// ---------- Estado ----------
let activeFilter = "all";   // id de categoría o "all"
let activeGroup = "all";    // "all" | "futbol" | "otrosDeportes"
let searchQuery = "";

// ---------- Utilidades ----------
const $ = (sel, ctx = document) => ctx.querySelector(sel);

const normalize = (str) =>
    (str || "")
        .toString()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .trim();

const escapeHTML = (str) =>
    String(str).replace(/[&<>"']/g, ch => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[ch]);

// img/laliga.png → img/thumbs/laliga.webp (versión optimizada)
const thumbFor = (img) => img.replace(/^img\/(.+)\.(png|jpe?g)$/i, "img/thumbs/$1.webp");

const PLACEHOLDER_IMG =
    "data:image/svg+xml;charset=utf-8," +
    encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="#f1efea"/>' +
        '<path d="M150 120l-50 30 20 45 25-10v115h110V185l25 10 20-45-50-30c-8 18-26 28-50 28s-42-10-50-28z" fill="#d6d2c8"/></svg>'
    );

// ---------- Filtros por deporte (pestañas) ----------
function renderGroupTabs() {
    const container = $("#groupTabs");
    if (!container) return;

    const tabs = [
        { id: "all", label: "Todo", count: orderedCategories.length },
        ...Object.keys(groupInfo).map(g => ({
            id: g,
            label: groupInfo[g].label,
            count: orderedCategories.filter(c => c.group === g).length
        }))
    ];

    container.innerHTML = tabs.map(t => `
        <button type="button" role="tab" class="group-tab ${activeGroup === t.id ? "active" : ""}"
            aria-selected="${activeGroup === t.id}" data-group="${t.id}">
            ${t.label} <span class="group-tab-count">${t.count}</span>
        </button>
    `).join("");

    container.querySelectorAll(".group-tab").forEach(btn => {
        btn.addEventListener("click", () => {
            activeGroup = btn.dataset.group;
            const current = orderedCategories.find(c => c.id === activeFilter);
            if (current && activeGroup !== "all" && current.group !== activeGroup) {
                activeFilter = "all";
            }
            update();
        });
    });
}

// ---------- Filtrado y búsqueda ----------
function getFilteredItems() {
    let items = orderedCategories;

    if (activeGroup !== "all") {
        items = items.filter(cat => cat.group === activeGroup);
    }

    if (activeFilter !== "all") {
        items = items.filter(cat => cat.id === activeFilter);
    }

    const q = normalize(searchQuery);
    if (q) {
        const terms = q.split(/\s+/);
        items = items.filter(cat => {
            const haystack = normalize(
                `${cat.name} ${cat.keywords || ""} ${groupInfo[cat.group] ? groupInfo[cat.group].label : ""}`
            );
            return terms.every(t => haystack.includes(t));
        });
    }

    return items;
}

// ---------- Render del catálogo (secciones Fútbol / Otros deportes) ----------
function renderSectionsByFilter() {
    const sectionsContainer = document.getElementById("sectionsContainer");
    if (!sectionsContainer) return;

    const filteredItems = getFilteredItems();
    renderResultCount(filteredItems.length);

    if (filteredItems.length === 0) {
        sectionsContainer.innerHTML = `
            <div class="empty-message">
                <i class="fas fa-magnifying-glass" aria-hidden="true"></i>
                <h3>No hay colecciones con este filtro</h3>
                <p>${searchQuery
                ? `No encontramos resultados para «${escapeHTML(searchQuery)}». Prueba con otra liga o deporte.`
                : "Prueba a cambiar el deporte o la liga seleccionada."}</p>
                <button type="button" class="btn btn-dark" id="resetFilters">Ver todo el catálogo</button>
            </div>
        `;
        $("#resetFilters").addEventListener("click", resetFilters);
        return;
    }

    const groups = {};
    Object.keys(groupInfo).forEach(g => (groups[g] = []));
    filteredItems.forEach(item => {
        if (groups[item.group]) groups[item.group].push(item);
    });

    let html = "";

    for (let [groupKey, items] of Object.entries(groups)) {
        if (items.length === 0) continue;
        const info = groupInfo[groupKey];

        html += `
            <section class="category-section ${info.styleClass}" data-group="${groupKey}"
                aria-labelledby="title-${groupKey}">
                <div class="section-header">
                    <h3 id="title-${groupKey}">
                        <span class="section-header-icon"><i class="${info.icon}" aria-hidden="true"></i></span>
                        ${info.title}
                    </h3>
                    <span class="section-header-meta">${info.subtitle} · ${items.length} ${items.length === 1 ? "colección" : "colecciones"}</span>
                </div>
                <div class="catalog-grid" id="grid-${groupKey}">
                    ${renderCardsHTML(items)}
                </div>
            </section>
        `;
    }

    sectionsContainer.innerHTML = html;
    attachCardEvents(sectionsContainer);
}

function renderCardsHTML(items) {
    return items.map((cat, i) => {
        const groupLabel = groupInfo[cat.group] ? groupInfo[cat.group].label : "";
        const name = escapeHTML(cat.name);

        return `
            <a class="card" href="${cat.url}" target="_blank" rel="noopener noreferrer"
                data-url="${cat.url}" data-name="${name}" style="--i:${i}"
                aria-label="${name}: ver colección completa en Yupoo (se abre en una pestaña nueva)">
                <div class="card-img-wrapper">
                    <picture>
                        <source srcset="${thumbFor(cat.img)}" type="image/webp">
                        <img src="${cat.img}" alt="" loading="lazy" decoding="async">
                    </picture>
                </div>
                <div class="card-info">
                    <span class="card-category">${groupLabel}</span>
                    <span class="card-title">${name}</span>
                    <span class="card-desc">
                        <span class="card-desc-text">Ver colección <i class="fas fa-arrow-right" aria-hidden="true"></i></span>
                        <span class="badge-link"><i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i> Yupoo</span>
                    </span>
                </div>
            </a>
        `;
    }).join("");
}

// Las tarjetas son enlaces reales (<a>): funcionan con teclado, clic central, etc.
// Aquí solo se gestiona la imagen de reserva si una imagen no carga.
function attachCardEvents(container) {
    container.querySelectorAll(".card img").forEach(img => {
        img.addEventListener("error", function onError() {
            img.removeEventListener("error", onError);
            const source = img.parentElement.querySelector("source");
            if (source) {
                // Si falla la versión optimizada, probar con la imagen original
                source.remove();
                img.src = img.getAttribute("src");
                img.addEventListener("error", () => { img.src = PLACEHOLDER_IMG; }, { once: true });
            } else {
                img.src = PLACEHOLDER_IMG;
            }
        });
    });
}

function renderResultCount(n) {
    const el = $("#resultCount");
    if (!el) return;
    const filtersOn = activeFilter !== "all" || activeGroup !== "all" || searchQuery;
    el.innerHTML = filtersOn && n > 0
        ? `<span>${n} ${n === 1 ? "colección" : "colecciones"}</span>
           <button type="button" class="clear-filters" id="clearFilters"><i class="fas fa-xmark" aria-hidden="true"></i> Quitar filtros</button>`
        : "";
    const btn = $("#clearFilters");
    if (btn) btn.addEventListener("click", resetFilters);
}

function resetFilters() {
    activeFilter = "all";
    activeGroup = "all";
    searchQuery = "";
    syncSearchInputs();
    update();
}

// ---------- URL ----------
function readStateFromURL() {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("categoria");
    const grp = params.get("grupo");
    const q = params.get("q");

    if (cat && orderedCategories.some(c => c.id === cat)) activeFilter = cat;
    if (grp && groupInfo[grp]) activeGroup = grp;
    if (q) searchQuery = q;
}

function writeStateToURL() {
    const params = new URLSearchParams();
    if (activeGroup !== "all") params.set("grupo", activeGroup);
    if (activeFilter !== "all") params.set("categoria", activeFilter);
    if (searchQuery) params.set("q", searchQuery);
    const qs = params.toString();
    const url = window.location.pathname + (qs ? "?" + qs : "") + window.location.hash;
    try { history.replaceState(null, "", url); } catch (e) { /* file:// u otros contextos */ }
}

// ---------- Buscadores (hero + catálogo) ----------
function syncSearchInputs(except) {
    ["#heroSearch"].forEach(sel => {
        const input = $(sel);
        if (input && input !== except) input.value = searchQuery;
    });
}

function setupSearch() {
    const heroInput = $("#heroSearch");
    const heroForm = $("#heroSearchForm");
    let timer;

    const onInput = (e) => {
        clearTimeout(timer);
        const input = e.target;
        timer = setTimeout(() => {
            searchQuery = input.value.trim();
            syncSearchInputs(input);
            update();
        }, 120);
    };

    [heroInput].forEach(input => {
        if (!input) return;
        input.addEventListener("input", onInput);
        input.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && input.value) {
                input.value = "";
                searchQuery = "";
                syncSearchInputs();
                update();
            }
        });
    });

    if (heroForm) {
        heroForm.addEventListener("submit", (e) => {
            e.preventDefault();
            searchQuery = heroInput.value.trim();
            syncSearchInputs();
            update();
            $("#catalogo").scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
        });
    }

    // Atajo "/" para enfocar el buscador
    document.addEventListener("keydown", (e) => {
        const tag = (e.target.tagName || "").toLowerCase();
        if (e.key === "/" && !["input", "textarea", "select"].includes(tag) && !e.target.isContentEditable) {
            e.preventDefault();
            heroInput && heroInput.focus();
        }
    });
}

// ---------- Footer: accesos directos a categorías ----------
function renderFooterCategories() {
    const lists = { futbol: $("#footerFutbol"), otrosDeportes: $("#footerOtros") };

    Object.entries(lists).forEach(([group, ul]) => {
        if (!ul) return;
        ul.innerHTML = orderedCategories
            .filter(c => c.group === group)
            .map(c => `<li><a href="?categoria=${c.id}#catalogo" data-cat="${c.id}">${escapeHTML(c.name)}</a></li>`)
            .join("");
    });

    document.querySelectorAll(".footer [data-cat]").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            activeFilter = link.dataset.cat;
            activeGroup = "all";
            searchQuery = "";
            syncSearchInputs();
            update();
            $("#catalogo").scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
        });
    });
}

// ---------- Cabecera: menú móvil y sombra al hacer scroll ----------
function setupHeader() {
    const header = $(".header");
    const toggle = $("#menuToggle");
    const nav = $("#mainNav");

    const closeMenu = () => {
        document.body.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menú");
    };

    if (toggle && nav) {
        toggle.addEventListener("click", () => {
            const open = !document.body.classList.contains("menu-open");
            document.body.classList.toggle("menu-open", open);
            toggle.setAttribute("aria-expanded", String(open));
            toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
        });
        nav.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));
        document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
        window.matchMedia("(min-width: 960px)").addEventListener("change", (e) => { if (e.matches) closeMenu(); });
    }

    // "Volver arriba" y el logo: subir al inicio real de la página.
    // (#top apunta a la cabecera, que es sticky, por eso el ancla no subía del todo)
    document.querySelectorAll('a[href="#top"]').forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            closeMenu();
            window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
            try { history.replaceState(null, "", window.location.pathname + window.location.search); } catch (err) { /* noop */ }
        });
    });

    const onScroll = () => header && header.classList.toggle("is-scrolled", window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
}

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------- Ciclo principal ----------
function update() {
    renderGroupTabs();
    renderSectionsByFilter();
    writeStateToURL();
}

function init() {
    readStateFromURL();
    const factCount = $("#factCount");
    if (factCount) factCount.textContent = orderedCategories.length;

    setupHeader();
    setupSearch();
    syncSearchInputs();
    renderFooterCategories();
    update();
}

init();
