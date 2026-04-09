/**
 * Create a table from a REST API response (optionally enhanced with DataTables)
 */
async function createTableFromAPI(config) {
    const {
        url,
        tableId,
        columns,
        useDataTables = false,
        dataTableOptions = {}
    } = config;

    try {
        const data = await fetchData(url);

        if (!Array.isArray(data) || data.length === 0) {
            console.warn("No data returned from API");
            return;
        }

        const cols = columns || extractColumns(data);

        buildTable(tableId, cols, data);

        // Enhance with DataTables if requested
        if (useDataTables) {
            await ensureDataTablesLoaded();
            initializeDataTable(tableId, dataTableOptions);
        }

    } catch (error) {
        console.error("Error creating table:", error);
    }
}

/**
 * Fetch data
 */
async function fetchData(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    return response.json();
}

/**
 * Extract columns dynamically
 */
function extractColumns(data) {
    const columnSet = new Set();

    data.forEach(item => {
        Object.keys(item).forEach(key => columnSet.add(key));
    });

    return Array.from(columnSet);
}

/**
 * Build HTML table
 */
function buildTable(tableId, columns, data) {
    const table = document.getElementById(tableId);

    if (!table) {
        throw new Error(`Table with ID "${tableId}" not found`);
    }

    table.innerHTML = "";

    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    const headerRow = document.createElement("tr");

    columns.forEach(col => {
        const th = document.createElement("th");
        th.textContent = formatHeader(col);
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);

    data.forEach(row => {
        const tr = document.createElement("tr");

        columns.forEach(col => {
            const td = document.createElement("td");
            let value = row[col];

            if (value === undefined || value === null) value = "";

            td.textContent = value;
            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
}

/**
 * Load jQuery + DataTables dynamically (only if needed)
 */
async function ensureDataTablesLoaded() {
    if (window.jQuery && $.fn.DataTable) return;

    await loadScript("https://code.jquery.com/jquery-3.7.1.min.js");
    await loadScript("https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js");
    await loadCSS("https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css");
}

/**
 * Initialize DataTables
 */
function initializeDataTable(tableId, options) {
    const tableSelector = `#${tableId}`;

    if (!$.fn.DataTable.isDataTable(tableSelector)) {
        $(tableSelector).DataTable({
            pageLength: 10,
            responsive: true,
            ...options
        });
    }
}

/**
 * Helpers to load scripts/styles dynamically
 */
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

function loadCSS(href) {
    return new Promise(resolve => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        link.onload = resolve;
        document.head.appendChild(link);
    });
}

/**
 * Format header text
 */
function formatHeader(text) {
    return text
        .replace(/_/g, " ")
        .replace(/\b\w/g, char => char.toUpperCase());
}