const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const dots = [];
const meteoroids = [];
const colors = ["red", "blue", "white"];
const maxDots = 100;
const maxRadius = 3;
const maxMeteoroids = 5;
const mouse = {
  x: undefined,
  y: undefined,
};

class Dot {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.minRadius = radius;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    if (this.radius > this.minRadius) {
      this.radius -= 0.1;
    } else {
      this.radius += 0.1;
    }
    this.draw();
  }
}

class Meteoroid {
  constructor(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.alpha = 1;
  }

  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  update() {
    this.x += this.speed;
    this.y += this.speed;
    this.alpha -= 0.01;
    if (this.alpha <= 0) {
      this.reset();
    }
    this.draw();
  }

  reset() {
    this.x = (Math.random() * canvas.width) / 4;
    this.y = (Math.random() * canvas.height) / 4;
    this.alpha = 1;
  }
}

function createDots() {
  for (let i = 0; i < maxDots; i++) {
    const radius = Math.random() * maxRadius;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const color = colors[Math.floor(Math.random() * colors.length)];
    dots.push(new Dot(x, y, radius, color));
  }
}

function createMeteoroids() {
  for (let i = 0; i < maxMeteoroids; i++) {
    const size = Math.random() * 2;
    const speed = Math.random() * 2 + 1;
    const x = (Math.random() * canvas.width) / 4;
    const y = (Math.random() * canvas.height) / 4;
    meteoroids.push(new Meteoroid(x, y, size, speed));
  }
}

function connectDots() {
  for (let i = 0; i < dots.length; i++) {
    const dx = mouse.x - dots[i].x;
    const dy = mouse.y - dots[i].y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 100) {
      ctx.beginPath();
      ctx.moveTo(mouse.x, mouse.y);
      ctx.lineTo(dots[i].x, dots[i].y);
      ctx.strokeStyle = "white";
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < dots.length; i++) {
    dots[i].update();
  }
  for (let i = 0; i < meteoroids.length; i++) {
    meteoroids[i].update();
  }
  connectDots();
}

canvas.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

createDots();
createMeteoroids();
animate();

const marqueAnimation = () => {
  const marque = document.querySelectorAll(".marque");
  const marque_Right = document.querySelectorAll(".marque_right");

  window.addEventListener("wheel", (event) => {
    if (event.deltaY > 0) {
      gsap.to(marque_Right, {
        transform: "translateX(0%)",
        duration: 4,
        repeat: -1,
        ease: "none",
      });
      gsap.to(".marque_Right img", {
        rotate: "0deg",
      });
    } else {
      gsap.to(marque_Right, {
        transform: "translateX(-200%)",
        duration: 4,
        repeat: -1,
        ease: "none",
      });
      gsap.to(".marque_Right img", {
        rotate: "180deg",
      });
    }

    if (event.deltaY > 0) {
      gsap.to(marque, {
        transform: "translateX(-200%)",
        duration: 4,
        repeat: -1,
        ease: "none",
      });
      gsap.to(".marque img", {
        rotate: "180deg",
      });
    } else {
      gsap.to(marque, {
        transform: "translateX(0%)",
        duration: 4,
        repeat: -1,
        ease: "none",
      });
      gsap.to(".marque img", {
        rotate: "0deg",
      });
    }
  });
};

marqueAnimation();

// GSAP animation to resize the clip-path circle on scroll
gsap.to(".section2", {
  clipPath: "circle(100% at 50% 50%)", // Expand to full screen
  duration: 2, 
  ease: "power1.out",
  scrollTrigger: {
    trigger: ".welcome_page", 
    start: "top top", 
    end: "bottom 60%",
    scrub: 2, 
    toggleActions: "play reverse play reverse", 
  },
});

gsap.to("#robo", {
  scale: 11,
  y: -50,
  x: 142,
  opacity:0,
  sttagger: 0.2,
  duration: 2,
  scrollTrigger: {
    trigger: ".welcome_page",
    start: "top top%",
    end: "bottom center",
    scrub: 2, // Smoothly scrubs the animation based on the scroll position
  },
});


// for mobile device
gsap.to(".ExtraO", {
  scale: 10,
  opacity: 0,
  duration: 2,
  scrollTrigger: {
    trigger: "welcome_page",
    start: "top -2%",
    end: "bottom center",
    scrub:2
  }
})


// for looping the video 
  const video1 = document.getElementById("backgroundVideoOne");
  const video2 = document.getElementById("backgroundVideoTwo");

  video1.play();

  video1.addEventListener("ended", () => {
    video1.style.display = "none";
    video2.style.display = "block";
    video2.play();
  });

  video2.addEventListener("ended", () => {
    video2.style.display = "none";
    video1.style.display = "block";
    video1.play();
  });
