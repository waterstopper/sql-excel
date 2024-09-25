import { byId } from "./utils.js";


const initSqlJs = window.initSqlJs;
const SQL = await initSqlJs({
    // Required to load the wasm binary asynchronously. Of course, you can host it wherever you want
    // You can omit locateFile completely when running in node
    locateFile: file => `https://sql.js.org/dist/${file}`
});

// Create a database
const db = new SQL.Database();

// window.workerCanPostMessage = true
// const worker = new Worker("ajax/libs/sql.js/1.11.0/worker.sql-wasm.js");

// let scheduled = []

// worker.onmessage = event => {
//     window.workerCanPostMessage = true;
//     if (window.exportSqlResult) {
//         exportXlsx(event.data.results[0].columns, event.data.results[0].values)
//     }
//     window.exportSqlResult = false
//     execScheduled()
// }
// worker.onerror = err => console.log("Worker error: ", err);

// let msgId = 0;

// function postSqlMessageWorker(cmd) {
//     if (window.workerCanPostMessage) {
//         window.workerCanPostMessage = false;
//         worker.postMessage({
//             id: msgId++,
//             action: "exec",
//             sql: cmd
//         });
//     } else {
//         scheduleExec(cmd)
//     }
// }

// window.postSqlMessageWorker = postSqlMessageWorker

// function execScheduled() {
//     if (scheduled.length == 0) {
//         return
//     }
//     let scheduledTask = scheduled.shift()
//     postSqlMessageWorker(scheduledTask)

// }

function createAndFillTable(table) {
    let columnNames = table.columnNames.map(e => `${e} varchar(255)`).join()
    let createQuery = `CREATE TABLE ${table.name} (${columnNames})`
    let tableFillQuery = `INSERT INTO ${table.name} VALUES\n ${table.rows.map(li => "(" + li.join() + ")").join(",\n")};`

    db.run(createQuery)
    db.run(tableFillQuery)
    // postSqlMessageWorker(createQuery)
    // postSqlMessageWorker(tableFillQuery)
}

// function scheduleExec(sql) {
//     scheduled.push(sql)
// }

let sqlScript = byId("sql-script")
byId("run-sql-btn").onclick = () => {
    // window.exportSqlResult = true
    // postSqlMessageWorker(sqlScript.value)

    const result = db.exec(sqlScript.value)
    exportXlsx(result[0].columns, result[0].values)
}

let sqlResultFileName = byId("sql-result-file-name")

function exportXlsx(columnNames, rows) {
    rows.unshift(columnNames)

    const sheet = XLSX.utils.aoa_to_sheet(rows);
    const book = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(book, sheet, "Dates");
    XLSX.writeFile(book, sqlResultFileName.value);
}

export { createAndFillTable }