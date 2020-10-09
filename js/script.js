const carousel = document.querySelector('.carousel');
const carouselContent = document.querySelector('.carousel-content');
const slides = document.querySelectorAll('.slide');
const leftControl = document.querySelector('.left');
const rightControl = document.querySelector('.right');
let moveSlides = true;
let slidesAmount;
let lengthSlide;
const arrayOfSlides = Array.prototype.slice.call(slides);

leftControl.addEventListener('click', moveLeft);
rightControl.addEventListener('click', moveRight);
window.addEventListener('resize', displaySlides);

function moveLeft() {
  if (moveSlides = true) {
    moveSlides = false;
    const firstSlide = carouselContent.firstElementChild;
    firstSlide.addEventListener('transitionend', activateAgain);
    moveSlidesRight();
    const lastSlide = carouselContent.lastElementChild;
    lastSlide.parentNode.removeChild(lastSlide);
    carouselContent.insertBefore(lastSlide, carouselContent.firstChild);
    removeSlide();
  }
}

function removeSlide() {
  const firstSlide = carouselContent.firstElementChild;
  firstSlide.parentNode.removeChild(firstSlide);
}

function moveSlidesRight() {
  const slides = document.querySelectorAll('.slide');
  let slidesArray = Array.prototype.slice.call(slides);
  let width = 0;

  slidesArray.forEach(function(el, i){
    el.style.left = width + "px";
    width += lengthSlide;
  });
  addSlide();
}
moveSlidesRight();

function addSlide() {
  const lastSlide = carouselContent.lastElementChild.cloneNode(true);
  lastSlide.style.left = (-lengthSlide) + "px";
  carouselContent.insertBefore(lastSlide, carouselContent.firstChild);
}

function moveRight() {
  if (moveSlides) {
    moveSlides = false;
    removeSlide();
    const firstSlide = carouselContent.firstElementChild;
    firstSlide.addEventListener('transitionend', replaceToEnd);
    moveSlidesLeft();
  }
}

function moveSlidesLeft() {
  const slides = document.querySelectorAll('.slide');
  let slidesArray = Array.prototype.slice.call(slides);
  slidesArray = slidesArray.reverse();
  let maxWidth = (slidesArray.length - 1) * lengthSlide;

  slidesArray.forEach(function(el){
    maxWidth -= lengthSlide;
    el.style.left = maxWidth + "px";
  });
}

function setSlidesSize() {
  const slides = document.querySelectorAll('.slide');
  let slidesArray = Array.prototype.slice.call(slides);
  lengthSlide = ( carousel.offsetWidth  / slidesAmount );
  let width = -lengthSlide;
  slidesArray.forEach(function(el) {
    el.style.width = lengthSlide + "px";
    el.style.left = width + "px";
    width += lengthSlide;
  });
}

function activateAgain() {
  const firstSlide = carouselContent.firstElementChild;
  moveSlides = true;
  firstSlide.removeEventListener('transitionend', activateAgain);
}

function replaceToEnd() {
  const firstSlide = carouselContent.firstElementChild;
  firstSlide.parentNode.removeChild(firstSlide);
  carouselContent.appendChild(firstSlide);
  firstSlide.style.left = ((arrayOfSlides.length -1) * lengthSlide) + "px";
  addSlide();
  moveSlides = true;
  firstSlide.removeEventListener('transitionend', replaceToEnd);
}

function displaySlides() {
  if (window.innerWidth >= 991) {
    slidesAmount = 3;
  } else if (window.innerWidth >= 767) {
    slidesAmount = 2;
  } else {
    slidesAmount = 1;
  }
  setSlidesSize();
}

displaySlides();

const navbar = document.querySelector('.navbar');
const menu = document.querySelector('.navigation-list');

navbar.addEventListener('click', function() {
  menu.classList.toggle('active');
});

const scrollTop = document.querySelector('.back-to-top');

scrollTop.addEventListener('click', function(){
  window.scrollTo(0, 0);
});