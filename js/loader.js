//when window is fully loaded, loader will be vanished

var loader = document.querySelector(".loader");
// console.log(loader)

window.addEventListener("load", vanish);

function vanish() {
    loader.classList.add("disappear");
}