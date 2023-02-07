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

btnPrev.onclick = () => {
  mySlides.className = `mySlides2 ${getPrev()}`;
  console.log(currentIndex);
};

btnNext.onclick = () => {
  mySlides.className = `mySlides2 ${getNext()}`;
  console.log(currentIndex);
};
