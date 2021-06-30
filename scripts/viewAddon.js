var addons = []

async function readData() {
    const dataUrl = 'https://raw.githubusercontent.com/outercloudstudio/MC-Addons-Data/main/posts.gdl'
    const response = await fetch(dataUrl);
    const data = await response.text();
    console.log(data);

    addons = data.split("*\n")

    let uuid = location.search.substring(4)
    let id = -1

    for(let i = 0; i < addons.length; i++){
        if(addons[i].split("|")[0] === uuid){
            id = i
        }
    }

    addonData = addons[id].split("|")

    document.getElementById("addon-title").textContent = addonData[1]
    document.getElementById("addon-description").textContent = addonData[2]
    document.getElementById("addon-author").textContent = "Created By: " + addonData[3];
    document.getElementById("addon-download").setAttribute("data-target-location", "https://" + addonData[5])

    //data-is-link data-target-location

    const transitionEl = document.querySelector(".loader")

    transitionEl.setAttribute("data-js-loaded-content-done", "!")
}

readData();