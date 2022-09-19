const form = document.querySelector(".suggest-form");
const input = document.querySelector(".suggest__input");
const list = document.querySelector(".suggest-list");

const localStorageKey = "suggestion-list";

window.addEventListener("load", () => {
    const values = getListOfItems();
    values.forEach((value) => {
        list.insertAdjacentHTML("afterbegin", createTemplate(value));
    });
    const deleteButtons = document.querySelectorAll(
        ".suggest-list-item__deleteButton"
    );
    deleteButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            deleteValue(values[index]);
            const parent = button.parentElement;
            list.removeChild(parent);
        });
    });
});

const createTemplate = (value) => {
    return `
    <li class="suggest-list__item suggest-list-item">
        <p>
            ${value}
        </p>
        <button class="suggest-list-item__deleteButton">
            <svg
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M3 5H2V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H14C14.5304 20 15.0391 19.7893 15.4142 19.4142C15.7893 19.0391 16 18.5304 16 18V5H3ZM13.618 2L12 0H6L4.382 2H0V4H18V2H13.618Z"
                    fill="#FF0000"
                />
            </svg>
        </button>
    </li>
    `;
};

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = input.value;
    if (value) {
        list.insertAdjacentHTML("afterbegin", createTemplate(value));
        input.value = "";
        addValue(value);
        const deleteButtons = document.querySelectorAll(
            ".suggest-list-item__deleteButton"
        );
        deleteButtons[0].addEventListener("click", () => {
            deleteValue(value);
            const parent = deleteButtons[0].parentElement;
            list.removeChild(parent);
        });
    } else {
        alert("bro, ti zabil vvesti dannie");
    }
});

const getListOfItems = () => {
    let list = JSON.parse(localStorage.getItem(localStorageKey));
    if (!list) {
        return [];
    }
    return list;
};

const addValue = (value) => {
    const list = getListOfItems();
    list.unshift(value);
    localStorage.setItem(localStorageKey, JSON.stringify(list));
};

const deleteValue = (value) => {
    let list = getListOfItems();
    list = list.filter((item) => item !== value);
    localStorage.setItem(localStorageKey, JSON.stringify(list));
};
