
////////////////////////////////////CREATE SHIP AND UNHIDE/////////////////////////////////////////////////
function makeship(x, y) {
    let shipLocX = shipX
    let shipLocY = shipY
    normalShip = createSprite(shipLocX, shipLocY);
    normalShip.addImage("normal", shipImg);
    normalShip.addAnimation('boost', shipBoost);
    normalShip.rotation = 270;
    normalShip.scale = .5;
    normalShip.setCollider("rectangle", 0, 5, 100, 90);
    // normalShip.debug = true;
}
function makeShipAppear() {
    if (currentScreen == gameScene && shipCount == 0) {
        clearCanvass();
        shipX = width / 2;
        shipY = 600;
        makeship(shipX, shipY);
        shipCount = 1;
    }
}
/////////////////////////////////DRAWING CANVAS PER SCREEN////////////////////////////////////////////////////
function drawMainMenu() {
    image(menuImg, 0, 0);
    textAlign(CENTER);
    textSize(30);
    textStyle(BOLD);
    fill(230, 57, 70, 230);
    text('VOLUME:', 255, 630);
    startMusic();
    credSound.stop();
    playButton.show();
    scoreButton.show();
    returnButton.hide();
    creditBtn.show();
    hardMode.show();
    startGame.hide();
    soundVolume.show();
    tutorialVid.hide();
    tutorialVid.stop();
    advMusic.stop();
    inputButton.hide();
    input.hide();
}
function drawLoadingScene() {
    background('black');
    if (frameCount > 60 * 8) {
        startGame.show();
        fill('white');
        textAlign(CENTER);
        textSize(40);
        text('Press START to play', width / 2, height / 2);
    }
    advMusic.stop();
    menuMusic.stop();
    playButton.hide();
    scoreButton.hide();
    returnButton.hide();
    soundVolume.hide();
    hardMode.hide();
    creditBtn.hide();
    inputButton.hide();
    input.hide();

    createVid();
    tutorialVid.play();

}
function drawGameScene() {
    levels();
    fill('grey');
    rect(0, 735, width, 70);
    playAdvMusic();
    shipMovement();
    checkCollision();
    createHealthBar();
    spawnAmmo();
    spawnEnemyBoss();
    addEnemy();
    showTextScore();
    spriteWalls();
    crash();
    menuMusic.stop();
    playButton.hide();
    scoreButton.hide();
    returnButton.hide();
    creditBtn.hide();
    hardMode.hide();
    soundVolume.hide();
    startGame.hide();
    tutorialVid.hide();
    tutorialVid.stop();
    inputButton.hide();
    input.hide();
    if (frameCount % 100 == 0 && enemyBossCount == true) {
        createEnemyBullet();
    }
}
function drawLeaderBoardScene() {
    rectMode(CENTER);
    image(scoreImg, 0, 0);
    showHScore();
    shipCount = 0;
    healthSpriteCount = 0;
    ammoAnimCount = 0;
    enemyCount = 0;
    health = 100;
    points = 0;
    menuMusic.stop();
    playButton.hide();
    scoreButton.hide();
    creditBtn.hide();
    startGame.hide();
    tutorialVid.hide();
    soundVolume.hide();
    hardMode.hide();
    tutorialVid.stop();
    advMusic.stop();
    inputButton.show();
    input.show();
    playMusic = false;
    if (frameCount > 60 * 5) {
        returnButton.show();
        frameCount = 0;
    }
    clearCanvass();
}
function drawCreditScene() {
    image(creditImg, 0, 0);
    credMusic();
    playButton.hide();
    scoreButton.hide();
    creditBtn.hide();
    hardMode.hide();
    startGame.hide();
    tutorialVid.hide();
    tutorialVid.stop();
    returnButton.show();
    soundVolume.hide();
    menuMusic.stop();
    advMusic.stop();
}
////////////////////////////////////CLEAR CANVASS/////////////////////////////////////////////////
function clearCanvass() {//Clear canvass every end draw
    for (let i = 0; i < allSprites.length; i++) { allSprites[i].remove(); }
}
///////////////////////////////////////KEY INPUTS//////////////////////////////////////////////
function keyPressed() {
    if (keyCode === 13 && currentScreen === gameScene) { currentScreen = leaderBoardScene; frameCount = 0; }
}
function shipMovement() {
    let up = keyDown(UP_ARROW); let down = keyDown(DOWN_ARROW); let left = keyDown(LEFT_ARROW); let right = keyDown(RIGHT_ARROW);
    let zpace = keyWentDown(32);
    let w = keyDown('w'); let a = keyDown('a'); let s = keyDown('s'); let d = keyDown('d');

    if (up || w) {
        normalShip.addSpeed(.8, normalShip.rotation);
        normalShip.changeAnimation('boost');
    } else {
        normalShip.changeAnimation('normal');
    }
    if (left || a) { normalShip.velocity.x = -5; }
    if (right || d) { normalShip.velocity.x = 5; }
    if (down || s) { normalShip.velocity.y = 3; }
    if (zpace) { drawBullet(); }
    else { normalShip.friction = .07; }
}
/////////////////////////////////////HEALTH AND UNIVERSAL COLLISIONS////////////////////////////////////////////////
function createHealthBar() {//healthbar && health spawner
    noStroke();
    fill(255, 0, 0);
    rect(20, 770, map(health, 0, maxHealth, 0, 200), 15);//health=0 to max=100 length 200;red
    stroke(0);
    strokeWeight(4);
    noFill();
    rect(20, 770, 200, 15);//rectbox

    if (frameCount % 200 == 0 && health < maxHealth && healthSpriteCount == 0) {
        let healthX = random(0, width);
        let healthY = 0;
        giveHealthBox(healthX, healthY);
        healthSpriteCount = 1;
        // console.log(healthSpriteCount);
    }
}
function giveHealthBox(x, y) { // health spawner
    let healthSpeed = random(1, 3);
    let healthDirection = random(10, 170);

    healthSprite = createSprite(x, y);
    healthSprite.addAnimation("simple", healthAnim);
    healthSprite.setCollider("rectangle", 0, 0, 60, 60);
    // healthSprite.attractionPoint(1, normalShip.position.x, normalShip.position.y);
    // healthSprite.debug = true;
    healthSprite.scale = .7;
    healthSprite.setSpeed(healthSpeed, healthDirection);
    healthGroup.add(healthSprite);
}
function checkCollision() { // collision detection
    normalShip.overlap(healthGroup, moreHealth);
    normalShip.overlap(bulletAmmoGroup, changeBullet);
    normalShip.overlap(enemyGroup, shipEnemyCollide);
    normalShip.overlap(enemyBossGroup, shipBossCollide);
    normalShip.overlap(enemyBulletGroup, shipEnemyCollide);
    normalShip.overlap(enemyBulletGroup2, shipEnemyCollide);
    enemyBulletGroup.overlap(redBulletGroup, enemyBulletCollide);
    enemyBulletGroup2.overlap(redBulletGroup, enemyBulletCollide);
    enemyBulletGroup.overlap(blueBulletGroup, enemyBulletCollide);
    enemyBulletGroup2.overlap(blueBulletGroup, enemyBulletCollide);
    enemyBulletGroup.overlap(greenBulletGroup, enemyBulletCollide);
    enemyBulletGroup2.overlap(greenBulletGroup, enemyBulletCollide);
    redBulletGroup.overlap(enemyGroup, bulletEnemyCollide);
    blueBulletGroup.overlap(enemyGroup, bulletEnemyCollide);
    blueBulletGroup2.overlap(enemyGroup, bulletEnemyCollide);
    greenBulletGroup.overlap(enemyGroup, bulletEnemyCollide);
    greenBulletGroup2.overlap(enemyGroup, bulletEnemyCollide);
    redBulletGroup.overlap(enemyBossGroup, bulletBossCollide);
    blueBulletGroup.overlap(enemyBossGroup, bulletBossCollide);
    blueBulletGroup2.overlap(enemyBossGroup, bulletBossCollide);
    greenBulletGroup.overlap(enemyBossGroup, bulletBossCollide);
    greenBulletGroup2.overlap(enemyBossGroup, bulletBossCollide);
}
function moreHealth() {//collision function
    healthUP.play();
    healthUP.setLoop(false);
    healthUP.setVolume(0.2);
    if (health < maxHealth) {
        health += 20;
        healthSpriteCount = 0;
        frameCount = 1;
        healthGroup.removeSprites();
        healthSprite.position.x = -10;
    } else if (maxHealth == 80) {
        healthGroup.removeSprites();
        // healthSprite.position.x = -10;
        frameCount = 0;
    }
}
/////////////////////////////////BULLETS////////////////////////////////////////////////////
function drawBullet() {//draws bullet function
    if (currentBullet === redBullet) { drawRedBullet(); }
    else if (currentBullet === blueBullet) { drawBlueBullet(); }
    else if (currentBullet === greenBullet) { drawGreenBullet(); }
}
function drawRedBullet() {//red sprite
    let redBullet;
    let bulletSpeed = 10 + normalShip.getSpeed();
    let xPosX = normalShip.position.x;
    let xPosY = normalShip.position.y;

    redBullet = createSprite(xPosX, xPosY - 50);
    redBullet.addImage("normal beam", redBeam);
    redBullet.setSpeed(bulletSpeed, 270);
    redBullet.life = 80;
    redBullet.scale = 1;
    redBullet.setCollider("rectangle", 0, 0, 20, 50);
    //  redBullet.debug = true;
    redSoundBullet.play();
    redSoundBullet.setLoop(false);
    redSoundBullet.setVolume(0.1);
    redBulletGroup.add(redBullet);

    return redBullet;
}
function drawBlueBullet() {//blue sprite
    let bulletSpeed = 10 + normalShip.getSpeed();
    let blueBullet, blueBullet2;
    let sPosX = normalShip.position.x;
    let sPosY = normalShip.position.y;

    blueBullet = createSprite(sPosX - 5, sPosY - 35);
    blueBullet2 = createSprite(sPosX + 5, sPosY - 35);
    blueBullet.addImage("normal beam", blueBeam);
    blueBullet.setSpeed(bulletSpeed, 240);
    blueBullet.life = 600;
    blueBullet.scale = 1;
    blueBullet.setCollider("rectangle", 0, 0, 10, 40);
    // blueBullet.debug = true;
    blueBullet.rotation = 340;
    blueBulletGroup.add(blueBullet);
    blueBullet2.addImage("normal beam", blueBeam);
    blueBullet2.setSpeed(bulletSpeed, 300);
    blueBullet2.life = 600;
    blueBullet2.scale = 1;
    blueBullet2.setCollider("rectangle", 0, 0, 10, 40);
    //  blueBullet2.debug = true;
    blueBullet2.rotation = 20;
    blueSoundBullet.play();
    blueSoundBullet.setLoop(false);
    blueSoundBullet.setVolume(0.01);
    blueBulletGroup2.add(blueBullet2);
    return blueBullet;
}
function drawGreenBullet() {// green sprite
    let greenBullet, greenBullet2;
    let sPosX = normalShip.position.x;
    let sPosY = normalShip.position.y;
    let bulletSpeed = 20 + normalShip.getSpeed();

    greenBullet = createSprite(sPosX - 20, sPosY - 25);
    greenBullet.addImage("normal beam", greenBeam);
    greenBullet.setSpeed(bulletSpeed, 270);
    greenBullet.life = 80;
    greenBullet.scale = 1;
    greenBullet.setCollider("rectangle", 0, 0, 10, 10);
    // greenBullet.debug = true;
    greenBulletGroup.add(greenBullet);

    greenBullet2 = createSprite(sPosX + 20, sPosY - 25);
    greenBullet2.addImage("normal beam", greenBeam);
    greenBullet2.setSpeed(bulletSpeed, 270);
    greenBullet2.life = 80;
    greenBullet2.scale = 1;
    greenBullet2.setCollider("rectangle", 0, 0, 10, 10);
    // greenBullet2.debug = true;
    greenBulletSound.play();
    greenBulletSound.setLoop(false);
    greenBulletSound.setVolume(0.01);
    greenBulletGroup2.add(greenBullet2);
    return greenBullet;
}
///////////////////////////////////AMMO BOX//////////////////////////////////////////////////
function spawnAmmo() { //sprite spawner
    let ammoX = random(0, width);
    let ammoY = 0;
    if (frameCount % 200 == 0 && ammoAnimCount < 1) {
        giveammoAnim(ammoX, ammoY);
        ammoAnimCount = 1;
    }
}
function giveammoAnim(x, y) { // random ammo sprite
    let randomSpeed = random(1, 3);
    let randomDirection = random(10, 170);
    giveAmmo = createSprite(x, y);
    giveAmmo.addAnimation("simple", ammoAnim);
    giveAmmo.setCollider("rectangle", 0, 0, 60, 60);
    // giveAmmo.debug = true;
    giveAmmo.scale = .7;
    // giveAmmo.friction=.4;
    giveAmmo.setSpeed(randomSpeed, randomDirection);
    bulletAmmoGroup.add(giveAmmo);
}
function changeBullet() {//collision function bullet
    ammoAnimCount = 0;
    frameCount = 1;
    if (currentBullet === redBullet) { currentBullet = blueBullet; }
    else if (currentBullet === blueBullet) { currentBullet = greenBullet; }
    else if (currentBullet === greenBullet) { currentBullet = redBullet; }
    powerUP.play();
    powerUP.setLoop(false);
    powerUP.setVolume(0.3);
    bulletAmmoGroup.removeSprites();

}
/////////////////////////////////////GUI ELEMENTS////////////////////////////////////////////////
function showTextScore() {
    strokeWeight(2);
    textAlign(LEFT);
    textSize(25);
    text('SCORE:' + points, 25, 760);
    rect(20, 770, 200, 15);
}
function showMenuButton() {
    let pbColor = color(230, 57, 70, 230);

    playButton = createButton('PLAY');
    playButton.position(360, 590);
    playButton.size(200, 40);
    playButton.style('background-color', pbColor);
    playButton.style('font-size', '30px');
    playButton.style('border', '20px');
    playButton.style('box-shadow: 10px 10px 10px #000000');
    playButton.style('border-radius: 30px');
    playButton.mousePressed(gameStart);
    playButton.mouseOver(over);
    playButton.mouseOut(out);
    playButton.hide();
}
function showScoreButton() {
    let pbColor = color(230, 57, 70, 230);
    scoreButton = createButton('HIGHSCORES');
    scoreButton.position(360, 640);
    scoreButton.size(200, 40);
    scoreButton.style('background-color', pbColor);
    scoreButton.style('font-size', '30px');
    scoreButton.style('border', '20px');
    scoreButton.style('box-shadow: 10px 10px 10px #000000');
    scoreButton.style('border-radius: 30px');
    scoreButton.mousePressed(showScores);
    scoreButton.mouseOver(over);
    scoreButton.mouseOut(out);
    scoreButton.hide();
}
function showReturnButton() {
    let pbColor = color(230, 57, 70, 230);
    returnButton = createButton('RETURN');
    returnButton.position(210, 740);
    returnButton.size(200, 40);
    returnButton.style('background-color', pbColor);
    returnButton.style('font-size', '30px');
    returnButton.style('border', '20px');
    returnButton.style('box-shadow: 10px 10px 10px #000000');
    returnButton.style('border-radius: 30px');
    returnButton.mousePressed(returnMenu);
    returnButton.mouseOver(over);
    returnButton.mouseOut(out);
    returnButton.hide();
}
function startGameButton() {
    let pbColor = color(230, 57, 70, 230);
    startGame = createButton('Start');
    startGame.position(210, 700);
    startGame.size(200, 40);
    startGame.style('background-color', pbColor);
    startGame.style('font-size', '30px');
    startGame.style('border', '20px');
    startGame.style('box-shadow: 10px 10px 10px #000000');
    startGame.style('border-radius: 30px');
    startGame.mousePressed(playNow);
    startGame.mouseOver(over);
    startGame.mouseOut(out);
    startGame.hide();

}
function showCreditButton() {
    let pbColor = color(230, 57, 70, 230);
    creditBtn = createButton('CREDITS');
    creditBtn.position(360, 690);
    creditBtn.size(200, 40);
    creditBtn.style('background-color', pbColor);
    creditBtn.style('font-size', '30px');
    creditBtn.style('border', '20px');
    creditBtn.style('box-shadow: 10px 10px 10px #000000');
    creditBtn.style('border-radius: 30px');
    creditBtn.mousePressed(showCredits);
    creditBtn.mouseOver(over);
    creditBtn.mouseOut(out);
    creditBtn.hide();
}
function showCheckBox() {
    let pbColor = color(230, 57, 70, 230);
    hardMode = createCheckbox('HARD MODE', false);
    hardMode.changed(checkedEvent);
    hardMode.position(200, 700);
    hardMode.style('background-color', pbColor);
    hardMode.style('font-size', '20px');
    hardMode.style('border', '20px');
    hardMode.style('box-shadow: 10px 10px 10px #000000');
    hardMode.style('border-radius: 10px');
    hardMode.hide();
}
function showSlider() {
    soundVolume = createSlider(0, 1, .05, .01);
    soundVolume.position(200, 650);
    soundVolume.style('width', '130px');
    soundVolume.hide();
}
function checkedEvent() {
    if (hardMode.checked()) { enemyCountNum = 20; frictionSpeed = .4; }
    else { enemyCountNum = 10; frictionSpeed = .5; }
}
function typeName() {//<<<<<<<<<<<<<<<<<<<<<<<<in setup
    let pbColor = color(230, 57, 70, 230);
    let x = 210;
    let y = 700;
    input = createInput();
    input.position(x, y);
    inputButton = createButton('SUBMIT');
    inputButton.position(input.x + input.width, y);
    inputButton.style('background-color', pbColor);
    inputButton.style('font-size', '20px');
    inputButton.style('border', '20px');
    inputButton.style('box-shadow: 10px 10px 10px #000000');
    inputButton.style('border-radius: 20px');
    inputButton.mousePressed(result);
    inputButton.mouseOver(over);
    inputButton.mouseOut(out);

    inputButton.hide();
    input.hide();

}
function result() {
    let highScores = data.highScore;
    for (let i = 0; i < highScores.length; i++) {
        if (points >= highScores[i].score) {
            fill(255);
            textAlign(CENTER);
            textSize(20);
            textStyle(BOLD);
            text('Congatulations you are Top 10', 310, 660);
        } else {
            fill(255);
            textAlign(CENTER);
            textSize(20);
            textStyle(BOLD);
            text('You did not make it to the TOP try again', 300, 660);
        }
    }
}
function over() {
    this.style('transform:scale(1.1,1.1)');
    this.style('transition:( 0.01)');
    this.style('background-color: #57cc99');
}
function out() {
    this.style('transform:none');
    this.style('background-color: #e63946');
}
////////////////////////////////BUTTON FUNCTIONS/////////////////////////////////////////////////////
function returnMenu() { currentScreen = menuScene; frameCount = 0; btnSound.play(); }
function playNow() { currentScreen = gameScene; frameCount = 0; btnSound.play(); }
function gameStart() { currentScreen = loadingScene; frameCount = 0; btnSound.play(); }
function showScores() { currentScreen = leaderBoardScene; frameCount = 0; btnSound.play(); }
function showCredits() { currentScreen = creditScene; frameCount = 0; btnSound.play(); }
/////////////////////////////////////////////BARRIER////////////////////////////////////////
function spriteWalls() {
    for (let i = 0; i < allSprites.length; i++) {
        let aSpr = allSprites[i];
        if (aSpr.position.x < 0) { aSpr.velocity.x *= -1; aSpr.position.x = 0; }
        if (aSpr.position.x > width) { aSpr.velocity.x *= -1; aSpr.position.x = width; }
        if (aSpr.position.y < 0) { aSpr.velocity.y *= -1; aSpr.position.y = 0; }
        if (aSpr.position.y > height - 90) { aSpr.velocity.y *= -1; aSpr.position.y = height - 90; }
    }
}
/////////////////////////////////////CREATE ENEMY////////////////////////////////////////////////
function addEnemy() {
    for (let i = 0; enemyCount <= enemyCountNum; i++) {
        let enemyEntryX = random(0, width);
        let enemyEntryY = 0;
        releaseEnemySprite(enemyEntryX, enemyEntryY);
        enemyCount += 1;
        // enemyHealth+1;<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    }
}
function releaseEnemySprite(x, y) {
    enemySprite = createSprite(x, y);
    enemySprite.addAnimation("norm", enemyAnim);
    // enemySprite.debug = true;
    enemySprite.rotation = 90;
    enemySprite.rotateToDirection = true;
    enemySprite.setCollider("circle", 0, 0, 20);
    enemySprite.friction = frictionSpeed;
    enemySprite.rotation = 0;
    enemySprite.attractionPoint(1, normalShip.position.x, normalShip.position.y);
    enemyGroup.add(enemySprite);
    return enemySprite;
}
function spawnEnemyBoss() { //sprite spawner
    let bossX = width / 2;
    let bossY = 100;
    if (points === 2000 && enemyBossCount == false) {
        releaseEnemyBoss(bossX, bossY);
        enemyBossCount = true;
    }
}
function releaseEnemyBoss(x, y) {
    enemyShipX = width / 2;
    enemyShipY = 100;
    enemyBoss = createSprite(enemyShipX, enemyShipY);
    enemyBoss.setSpeed(2, 180);
    enemyBoss.addImage("normal", enemyBossImg);
    // enemyBoss.debug = true;
    enemyBoss.rotation = 90;
    enemyBoss.setCollider("rectangle", 0, 0, 100, 100);
    enemyBossGroup.add(enemyBoss);
    return enemyBoss;
}
function createEnemyBullet() {
    if (enemyBossCount = true) {
        let downwardX = 90;
        enemyBullet = createSprite(enemyBoss.position.x + 40, enemyBoss.position.y + 60);
        enemyBullet.addImage('normal', enemyBulletImg);
        enemyBullet.setSpeed(1.2, downwardX - 20);
        // enemyBullet.life = 80;
        enemyBullet.scale = 1;
        enemyBullet.setCollider("rectangle", 0, 0, 30, 30);
        // enemyBullet.debug = true;
        enemyBulletGroup.add(enemyBullet);
        enemyBullet2 = createSprite(enemyBoss.position.x - 40, enemyBoss.position.y + 60);
        enemyBullet2.addImage('normal', enemyBulletImg);
        enemyBullet2.setSpeed(1.2, downwardX + 20);
        // enemyBullet.life = 80;
        enemyBullet2.scale = 1;
        enemyBullet2.setCollider("rectangle", 0, 0, 30, 30);
        // enemyBullet2.debug = true;
        enemyBulletGroup2.add(enemyBullet2);
        return enemyBullet;
    }
}
////////////////////////////////////COLLISION FUNCTIONS/////////////////////////////////////////////////
function shipEnemyCollide(ship, enemy) {
    for (let i = 0; i < 10; i++) {
        let explode2 = createSprite(normalShip.position.x, normalShip.position.y);
        explode2.addAnimation("simple", explodeAnimEnemy);
        explode2.life = 100;
        explode2.scale = 1.5;
        explode2.rotateToDirection = true;
    }
    enemyCount -= 1;
    health -= 20;
    frameCount = 0;
    crashSound.play();
    crashSound.setLoop(false);
    crashSound.setVolume(0.02);
    enemy.remove();
    if (health == 0) {
        ship.remove()
    }
}
function shipBossCollide(ship, boss) {
    for (let i = 0; i < 10; i++) {
        let explode2 = createSprite(normalShip.position.x, normalShip.position.y);
        explode2.addAnimation("simple", explodeAnimEnemy);
        explode2.life = 100;
        explode2.scale = 1.5;
        explode2.rotateToDirection = true;
    }
    health -= 1;
    frameCount = 0;
    crashSound.play();
    crashSound.setLoop(false);
    crashSound.setVolume(0.02);
    boss.remove();
    health = 0;
    ship.remove()
}
function bulletEnemyCollide(bullet, enemy) {
    points += 100;
    for (let i = 0; i < 10; i++) {
        let explode = createSprite(bullet.position.x, bullet.position.y);
        explode.addAnimation("simple", explodeAnim);
        explode.life = 15;
        explode.scale = 1.5;
    }
    redSplash.play();
    redSplash.setLoop(false);
    redSplash.setVolume(0.01);
    enemy.remove();
    bullet.remove();
    enemyCount -= 1;
}
function bulletBossCollide(bullet, enemy) {
    points += 100;
    for (let i = 0; i < 10; i++) {
        let explode = createSprite(bullet.position.x, bullet.position.y);
        explode.addAnimation("simple", explodeAnim);
        explode.life = 15;
        explode.scale = 1.5;
    }
    redSplash.play();
    redSplash.setLoop(false);
    redSplash.setVolume(0.01);
    bossHealth -= 20;
    bullet.remove();
    if (bossHealth == 0) {
        enemy.remove();

        enemyBossCount = false;
    }
}
function enemyBulletCollide(enemyBullet, ship) {
    enemyBullet.remove();
    ship.remove();
}
///////////////////////////////////LEVEL CHANGES////////////////////////////////////////////////////
function levels() { //background changes per points
    if (points >= 10000) { image(bgdImg5, 0, 0); }
    else if (points >= 6000) { image(bgdImg4, 0, 0); }
    else if (points >= 4000) { image(bgdImg3, 0, 0); }
    else if (points >= 2000) { image(bgdImg2, 0, 0); }
    else if (points >= 0) { image(bgdImg1, 0, 0); }
}
/////////////////////////////////REMOVE SPRITES////////////////////////////////////////////////////
function crash() {
    if (health <= 0) {
        fill("red");
        textSize(60);
        textStyle(BOLD);
        textAlign(CENTER);
        text('GAME OVER', width / 2, height / 2);
        deathSoundMusic();
        redBulletGroup.removeSprites();
        blueBulletGroup.removeSprites();
        blueBulletGroup2.removeSprites();
        greenBulletGroup.removeSprites();
        greenBulletGroup2.removeSprites();
        enemyBulletGroup.removeSprites();
        enemyBulletGroup2.removeSprites();
        for (let i = 0; i < enemyGroup.length; i++) {//stops the enemy movement
            enemyGroup[i].friction = 1;
        } if (frameCount > 60 * 5) {
            currentScreen = leaderBoardScene;
            enemySound.play();
            enemySound.setLoop(false);
            enemySound.setVolume(0.05);
        }
    }
}
////////////////////////////////MUSIC/////////////////////////////////////////////////////
function deathSoundMusic() {// playmusic once
    if (frameCount == 0) { deathSound.play(); deathSound.setLoop(false); }
}
function startMusic() {
    menuMusic.setVolume(soundVolume.value());
    if (frameCount == 100 && currentScreen == menuScene) {
        menuMusic.play();
        menuMusic.setLoop(false);
        userStartAudio();
    }
}
function credMusic() {
    credSound.setVolume(soundVolume.value());
    if (frameCount == 100 && currentScreen == creditScene) {
        credSound.play();
        credSound.setLoop(false);
        userStartAudio();
    }
}
function playAdvMusic() {
    if (playMusic == false && currentScreen == gameScene) {
        advMusic.play();
        advMusic.setLoop(false);
        advMusic.setVolume(0.03);
        userStartAudio();
        playMusic = true;
    }
}
/////////////////////////////////TUTORIAL VID////////////////////////////////////////////////////
function createVid() {
    image(tutorialVid, 50, 50, 500, 700);
    tutorialVid.hide();
    tutorialVid.noLoop();
    tutorialVid.play();
}