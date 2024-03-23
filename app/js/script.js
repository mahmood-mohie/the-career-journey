let header = document.querySelector("#header")
let hamburderMenu = document.querySelector("#hamburderMenu")
let body = document.querySelector("body")

hamburderMenu.addEventListener("click", function() {
    header.classList.toggle("open")
    body.classList.toggle("noscroll")
})