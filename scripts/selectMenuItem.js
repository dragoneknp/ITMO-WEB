const menuItems = document.querySelectorAll(".header-navbar-menu__item");
const splittedData = document.location.href.split("/");
const currentLocation = splittedData[splittedData.length - 1].split(".")[0];
const matchLocation = {
    index: "main",
    reviews: "reviews",
    suggestions: "suggestions",
};

menuItems.forEach((item) => {
    if (
        item.textContent.toLowerCase().trim() === matchLocation[currentLocation]
    ) {
        menuItems.forEach((item) =>
            item.classList.remove("header-navbar-menu__item_selected")
        );
        item.classList.add("header-navbar-menu__item_selected");
    }
});
