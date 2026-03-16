let default_point = [];
let offsetX;
let offsetY;
let levelH;
let stairsH;

let first_point = [];
let second_point = [];
let third_point = [];
let fourth_point = [];

let count;
let divide = []; //array 할거면 꼭 []
//변마다 칸 개수>각 default_point 정하기

let sec, min, hour;
let colorM;

//한번 실행
function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB, 60, 60, 60, 60);
  // default_point = [windowWidth * 0.5, windowHeight * 0.5];

  setPoint();
  setInterval(() => {
    console.log(sec + "초");
  }, 1000);
}

//몇 프레임.. 가능한 만큼 실행
function draw() {
  background(0); //220>>rgb 값 3개 다 같아서 이거 하나 쓴
  colorMode(RGB, 60, 60, 60, 60);
  strokeWeight(0);

  sec = second();
  min = minute();

  //
  push();
  translate(
    windowWidth * 0.5 - fourth_point[0] * 0.5 - second_point[0] * 0.5,
    windowHeight * 0.5 - second_point[1] - first_point[1],
  );
  for (let i = 0; i < default_point.length; i += 2) {
    colorM = (60 - (sec - i / 2)) % 60;
    stroke(60, 60, 60);
    strokeWeight(1);
    fill(colorM, 0, 0);
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
    fill(0, 0, colorM);
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
    fill(colorM, colorM, 0);
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
  pop();
}

//화면 크기 달라질때 실행
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // default_point = [windowWidth * 0.5, windowHeight * 0.5];
  default_point = [];
  setPoint();
}

function setPoint() {
  offsetX = 30;
  offsetY = 15;
  levelH = 10;
  stairsH = levelH;

  let upperRightAdd = 5;
  let upperLeftAdd = 25;
  let belowRightAdd = 5;
  let belowLeftAdd = 25; // 4개 더한 값이 60 되어야 함

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
    first_point[0] - offsetX * upperLeftAdd,
    first_point[1] + (offsetY - levelH) * upperLeftAdd,
  ];

  //1 -> 4
  default_point.push(first_point[0], first_point[1]); //1

  count = upperLeftAdd;
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
  count = belowLeftAdd;

  if (fourth_point[0] < third_point[0]) {
    divide[0] = abs(third_point[0] - fourth_point[0]) / count;
  } else {
    divide[0] = -abs(third_point[0] - fourth_point[0]) / count;
  }
  if (fourth_point[1] < third_point[1]) {
    divide[1] = abs(fourth_point[1] - third_point[1]) / count;
  } else {
    divide[1] = -abs(fourth_point[1] - third_point[1]) / count;
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

  // 2->1
  count = upperRightAdd;

  divide = [
    abs(first_point[0] - second_point[0]) / count,
    abs(first_point[1] - second_point[1]) / count,
  ];

  for (let i = count; i > 0; i--) {
    default_point.push(
      first_point[0] + divide[0] * i,
      first_point[1] + divide[1] * i,
    );
  }

  // default_point.push(third_point[0], third_point[1]); //3
}
