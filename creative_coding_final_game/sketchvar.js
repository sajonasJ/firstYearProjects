/////CONSTANTS/////
const menuScene = 0, loadingScene = 1, gameScene = 2, leaderBoardScene = 3, creditScene = 4;
const redBullet = 5, blueBullet = 6, greenBullet = 7;
/////DECLARATIONS/////
let creditImg;
let shipImg, shipBoost, normalShip, shipX = 300, shipY = -40, shipCount = 0;
let enemy, enemyCount = 0, enemyGroup, enemyCountNum = 10, enemyBullet, enemyBullet2, eBullet, enemyBossImg, enemyBossCount = false, enemyBoss, bossHealth = 200;
let health = 100, maxHealth = 100, healthSpriteCount = 0;
let healthAnim, healthGroup, healthSprite;
let greenBulletGroup, redBulletGroup, blueBulletGroup, blueBulletGroup2, greenBulletGroup2, enemyBulletGroup, enemyBossGroup, enemyBulletGroup2;
let ammoAnim, bulletAmmoGroup, redBeam, blueBeam, greenBeam, explodeAnim, explodeAnimEnemy, ammoAnimCount = 0;
let playButton, scoreButton, returnButton, startGame, creditBtn;
let points = 0; let hardMode; let frictionSpeed = .3;
let menuMusic, powerUP, btnSound, deathSound, redSoundBullet, redSplash, healthUP, blueSoundBullet, greenBulletSound, enemySound, crashSound, credSound, advMusic;
let playMusic = false, soundVolume,tutorialVid,inputButton,input;
/////IMAGES/////
let menuImg, scoreImg, bgdImg2, bgdImg3, bgdImg4, bgdImg5, bgdImg1;
/////TESTING/////
let currentScreen = menuScene;
let currentBullet = redBullet;
