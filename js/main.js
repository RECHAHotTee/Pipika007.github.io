//定义一个数组
let nums = new Array();
//定义分数变量
let score = 0;

let hasConflicted = new Array();

$(function () {
    //alert(1);
    newGame();
});

//开始游戏
function newGame() {
    //初始化棋盘
    if (documentWidth > 500) {
        containerWidth = 500;
        cellWidth = 100;
        cellSpace = 20;
    } else {
        //适配移动端
        settingForMobile();
    }
    init();
    //随机生成两个带单元格的数字
    generateOneNumber();
    generateOneNumber();
}

function init() {
    //初始化下层单元格的位置
    for (let i = 0; i < 4; i++) {
        //遍历列
        for (let j = 0; j < 4; j++) {
            //找到每一个单元格
            let $gridCell = $('#grid-cell-' + i + '-' + j);
            //设置该单元格的左上角坐标
            $gridCell.css('top', getPosTop(i));
            $gridCell.css('left', getPosLeft(j));
        }
    }
    //初始化数组
    for (let i = 0; i < 4; i++) {
        nums[i] = new Array();
        hasConflicted[i] = new Array();
        for (let j = 0; j < 4; j++) {
            nums[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }
    //手动设置该数组的值
    // nums[1][3] = 4;
    // nums[0][1] = 2;
    // nums[2][3] = 8;
    //动态创建上层单元格并初始化
    updateView();
    score = 0;
    updateScore(0);
}

//更行上层单元格视图
function updateView() {
    //将上层单元格清空，然后重新初始化
    $('.number-cell').remove();

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            //动态创建这16个数字棋盘
            //如果该位置上的值不为0，显示该数值，设置长宽为100px
            $('.grid-container').append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
            //找到这每一个数字的单元格
            let numberCell = $('#number-cell-' + i + '-' + j);
            if (nums[i][j] == 0) {
                numberCell.css('width', '0px');
                numberCell.css('height', '0px');
                numberCell.css('top', getPosTop(i) + cellWidth * 0.5);
                numberCell.css('left', getPosLeft(j) + cellWidth * 0.5);
            } else {
                numberCell.css('width', cellWidth);
                numberCell.css('height', cellWidth);
                numberCell.css('top', getPosTop(i));
                numberCell.css('left', getPosLeft(j));
                numberCell.css('background-color', getNumberBackgroundColor(nums[i][j]));
                numberCell.css('color', getNumberColor(nums[i][j]));
                //将字写入该数字单元格
                numberCell.text(nums[i][j]);
            }
            //将hasConflicted重置
            hasConflicted[i][j] = false;
            //适配移动端
            $('.grid-container .number-cell').css('border-radius', cellWidth * 0.06);
            $('.grid-container .number-cell').css('font-size', cellWidth * 0.5);
            $('.grid-container .number-cell').css('line-height', cellWidth + 'px');

        }
    }
}

//判断是否还有空的单元格，没有剩余游戏结束
//在空余的单元格中随机生成带有数字单元格
//随机生成的是2或4
function generateOneNumber() {
    //判断是否还有空的单元格，没有剩余游戏结束、
    if (noSpace(nums)) {
        return;
    }
    //在空余的单元格中随机生成带有数字单元格
    let temp = new Array();
    let count = 0;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            //当单元格的值为0时，将该单元格对应的坐标转成一维索引
            if (nums[i][j] == 0) {
                temp[count] = i * 4 + j;
                count++;
            }
        }
    }

    //
    let pos = Math.floor(Math.random() * count); //[0,1)*count
    let randX = Math.floor(temp[pos] / 4);
    let randY = Math.floor(temp[pos] % 4);
    let randNum = Math.random() < 0.5 ? 2 : 4;
    nums[randX][randY] = randNum;

    //动画显示棋盘上的数字
    showNumWithAnimation(randX, randY, randNum);
}

//键盘相应操作
$(document).keydown(function (event) {
    //取消事件的默认动作
    event.preventDefault();
    switch (event.keyCode) {
        case 37: //left
            //判断是否可以向左移动
            if (canMoveLeft(nums)) {
                //向左移动
                moveLeft();
                setTimeout(generateOneNumber(), 300);
                setTimeout(isGameOver, 300); //每次移动之后判断是否游戏结束
            }
            break;
        case 38: //up
            //判断是否可以向上移动
            if (canMoveUp(nums)) {
                //向左移动
                moveUp();
                setTimeout(generateOneNumber(), 300);
                setTimeout(isGameOver, 300);
            }
            break;
        case 39: //right
            //判断是否可以向右移动
            if (canMoveRight(nums)) {
                //向又移动
                moveRight();
                setTimeout(generateOneNumber(), 300);
                setTimeout(isGameOver, 300);
            }
            break;
        case 40: //down
            //判断是否可以向下移动
            if (canMoveDown(nums)) {
                //向下移动
                moveDown();
                setTimeout(generateOneNumber(), 300);
                setTimeout(isGameOver, 300);
            }
            break;
    }
});

//手机端移动
function moveUpMoblie() {
    moveUp();
    setTimeout(generateOneNumber(), 300);
    setTimeout(isGameOver, 300);
}

function moveDownMoblie() {
    //向下移动
    moveDown();
    setTimeout(generateOneNumber(), 300);
    setTimeout(isGameOver, 300);
}

function moveRightMoblie() {
    //向you移动
    moveRight();
    setTimeout(generateOneNumber(), 300);
    setTimeout(isGameOver, 300);
}

function moveLeftMoblie() {
    moveLeft();
    setTimeout(generateOneNumber(), 300);
    setTimeout(isGameOver, 300); //每次移动之后判断是否游戏结束
}
//up, right, down, left为四个回调函数，分别处理上下左右的滑动事件
EventUtil.listenTouchDirection(document, true, moveUpMoblie, moveRightMoblie, moveDownMoblie, moveLeftMoblie);