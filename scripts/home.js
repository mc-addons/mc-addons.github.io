var addons = []

async function getDataFromFile(fileDir) {
    const dataUrl = 'https://raw.githubusercontent.com/outercloudstudio/MC-Addons-Data/main/' + fileDir
    const response = await fetch(dataUrl)
    const data = await response.text()

    return data
}

async function readData() {
    data = await getDataFromFile("pageData/featured.gdl")

    console.log(data)

    addonsToRead = data.split("|")

    addons = []

    for(let i = 0; i < 3; i++){
        addons.push(await getDataFromFile("addons/" + addonsToRead[i] + ".addon"))
    }

    console.log(addons.length)
    console.log(addons)

    for(let i = 0; i < 3; i++){
        addonData = addons[i].split("|")

        document.getElementById("featured-" + (i + 1).toString()).children[0].children[0].setAttribute("src", "img/" + addonData[4])
        document.getElementById("featured-" + (i + 1).toString()).children[1].children[0].innerHTML = addonData[1]
        document.getElementById("featured-" + (i + 1).toString()).children[1].children[1].innerHTML = addonData[2]
        document.getElementById("featured-" + (i + 1).toString()).children[1].children[2].setAttribute("data-target-location", "http://127.0.0.1:5500/viewAddon.html?id=" + addonData[0])
    }

    const transitionEl = document.querySelector(".loader")

    transitionEl.setAttribute("data-js-loaded-content-done", "!")
}

readData();