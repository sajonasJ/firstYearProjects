function drawScenes() {// bunch of if statemensts for drawing canvas
    if (currentScreen === menuScene) {
        drawMainMenu();
    }
    else if (currentScreen === loadingScene) {
        drawLoadingScene();
    }
    else if (currentScreen === gameScene) {
        drawGameScene();
    }
    else if (currentScreen === leaderBoardScene) {
        drawLeaderBoardScene();
    }
    else if (currentScreen === creditScene) {
        drawCreditScene();
    }
}