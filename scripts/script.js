function scrollSpy() {
  let sections = [
    "#home",
    "#who-is",
    "#studies",
    "#experience",
    "#about-me",
    "#contact"
  ];
  let menuSections = document.querySelectorAll(".nav-section");
  let offsets = [];
  sections.forEach(section =>
    offsets.push(getOffset(document.querySelector(section)))
  );

  let verticalScroll = window.pageYOffset;
  offsets.push(verticalScroll);
  let activeSection =
    offsets.sort((a, b) => a - b).lastIndexOf(verticalScroll) - 1;

  document.querySelector(".active").classList.remove("active");
  menuSections[activeSection].classList.add("active");
}

function getOffset(element) {
  var offset = 0;
  do {
    offset += element.offsetTop;
    element = element.parentOffset;
  } while (element);
  return offset;
}

function toggleMenu() {}

function toggleField() {
  if (document.querySelector("#other").checked) {
    document.querySelector(".referral").classList.remove("hidden");
  } else {
    document.querySelector(".referral").classList.add("hidden");
  }
}

function limitWords() {
  let array = event.target.value.split(/[\s]+/);
  if (array[array.length - 1] === "") array.pop();
  let len = array.length;
  console.log("​len", len);
  if (len >= 150 && event.keyCode === 32) {
    if (event.keyCode === 46 || event.keyCode === 8) {
    } else if (event.keyCode < 48 || event.keyCode > 57) {
      event.preventDefault();
    }
  }

  let counter = document.querySelector(".count");

  if (counter.value === "") {
    counter.innerHTML = "0";
  } else {
    counter.innerHTML = len;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("Document loaded!");

  scrollSpy();
  addEventListener("resize", scrollSpy);
  addEventListener("scroll", scrollSpy);

  const icon = document.querySelector(".mobile");
  icon.addEventListener("click", toggleMenu);

  const option = document.querySelectorAll(".radio input");
  option.forEach(i => i.addEventListener("click", toggleField));

  const textArea = document.querySelector("textarea");
  textArea.addEventListener("keydown", limitWords);
  textArea.addEventListener("keyup", limitWords);
});
