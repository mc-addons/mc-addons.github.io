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
    document.getElementById("addon-description").textContent = addonData[2].replaceAll("#br#", "\n")
    document.getElementById("addon-author").textContent = "Created By: " + addonData[3];
    document.getElementById("addon-download").setAttribute("data-target-location", "https://" + addonData[5])

    //data-is-link data-target-location

    let searches = document.getElementsByClassName("search")

    for(let i = 0; i < searches.length; i++){
        searches[i].addEventListener("keyup", function(event){
            if (event.keyCode === 13) {
                // Cancel the default action, if needed
                event.preventDefault();
                // Trigger the button element with a click
                searches[i].parentElement.children[1].click()
            }
        })

        searches[i].parentElement.children[1].addEventListener("click", function(){
            const transitionEl = document.querySelector(".loader")

            transitionEl.classList.add("is-active")
            transitionEl.classList.remove("ready")

            setTimeout(() => {
                window.location.href = "search.html?search=" + searches[i].parentElement.children[0].value
            }, animTime)
        })
    }

    const transitionEl = document.querySelector(".loader")

    transitionEl.setAttribute("data-js-loaded-content-done", "!")
}

readData();