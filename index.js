function getBookmarks() {
  try {
    const data = localStorage.getItem("bookmarks");
    
    if (!data) {
      return [];
    }
    
    const parsed = JSON.parse(data);
    
    if (!Array.isArray(parsed)) {
      return [];
    }
    
    const isValid = parsed.every(item => {
      return (
        item !== null &&
        typeof item === 'object' &&
        typeof item.name === 'string' &&
        typeof item.category === 'string' &&
        typeof item.url === 'string' &&
        item.name.trim() !== '' &&
        item.category.trim() !== '' &&
        item.url.trim() !== ''
      );
    });
    
    if (!isValid) {
      return [];
    }
    
    return parsed;
    
  } catch (error) {
    return [];
  }
}

const main = document.getElementById("main-section");
const form = document.getElementById("form-section");
const addBtn = document.getElementById("add-bookmark-button");
const categoryName = document.querySelector("#form-section .category-name");
const selectCategory = document.getElementById("category-dropdown");
const closeBtn = document.getElementById("close-form-button");
const addBtnForm = document.getElementById("add-bookmark-button-form");
const nameInput = document.getElementById("name");
const urlInput = document.getElementById("url");
const listSection = document.getElementById("bookmark-list-section");
const list = document.getElementById("category-list");
const viewBtn = document.getElementById("view-category-button");
const closeListBtn = document.getElementById("close-list-button");
const deleteBtn = document.getElementById("delete-bookmark-button");

function displayOrCloseForm() {
  main.classList.toggle("hidden");
  form.classList.toggle("hidden");
}

addBtn.addEventListener("click", () => {
  const category = selectCategory.value;
  categoryName.innerText = category.slice(0,1).toUpperCase() + category.slice(1);
  displayOrCloseForm();
})

closeBtn.addEventListener("click", displayOrCloseForm);

addBtnForm.addEventListener("click", () => {
  const name = nameInput.value;
  const ctgry = selectCategory.value;
  const url = urlInput.value;
  const arr = getBookmarks();
  arr.push({name: name, category: ctgry, url: url});
  localStorage.setItem("bookmarks", JSON.stringify(arr));
  nameInput.value = "";
  urlInput.value = "";
  displayOrCloseForm();
});

function displayOrHideCategory() {
  main.classList.toggle("hidden");
  listSection.classList.toggle("hidden");
};

viewBtn.addEventListener("click", () => {
  const category = selectCategory.value;
  document.querySelector("#bookmark-list-section .category-name").innerText = category.slice(0,1).toUpperCase() + category.slice(1);
  const arr = getBookmarks();
  const ctgrArr = [];
  displayOrHideCategory();
  for (const mark of arr) {
    if (mark.category === selectCategory.value) {
      ctgrArr.push(mark);
    }
  }
  if (ctgrArr.length === 0) {
    list.innerHTML = `<p>No Bookmarks Found</p>`;
  } else {
    let htmlString = ``;
    for (const mark of ctgrArr) {
      htmlString += `
        <div style="display: flex; align-items: center; gap: 10px;">
          <input type="radio" name="radio-group" id="${mark.name}" value="${mark.name}">
          <label for="${mark.name}"><a href="${mark.url}">${mark.name}</a></label>
        </div>
        `;
    }
    list.innerHTML = htmlString;
  }
});

closeListBtn.addEventListener("click", () => {
  displayOrHideCategory();
});

deleteBtn.addEventListener("click", () => {
  const arr = getBookmarks();
  const marks = document.querySelectorAll("input[name='radio-group']");
  let nameToDelete = "";
  for (const mark of marks) {
    if (mark.checked) {
      nameToDelete = mark.value;
      break;
    }
  }
  if (nameToDelete === "") {
    return;
  }
  
  const categoryHeader = document.querySelector("#bookmark-list-section .category-name");
  const currentCategory = categoryHeader.innerText.toLowerCase();
  
  const newArr = arr.filter(mark => {
    return !(mark.name === nameToDelete && mark.category === currentCategory);
  });
  
  localStorage.setItem("bookmarks", JSON.stringify(newArr));
  
  const updatedArr = getBookmarks();
  const ctgrArr = updatedArr.filter(mark => mark.category === currentCategory);
  
  if (ctgrArr.length === 0) {
    list.innerHTML = `<p>No Bookmarks Found</p>`;
  } else {
    let htmlString = "";
    for (const mark of ctgrArr) {
        htmlString += `
          <div style="display: flex; align-items: center; gap: 10px;">
            <input type="radio" name="radio-group" id="${mark.name}" value="${mark.name}">
            <label for="${mark.name}"><a href="${mark.url}">${mark.name}</a></label>
          </div>
          `;
    }
    list.innerHTML = htmlString;
  }
});