// Query Selectors
const dropdown = document.querySelector('.header_dropdown');
const dropdownOptions = document.querySelector('.header_dropdown_options');
const sliderImages = Array.from(
  document.querySelectorAll('.main_section_glutas')
);
const sliderDots = Array.from(document.querySelectorAll('.slider_dots'));
const backButton = document.querySelector('#back_button');
const forwardButton = document.querySelector('#forward_button');

// Utility Functions
const findCenteredItem = () => {
  const centeredImageIndex = sliderImages.findIndex((image) =>
    image.classList.contains('centered')
  );
  return centeredImageIndex;
};

const removeCenteredClass = () => {
  sliderImages.forEach((image) => image.classList.remove('centered'));
};

const paintSelectedDot = (imageIndex) => {
  sliderDots.forEach((dot) => {
    if (dot.id.slice(-1) - 1 === imageIndex) {
      dot.classList.add('selected_dot');
    } else {
      dot.classList.remove('selected_dot');
    }
  });
};

const scrollCenteredImageIntoView = () => {
  const centeredImage = sliderImages[findCenteredItem()];
  paintSelectedDot(findCenteredItem());
  centeredImage.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'center',
  });
};

// DOM-Dependent Functions
const centerPreviousImage = () => {
  const centeredImageIndex = findCenteredItem();
  removeCenteredClass();
  if (centeredImageIndex === 0) {
    sliderImages[5].classList.add('centered');
  } else {
    sliderImages[centeredImageIndex - 1].classList.add('centered');
  }
  scrollCenteredImageIntoView();
};

const centerNextImage = () => {
  const centeredImageIndex = findCenteredItem();
  removeCenteredClass();
  if (centeredImageIndex === 5) {
    sliderImages[0].classList.add('centered');
  } else {
    sliderImages[centeredImageIndex + 1].classList.add('centered');
  }
  scrollCenteredImageIntoView();
};

const centerSelectedImage = (index) => {
  sliderImages[index].classList.add('centered');
  scrollCenteredImageIntoView();
  paintSelectedDot(index);
};

// Event Listeners
dropdown.addEventListener('mouseenter', () => {
  dropdownOptions.style.display = 'flex';
  dropdownOptions.classList.add('animate-in');
  dropdownOptions.classList.remove('animate-out');
});

dropdown.addEventListener('mouseleave', () => {
  dropdownOptions.classList.add('animate-out');
  dropdownOptions.classList.remove('animate-in');
  dropdownOptions.addEventListener(
    'animationend',
    () => {
      if (dropdownOptions.classList.contains('animate-out')) {
        dropdownOptions.style.display = 'none';
      }
    },
    { once: true }
  );
});

backButton.addEventListener('click', () => {
  centerPreviousImage();
});

forwardButton.addEventListener('click', () => {
  centerNextImage();
});

sliderDots.forEach((dot) => {
  dot.addEventListener('click', (e) => {
    removeCenteredClass();
    const sliderImageIndex = e.target.id.slice(-1) - 1;
    centerSelectedImage(sliderImageIndex);
  });
});

// Execution
centerSelectedImage(0);
