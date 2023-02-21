function preload() {
    //JSON
    data = loadJSON("./highScore.json");
    //VIDEO
    tutorialVid = createVideo('./video/Tutorial.mp4');
    //SOUNDS
    advMusic = loadSound('./sounds/space.mp3');
    credSound = loadSound('./sounds/Drift.mp3');
    crashSound = loadSound('./sounds/explode.wav');
    enemySound = loadSound('./sounds/round_end.wav');
    greenBulletSound = loadSound('./sounds/slimeball.wav');
    blueSoundBullet = loadSound('./sounds/rlaunch.wav');
    healthUP = loadSound('./sounds/powerUP8.mp3');
    redSplash = loadSound('./sounds/explodemini.wav');
    redSoundBullet = loadSound('./sounds/laser1.mp3');
    deathSound = loadSound('./sounds/death.wav');
    powerUP = loadSound('./sounds/powerUP.mp3');
    btnSound = loadSound('./sounds/button1.flac');
    menuMusic = loadSound('./sounds/theTunning.mp3');
    //ANIMATION
    explodeAnim = loadAnimation('./images/expImage/e1.png', './images/expImage/e2.png', './images/expImage/e3.png', './images/expImage/e4.png', './images/expImage/e5.png', './images/expImage/e6.png', './images/expImage/e7.png', './images/expImage/e8.png', './images/expImage/e9.png', './images/expImage/e10.png',);
    explodeAnimEnemy = loadAnimation('./images/expImg/0001.png', './images/expImg/0002.png', './images/expImg/0003.png', './images/expImg/0004.png', './images/expImg/0005.png', './images/expImg/0006.png', './images/expImg/0007.png', './images/expImg/0008.png', './images/expImg/0009.png', './images/expImg/0010.png', './images/expImg/0011.png', './images/expImg/0012.png', './images/expImg/0013.png', './images/expImg/0014.png', './images/expImg/0015.png', './images/expImg/0016.png', './images/expImg/0017.png', './images/expImg/0018.png', './images/expImg/0019.png', './images/expImg/0020.png', './images/expImg/0021.png', './images/expImg/0022.png', './images/expImg/0023.png', './images/expImg/0024.png', './images/expImg/0025.png');
    healthAnim = loadAnimation('./images/healthImage/health.png', './images/healthImage/health2.png', './images/healthImage/health3.png', './images/healthImage/health4.png', './images/healthImage/health5.png');
    ammoAnim = loadAnimation('./images/bulletImage/bullet.png', './images/bulletImage/bullet2.png', './images/bulletImage/bullet3.png', './images/bulletImage/bullet4.png', './images/bulletImage/bullet5.png');
    enemyAnim = loadAnimation('./images/enemy/pic1.png', './images/enemy/pic2.png', './images/enemy/pic3.png', './images/enemy/pic4.png', './images/enemy/pic5.png', './images/enemy/pic6.png', './images/enemy/pic7.png', './images/enemy/pic8.png');
    //IMAGE
    shipBoost = loadImage('./images/shipImage/ship2.png');
    enemyBossImg = loadImage('./images/enemy/picBoss.png');
    enemyBulletImg = loadImage('./images/bulletImage/eBullet.png');
    scoreImg = loadImage('./images/hallOfFame.png');
    creditImg = loadImage('./images/credits.png');
    menuImg = loadImage('./images/spaceHellvaders.png');
    shipImg = loadImage('./images/shipImage/ship.png');
    redBeam = loadImage('./images/bulletImage/redShoot.png');
    blueBeam = loadImage('./images/bulletImage/blueBullet.png');
    greenBeam = loadImage('./images/bulletImage/greenBullet.png');
    bgdImg1 = loadImage('./images/bkgImg/seaImg.png');
    bgdImg2 = loadImage('./images/bkgImg/sandImg.png');
    bgdImg3 = loadImage('./images/bkgImg/grassImg.png');
    bgdImg4 = loadImage('./images/bkgImg/snowImg.png');
    bgdImg5 = loadImage('./images/bkgImg/spaceImg.png');
  }