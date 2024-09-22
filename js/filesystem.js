import { previewTable } from "./preview.js";
import { createAndFillTable } from "./sql.js";
import { byId } from "./utils.js";

let files = {}

let loadFile = byId("load-file")
let sqlName = byId("sql-name")
let fileList = byId("load-files-list")

let fileReader = new FileReader()
let currentTab = null
fileReader.onload = handleFileRead

function addFile() {
    let div = document.createElement("div");
    let loadFileName = loadFile.value.substring(loadFile.value.lastIndexOf("\\") + 1)

    fileReader.readAsArrayBuffer(loadFile.files[0])

    div.innerHTML = `<div class="hoverable rounded">${sqlName.value}&nbsp->&nbsp${loadFileName} <span class="close rounded">×<span></div>`
    div.getElementsByTagName("span")[0].onclick = () => {
        div.remove()
        deleteFile(loadFileName);
    }
    fileList.appendChild(div)
    div.onclick = () => tabClick(div)

    let list = fileList.getElementsByTagName("div")
    files[loadFileName] = list[list.length - 1]
}

function tabClick(tab) {
    console.log(tab)
    if(currentTab != null) {
        currentTab.classList.remove("focus-border")
    }
    currentTab = tab
    currentTab.classList.add("focus-border")
}

function deleteFile(file) {
    console.log(files)
    delete files[file]

    console.log(files)
}

let fileCount = 1

loadFile.onchange = (e) => {
    addFile()
    fileCount++
}

function handleFileRead(event) {
    console.log(event)
    let data = event.target.result

    const book = XLSX.read(data, { dense: true });
    console.log(book)

    let tableParsed = book.Sheets[book.SheetNames[0]]
    let table = _makeTable(sqlName.value, tableParsed)
    sqlName.value = "t" + fileCount

    previewTable(table)

    createAndFillTable(table)

    loadFile.value = ""
}

function _makeTable(tableName, tableParsed) {
    let table = {}
    let data = tableParsed["!data"].map(li => li.map(e => `'${e.v.replaceAll("'", "''")}'`))
    table.columnNames = data.shift()
    table.rows = data
    table.name = tableName
    console.log(table)
    return table
}
