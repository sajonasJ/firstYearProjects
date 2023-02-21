function showHScore() {
    for (let i = 0; i < 3; i++) {//greybox
        for (let x = 0; x < 10; x++) {
            let sqX = 150 * i + 150;
            let sqY = x * 40 + 250;
            let sqSzX = 150;
            let sqSzY = 40;
            fill(173, 181, 189, 127);
            rect(sqX, sqY, sqSzX, sqSzY);
        }
    }
    let highScores = data.highScore;
    let spacingX = 150;
    let offSetY = 253;
    let spacingY = 40;
    for (let i = 0; i < highScores.length; i++) {
        fill(255);
        textAlign(CENTER);
        textStyle(BOLD);
        textSize(15);
        text(highScores[i].rank, spacingX, offSetY + spacingY * i);
        text(highScores[i].name, spacingX * 2, offSetY + spacingY * i);
        text(highScores[i].score, spacingX * 3, offSetY + spacingY * i);
    }
}