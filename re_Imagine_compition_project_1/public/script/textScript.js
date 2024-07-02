gsap.registerPlugin(ScrollTrigger);

//breaking welcome text
const breakWelcomeText = () => {

  gsap.from(".text_content .text-container", {
    x: -20,
    duration: 2,
    opacity: 0,
  });
}


// animation firstPart of main title
const breakTheFirstText = () => {
  let h1 = document.querySelector(".first");
  let text = h1.textContent;

  let cluter = "";
  const splitText = text.split("");

  splitText.forEach((value, index) => {
    cluter += `<span class="first_part">${value}</span>`;
  });
  h1.innerHTML = cluter;

  gsap.from("h1 .first_part", {
    x: -70,
    duration: 1,
    stagger: 0.2,
    opacity: 0,
  });
};

// animation secondPart of main title
const breakTheSecondText = () => {
  let h1 = document.querySelector(".second");
  let text = h1.textContent;

  let cluter = "";
  const splitText = text.split("");

  splitText.forEach((value, index) => {
    cluter += `<span class="second_part">${value}</span>`;
  });
  h1.innerHTML = cluter;

  gsap.from("h1 .second_part", {
    x: -70,
    duration: 1,
    stagger: -0.2,
    opacity: 0,
  });
};

//breaking smallText
const breakSmallText = () => {
  let p = document.querySelector(".small_text");
  let text = p.textContent;

  let cluter = "";

  const splitText = text.split("");

  splitText.forEach((value, index) => {
    cluter += `<span class="all_latter">${value}</span>`;
  });
  p.innerHTML = cluter;

  gsap.from(".all_latter", {
    x: -200,
    color: "red",
    opacity: 0,
    duration: 2,
    stagger: 0.1,
  });
};

// out animation
const outAnimation = () => {
  gsap.to(".text_content .small_text", {
    x: -350,
    color: "blue",
    opacity: 0,
    scrub: 2,
    scrollTrigger: {
      trigger: ".welcome_page",
      start: "top -4%",
      end: "bottom 50%",
      scrub: 2,
    },
  });

  gsap.to(".text_content .the", {
    x: -350,
    color: "blue",
    opacity: 0,
    scale: 2,
    scrub: 2,
    scrollTrigger: {
      trigger: ".welcome_page",
      start: "top -4%",
      end: "bottom 50%",
      scrub: 2,
    },
  });

  gsap.to(".text_content .main_text .first", {
    color: "red",
    x: -350,
    opacity: 0,
    scale: 0.99,
    scrub: 2,
    stagger: 0.2,

    scrollTrigger: {
      trigger: ".welcome_page",
      start: "top -2%",
      end: "bottom 70%",
      scrub: 2,
    },
  });

  gsap.to(".text_content .main_text .second", {
    color: "blue",
    x: 350,
    opacity: 0,
    scale: 0.99,
    scrub: 2,
    stagger: 0.2, // Apply stagger effect

    scrollTrigger: {
      trigger: ".welcome_page",
      start: "top -2%",
      end: "bottom 70%",
      scrub: 2,
    },
  });

};




// the dynamix text animation
const words = ["adventure", "escape", "haven", "oasis", " new beginning"];
const textElement = document.getElementById("dynamic-text");
let wordIndex = 0;
let letterIndex = 0;
let isDeleting = false;


// text writing code
function type() {
  const currentWord = words[wordIndex];
  const currentText = textElement.textContent;

  if (isDeleting) {
    // Erase letters one by one
    textElement.textContent = currentWord.substring(0, letterIndex - 1);
    letterIndex--;

    if (letterIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  } else {
    // Write letters one by one
    textElement.textContent = currentWord.substring(0, letterIndex + 1);
    letterIndex++;

    if (letterIndex === currentWord.length) {
      isDeleting = true;
    }
  }

  setTimeout(type, isDeleting ? 200 : 500); // Speed for typing and erasing
}


// calling start
breakWelcomeText()
breakTheFirstText();
breakTheSecondText();
breakSmallText();
outAnimation();
document.addEventListener("DOMContentLoaded", () => {
  type();
});

