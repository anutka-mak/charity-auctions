document.cookie = "run_script=true";
const sliderContainer = document.querySelector('.slider-container');
const slider = document.querySelector('.slider');
const sliderImages = document.querySelectorAll('.slider-image');
const prevButton = document.querySelector('#prev');
const nextButton = document.querySelector('#next');
let currentIndex = 0;

// Функція для показу зображення з відповідним індексом
function showImage(index) {
  if (sliderImages[index]) {
    sliderImages.forEach(image => image.style.display = 'none');
    sliderImages[index].style.display = 'block';
    currentIndex = index;
  }
}

// Функція для перемикання до наступного зображення
function nextImage() {
  currentIndex++;
  // Перевірка, чи поточний індекс виходить за межі кількості зображень
  if (currentIndex >= sliderImages.length) {
    currentIndex = 0;
  }
  showImage(currentIndex);
}

// Функція для перемикання до попереднього зображення
function prevImage() {
  currentIndex--;
  // Перевірка, чи поточний індекс виходить за межі кількості зображень
  if (currentIndex < 0) {
    currentIndex = sliderImages.length - 1;
  }
  showImage(currentIndex);
}

// Додавання обробників подій до кнопок "Наступний" та "Попередній"
prevButton.addEventListener('click', prevImage);
nextButton.addEventListener('click', nextImage);

// Відображення початкового зображення
showImage(currentIndex); 
