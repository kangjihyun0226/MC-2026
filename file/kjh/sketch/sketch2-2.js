let secDiameter;
let secGap;
let sec;
let secDlarge;

// --- 파동 변수 ---
let waves = [];
let prevWaves = [];
let cols, rows;
let scale = 6;
let damping = 0.96;

function setup() {
  createCanvas(windowWidth, windowHeight);

  secDiameter = min(windowWidth, windowHeight) * 0.1;
  secGap = secDiameter * 0.1;
  secDlarge = secDiameter;

  cols = floor(width / scale);
  rows = floor(height / scale);

  for (let i = 0; i < cols; i++) {
    waves[i] = [];
    prevWaves[i] = [];
    for (let j = 0; j < rows; j++) {
      waves[i][j] = 0;
      prevWaves[i][j] = 0;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  sec = second();
  background(255);

  // 초 시작 시 물방울 떨어짐 (세기 감소)
  if (new Date().getMilliseconds() < 40) {
    prevWaves[floor(cols / 2)][floor(rows / 2)] = 100;
  }

  // --- 파동 계산 ---
  for (let i = 1; i < cols - 1; i++) {
    for (let j = 1; j < rows - 1; j++) {
      waves[i][j] =
        (prevWaves[i - 1][j] +
          prevWaves[i + 1][j] +
          prevWaves[i][j - 1] +
          prevWaves[i][j + 1]) /
          2 -
        waves[i][j];

      waves[i][j] *= damping;
    }
  }
  // 중앙 파동 높이
  let h = waves[floor(cols / 2)][floor(rows / 2)];

  //반투명 원을 위한 outerIndex 함수
  let outerIndex;
  if (sec < 30) {
    outerIndex = sec;
  } else {
    outerIndex = 30;
  }
  // 반투명 원
  fill(220, 235, 255, 90);
  noStroke();
  circle(
    windowWidth * 0.5,
    windowHeight * 0.5,
    secDiameter + secGap * 2 * outerIndex + h * 0.05,
  );

  // 중앙 원
  fill(0, 0, 255);
  noStroke();
  circle(windowWidth * 0.5, windowHeight * 0.5, secDiameter + h * 0.1);

  // 링들
  noFill();
  //stroke(0, 0, 255);
  //strokeWeight(2);
  // 링 두께 점점 얇아지는 함수
  function ringThickness(i, total) {
    return map(i, 0, total, 5, 1);
  }
  // 링 점점 투명해지는 함수
  function ringAlpha(i, total) {
    return map(i, 0, total, 255, 120);
  }

  if (second() < 30) {
    for (let i = 0; i <= second(); i++) {
      strokeWeight(ringThickness(i, sec));
      stroke(0, 0, 255, ringAlpha(i, sec));
      circle(
        windowWidth * 0.5,
        windowHeight * 0.5,
        secDiameter + secGap * 2 * i + h * 0.05,
      );
    }
  } else {
    for (let i = 30; i >= sec - 29; i--) {
      strokeWeight(ringThickness(i, 30));
      stroke(0, 0, 255, ringAlpha(i, 30));
      circle(
        windowWidth * 0.5,
        windowHeight * 0.5,
        secDiameter + secGap * 2 * i + h * 0.0001,
      );
    }
  }

  // 배열 교환
  let temp = prevWaves;
  prevWaves = waves;
  waves = temp;
}
