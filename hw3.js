/* 
Program name: hw3.js
Author: Tarek Elshahawi
Date created: 2025-06-04
Date last edited: 2025-06-30
Version: 3.0
Description: JavaScript for Patient Registration Form
*/

window.onload = function () {
  const dobField = document.getElementById("dob");
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  dobField.max = `${yyyy}-${mm}-${dd}`;
  dobField.min = `${yyyy - 120}-${mm}-${dd}`;

  updateMedCount();
};

function updateMedCount() {
  const medSlider = document.getElementById("medications");
  const display = document.getElementById("medicationsDisplay");
  if (medSlider && display) {
    display.textContent = medSlider.value;
  }
}

function validateForm() {
  const form = document.forms["regForm"];
  const errorDisplay = document.getElementById("form-errors");
  errorDisplay.innerHTML = "";
  let isValid = true;

  function showError(input, message) {
    input.classList.add("error");
    const err = document.createElement("div");
    err.id = "error-message";
    err.textContent = message;
    input.parentNode.appendChild(err);
    isValid = false;
  }

  function clearErrors() {
    document.querySelectorAll("#error-message").forEach(el => el.remove());
    document.querySelectorAll(".error").forEach(el => el.classList.remove("error"));
  }

  clearErrors();

  const firstName = form["firstName"];
  if (!/^[A-Za-z'-]{1,30}$/.test(firstName.value.trim())) showError(firstName, "Invalid First Name");

  const middleInitial = form["middleInitial"];
  if (middleInitial.value && !/^[A-Za-z]{1}$/.test(middleInitial.value)) showError(middleInitial, "Invalid Middle Initial");

  const lastName = form["lastName"];
  if (!/^[A-Za-z'\-2-5]{1,30}$/.test(lastName.value.trim())) showError(lastName, "Invalid Last Name");

  const dob = form["dob"];
  const dobDate = new Date(dob.value);
  if (!dob.value || dobDate > new Date() || dobDate < new Date(new Date().setFullYear(new Date().getFullYear() - 120))) showError(dob, "Invalid Date of Birth");

  const ssn = form["ssn"];
  if (!/^\d{3}-\d{2}-\d{4}$/.test(ssn.value)) showError(ssn, "Invalid SSN format");

  const address1 = form["address1"];
  if (!/^.{2,30}$/.test(address1.value)) showError(address1, "Address Line 1 must be 2-30 characters");

  const address2 = form["address2"];
  if (address2.value && !/^.{2,30}$/.test(address2.value)) showError(address2, "Address Line 2 must be 2-30 characters");

  const city = form["city"];
  if (!/^[A-Za-z ]{2,30}$/.test(city.value)) showError(city, "Invalid City");

  const zip = form["zip"];
  if (!/^\d{5}(-\d{4})?$/.test(zip.value)) showError(zip, "Invalid ZIP Code");

  const email = form["email"];
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) showError(email, "Invalid Email Address");

  const userid = form["userid"];
  if (!/^[A-Za-z_][A-Za-z0-9_-]{4,29}$/.test(userid.value)) showError(userid, "Invalid User ID");

  const password = form["password"];
  const repassword = form["repassword"];
  const passwordVal = password.value;
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s"])[^" ]{8,30}$/;
  if (!passRegex.test(passwordVal)) showError(password, "Password must be 8-30 chars with uppercase, lowercase, number & special char (no quotes/spaces)");
  if (passwordVal !== repassword.value) showError(repassword, "Passwords do not match");
  if (passwordVal.toLowerCase().includes(userid.value.toLowerCase())) showError(password, "Password cannot contain User ID");

  if (isValid) {
    document.getElementById("submitBtn").style.display = "inline-block";
  } else {
    document.getElementById("submitBtn").style.display = "none";
  }
}
