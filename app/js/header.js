let header = document.querySelector("#header")
let hamburderMenu = document.querySelector("#hamburderMenu")
let body = document.querySelector("body")
let fadeElements = document.querySelectorAll(".has-fade")

hamburderMenu.addEventListener("click", function() {
    if (header.classList.contains("open")) {
        header.classList.remove("open")
        fadeElements.forEach((e)=> {
            e.classList.remove("fade-in")
            e.classList.add("fade-out")
        })
        body.classList.remove("noscroll")
    } else {
        header.classList.add("open")
        fadeElements.forEach((e)=> {
            e.classList.add("fade-in")
            e.classList.remove("fade-out")
        })
        body.classList.add("noscroll")
    }
})

// ---- Make Header Fiexed ------
document.addEventListener('scroll', function() {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
} else {
    header.classList.remove('scrolled');
}
});
