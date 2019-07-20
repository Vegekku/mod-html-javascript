const getOffset = function(element) {
  var offset = 0;
  do {
    offset += element.offsetTop;
    element = element.parentOffset;
  } while (element);
  return offset;
}

function setNavigation() {
  this.offsets = [];
  this.sections.forEach(section =>
    this.offsets.push(getOffset(document.querySelector(section)))
  );
}

function scrollSpy() {
  let currentOffsets = [...this.offsets, this.pageYOffset];
  let activeSection =
    currentOffsets.sort((a, b) => a - b).lastIndexOf(this.pageYOffset) - 1;
  debugger;
  document.querySelector(".active").classList.remove("active");
  this.menuSections[activeSection].classList.add("active");
}

/**
 * Toggle for mobile sidenav
 */
function toggleMenu() {
  if (window.innerWidth > 720) return;
  document
    .querySelectorAll(".sidenav li")
    .forEach(e => e.classList.toggle("mobile-hidden"));
}

/**
 * Toggle for other option select
 */
function toggleField() {
  if (document.querySelector("#other").selected) {
    document.querySelector(".referral").classList.remove("hidden");
  } else {
    document.querySelector(".referral").classList.add("hidden");
  }
}

/**
 * Limit the words introduce to 150
 */
function limitWords() {
  const limit = 150;
  let words = event.target.value.split(/[\s]+/);
  if (words[words.length - 1] === "") words.pop();
  const len = words.length;
  if (len >= limit) this.value = words.slice(0, limit).join(" ");
  if (len >= limit && event.keyCode === 32) {
    if (event.keyCode === 46 || event.keyCode === 8) {
    } else if (event.keyCode < 48 || event.keyCode > 57) {
      event.preventDefault();
      document.querySelector("div.count").style.color = "red";
      document.querySelector("div.count").style.fontWeight = "bold";
    }
  }

  if (len < limit) {
    document.querySelector("div.count").style.color = "unset";
    document.querySelector("div.count").style.fontWeight = "unset";
  }

  const counter = document.querySelector("span.count");

  if (counter.value === "") {
    counter.innerHTML = "0";
  } else {
    counter.innerHTML = len;
  }
}

/**
 * Submit form to console log
 * @param {Event} event
 */
function submitForm(event) {
  inputName = document.querySelector("#name");
  inputEmail = document.querySelector("#email");
  selectList = document.querySelector("#selection");
  otherReferral = document.querySelector("#referral");
  inputPhone = document.querySelector("#phone");
  textMessage = document.querySelector("#message");

  event.preventDefault();

  data = {
    name: inputName.value,
    email: inputEmail.value,
    selection: selectList.options[selectList.selectedIndex].value,
    referral: otherReferral.value,
    phone: inputPhone.value,
    message: textMessage.value
  };

  console.log(data);
}

/**
 * Show an error message depends on field
 * @param {Event} event
 */
function showErrorMessage(event) {
  if (event.target.id === "name")
    event.target.setCustomValidity("Debe introducir un nombre");
  if (event.target.id === "email" && event.target.value === "") {
    this.setCustomValidity("Debe introducir un email");
  } else if (event.target.id === "email") {
    this.setCustomValidity("Debe introducir un email válido");
  }
  if (event.target.id === "phone")
    this.setCustomValidity("Debe introducir un teléfono de España");
  if (event.target.id === "message")
    this.setCustomValidity("Debe introducir un mensaje");
}

/**
 * Clear any error message
 * @param {Event} event
 */
function clearErrorMessage(event) {
  this.setCustomValidity("");
}

document.addEventListener("DOMContentLoaded", () => {
  this.sections = [
    "#home",
    "#who-is",
    "#studies",
    "#experience",
    "#about-me",
    "#contact"
  ];
  this.menuSections = document.querySelectorAll(".nav-section");

  setNavigation();
  addEventListener("resize", setNavigation);
  addEventListener("scroll", scrollSpy);

  const sideNav = document.querySelector(".sidenav ul");
  sideNav.addEventListener("click", toggleMenu);

  const select = document.querySelector("select");
  select.addEventListener("change", toggleField);

  const textArea = document.querySelector("textarea");
  textArea.addEventListener("keydown", limitWords);
  textArea.addEventListener("keyup", limitWords);
  textArea.addEventListener("paste", limitWords);

  const form = document.querySelector("form");
  form.addEventListener("submit", submitForm);

  const validationInputs = document.querySelectorAll(
    "#name, #email, #phone, #message"
  );
  validationInputs.forEach(e =>
    e.addEventListener("invalid", showErrorMessage)
  );
  validationInputs.forEach(e => e.addEventListener("input", clearErrorMessage));
});
