var default_point = [];
var offsetX;
var offsetY;
var stairsH;

var first_point = [];
var second_point = [];
var third_point = [];
var fourth_point = [];

var count;
var divide = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  setPoint();
}

function draw() {
  background(0);
  strokeWeight(0);

  // stroke("red");

  for (let i = 0; i < default_point.length; i += 2) {
    fill("red");
    quad(
      default_point[i],
      default_point[i + 1],
      default_point[i] + offsetX,
      default_point[i + 1] + offsetY,
      default_point[i],
      default_point[i + 1] + offsetY * 2,
      default_point[i] - offsetX,
      default_point[i + 1] + offsetY,
    );
    fill("blue");
    quad(
      default_point[i],
      default_point[i + 1] + offsetY * 2,
      default_point[i],
      default_point[i + 1] + offsetY * 2 + stairsH,
      default_point[i] - offsetX,
      default_point[i + 1] + offsetY + stairsH,
      default_point[i] - offsetX,
      default_point[i + 1] + offsetY,
    );
    fill("yellow");
    quad(
      default_point[i],
      default_point[i + 1] + offsetY * 2,
      default_point[i],
      default_point[i + 1] + offsetY * 2 + stairsH,
      default_point[i] + offsetX,
      default_point[i + 1] + offsetY + stairsH,
      default_point[i] + offsetX,
      default_point[i + 1] + offsetY,
    );

    fill(0);
    if (i == 28 * 2) {
      quad(
        first_point[0],
        first_point[1] + stairsH * 0.3,
        second_point[0] + offsetX,
        second_point[1] + offsetY + stairsH * 0.3,
        third_point[0],
        third_point[1] + offsetY * 2 + stairsH * 0.3,
        fourth_point[0] - offsetX,
        fourth_point[1] + offsetY + stairsH * 0.3,
      );
    }
    // fill(255);
    if (i == 59 * 2) {
      beginShape();

      vertex(0, windowHeight);
      vertex(windowWidth, windowHeight);
      vertex(windowWidth, second_point[1] + offsetY + stairsH * 0.3);
      vertex(
        second_point[0] + offsetX,
        second_point[1] + offsetY + stairsH * 0.3,
      );
      vertex(third_point[0], third_point[1] + offsetY * 2 + stairsH * 0.3);
      vertex(
        fourth_point[0] - offsetX,
        fourth_point[1] + offsetY + stairsH * 0.3,
      );
      vertex(0, fourth_point[1] + offsetY + stairsH * 0.3);

      endShape(CLOSE);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // default_point = [windowWidth * 0.5, windowHeight * 0.5];
  default_point = [];
  setPoint();
}

function setPoint() {
  offsetX = 40;
  offsetY = 20;
  stairsH = 1000;

  first_point = [windowWidth * 0.65, windowHeight * 0.2];
  second_point = [windowWidth * 0.9, windowHeight * 0.4];
  third_point = [windowWidth * 0.65, windowHeight * 0.6];
  fourth_point = [windowWidth * 0.1, windowHeight * 0.4];

  // 첫번째 점
  default_point.push(first_point[0], first_point[1]); // 1

  // 1->4
  count = 20;
  divide = [
    abs(first_point[0] - fourth_point[0]) / (count + 1),
    abs(first_point[1] - fourth_point[1]) / (count + 1),
  ];

  for (let i = 1; i < count + 1; i++) {
    default_point.push(
      first_point[0] - divide[0] * i,
      first_point[1] + divide[1] * i,
    );
  }

  // 1->2
  count = 8;
  divide = [
    abs(first_point[0] - second_point[0]) / (count + 1),
    abs(first_point[1] - second_point[1]) / (count + 1),
  ];

  for (let i = 1; i < count + 1; i++) {
    default_point.push(
      first_point[0] + divide[0] * i,
      first_point[1] + divide[1] * i,
    );
  }

  // 두/네번째
  default_point.push(second_point[0], second_point[1]); // 2
  default_point.push(fourth_point[0], fourth_point[1]); // 4

  // 4->3
  count = 20;
  divide = [
    abs(fourth_point[0] - third_point[0]) / (count + 1),
    abs(fourth_point[1] - third_point[1]) / (count + 1),
  ];

  for (let i = 1; i < count + 1; i++) {
    default_point.push(
      fourth_point[0] + divide[0] * i,
      fourth_point[1] + divide[1] * i,
    );
  }

  // 2->3
  count = 8;
  divide = [
    abs(second_point[0] - third_point[0]) / (count + 1),
    abs(second_point[1] - third_point[1]) / (count + 1),
  ];

  for (let i = 1; i < count + 1; i++) {
    default_point.push(
      second_point[0] - divide[0] * i,
      second_point[1] + divide[1] * i,
    );
  }

  // 세번째
  default_point.push(third_point[0], third_point[1]); // 3
}
