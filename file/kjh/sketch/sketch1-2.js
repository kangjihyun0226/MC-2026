let default_point = [];
let offsetX;
let offsetY;
let stairsH;
let levelH;

let first_point = [];
let second_point = [];
let third_point = [];
let fourth_point = [];

let count;
let divide = []; //array 할거면 꼭 []
//변마다 칸 개수>각 default_point 정하기

let ms, sec, min, h;
let colorM;

//한번 실행
function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  setPoint();

  setInterval(() => {
    console.log(sec + "초");
  }, 1000);
}

//화면 크기 달라질때 실행
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  default_point = [];
  setPoint();
}

//몇 프레임.. 가능한 만큼 실행
function draw() {
  ms = new Date().getMilliseconds() * 0.001;
  sec = second();
  min = minute();
  h = hour();
  background(0);
  colorMode(RGB, 60, 60, 60, 59);

  //
  push();
  translate(
    windowWidth * 0.5 - second_point[0] * 0.5 - fourth_point[0] * 0.5,
    windowHeight * 0.5 - second_point[1] - first_point[1],
  );
  minChanged();
  noFill();
  fill(60, 0, 0);
  beginShape();
  vertex(...first_point);
  vertex(first_point[0], first_point[1] - 20);
  vertex(first_point[0] + 10, first_point[1] - 15);
  vertex(first_point[0], first_point[1] - 10);
  endShape(CLOSE);
  secChanged();
  pop();
}

function minChanged() {
  colorMode(RGB, 60, 60, 60, 59);
  for (let i = 0; i < default_point.length; i += 2) {
    colorM = (60 - (min - i / 2)) % 60;
    stroke(60, 0, 0);
    strokeWeight(1);
    // fill(255, 0, 0, abs(i - sec));
    fill(colorM - 5);
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
    fill(0, colorM, colorM + 15);
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
    fill(colorM + 15, 0, colorM);
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
  }
}

function easeOutBounce(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  // return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function secChanged() {
  colorMode(HSB, 24, 1, 1, 24);
  // h =
  //   hour() +
  //   (minute() + (second() + new Date().getMilliseconds() * 0.001) / 60) / 60;
  fill(h, 1, 1);
  stroke(0, 0, 0);
  let jump = 60;
  console.log(default_point.length);
  // noStroke();
  let startPoint = [default_point[sec * 2], default_point[sec * 2 + 1]];
  let middlePoint = [
    default_point[sec * 2] +
      (default_point[(sec * 2 + 2) % 120] - default_point[sec * 2]) * 0.5,
    default_point[sec * 2 + 1] +
      (default_point[(sec * 2 + 1 + 2) % 120] - default_point[sec * 2 + 1]) *
        0.5 -
      jump,
  ];
  let endPoint = [
    default_point[(sec * 2 + 2) % 120],
    default_point[(sec * 2 + 1 + 2) % 120],
  ];
  let ballX =
    Math.pow(1 - easeOutBounce(ms), 2) * startPoint[0] +
    2 * (1 - easeOutBounce(ms)) * easeOutBounce(ms) * middlePoint[0] +
    Math.pow(easeOutBounce(ms), 2) * endPoint[0];

  let ballY =
    Math.pow(1 - easeOutBounce(ms), 2) * startPoint[1] +
    2 * (1 - easeOutBounce(ms)) * easeOutBounce(ms) * middlePoint[1] +
    Math.pow(easeOutBounce(ms), 2) * endPoint[1];

  circle(ballX, ballY, 25);

  for (let i = 0; i < default_point.length; i += 2) {
    colorS = (60 - (sec - i / 2)) % 60;
  }
}

function setPoint() {
  offsetX = 30;
  offsetY = 15;
  levelH = 10;
  stairsH = levelH;

  let upperRightAdd = 5;
  let upperLefttAdd = 25;
  let belowRightAdd = 5;
  let belowLefttAdd = 25;

  //포인트
  first_point = [0, 0];
  second_point = [
    first_point[0] + offsetX * upperRightAdd,
    first_point[1] + (offsetY + levelH) * upperRightAdd,
  ];
  third_point = [
    second_point[0] - offsetX * belowRightAdd,
    second_point[1] + (offsetY + levelH) * belowRightAdd,
  ];
  fourth_point = [
    first_point[0] - offsetX * upperLefttAdd,
    first_point[1] + (offsetY - levelH) * upperLefttAdd,
  ];

  //1 -> 4
  default_point.push(first_point[0], first_point[1]); //1

  count = upperLefttAdd;
  divide = [
    abs(first_point[0] - fourth_point[0]) / count,
    abs(first_point[1] - fourth_point[1]) / count,
  ];

  for (let i = 1; i < count + 1; i++) {
    default_point.push(
      first_point[0] - divide[0] * i,
      first_point[1] + divide[1] * i,
    );
  }

  //4->3
  count = belowLefttAdd;
  if (fourth_point[0] < third_point[0]) {
    divide[0] = [abs(third_point[0] - fourth_point[0]) / count];
  } else {
    divide[0] = [-abs(third_point[0] - fourth_point[0]) / count];
  }

  if (fourth_point[1] < third_point[1]) {
    divide[1] = [abs(fourth_point[1] - third_point[1]) / count];
  } else {
    divide[1] = [-abs(fourth_point[1] - third_point[1]) / count];
  }

  for (let i = 1; i < count; i++) {
    default_point.push(
      fourth_point[0] + divide[0] * i,
      fourth_point[1] + divide[1] * i,
    );
  }

  // 3->2
  count = belowRightAdd;

  divide = [
    abs(second_point[0] - third_point[0]) / count,
    abs(second_point[1] - third_point[1]) / count,
  ];

  for (let i = count; i > 0; i--) {
    default_point.push(
      second_point[0] - divide[0] * i,
      second_point[1] + divide[1] * i,
    );
  }

  //2->1
  count = upperRightAdd;

  divide = [
    abs(first_point[0] - second_point[0]) / count,
    abs(first_point[1] - second_point[1]) / count,
  ];
  // console.log(divide)

  for (let i = count; i > 0; i--) {
    default_point.push(
      first_point[0] + divide[0] * i,
      first_point[1] + divide[1] * i,
    );
  }
}
