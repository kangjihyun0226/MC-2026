let h, m, s, ms;
let hr, mr, sr;
let hl, ml, sl;
let angH, angM, angS, angHM, angMS, angSH, angSum;
let minRad;
let shrinkS = false;
let front,
  rear,
  frontH,
  frontM,
  frontS,
  rearH,
  rearM,
  rearS,
  faces = [];

//
function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  setSize();
}

//
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setSize();
}

//
function draw() {
  background(0, 0, 0.15);
  background(0, 0, 0.0);

  time();
  cube();

  // text
  fill(0, 0, 0.9);
  textSize(16);
  textAlign(LEFT, TOP);
  text(
    `${hour()}' ${minute()}' ${second()}" ${new Date().getMilliseconds()}`,
    10,
    10,
  );
  text(`${hour()}' ${minute()}' ${s / 6}"`, 10, 30);
  text(`${map(s, 0, 360, 0, 1)}"`, 10, 50);
}

//
function setSize() {
  minRad = min(windowWidth, windowHeight) * 0.5;
  sr = minRad * 0.9;
  mr = minRad * 0.75;
  hr = minRad * 0.6;
}

//
function setCoord() {
  front = [0, 0];

  rear = [
    front[0] + hl * cos(-90 + h) + ml * cos(-90 + m) + sl * cos(-90 + s),
    front[1] + hl * sin(-90 + h) + ml * sin(-90 + m) + sl * sin(-90 + s),
  ];

  frontH = [front[0] + hl * cos(-90 + h), front[1] + hl * sin(-90 + h)];

  frontM = [front[0] + ml * cos(-90 + m), front[1] + ml * sin(-90 + m)];

  frontS = [front[0] + sl * cos(-90 + s), front[1] + sl * sin(-90 + s)];

  rearH = [rear[0] - hl * cos(-90 + h), rear[1] - hl * sin(-90 + h)];

  rearM = [rear[0] - ml * cos(-90 + m), rear[1] - ml * sin(-90 + m)];

  rearS = [rear[0] - sl * cos(-90 + s), rear[1] - sl * sin(-90 + s)];
}

//
function time() {
  ms = new Date().getMilliseconds();
  s = (second() + ms * 0.001) * 6;
  m = minute() * 6 + s / 60;
  h = hour() * 15 + m / 24;

  let slt = sr * (s / 360);
  let mlt = mr * (m / 360);
  let hlt = hr * (h / 360);

  if (sl > slt) {
    sl = lerp(sl, 0, 0.095);
  } else {
    sl = slt;
  }
  if (ml > mlt) {
    ml = lerp(ml, 0, 0.095);
  } else {
    ml = mlt;
  }
  if (hl > hlt) {
    hl = lerp(hl, 0, 0.095);
  } else {
    hl = hlt;
  }
}

function cube() {
  setCoord();
  angleSum();

  strokeCap(SQUARE);
  rectMode(CENTER);
  colorMode(HSB, 360, 1, 1, 1);

  push();
  translate(
    (front[0] - rear[0]) / 2 + windowWidth * 0.5,
    (front[1] - rear[1]) / 2 + windowHeight * 0.5,
  );

  // rear
  fill(0, 0, 1);
  noStroke();
  // circle(...rear, 5);
  // circle(...rearH, 4);
  // circle(...rearM, 4);
  // circle(...rearS, 4);

  // faces (rear)
  // noFill();
  fill(0, 0, 1, 0.25);
  noStroke();
  // hour
  // fill(240, 0.7, 1, 0.25);
  shape([rear, rearS, frontH, rearM]);
  // minute
  // fill(120, 0.7, 1, 0.25);
  shape([rear, rearH, frontM, rearS]);
  // second
  // fill(0, 0.7, 1, 0.25);
  shape([rear, rearM, frontS, rearH]);

  // drawingContext.setLineDash([]);
  // faces (middle)
  fill(0, 0, 1, 0.25);
  stroke(0, 0, 1);
  strokeWeight(1);
  shape([rearS, frontM, rearH, frontS, rearM, frontH]);

  // faces (front)
  noStroke();
  if (angSum >= 359.99) {
    // drawingContext.setLineDash([5, 5]);
    lineRear();
    // drawingContext.setLineDash([]);
    // hour
    fill(240, 1, 1, 0.7);
    shape([front, frontM, rearH, frontS]);
    // minute
    fill(120, 1, 1, 0.7);
    shape([front, frontS, rearM, frontH]);
    // second
    fill(0, 1, 1, 0.7);
    shape([front, frontH, rearS, frontM]);
  } else {
    // drawingContext.setLineDash([]);
    if (abs(angHM + angMS) - angSH < 0.001) {
      // second
      fill(0, 1, 1, 0.7);
      shape([front, frontH, rearS, frontM]);
      // hour
      fill(240, 1, 1, 0.7);
      shape([front, frontM, rearH, frontS]);
      // minute
      fill(120, 1, 1, 0.7);
      shape([front, frontS, rearM, frontH]);
    } else if (abs(angMS + angSH - angHM) < 0.001) {
      // minute
      fill(120, 1, 1, 0.7);
      shape([front, frontS, rearM, frontH]);
      // hour
      fill(240, 1, 1, 0.7);
      shape([front, frontM, rearH, frontS]);
      // second
      fill(0, 1, 1, 0.7);
      shape([front, frontH, rearS, frontM]);
    } else if (abs(angSH + angHM) - angMS < 0.001) {
      // minute
      fill(120, 1, 1, 0.7);
      shape([front, frontS, rearM, frontH]);
      // second
      fill(0, 1, 1, 0.7);
      shape([front, frontH, rearS, frontM]);
      // hour
      fill(240, 1, 1, 0.7);
      shape([front, frontM, rearH, frontS]);
    }
    // drawingContext.setLineDash([]);
    lineRear();
  }

  // drawingContext.setLineDash([]);

  // hour (blue, front)
  stroke(240, 1, 1);
  strokeWeight(2);
  line(...front, ...frontH);

  // minute (green, front)
  stroke(120, 1, 1);
  strokeWeight(2);
  line(...front, ...frontM);

  // second (red, front)
  stroke(0, 1, 1);
  strokeWeight(2);
  line(...front, ...frontS);

  // front
  fill(0, 0, 1);
  noStroke();
  // circle(...frontH, 4);
  // circle(...frontM, 4);
  // circle(...frontS, 4);

  fill(45, 1, 1);
  stroke(45, 0.2, 1);
  // noStroke();
  rectMode(CENTER);
  rect(...front, 6);

  pop();
}

function lineRear() {
  // hour (blue, rear)
  stroke(240, 0, 1);
  // stroke(240, 0.7, 1, 0.99);
  strokeWeight(1);
  // strokeWeight(4);
  line(...rear, ...rearH);

  // minute (green, rear)
  // stroke(120, 0.7, 1, 0.99);
  // strokeWeight(2);
  line(...rear, ...rearM);

  // second (red, rear)
  // stroke(0, 0.7, 1, 0.99);
  // strokeWeight(1);
  line(...rear, ...rearS);
}

function shape(verticies) {
  beginShape();
  verticies.forEach((a) => {
    vertex(...a);
  });
  endShape(CLOSE);
  // verticies.forEach((a) => {
  //   circle(...a);
  // });
}

function angleSum() {
  angH = atan2(frontH[1], frontH[0]);
  angM = atan2(frontM[1], frontM[0]);
  angS = atan2(frontS[1], frontS[0]);
  angHM = abs(angH - angM);
  angMS = abs(angM - angS);
  angSH = abs(angS - angH);

  if (angHM > 180) {
    angHM = 360 - angHM;
  }
  if (angMS > 180) {
    angMS = 360 - angMS;
  }
  if (angSH > 180) {
    angSH = 360 - angSH;
  }
  angSum = angHM + angMS + angSH;
}
