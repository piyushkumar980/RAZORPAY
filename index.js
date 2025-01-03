// JavaScript for Slideshow Functionality
const slides = document.querySelectorAll(".slide");
let currentIndex = 0;
let slideInterval;

// Function to show a specific slide
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.add("hidden");
    if (i === index) slide.classList.remove("hidden");
  });
}

// Next Slide
function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
  resetAutoSlideshow(); // Reset auto slideshow after button click
}

// Previous Slide
function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
  resetAutoSlideshow(); // Reset auto slideshow after button click
}

// Function to start the automatic slideshow
function startAutoSlideshow() {
  slideInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
}

// Function to reset the automatic slideshow
function resetAutoSlideshow() {
  clearInterval(slideInterval); // Stop the current interval
  startAutoSlideshow(); // Restart the interval after 3 seconds delay
}

// Event Listeners for Buttons
document.getElementById("nextBtn").addEventListener("click", nextSlide);
document.getElementById("prevBtn").addEventListener("click", prevSlide);

// Start the auto slideshow initially
startAutoSlideshow();

// Initial Slide
showSlide(currentIndex);

const logoScroller = document.querySelector("#scrollContent");

// Scrolling functionality
let position = 0;
const scrollSpeed = 1; // Adjust the speed of scrolling

// Duplicate the logos for seamless scrolling
const duplicateLogos = logoScroller.innerHTML;
logoScroller.innerHTML += duplicateLogos; // Append duplicate logos for infinite scrolling

// Scroll function
function scrollLogos() {
  position -= scrollSpeed; // Move the container to the left

  // Reset position for seamless scrolling
  if (Math.abs(position) >= logoScroller.scrollWidth / 2) {
    position = 0;
  }

  // Apply the scrolling effect
  logoScroller.style.transform = `translateX(${position}px)`;

  // Continue the animation
  requestAnimationFrame(scrollLogos);
}

// Start the scrolling animation
scrollLogos();

const buttons = document.querySelectorAll(".flex button");
const sections = document.querySelectorAll(".relative > div");

let currentSection = "section1"; // Default visible section

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetSection = button.dataset.target;

    // Add green underline to the active button
    buttons.forEach((btn) => btn.classList.remove("border-green-500"));
    button.classList.add("border-green-500");

    if (currentSection !== targetSection) {
      // Slide out current section
      const current = document.getElementById(currentSection);
      current.classList.add("slide-out-left");
      current.addEventListener(
        "animationend",
        () => {
          current.classList.add("hidden");
          current.classList.remove("slide-out-left");
        },
        { once: true }
      );

      // Slide in new section
      const target = document.getElementById(targetSection);
      target.classList.remove("hidden");
      target.classList.add("slide-in-right");
      target.addEventListener(
        "animationend",
        () => {
          target.classList.remove("slide-in-right");
        },
        { once: true }
      );

      currentSection = targetSection; // Update current section
    }
  });
});

const container = document.getElementById("container");
const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");

let presentIndex = 0;

function updateView() {
  const scrollAmount = container.offsetWidth;
  container.scrollTo({
    left: presentIndex * scrollAmount,
    behavior: "smooth",
  });
}

// Handle right button click
rightButton.addEventListener("click", () => {
  if (presentIndex < container.children.length - 1) {
    presentIndex++;
    updateView();
  }
});

// Handle left button click
leftButton.addEventListener("click", () => {
  if (presentIndex > 0) {
    presentIndex--;
    updateView();
  }
});

// Initialize view
updateView();

const scrollingDiv = document.getElementById("scrollingDiv");

let place = 0; // Initial position
const step = 1; // Pixels to move per frame
const speed = 10; // Milliseconds between frames

function scrollContent() {
  place -= step;
  const containerWidth = scrollingDiv.parentElement.offsetWidth;
  const contentWidth = scrollingDiv.offsetWidth;

  // Reset position when content scrolls out of view
  if (Math.abs(place) >= contentWidth) {
    place = containerWidth;
  }

  scrollingDiv.style.transform = `translateX(${place}px)`;
  requestAnimationFrame(scrollContent);
}

// Start scrolling
scrollContent();
