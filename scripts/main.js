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