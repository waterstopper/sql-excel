function byId(str) {
    return document.getElementById(str)
}

function byClass(str) {
    return document.getElementsByClassName(str)
}

function byTag(str) {
    return document.getElementsByTagName(str)
}

function chunkArray(arr, chunkSize) {
    let i = 0;
    let arrayLength = arr.length;
    let tempArray = [];
    let chunk = [];

    for (i = 0; i < arrayLength; i += chunkSize) {
        chunk = arr.slice(i, i + chunkSize);
        // Do something if you want with the group
        tempArray.push(chunk);
    }

    return tempArray;
}

export {
    byId,
    byClass,
    byTag,
    chunkArray
}
