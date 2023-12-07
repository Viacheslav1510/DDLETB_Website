// Define constants for all of the elements we will be working with
const form = document.querySelector("#myForm");
const nameInput = document.querySelector("#fullName");
const emailInput = document.querySelector("#emailAddress");
const nameError = document.querySelector("#fullName + .field-error");
const emailError = document.querySelector("#emailAddress + .field-error");

function validateName() {
  // Code that will run whenever we want to validate the fullName field
  if (nameInput.validity.valid) {
    //Value is valid, so remove anyprevious error message
    nameError.textContent = "";
  } else {
    showNameError();
  }
}

function showNameError() {
  nameError.textContent = "Please enter yourname";
}

function validateEmail() {
  // Code that will run whenever we want to validate the email field
  if (emailInput.validity.valid) {
    emailError.textContent = "";
  } else {
    showEmailError();
  }
}

function showEmailError() {
  // Code to display an error message for the email field
  if (emailInput.validity.valueMissing) {
    emailError.textContent = "Please enter your email address";
  } else if (emailInput.validity.typeMismatch) {
    emailError.textContent = "Your email address does not appearto be correct";
  }
}

function validateForm(event) {
  // Code that we want to run to validate the entire form (both fields)
  let formHasErrors = false;

  if (!nameInput.validity.valid) {
    formHasErrors = true;
    showNameError();
  }

  if (!emailInput.validity.valid) {
    formHasErrors = true;
    showEmailError();
  }

  if (formHasErrors) {
    event.preventDefault();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Add your event listeners here
  nameInput.addEventListener("input", validateName);
  emailInput.addEventListener("input", validateEmail);
  form.addEventListener("submit", validateForm);
});
