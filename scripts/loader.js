var animTime = 300

console.log("Script Loaded...")

window.onload = () => {
    console.log("Base Window Loaded...")

    const transitionEl = document.querySelector(".loader")
    const links = document.querySelectorAll("a")
    const linkButtons = document.querySelectorAll("button")

    for(let i = 0; i < linkButtons.length; i++){
        const button = linkButtons[i]

        if(button.hasAttribute("data-is-link")){
            if(button.dataset.targetLocation.slice(-1) !== "#"){
                button.addEventListener("click", e => {
                    e.preventDefault()

                    console.log(e)
                    
                    let target = e.target.dataset.targetLocation
                    let loginTarget = e.target.dataset.loggedInTargetLocation

                    if(e.target.hasAttribute("data-open-in-new-tab")){
                        setTimeout(() => {
                            if(e.target.hasAttribute("data-logged-in-target-location") && sessionStorage.getItem("user") != null){
                                window.open(loginTarget)
                            }else{
                                window.open(target)
                            }
                        }, animTime)
                    }else{
                        transitionEl.classList.add("is-active")
                        transitionEl.classList.remove("ready")

                        setTimeout(() => {
                            if(e.target.hasAttribute("data-logged-in-target-location") && sessionStorage.getItem("user") != null){
                                console.log("Logged In Travel!")
                                window.location.href = loginTarget
                            }else{
                                console.log("Not Logged In Travel!")
                                window.location.href = target
                            }
                        }, animTime)
                    }
                })
            }
        }
    }  

    for(let i = 0; i < links.length; i++){
        const link = links[i]

        if(link.href.slice(-1) !== "#"){
            link.addEventListener("click", e => {
                e.preventDefault()
                let target = e.target.href
                let loginTarget = e.target.dataset.loggedInTargetLocation

                if(e.target.hasAttribute("target")){
                    setTimeout(() => {
                        if(e.target.hasAttribute("data-logged-in-target-location") && sessionStorage.getItem("user") != null){
                            window.open(loginTarget)
                        }else{
                            window.open(target)
                        }
                    }, animTime)
                }else{               
                    transitionEl.classList.add("is-active")
                    transitionEl.classList.remove("ready")

                    setTimeout(() => {
                        if(e.target.hasAttribute("data-logged-in-target-location") && sessionStorage.getItem("user") != null){
                            window.location.href = loginTarget
                        }else{
                            window.location.href = target
                        }
                    }, animTime)
                }
            })
        }
    }

    finishLoading()
}

function finishLoading(){
    const transitionEl = document.querySelector(".loader")

    if(transitionEl.hasAttribute("data-js-loaded-content")){
        console.log("Waiting for content...")

        if(transitionEl.hasAttribute("data-js-loaded-content-done")){
            console.log("Content Finshed Loading!!!")

            console.log("Running On Load Events...")
            
            if(transitionEl.hasAttribute("data-on-load-events")){
                for(let i = 0; i < onLoadEvents.length; i++){
                    onLoadEvents[i]();
                }
            }

            console.log("Finished On Load Events!")

            transitionEl.classList.remove("is-active")

            setTimeout(() => {
                transitionEl.classList.add("ready")
            }, animTime)
        }else{
            console.log("Waiting for content Still...")

            setTimeout(() => {
                finishLoading()
            }, 100)
        }
    }else{
        console.log("Running On Load Events...")

        if(transitionEl.hasAttribute("data-on-load-events")){
            for(let i = 0; i < onLoadEvents.length; i++){
                onLoadEvents[i]();
            }
        }

        console.log("Finished On Load Events!")

        transitionEl.classList.remove("is-active")

        setTimeout(() => {
            transitionEl.classList.add("ready")
        }, animTime)
    }
}