var addons = []

async function readData() {
    const dataUrl = 'https://raw.githubusercontent.com/outercloudstudio/MC-Addons-Data/main/posts.gdl'
    const response = await fetch(dataUrl);
    const data = await response.text();
    console.log(data);

    addons = data.split("*\n")

    for(let i = 1; i <= 21; i++){
        console.log(i)

        addonData = addons[i-1].split("|")
        
        document.getElementById("featured-" + i.toString()).children[0].children[0].setAttribute("src", "img/" + addonData[4])
        document.getElementById("featured-" + i.toString()).children[1].children[0].innerHTML = addonData[1]
        document.getElementById("featured-" + i.toString()).children[1].children[1].innerHTML = addonData[2]
        document.getElementById("featured-" + i.toString()).children[1].children[2].setAttribute("data-target-location", "http://127.0.0.1:5500/viewAddon.html?id=" + addonData[0])
    }

    const transitionEl = document.querySelector(".loader")

    transitionEl.setAttribute("data-js-loaded-content-done", "!")
}

readData();