const {
  Engine,
  Runner,
  Composites,
  MouseConstraint,
  Mouse,
  Composite,
  Bodies,
} = Matter;

let stack;
let walls;
let engine;
let world;
let secondBalls = [];
let secondR = 42;
let minuteBalls = [];
let minuteR = 42;
let hourBalls = [];
let hourR = 68;

function setup() {

  createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  createWalls();

  const mouse = Mouse.create(canvas.elt); 
  mouse.pixelRatio = pixelDensity();

  const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: {
      stiffness: 0.1,
    },
  });

  Composite.add(world, mouseConstraint);

  const runner = Runner.create();
  Runner.run(runner, engine);

  // 초기 공 생성
  const currentSecond = second();
  const currentMinute = minute();
  const currentHour = hour();

  for (let i = 0; i < currentSecond; i++) dropSBall();
  for (let i = 0; i < currentMinute; i++) dropMBall();
  for (let i = 0; i < currentHour; i++) dropHBall();
}

// 3. 창 크기가 바뀔 때 캔버스와 벽의 위치를 업데이트합니다.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // 기존 벽을 제거하고 새로 생성하여 화면 크기에 맞춥니다.
  Composite.remove(world, walls);
  createWalls();
}

function createWalls() {
  walls = [
    Bodies.rectangle(width * 0.5, height + 50, width, 100, { isStatic: true }), // 하단
    Bodies.rectangle(-50, height * 0.5, 100, height, { isStatic: true }), // 좌측
    Bodies.rectangle(width + 50, height * 0.5, 100, height, { isStatic: true }), // 우측
    Bodies.rectangle(width * 0.33, height * 0.5, 100, height * 2, {
      isStatic: true,
    }), // 중앙 좌
    Bodies.rectangle(width * 0.66, height * 0.5, 100, height * 2, {
      isStatic: true,
    }), // 중앙 우
  ];
  Composite.add(world, walls);
}

// 공 낙하 로직 (기존과 동일하지만 width 기반으로 좌표 작동)
function dropSBall() {
  const sBall = Bodies.circle(width * 0.8, -50, secondR);
  secondBalls.push(sBall);
  Composite.add(world, sBall);
}

function dropMBall() {
  const mBall = Bodies.circle(width * 0.5, -50, minuteR);
  minuteBalls.push(mBall);
  Composite.add(world, mBall);
}

function dropHBall() {
  const hBall = Bodies.circle(width * 0.15, -50, hourR);
  hourBalls.push(hBall);
  Composite.add(world, hBall);
}
function draw() {
  let bgColor;
  let sColor;
  let mColor;
  let hColor;
  const sr = minute();

  if (sr % 2 === 0) {
    bgColor = "#000000";
    sColor = "#ffffff";
    mColor = "#ffffff";
    hColor = "#ffffff";
  } else {
    bgColor = "#ffffff";
    sColor = "#000000";
    mColor = "#000000";
    hColor = "#000000";
  }

  background(bgColor);

  const h = hour();
  const m = minute();
  const s = second();
  push();
  // const displayTimeH = nf(h, 2);
  // const displayTime1 = " : ";
  // const displayTimeM = nf(m, 2);
  // const displayTime2 = " : ";
  // const displayTimeS = nf(s, 2);
  textAlign(CENTER, CENTER);
  textFont("Barlow Condensed");
  textStyle(BOLD);
  textSize(width * 0.26); // 화면 너비에 비례한 크기

  if (sr % 2 === 0) {
    fill(255);
  } else {
    fill(0);
  }
  noStroke();

  // 화면 정중앙에 출력
  text(nf(s, 2), (width * 5) / 6, height / 2);
  text(nf(h, 2), width / 6, height / 2);
  text(" : ", width * 0.33, height / 2);
  text(nf(m, 2), width / 2, height / 2);
  text(" : ", width * 0.66, height / 2);

  pop();

  function drawDistortedBall(ball, r, color) {
    let x = ball.position.x;
    let y = ball.position.y;

    let imgX = constrain(x - r, 0, width - r * 2);
    let imgY = constrain(y - r, 0, height - r * 2);

    //(공 크기만큼)

    let img = get(imgX, imgY, r * 2, r * 2);

    push();
    // 마스킹 효과
    // 이미지 확대
    beginClip();
    circle(x, y, r * 2);
    endClip();

    if (img) {
      imageMode(CENTER);
      //왜곡 효과
      image(img, x, y, r * 3.6, r * 3.6);
    }
    pop();
    //
    push();
    noFill();
    drawingContext.shadowBlur = 15; // 번짐의 정도
    drawingContext.shadowColor = color; // 번짐의 색상
    stroke(color);
    strokeWeight(2);
    circle(x, y, r * 2);

    pop();
  }

  // 공 렌더링

  stroke(sColor);
  secondBalls.forEach((ball) => drawDistortedBall(ball, secondR, sColor));
  stroke(mColor);
  minuteBalls.forEach((ball) => drawDistortedBall(ball, minuteR, mColor));
  stroke(hColor);
  hourBalls.forEach((ball) => drawDistortedBall(ball, hourR, hColor));

  // 현재 시각 가져오기
  const currentSecond = second();
  const currentMinute = minute();
  const currentHour = hour();

  // 초 공
  if (secondBalls.length < currentSecond) {
    dropSBall();
  } else if (secondBalls.length > currentSecond) {
    // 0초로 넘어갈 때 모든 초 공 제거
    const ballToRemove = secondBalls.shift();
    Composite.remove(world, ballToRemove);
  }

  // 분 공
  if (minuteBalls.length < currentMinute) {
    dropMBall();
  } else if (minuteBalls.length > currentMinute) {
    //0분으로 넘어갈 때 모든 분 공 제거
    const ballToRemove = minuteBalls.shift();
    Composite.remove(world, ballToRemove);
  }

  // 시 공
  if (hourBalls.length < currentHour) {
    dropHBall();
  } else if (hourBalls.length > currentHour) {
    // 12시 -> 1시로 넘어갈 때 시 공 제거
    const ballToRemove = hourBalls.shift();
    Composite.remove(world, ballToRemove);
  }

  noStroke();
  noFill(); // 채우기 없음

  // 벽 렌더링
  walls.forEach((aBody) => {
    beginShape();
    aBody.vertices.forEach((aVertex) => {
      vertex(aVertex.x, aVertex.y);
    });
    endShape(CLOSE);
  });
}
