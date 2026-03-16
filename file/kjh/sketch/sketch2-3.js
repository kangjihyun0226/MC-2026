let h, m, s;
let hArr, mArr, sArr;
let hTxt, mTxt, sTxt;
let fontSize = 10;
let font;

// function preload() {
//   font = loadFont("Barrio-Regular.ttf");
// }

async function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
  font = await loadFont("Barrio-Regular.ttf");
  fontSize = (min(windowWidth, windowHeight) * 0.04) / 6;
}

// 배경색 rgb(130, 215, 255)
// 초 숫자 rgb(21, 83, 171)
// 초 문자 rgb(0, 64, 255)
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  fontSize = (min(windowWidth, windowHeight) * 0.04) / 6;
}

function draw() {
  background(130, 215, 255);

  if (hour() > 12) {
    h = String(hour() - 12);
  } else {
    h = String(hour());
  }
  m = String(minute());
  s = String(second());

  hArr = h.split("");
  mArr = m.split("");
  sArr = s.split("");
  hArr.push("");
  mArr.push("");
  sArr.push("");

  hTxt = (h + " HOUR").split("");
  mTxt = (m + " MINUTE").split("");
  sTxt = (s + " SECOND").split("");

  translate(windowWidth * 0.5, windowHeight * 0.5);

  // 가장 작은 원 반지름
  let radius = min(windowWidth, windowHeight) * 0.04;
  let baseRad = min(windowWidth, windowHeight) * 0.04;

  // 초단위 안쪽 숫자들에 적용할 스타일
  fill(21, 83, 171);
  textSize(fontSize);
  textStyle(NORMAL);
  textFont("sans-serif");

  for (let sWaves = 0; sWaves < second() % 10; sWaves++) {
    // 초단위 안쪽 숫자 각 단계별로 다르게 적용할 스타일
    textSize(fontSize + sWaves);

    if (sWaves % 2 == 0) {
      rotate(millis() * 0.00007 * radius);
    } else {
      rotate(millis() * 0.00007 * -radius);
    }
    makeWaves(radius, sArr);
    rotate(20);
    radius += baseRad / 3 + fontSize - 5;
  }

  // 초단위 바깥 문자에 적용할 스타일
  fill(255, 0, 0);
  textSize(fontSize + 4);
  textStyle(BOLD);
  textFont(font);

  if (second() % 2 == 0) {
    rotate(millis() * 0.00007 * radius);
  } else {
    rotate(millis() * 0.00007 * -radius);
  }
  makeWaves(radius, sTxt);
}

// 한 단계의 원 만드는 함수
function makeWaves(rad, arr) {
  let txtW = textWidth("O");
  let txtGap = txtW * 0.8;
  let circleLength = 2 * PI * rad;
  let txtCount = floor(circleLength / txtGap);
  let rotateAng = 360 / txtCount;
  let txtDumpCount = floor(circleLength / (txtGap * arr.length));
  let rotateDumpAng = 360 / txtDumpCount;

  for (let txtDump = 0; txtDump < txtDumpCount; txtDump++) {
    push();
    rotate(txtDump * rotateDumpAng);
    for (let txtSet = 0; txtSet < arr.length; txtSet++) {
      push();
      rotate(txtSet * rotateAng);
      text(arr[txtSet % arr.length], 0, -rad);
      pop();
    }
    pop();
  }
}
