const btn = document.getElementById("submit-btn");
const orderRegex = /^2024\d{6}$/;
const codeRegex = /^[a-zA-Z]{2}\d{2}-[a-zA-Z]\d{3}-[a-zA-Z]{2}\d$/;
const form = document.getElementById("form");

function validateForm() {
    let name = true;
    let email = true;
    let order = true;
    let code = true;
    let quantity = true;
    let check = false;
    let description = true;
    let radio = false;
    let solution = true;
    let other = false;
    let otherSol = false;

    if (!document.getElementById("full-name").value) {
        name = false;
    }
    if (!document.getElementById("email").checkValidity()) {
        email = false;
    }
    if (!orderRegex.test(document.getElementById("order-no").value)) {
        order = false;
    }
    if (!codeRegex.test(document.getElementById("product-code").value)) {
        code = false;
    }

    const quantityEl = document.getElementById("quantity").value;
    if (quantityEl === "" || !Number.isInteger(Number(quantityEl)) || quantityEl < 1) {
        quantity = false;
    }

    const group = document.querySelectorAll('input[name="complaint"]');
    for (const box of group) {
        console.log(box);
        if (box.id == "other-complaint" && box.checked) {
            other = true;
            check = true;
            break;
        }
        if (box.checked) {
            check = true;
            break;
        }
    }
    
    if (other) {
        if (document.getElementById("complaint-description").value.length < 20) {
            description = false;
        }
    }

    const radioGroup = document.querySelectorAll('input[name="solutions"]');
    for (const btn of radioGroup) {
        if (btn.checked && btn.id == "other-solution") {
            radio = true;
            otherSol = true;
            break;
        }
        if (btn.checked) {
            radio = true;
            break;
        }
    }

    if (otherSol) {
        if (document.getElementById("solution-description").value.length < 20) {
            solution = false;
        }
    }

    return {
        "full-name": name,
        "email": email,
        "order-no": order,
        "product-code": code,
        "quantity": quantity,
        "complaints-group": check, 
        "complaint-description": description, 
        "solutions-group": radio,
        "solution-description": solution
    }
}

function isValid(obj) {
    for (const prop in obj) {
        if(!obj[prop]) {
            return false;
        }
    }
    return true;
}

const nameInput = document.getElementById("full-name");
const emailInput = document.getElementById("email");
const numInput = document.getElementById("order-no");
const codeInput = document.getElementById("product-code");
const quantityInput = document.getElementById("quantity");
const complaintsField = document.getElementById("complaints-group");
const complaintCheckboxes = document.querySelectorAll('input[name="complaint"]');
const descriptionInput = document.getElementById("complaint-description");
const solutionsInput = document.getElementById("solutions-group");
const solutionRadios = document.querySelectorAll('input[name="solutions"]');


nameInput.addEventListener("change", () => {
    let validObj = validateForm();
    if (validObj["full-name"]) {
        nameInput.style.borderColor = 'green';
    } else {
        nameInput.style.borderColor = "red";
    }
});

emailInput.addEventListener("change", () => {
    if (emailInput.checkValidity()) {
        emailInput.style.borderColor = 'green';
    } else {
        emailInput.style.borderColor = "red";
    }
});

numInput.addEventListener("change", () => {
    let validObj = validateForm();
    if (validObj["order-no"]) {
        numInput.style.borderColor = 'green';
    } else {
        numInput.style.borderColor = "red";
    }
});

codeInput.addEventListener("change", () => {
    let validObj = validateForm();
    if (validObj["product-code"]) {
        codeInput.style.borderColor = 'green';
    } else {
        codeInput.style.borderColor = "red";
    }
});

quantityInput.addEventListener("change", () => {
    let validObj = validateForm();
    if (validObj["quantity"]) {
        quantityInput.style.borderColor = 'green';
    } else {
        quantityInput.style.borderColor = "red";
    }
});

complaintCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
        let validObj = validateForm();
        if (validObj["complaints-group"]) {
            complaintsField.style.borderColor = 'green';
        } else {
            complaintsField.style.borderColor = "red";
        }
    });
});

const otherComplaint = document.getElementById("other-complaint");
const complaintDesc = document.getElementById("complaint-description");

complaintDesc.addEventListener("input", function() {
    if (otherComplaint.checked) {
        if (complaintDesc.value.length >= 20) {
            descriptionInput.style.borderColor = 'green';
        } else {
            descriptionInput.style.borderColor = 'red';
        }
    } else {
        descriptionInput.style.borderColor = 'black';
    }
});

solutionRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
        let validObj = validateForm();
        if (validObj["solutions-group"]) {
            solutionsInput.style.borderColor = 'green';
        } else {
            solutionsInput.style.borderColor = "red";
        }
    });
});

const otherSolution = document.getElementById("other-solution");
const solutionDesc = document.getElementById("solution-description");

solutionDesc.addEventListener("input", function() {
    if (otherSolution.checked) {
        if (solutionDesc.value.length >= 20) {
            solutionDesc.style.borderColor = 'green';
        } else {
            solutionDesc.style.borderColor = 'red';
        }
    } else {
        solutionDesc.style.borderColor = '';
    }
});

btn.addEventListener("submit", () => {
    isValid(validateForm())
});