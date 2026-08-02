function generateElement() {
  return Math.floor(Math.random() * (100)) + 1;
}

function generateArray() {
  const arr = [];
  for (let i = 0; i < 5; i++) {
    arr.push(generateElement());
  }
  return arr;
}

function generateContainer() {
  return document.createElement('div');
}

function fillArrContainer(el, arr) {
  el.innerHTML = `<span>${arr[0]}</span><span>${arr[1]}</span><span>${arr[2]}</span><span>${arr[3]}</span><span>${arr[4]}</span>`
}

function isOrdered(a, b) {
  return a <= b;
}

function swapElements(arr, indx) {
  if (!isOrdered(arr[indx], arr[indx + 1])) {
    const temp = arr[indx];
    arr[indx] = arr[indx + 1];
    arr[indx + 1] = temp;
  }
}

function highlightCurrentEls(el, indx) {
  const elements = el.children;
  if (elements[indx] && elements[indx + 1]) {
    elements[indx].style.border = "2px dashed red";
    elements[indx + 1].style.border = "2px dashed red";
  }
}

const generateBtn = document.getElementById("generate-btn");
const startArr = document.getElementById("starting-array");
const sortBtn = document.getElementById("sort-btn");
const arrContainer = document.getElementById("array-container");
let array = [];
sortBtn.style.display = "none";

generateBtn.addEventListener("click", () => {
  //array = generateArray();
  array = [56, 92, 61, 6, 27];
  fillArrContainer(startArr, array);
  arrContainer.innerHTML = '';
  arrContainer.appendChild(startArr);
  sortBtn.style.display = "flex";
})

sortBtn.addEventListener("click", () => {
  sortBtn.style.display = "none";
  highlightCurrentEls(startArr, 0);

  for (let i = 0; i < array.length - 1; i++) {
    let wasSwapped = false;
    for (let j = 0; j < array.length - 1; j++) {    
      const newDiv = generateContainer();
      fillArrContainer(newDiv, array);
      highlightCurrentEls(newDiv, j);
      arrContainer.appendChild(newDiv);
      if (!isOrdered(array[j], array[j + 1])) {
        swapElements(array, j);
        wasSwapped = true;
      }
    }
    if (!wasSwapped) {
      break;
    }
  }
  const finalDiv = generateContainer();
  fillArrContainer(finalDiv, array);
  finalDiv.style.border = "4px solid green";
  arrContainer.appendChild(finalDiv);
  const childToDelete = arrContainer.children[1];
  arrContainer.removeChild(childToDelete);
})