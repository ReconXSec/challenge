const nameInput = document.querySelector('input[name="name"]');
const lastNameInput = document.querySelector('input[name="last-name"]');
const emailInput = document.querySelector('.email');
const passwordInput = document.querySelector('.password');
const errorDivs = document.querySelectorAll('.error');
const form = document.querySelector('form');

const regexName = /^[a-zA-Z\s'-]{2,30}$/;
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const weakPassword = /^.{6,}$/;
const mediumPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

function validateField(input, errorDiv) {
    const value = input.value.trim();
    let isValid = true;

    if (input === nameInput || input === lastNameInput) {
        if (!regexName.test(value)) {
            input.style.borderColor = 'hsl(0, 100%, 50%)';
            errorDiv.textContent = "Name cannot include numbers or special characters";
            isValid = false;
        }
    } else if (input === emailInput) {
        if (!regexEmail.test(value)) {
            input.style.borderColor = 'hsl(0, 100%, 50%)';
            errorDiv.textContent = "Looks like this is not an email";
            isValid = false;
        }
    } else if (input === passwordInput) {
        if (!weakPassword.test(value)) {
            input.style.borderColor = 'hsl(0, 100%, 50%)';
            errorDiv.textContent = "Password must be at least 6 characters";
            isValid = false;
        } else if (!mediumPassword.test(value)) {
            input.style.borderColor = 'hsl(0, 100%, 50%)';
            errorDiv.textContent = "Needs 8+ chars, uppercase, lowercase, and a number";
            isValid = false;
        } else if (!specialChar.test(value)) {
            input.style.borderColor = 'hsl(0, 100%, 50%)';
            errorDiv.textContent = "Must include at least one special character";
            isValid = false;
        }
    }

    if (isValid && value !== "") {
        input.style.borderColor = 'hsl(103, 100%, 50%)';
        errorDiv.textContent = "";
    } else if (value === "") {
        input.style.borderColor = 'hsl(246, 25%, 77%)';
        errorDiv.textContent = "";
    }

    return isValid;
}

const inputs = [nameInput, lastNameInput, emailInput, passwordInput];

inputs.forEach((input, index) => {
    input.addEventListener('blur', () => {
        validateField(input, errorDivs[index]);
    });

    input.addEventListener('input', () => {
        input.style.borderColor = 'hsl(246, 25%, 77%)';
        errorDivs[index].textContent = "";
    });
});

form.addEventListener('submit', function (event) {
    let hasError = false;

    inputs.forEach((input, index) => {
        if (!validateField(input, errorDivs[index])) {
            hasError = true;
        }
    });

    if (hasError) {
        event.preventDefault();
    }
});