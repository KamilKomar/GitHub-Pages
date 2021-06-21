const inputName = document.querySelector(".search");
const form = document.querySelector("form");
const img = document.querySelector(".profile__img");
const fullProfile = document.querySelector(".profile__account");
const name = document.querySelector(".profile__name");
const following = document.querySelector(".profile__following");
const followers = document.querySelector(".profile__followers");
const repos = document.querySelector(".profile__repos");
const bio = document.querySelector(".profile__bio");
const profile = document.querySelector(".profile");
const error = document.querySelector(".error");
const historyBtn = document.querySelector(".profile__history-btn");
const historyUl = document.querySelector(".profile__history-ul");

const apiBase = "https://api.github.com/users/";

async function getData() {
    const respData = await fetch(apiBase + inputName.value);
    const res = await respData.json();

    if (res.message === "Not Found") {
        error.textContent = "There is no such profile with that name";
        profile.classList.remove("show-profile");
    } else {
        displayProfile();
        setProfileData(res);
        error.textContent = "";
    }
}

async function setProfileData(res) {
    img.setAttribute("src", `${res.avatar_url}`);
    fullProfile.setAttribute("href", `${res.html_url}`);
    name.textContent = res.name;
    repos.textContent = res.public_repos;
    followers.textContent = res.followers;
    following.textContent = res.following;
    bio.textContent = res.bio;
}
function displayProfile() {
    inputName.value = "";
    profile.classList.add("show-profile");
}

function createHistory() {
    const listItem = document.createElement("li");
    listItem.style.cursor = "pointer";
    listItem.textContent = inputName.value;
    historyUl.appendChild(listItem);

    listItem.addEventListener("click", function () {
        inputName.value = listItem.textContent;
        historyUl.classList.remove("show-history");
        getData();
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    getData();
    createHistory();
});

historyBtn.addEventListener("click", () =>
    historyUl.classList.toggle("show-history")
);
