// const button = document.querySelector(".btn-slider");
const mySlides = document.querySelector(".mySlides2");

const slides = ["slide1", "slide2", "slide3"];

let currentIndex = 0;

const getNext = () => {
  if (currentIndex === 2) {
    currentIndex = 0;
    return slides[currentIndex];
  }
  currentIndex = currentIndex + Number(currentIndex < slides.length - 1);
  return slides[currentIndex];
};

const getPrev = () => {
  if (currentIndex === 0) {
    currentIndex = 2;
    return slides[currentIndex];
  }
  currentIndex = currentIndex - Number(currentIndex > 0);
  return slides[currentIndex];
};

const btnPrev = document.querySelector(".prev_2");
const btnNext = document.querySelector(".next_2");

btnPrev.addEventListener("click", function () {
  mySlides.className = `mySlides2 ${getPrev()}`;
});

btnNext.addEventListener("click", function () {
  mySlides.className = `mySlides2 ${getNext()}`;
});

let dots = document.body.querySelector(".dots");

dots.addEventListener("click", function (event) {
  let slideNum = event.target.dataset.slide;
  if (!slideNum) return;
  mySlides.className = `mySlides2 slide${slideNum}`;
});
