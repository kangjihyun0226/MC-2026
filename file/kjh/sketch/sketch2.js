

function setup() {
  createCanvas(windowWidth, windowHeight);
  secDiameter = min(windowWidth, windowHeight) * 0.1;
  secGap = secDiameter * 0.1;
  secDLarge = secDiameter;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

let secDiameter;
let secGap;
let sec;
let secDLarge;

function draw() {
  sec = second();

  background(255);

  if (new Date().getMilliseconds() * 0.001 <= 0.05) {
    secDLarge = (secDiameter + secGap * 2) * 0.95; // 커졌을 때 중심원 크기
  }
  console.log(sec);

  fill(0, 0, 255);
  noStroke();
  secDLarge = lerp(secDLarge, secDiameter, 0.07); // 중심원 다시 작아지는 속도
  circle(windowWidth * 0.5, windowHeight * 0.5, secDLarge);

  noFill();
  stroke(0, 0, 255);
  strokeWeight(2);
  if (sec < 30) {
    for (let i = 0; i <= sec; i++) {
      circle(
        windowWidth * 0.5,
        windowHeight * 0.5,
        secDiameter + secGap * 2 * i,
      );
    }
  } else {
    // for (let i = 0; i <= 60 - sec; i++) {
    //   circle(
    //     windowWidth * 0.5,
    //     windowHeight * 0.5,
    //     secDiameter + secGap * 2 * i,
    //   );
    // }
    for (let i = 30; i >= sec - 29; i--) {
      circle(
        windowWidth * 0.5,
        windowHeight * 0.5,
        secDiameter + secGap * 2 * i,
      );
    }
  }
}
colorMode(RGB, 60, 60);
colorMode(HSB, 60, 1, 1, 60);
fill(sec, 1, 1, sec);
