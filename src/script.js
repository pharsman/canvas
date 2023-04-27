"use strict";

(() => {
  // Obtain a reference to the canvas element using its id.
  let htmlCanvas = document.getElementById("canvas");
  // Obtain a graphics context on the canvas element for drawing.
  let context = htmlCanvas.getContext("2d");

  // Display custom canvas. In this case it's a blue, 5 pixel
  // border that resizes along with the browser window.
  const redraw = () => {
    // context.strokeStyle = "blue";
    context.lineWidth = "5";
    context.strokeRect(0, 0, window.innerWidth, window.innerHeight);
  };

  // Runs each time the DOM window resize event fires.
  // Resets the canvas dimensions to match window,
  // then draws the new borders accordingly.
  const resizeCanvas = () => {
    htmlCanvas.width = window.innerWidth;
    htmlCanvas.height = window.innerHeight;
    redraw();
  };

  const initialize = () => {
    // Register an event listener to call the resizeCanvas() function
    // each time the window is resized.
    window.addEventListener("resize", resizeCanvas, false);
    // Draw canvas border for the first time.
    resizeCanvas();
  };

  // Start listening to resize events and draw canvas.
  initialize();
})();

let canvas = document.querySelector("canvas");

let c = canvas.getContext("2d");

// c.beginPath();
// c.fillStyle = "orange";
// c.fillRect(100, 100, 100, 100); // x,y,width,height
// c.fillStyle = "blue";
// c.fillRect(400, 100, 100, 100);
// c.fillStyle = "green";
// c.fillRect(300, 300, 100, 100);
// c.stroke();

//Line
// c.beginPath();
// c.moveTo(150, 400); //x,y
// c.lineTo(400, 100); //x,y
// c.lineTo(700, 500);
// c.lineTo(500, 600);
// c.strokeStyle = "red";
// c.stroke();

// Arc / Circ;e

// for (let i = 0; i < 10; i++) {
//   let x = Math.random() * window.innerWidth;
//   let y = Math.random() * window.innerHeight;
//   let r = Math.floor(Math.random() * 255);
//   let g = Math.floor(Math.random() * 255);
//   let b = Math.floor(Math.random() * 255);
//   c.beginPath();
//   c.arc(x, y, 30, 0, Math.PI * 2, false); // x y radius
//   c.strokeStyle = "rgb(" + r + "," + g + "," + b + ")";
//   c.stroke();
// }

// let radius = 30;
// let x = Math.random() * innerWidth;
// let y = Math.random() * innerHeight;
// let dx = Math.random() * (40 - 20 + 1) + 20;
// let dy = Math.random() * (40 - 20 + 1) + 20;

let mouse = {
  x: undefined,
  y: undefined,
};

let maxRadius = 80;

window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
  console.log("x: " + mouse.x, "y: " + mouse.y);
});

class Circle {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
    this.radius = radius;
    this.minRadius = radius;

    this.draw = () => {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false); // x y radius
      c.fill();
      c.fillStyle = "black";
      c.stroke();
      c.strokeStyle = this.color;
    };
    this.update = () => {
      if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.dx = -this.dx;
      }
      if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        this.dy = -this.dy;
      }
      this.x += this.dx;
      this.y += this.dy;

      // interactivity
      if (
        mouse.x - this.x < 50 &&
        mouse.x - this.x > -50 &&
        mouse.y - this.y < 50 &&
        mouse.y - this.y > -50
      ) {
        if (this.radius < maxRadius) {
          this.radius += 15;
        }
      } else if (this.radius > this.minRadius) {
        this.radius -= 1;
      }
      this.draw();
    };
  }
}

let circle;
let circleArray = [];

for (let i = 0; i < 1000; i++) {
  let radius = Math.random() * 4 + 1;
  let x = Math.random() * (innerWidth - radius * 2) + radius;
  let y = Math.random() * (innerHeight - radius * 2) + radius;
  let dx = Math.random() - 0.5;
  let dy = Math.random() - 0.5;
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  let circleColor = "rgb(" + r + "," + g + "," + b + ")";

  circleArray.push(new Circle(x, y, dx, dy, radius, circleColor));
}

console.log(circleArray);

const animate = () => {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
};
animate();
