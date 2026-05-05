// Datos de categorías con imágenes locales (shorts ahora está en grupo "futbol" y se han añadido Saudi League y Euro 2024)
const categoriesData = [
    // ----- FUTBOL (incluye shorts y las nuevas ligas) -----
    { id: "worldcup", name: "World Cup 2026", group: "futbol", url: "https://zxcvbnm123-jersey.x.yupoo.com/categories/5186861", icon: "fas fa-globe-americas", img: "img/worldcup.png" },
    { id: "laliga", name: "La Liga", group: "futbol", url: "https://zxcvbnm123-jersey.x.yupoo.com/categories/4905281", icon: "fas fa-flag-checkered", img: "img/laliga.png" },
    { id: "premier", name: "Premier League", group: "futbol", url: "https://zxcvbnm123-jersey.x.yupoo.com/categories/4905279", icon: "fas fa-crown", img: "img/premier.png" },
    { id: "bundesliga", name: "Bundesliga", group: "futbol", url: "https://zxcvbnm123-jersey.x.yupoo.com/categories/4905294", icon: "fas fa-futbol", img: "img/bundesliga.png" },
    { id: "ligue1", name: "Ligue 1", group: "futbol", url: "https://zxcvbnm123-jersey.x.yupoo.com/categories/4905282", icon: "fas fa-wine-bottle", img: "img/ligue1.png" },
    { id: "seriea", name: "Serie A", group: "futbol", url: "https://zxcvbnm123-jersey.x.yupoo.com/categories/4905290", icon: "fas fa-italy-flag", img: "img/seriea.png" },
    { id: "portugal", name: "Liga Portugal", group: "futbol", url: "https://zxcvbnm123-jersey.x.yupoo.com/categories/4905351", icon: "fas fa-champagne-glasses", img: "img/portugal.png" },
    { id: "mls", name: "MLS", group: "futbol", url: "https://zxcvbnm123-jersey.x.yupoo.com/categories/4905300", icon: "fas fa-baseball-ball", img: "img/mls.png" },
    { id: "kingsleague", name: "Kings League", group: "futbol", url: "https://zxcvbnm123-jersey.x.yupoo.com/categories/4906905", icon: "fas fa-chess-king", img: "img/kingsleague.png" },
    // NUEVAS LIGAS AÑADIDAS AQUÍ
    { id: "saudi", name: "Saudi Professional League", group: "futbol", url: "https://zxcvbnm123-jersey.x.yupoo.com/categories/4905949", icon: "fas fa-crown", img: "img/saudi.png" },
    { id: "euro2024", name: "UEFA Euro 2024", group: "futbol", url: "https://zxcvbnm123-jersey.x.yupoo.com/categories/4905956", icon: "fas fa-trophy", img: "img/euro2024.png" },
    { id: "shorts", name: "Shorts", group: "futbol", url: "https://zxcvbnm123-jersey.x.yupoo.com/categories/4905340", icon: "fas fa-tshirt", img: "img/shorts.png" },
    // ----- OTROS DEPORTES -----
    { id: "nba", name: "NBA", group: "otrosDeportes", url: "https://zxcvbnm123-jersey.x.yupoo.com/categories/4905338", icon: "fas fa-basketball-ball", img: "img/nba.png" },
    { id: "f1", name: "F1", group: "otrosDeportes", url: "https://zxcvbnm123-jersey.x.yupoo.com/categories/4905695", icon: "fas fa-car", img: "img/f1.png" },
    { id: "nfl", name: "NFL", group: "otrosDeportes", url: "https://zxcvbnm123-jersey.x.yupoo.com/categories/4906877", icon: "fas fa-football-ball", img: "img/nfl.png" }
];

// Orden de filtros (botones) - Incluyo las nuevas ligas en el orden deseado
const filterOrder = [
    "worldcup", "laliga", "premier", "bundesliga", "ligue1", "seriea", "portugal", "mls", "kingsleague",
    "saudi", "euro2024", // <-- Nuevas ligas añadidas aquí
    "shorts",
    "nba", "f1", "nfl"
];

let orderedCategories = [];
for (let key of filterOrder) {
    const found = categoriesData.find(c => c.id === key);
    if (found) orderedCategories.push(found);
}
categoriesData.forEach(cat => {
    if (!filterOrder.includes(cat.id)) orderedCategories.push(cat);
});

let activeFilter = "all";

// Render botones de filtro
function renderFilterButtons() {
    const container = document.getElementById("filterButtonsContainer");
    if (!container) return;
    let buttonsHtml = `<button class="filter-btn ${activeFilter === 'all' ? 'active' : ''}" data-filter="all"><i class="fas fa-layer-group"></i> Todas</button>`;
    orderedCategories.forEach(cat => {
        const isActive = activeFilter === cat.id;
        buttonsHtml += `
            <button class="filter-btn ${isActive ? 'active' : ''}" data-filter="${cat.id}">
                <i class="${cat.icon}"></i> ${cat.name}
            </button>
        `;
    });
    container.innerHTML = buttonsHtml;
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filterValue = btn.getAttribute('data-filter');
            if (filterValue) {
                activeFilter = filterValue;
                renderFilterButtons();
                renderSectionsByFilter();
            }
        });
    });
}

function getFilteredItems() {
    if (activeFilter === "all") return orderedCategories;
    const found = orderedCategories.find(cat => cat.id === activeFilter);
    return found ? [found] : [];
}

// Renderizar secciones (solo Fútbol y Otros Deportes)
function renderSectionsByFilter() {
    const sectionsContainer = document.getElementById("sectionsContainer");
    if (!sectionsContainer) return;
    const filteredItems = getFilteredItems();
    if (filteredItems.length === 0) {
        sectionsContainer.innerHTML = `<div class="empty-message"><i class="fas fa-search-minus"></i> No hay categorías con este filtro.</div>`;
        return;
    }

    const groups = {
        futbol: [],
        otrosDeportes: []
    };
    filteredItems.forEach(item => {
        if (item.group === "futbol") groups.futbol.push(item);
        else if (item.group === "otrosDeportes") groups.otrosDeportes.push(item);
    });

    const groupTitles = {
        futbol: { title: "⚽ Fútbol · Camisetas oficiales", styleClass: "section-futbol", colorAccent: "#1e5a7d" },
        otrosDeportes: { title: "🏀 Otros Deportes · NBA · F1 · NFL", styleClass: "section-otrosDeportes", colorAccent: "#d97706" }
    };

    let html = '';
    for (let [groupKey, items] of Object.entries(groups)) {
        if (items.length === 0) continue;
        const info = groupTitles[groupKey];
        html += `
            <div class="category-section ${info.styleClass}" data-group="${groupKey}">
                <div class="section-header" style="border-bottom-color: ${info.colorAccent};">${info.title}</div>
                <div class="catalog-grid" id="grid-${groupKey}"></div>
            </div>
        `;
    }
    sectionsContainer.innerHTML = html;

    for (let [groupKey, items] of Object.entries(groups)) {
        const gridContainer = document.getElementById(`grid-${groupKey}`);
        if (gridContainer && items.length) {
            gridContainer.innerHTML = renderCardsHTML(items);
            attachCardEvents(gridContainer);
        }
    }
}

function renderCardsHTML(items) {
    return items.map(cat => {
        let groupLabel = cat.group === 'futbol' ? '⚽ Fútbol' : '🏆 Deportes';
        return `
            <div class="card" data-url="${cat.url}" data-name="${cat.name}">
                <div class="card-img-wrapper">
                    <img src="${cat.img}" alt="${cat.name}" onerror="this.src='https://placehold.co/400x300/e2e8f0/94a3b8?text=Camiseta'">
                </div>
                <div class="card-info">
                    <div class="card-category">
                        <i class="${cat.icon}"></i> ${groupLabel}
                    </div>
                    <div class="card-title">${cat.name}</div>
                    <div class="card-desc">
                        <span>Ver colección completa</span>
                        <span class="badge-link"><i class="fas fa-external-link-alt"></i> Yupoo</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function attachCardEvents(container) {
    const cards = container.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            const url = card.getAttribute('data-url');
            if (url) window.open(url, '_blank', 'noopener,noreferrer');
        });
    });
}

function init() {
    renderFilterButtons();
    renderSectionsByFilter();
}

init();