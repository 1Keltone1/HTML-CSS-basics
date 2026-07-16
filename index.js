const btn = document.getElementById("check-btn");
const input = document.getElementById("text-input");
const regex = /[^a-zA-Z0-9]/g;
const result = document.getElementById("result");

function showResult() {
  if (input.value === "") {
    alert("Please input a value");
  } else {
    const str = input.value.toLowerCase().replace(regex, "");
    const reversed = str.split("").reverse().join("");
    if (str === reversed) {
      result.textContent = `${input.value} is a palindrome`;
      result.style.display = "flex";
    } else {
      result.textContent = `${input.value} is not a palindrome`;
      result.style.display = "flex";
    }
  }
}

btn.addEventListener("click", showResult);