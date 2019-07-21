function showNumWithAnimation(randX, randY, randNum) {
    //找到这个空白单元格
    let numCell = $('#number-cell-' + randX + '-' + randY);
    numCell.css('background-color', getNumberBackgroundColor(randNum));
    numCell.css('color', getNumberColor(randNum));
    numCell.text(randNum);
    numCell.animate({
        width: cellWidth,
        height: cellWidth,
        top: getPosTop(randX),
        left: getPosLeft(randY),
    }, 500)

}

function showMoveAnimation(fromx, fromy, tox, toy) {
    //获取该棋盘单元格
    let $numberCell = $('#number-cell-' + fromx + '-' + fromy);
    $numberCell.animate({
        top: getPosTop(tox),
        left: getPosLeft(toy)
    }, 300);
}