var addons = []

const transitionEl = document.querySelector(".loader")

async function getDataFromFile(fileDir) {
    const dataUrl = 'https://raw.githubusercontent.com/outercloudstudio/MC-Addons-Data/main/' + fileDir
    const response = await fetch(dataUrl)
    const data = await response.text()

    return data
}

async function readData() {
    browseableAddons = await getDataFromFile("pageData/browse.gdl")

    browseableAddons = browseableAddons.split("|").filter(e =>  e)

    console.log(browseableAddons)

    for(let i = 0; i < browseableAddons.length; i++){
        addons.push(await getDataFromFile("addons/" + browseableAddons[i] + ".addon"))
    }

    console.log(addons)

    let page = parseInt(location.search.substring(6))

    let rowsPerPage = 4
    let cardsPerRow = 3

    for(let i = 0 + (page * rowsPerPage); i < rowsPerPage + (page * rowsPerPage); i++){
        let reverseI = Math.floor(addons.length / cardsPerRow) - i - 1

        console.log("------------------------")
        console.log(reverseI)
        console.log("~~~~~~~~~~~~~~~~~~~~~~~")

        if(reverseI < 0){
            console.log("Negative?")
            break
        }

        if(document.getElementById("browse-" + (i * cardsPerRow + 1).toString()) === null){
            let newRow = document.getElementsByClassName("card-row")[document.getElementsByClassName("card-row").length - 1].cloneNode(true)

            newRow.children[0].id = "browse-" +(i * cardsPerRow + 1).toString()
            newRow.children[1].id = "browse-" +(i * cardsPerRow + 1 + 1).toString()
            newRow.children[2].id = "browse-" +(i * cardsPerRow + 2 + 1).toString()

            document.getElementsByClassName("browse-cards")[0].appendChild(newRow)
        }

        for(let j = 0; j < 3; j++){
            console.log(reverseI * cardsPerRow + j)
            
            addonData = addons[reverseI * cardsPerRow + j].split("|")

            //console.log("browse-" + (i * cardsPerRow + j + 1).toString())
            document.getElementById("browse-" + (i * cardsPerRow + j + 1).toString()).children[0].children[0].setAttribute("src", "img/" + addonData[4])
            document.getElementById("browse-" + (i * cardsPerRow + j + 1).toString()).children[1].children[0].innerHTML = addonData[1]
            document.getElementById("browse-" + (i * cardsPerRow + j + 1).toString()).children[1].children[1].innerHTML = addonData[2]
            document.getElementById("browse-" + (i * cardsPerRow + j + 1).toString()).children[1].children[2].setAttribute("data-target-location", "http://127.0.0.1:5500/viewAddon.html?id=" + addonData[0])     
        }
    }

    if(addons.length < (page + 1) * cardsPerRow * rowsPerPage){
        document.getElementById("load-more").classList.add("hide")
    }

    document.getElementById("load-more").addEventListener("click", e => {
        e.preventDefault()
        
        let target = "browse.html?page=" + (page + 1).toString()

        transitionEl.classList.add("is-active")
        transitionEl.classList.remove("ready")

        setTimeout(() => {
            window.location.href = target
        }, animTime)              
    })

    const transitionEl = document.querySelector(".loader")

    transitionEl.setAttribute("data-js-loaded-content-done", "!")
}

readData();

onLoadEvents.push(function(){
    const cards = document.querySelectorAll(".card")

    document.addEventListener('mousemove', function () {
        for(let i = 0; i < cards.length; i++){
            if(cards[i].matches(":hover") && !cards[i].children[0].classList.contains("active")){
                cards[i].children[0].classList.add("active")
                cards[i].children[1].classList.add("active")
            }else if(!cards[i].matches(":hover") && cards[i].children[0].classList.contains("active")){
                cards[i].children[0].classList.remove("active")
                cards[i].children[1].classList.remove("active")
            }
        }
    });

    for(let i = 0; i < cards.length; i++){
        cards[i].children[1].children[2].addEventListener("click", e => {
            e.preventDefault()
            
            let target = e.target.dataset.targetLocation

            transitionEl.classList.add("is-active")
            transitionEl.classList.remove("ready")

            setTimeout(() => {
                window.location.href = target
            }, animTime)              
        })
    }
})