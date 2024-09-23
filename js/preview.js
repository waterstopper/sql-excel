function previewTable(table) {
    let tableElement = document.createElement("table");
    tableElement.append(_createHead(table.columnNames))

    let body = document.createElement("tbody")
    let length = Math.min(8, table.rows.length)
    let addDots = length < table.rows.length
    for (let i = 0; i < length; i++) {
        let row = _createRow(table.rows[i])
        body.append(row)
    }
    if(addDots) {
        body.append(_createRow(Array.from({length: table.rows[0].length}, _ => "...")))
    }
    tableElement.append(body)

    document.getElementById("preview").append(tableElement)
}

function _createHead(columns) {
    let head = document.createElement("thead")
    let columnNames = columns.map(e => `<th>${e}</th>`).join("\n")
    head.innerHTML = `<tr>${columnNames}</tr>`

    return head
}

function _createRow(row) {
    let rowElement = document.createElement("tr")
    let rowElems = row.map(e => `<td>${e}</td>`).join("\n")
    rowElement.innerHTML = `<tr>${rowElems}</tr>`

    return rowElement
}


export { previewTable }