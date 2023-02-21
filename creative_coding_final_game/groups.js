function newGroups() { // group directory
    redBulletGroup = new Group();
    blueBulletGroup = new Group();
    blueBulletGroup2 = new Group();
    greenBulletGroup = new Group();
    greenBulletGroup2 = new Group();
    healthGroup = new Group();
    bulletAmmoGroup = new Group();
    enemyGroup = new Group();
    enemyBulletGroup = new Group();
    enemyBossGroup = new Group();
    enemyBulletGroup2 = new Group();
  }
  function groupCull() { //cull directory
    redBulletGroup.cull(-1, -100, -1, -1);
    blueBulletGroup.cull(-1, -100, -1, -1);
    blueBulletGroup2.cull(-1, -100, -1, -1);
    greenBulletGroup.cull(-1, -100, -1, -1);
    greenBulletGroup2.cull(-1, -100, -1, -1);
    enemyBulletGroup.cull(-1, -100, -1, -1);
    enemyBulletGroup2.cull(-1, -100, -1, -1);
  }