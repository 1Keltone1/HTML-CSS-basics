const regexPattern = document.getElementById("pattern");
const stringToTest = document.getElementById("test-string");
const testButton = document.getElementById("test-btn");
const testResult = document.getElementById("result");
const caseInsensitiveFlag = document.getElementById("i");
const globalFlag = document.getElementById("g");

function getFlags() {
  let result = '';
  if (caseInsensitiveFlag.checked) {
    result += 'i';
  }
  if (globalFlag.checked) {
    result += 'g';
  }
  return result;
}


function regexMatch() {
  const regex = new RegExp(regexPattern.value, getFlags());
  let testString = stringToTest.textContent;
  let funcResult = ''
  
  if (regex.global) {
    const resultArr = Array.from(testString.matchAll(regex));
    if (resultArr.length > 0) {
      testString = testString.replaceAll(regex, `<span class="highlight">$&</span>`);
      const func = [];
      for (const el of resultArr) {
        if (typeof el[0] === 'string') {
          func.push(el[0]);
        }
      }
      funcResult = func.join(", ");
      stringToTest.innerHTML = testString;
      testResult.textContent = funcResult;
    }
  } else {
    const resultArr = testString.match(regex);
    if (resultArr !== null) {
      testString = testString.replace(regex, `<span class="highlight">$&</span>`);
      funcResult = resultArr[0];
    }
    stringToTest.innerHTML = testString;
    testResult.textContent = funcResult;
  }
  if (testResult.textContent === '') {
    testResult.textContent = "no match";
  }
}

testButton.addEventListener("click", regexMatch);