const themes = [
  {
    name: "light",
    message: "Here comes the sun!"
  },
  {
    name: "dark",
    message: "Dark necessities are part of my design..."
  }
];

let isExpanded = false;
const list = document.getElementById("theme-dropdown");
const btn = document.getElementById("theme-switcher-button");
const note = document.getElementById("switch-note");
const pageBody = document.querySelector("body");

function showList() {
  list.hidden = !list.hidden;
  isExpanded = !isExpanded;
  btn.setAttribute("aria-expanded", isExpanded);
  if (isExpanded){
    list.style.display = "flex";
  } else {
    list.style.display = "none";
  }
}

btn.addEventListener("click", () => {
  showList();
})

function choseTheme(theme) {
  const msg = themes.find(item => item.name === theme).message;
  showList();
  note.innerHTML = `<p>${msg}</p>`;
  if (theme === "light") {
    pageBody.classList.add("light");
    if (pageBody.classList.contains("dark")) {
      pageBody.classList.remove("dark");
    }
  } else {
    pageBody.classList.add("dark");
    if (pageBody.classList.contains("light")) {
      pageBody.classList.remove("light");
    }
  }
}

const options = document.querySelectorAll('[role="menuitem"]');
options.forEach((option) => {
  option.addEventListener("click", () => {
    choseTheme(option.textContent);
  })
});