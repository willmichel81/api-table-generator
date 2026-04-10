# 📊 API Table Generator (Vanilla JS + Optional DataTables)

A lightweight, reusable JavaScript utility that:

-   Fetches data from a REST API\
-   Dynamically determines available columns\
-   Builds and populates an HTML table\
-   Optionally enhances the table with DataTables (sorting, search,
    pagination)

------------------------------------------------------------------------

## 🚀 Features

-   ✅ Works with any REST API returning JSON arrays\
-   ✅ Automatically detects column names\
-   ✅ Optional manual column control\
-   ✅ Clean separation of logic (fetch, parse, render)\
-   ✅ Progressive enhancement with DataTables\
-   ✅ No dependencies required (unless DataTables is enabled)

------------------------------------------------------------------------

## 📦 Installation

### Option 1: Copy File

Simply copy `api-table.js` into your project.

### Option 2: Include via Script

``` html
<script src="api-table.js"></script>
```

------------------------------------------------------------------------

## 🧪 Basic Usage

### 1. Add an HTML table

``` html
<table id="myTable"></table>
```

### 2. Call the function from HTML page

``` javascript
createTableFromAPI({
    url: "https://jsonplaceholder.typicode.com/users",
    tableId: "myTable"
});
```

------------------------------------------------------------------------

## ⚙️ Configuration Options

  -----------------------------------------------------------------------
  Option                    Type            Required     Description
  ------------------------- --------------- ------------ ----------------
  `url`                     string          ✅ Yes       API endpoint

  `tableId`                 string          ✅ Yes       Table element ID

  `columns`                 string\[\]      ❌ No        Explicit columns
                                                         to display

  `useDataTables`           boolean         ❌ No        Enable
                                                         DataTables

  `dataTableOptions`        object          ❌ No        DataTables
                                                         config

  `columnRenderers`         object          ❌ No        Custom render
                                                         functions per
                                                         column
  -----------------------------------------------------------------------

------------------------------------------------------------------------
## 🧠 How It Works

### 1. Fetch Data

Uses the Fetch API to retrieve JSON data.

### 2. Determine Columns

-   If `columns` is provided → only those are shown\
-   Otherwise → all keys are extracted dynamically

### 3. Build Table

Creates `<thead>` and `<tbody>` dynamically and inserts data.

### 4. Optional DataTables

Enhances the table with sorting, search, and pagination.

------------------------------------------------------------------------

## 🔥 Examples

### Basic

``` javascript
createTableFromAPI({
    url: "/api/users",
    tableId: "myTable"
});
```

### With Columns

``` javascript
createTableFromAPI({
    url: "/api/users",
    tableId: "myTable",
    columns: ["id", "name", "email"]
});
```

### With DataTables

``` javascript
createTableFromAPI({
    url: "/api/users",
    tableId: "myTable",
    useDataTables: true
});
```
## 🧠 Column Renderers Explained

Each key corresponds to a column name.

Function signature:

``` javascript
(value, row) => string
```

------------------------------------------------------------------------

## 🔥 Examples

``` javascript
createTableFromAPI({
    url: "https://jsonplaceholder.typicode.com/users",
    tableId: "myTable",
    useDataTables: true,
    columnRenderers: {
        email: (value) => `<a href="mailto:${value}">${value}</a>`
    }
});
```

```

------------------------------------------------------------------------

### Website Link

``` javascript
columnRenderers: {
    website: (value) => `<a href="https://${value}" target="_blank">${value}</a>`
}
```

------------------------------------------------------------------------

### Currency

``` javascript
columnRenderers: {
    price: (value) => `$${Number(value).toFixed(2)}`
}
```

------------------------------------------------------------------------

### Date Formatting

``` javascript
columnRenderers: {
    created_at: (value) => new Date(value).toLocaleDateString()
}
```

------------------------------------------------------------------------

## ⚠️ Important Notes

-   Uses `innerHTML` when renderers are applied\
-   Ensure data is trusted or sanitized (XSS risk)
-   API must return an array of objects\
-   Nested objects are not automatically flattened\
-   DataTables requires jQuery

------------------------------------------------------------------------

## 📄 License

MIT License
