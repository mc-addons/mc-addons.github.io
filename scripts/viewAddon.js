async function getDataFromFile(fileDir) {
    const dataUrl = 'https://raw.githubusercontent.com/outercloudstudio/MC-Addons-Data/main/' + fileDir
    const response = await fetch(dataUrl)
    const data = await response.text()

    return data
}

async function readData() {
    let uuid = location.search.substring(4)

    let addonData = await getDataFromFile("addons/" + uuid + ".addon")

    addonData = addonData.split("|")

    document.getElementById("addon-title").textContent = addonData[1]
    document.getElementById("addon-description").textContent = addonData[2]
    document.getElementById("addon-author").textContent = "Created By: " + addonData[3];
    document.getElementById("addon-download").setAttribute("data-target-location", "https://" + addonData[5])

    //data-is-link data-target-location

    const transitionEl = document.querySelector(".loader")

    transitionEl.setAttribute("data-js-loaded-content-done", "!")
}

readData();