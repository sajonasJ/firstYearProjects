function setup() {
  createCanvas(600, 800);
  newGroups();
  makeship();
  showMenuButton();
  showScoreButton();
  showReturnButton();
  startGameButton();
  showCreditButton();
  showCheckBox();
  showSlider();
  typeName();
}
function draw() {
  levels();
  drawScenes();
  makeShipAppear();
  groupCull();
  for (let follower of enemyGroup) {
    follower.attractionPoint(2, normalShip.position.x, normalShip.position.y);
  }
  drawSprites();
}

