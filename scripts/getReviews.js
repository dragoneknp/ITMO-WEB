const loader = document.querySelector(".loader");
const reviews = document.querySelector(".reviews");
const error = document.querySelector(".error");
const listOfReviews = document.querySelector(".reviews-list");

const createTemplate = (email, name, body) => {
    return `<div class="reviews-list__item">
            <h2>Name: <strong>${name}</strong></h2>
            <p>Email: <strong>${email}</strong></p>
            <p>Text:<br/> ${body}</p>
        </div>`;
};

window.addEventListener("load", async () => {
    loader.style.display = "block";
    reviews.style.display = "none";
    error.style.display = "none";

    await fetch("https://jsonplaceholder.typicode.com/comments")
        .then((data) => data.json())
        .then((data) => {
            const page = Math.floor(Math.random() * 25);
            const result = data.slice(page * 20, (page + 1) * 20);
            result.forEach(({ email, name, body }) => {
                listOfReviews.insertAdjacentHTML(
                    "afterbegin",
                    createTemplate(email, name, body)
                );
            });
            loader.style.display = "none";
            reviews.style.display = "block";
            error.style.display = "none";
        })
        .catch(() => {
            loader.style.display = "none";
            reviews.style.display = "none";
            error.style.display = "block";
        });
});
