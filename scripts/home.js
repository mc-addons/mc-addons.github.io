var addons = []

var animTime = 300

async function getDataFromFile(fileDir) {
    const dataUrl = 'https://raw.githubusercontent.com/outercloudstudio/MC-Addons-Data/main/' + fileDir
    const response = await fetch(dataUrl)
    const data = await response.text()

    return data
}

async function readData() {
    let data = await getDataFromFile("pageData/featured.gdl")

    console.log(data)

    let addonsToRead = data.split("|")

    addons = []

    for(let i = 0; i < 3; i++){
        addons.push(await getDataFromFile("addons/" + addonsToRead[i] + ".addon"))
    }

    console.log(addons.length)
    console.log(addons)

    for(let i = 0; i < 3; i++){
        let addonData = addons[i].split("|")

        document.getElementById("featured-" + (i + 1).toString()).children[0].children[0].setAttribute("src", "img/" + addonData[4])
        document.getElementById("featured-" + (i + 1).toString()).children[1].children[0].innerHTML = addonData[1]
        document.getElementById("featured-" + (i + 1).toString()).children[1].children[1].innerHTML = addonData[2].replaceAll("#br#", "\n")
        document.getElementById("featured-" + (i + 1).toString()).children[1].children[2].setAttribute("data-target-location", "http://127.0.0.1:5500/viewAddon.html?id=" + addonData[0])
    }

    const transitionEl = document.querySelector(".loader")

    transitionEl.setAttribute("data-js-loaded-content-done", "!")

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
}

readData();