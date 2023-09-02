document.cookie = "run_script=true";
const sliderContainer = document.querySelector(".slider-container");
const slider = document.querySelector(".slider");
const sliderImages = document.querySelectorAll(".slider-image");
const prevButton = document.querySelector("#prev");
const nextButton = document.querySelector("#next");
let currentIndex = 0;

function showImage(index) {
  if (sliderImages[index]) {
    sliderImages.forEach((image) => (image.style.display = "none"));
    sliderImages[index].style.display = "block";
    currentIndex = index;
  }
}

function nextImage() {
  currentIndex++;

  if (currentIndex >= sliderImages.length) {
    currentIndex = 0;
  }
  showImage(currentIndex);
}

function prevImage() {
  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = sliderImages.length - 1;
  }
  showImage(currentIndex);
}

prevButton.addEventListener("click", prevImage);
nextButton.addEventListener("click", nextImage);

showImage(currentIndex);
