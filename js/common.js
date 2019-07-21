//定义移动端尺寸
let documentWidth = document.documentElement.clientWidth; //页面dom的宽度
//console.log(documentWidth);
let containerWidth = documentWidth * 0.92; //容器宽度
let cellWidth = documentWidth * 0.18; //单元格的宽度
let cellSpace = documentWidth * 0.04; //单元格间隙宽度



//获取距离上边的位置,i是行，从0开始计算
function getPosTop(i) {
    return cellSpace + (cellWidth + cellSpace) * i;
}

//获取距离左边的位置，j是列，从0开始计算
function getPosLeft(j) {
    return cellSpace + (cellWidth + cellSpace) * j;
}

//获取数字的背景色
function getNumberBackgroundColor(num) {
    //获取数字背景颜色
    switch (num) {
        case 2:
            return "#eee4da";
            break;
        case 4:
            return "#ede0c8";
            break;
        case 8:
            return "#f2b179";
            break;
        case 16:
            return "#f59563";
            break;
        case 32:
            return "#f67c5f";
            break;
        case 64:
            return "#f65e3b";
            break;
        case 128:
            return "#edcf72";
            break;
        case 256:
            return "#edcc61";
            break;
        case 512:
            return "#9c0";
            break;
        case 1024:
            return "#33b5e5";
            break;
        case 2048:
            return "#09c";
            break;
        case 4096:
            return "#a6c";
            break;
        case 8192:
            return "#93c";
            break;
    }
}

//获取数字的颜色
//逻辑：4以下灰色， 4以上白色
function getNumberColor(num) {
    if (num <= 4) {
        return "#d3c9c9"; //灰色
    } else {
        return "#fff";
    }
}
//还有返回false，没有返回true
function noSpace() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (nums[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}

//判断是否能向左移动
function canMoveLeft(nums) {
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            //如果数字的值不为0
            if (nums[i][j] != 0) {
                //如果该数字所在行的前一列等于0或者和当前值相等
                if (nums[i][j - 1] == 0 || nums[i][j - 1] == nums[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}
//判断是否能向右移动
function canMoveRight(nums) {
    for (let i = 0; i < 4; i++) {
        for (let j = 2; j >= 0; j--) {
            //如果数字的值不为0
            if (nums[i][j] != 0) {
                //如果该数字所在行的后一列等于0或者和当前值相等
                if (nums[i][j + 1] == 0 || nums[i][j + 1] == nums[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveUp(nums) {
    for (let j = 0; j < 4; j++) {
        for (let i = 1; i < 4; i++) {
            //如果数字的值不为0
            if (nums[i][j] != 0) {
                //如果该数字所在行的前一列等于0或者和当前值相等
                if (nums[i - 1][j] == 0 || nums[i - 1][j] == nums[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveDown(nums) {
    for (let j = 0; j < 4; j++) {
        for (let i = 2; i >= 0; i--) {
            //如果数字的值不为0
            if (nums[i][j] != 0) {
                //如果该数字所在行的前一列等于0或者和当前值相等
                if (nums[i + 1][j] == 0 || nums[i + 1][j] == nums[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

//判断水平方向上没有障碍物,没有返回true
function noBlockHorizontal(row, col1, col2, nums) {
    //以此判断k+1到j-1列之间
    for (let i = col1 + 1; i < col2; i++) {
        if (nums[row][i] != 0) {
            return false;
        }
    }
    return true;
}

//判断垂直方向上没有障碍物,没有返回true
function noBlockVertical(col, row1, row2, nums) {
    //以此判断k+1到j-1列之间
    for (let i = row1 + 1; i < row2; i++) {
        if (nums[i][col] != 0) {
            return false;
        }
    }
    return true;
}
//更新分数
function updateScore(score) {
    $('#score').text(score);
}

//向左移动
/*
    1.落脚点没有数字，并且移动路径中没有障碍物
    2.落脚点数字和自己相同，并且移动路径中没有障碍物
*/
function moveLeft() {
    for (let i = 0; i < 4; i++) { //i代表行
        for (let j = 1; j < 4; j++) { //j代表列，从第二列靠i是第一列不需要移动
            if (nums[i][j] != 0) {
                for (let k = 0; k < j; k++) {
                    //如果当前单元格为0，并且第i行的第k-j列之间没有障碍物才可以移动
                    if (nums[i][k] == 0 && noBlockHorizontal(i, k, j, nums)) {
                        //执行移动操作
                        showMoveAnimation(i, j, i, k); //移动效果
                        nums[i][k] = nums[i][j];
                        nums[i][j] = 0;
                        continue;
                    }
                    //相同进行消融
                    else if (nums[i][k] == nums[i][j] && noBlockHorizontal(i, k, j, nums) && !hasConflicted[i][k]) {
                        showMoveAnimation(i, j, i, k); //移动效果
                        nums[i][k] += nums[i][j];
                        nums[i][j] = 0;
                        score += nums[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    //更新页面上的视图
    setTimeout(updateView, 200);
}

//向右移动
function moveRight() {
    for (let i = 0; i < 4; i++) { //i代表行
        for (let j = 2; j >= 0; j--) { //j代表列，最后一列不需要移动
            if (nums[i][j] != 0) {
                for (let k = 3; k > j; k--) {
                    //如果当前单元格为0，并且第i行的第k-j列之间没有障碍物才可以移动
                    if (nums[i][k] == 0 && noBlockHorizontal(i, j, k, nums)) {
                        //执行移动操作
                        showMoveAnimation(i, j, i, k); //移动效果
                        nums[i][k] = nums[i][j];
                        nums[i][j] = 0;
                        continue;
                    } else if (nums[i][k] == nums[i][j] && noBlockHorizontal(i, j, k, nums) && !hasConflicted[i][k]) {
                        //执行移动操作
                        showMoveAnimation(i, j, i, k); //移动效果
                        nums[i][k] += nums[i][j];
                        nums[i][j] = 0;
                        score += nums[i][k];
                        updateScore(score);
                        //将该单元格设置成已经叠加过
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    //更新页面上的视图
    setTimeout(updateView, 200);
}
//向上移动
function moveUp() {
    for (let j = 0; j < 4; j++) { //i代表行
        for (let i = 1; i < 4; i++) { //j代表列，从第二列靠i是第一列不需要移动
            if (nums[i][j] != 0) {
                for (let k = 0; k < i; k++) {
                    //如果当前单元格为0，并且第i行的第k-j列之间没有障碍物才可以移动
                    if (nums[k][j] == 0 && noBlockVertical(j, k, i, nums)) {
                        //执行移动操作
                        showMoveAnimation(i, j, k, j); //移动效果
                        nums[k][j] = nums[i][j];
                        nums[i][j] = 0;
                        continue;
                    } else if (nums[k][j] == nums[i][j] && noBlockVertical(j, k, i, nums) && !hasConflicted[k][j]) {
                        //执行移动操作
                        showMoveAnimation(i, j, k, j); //移动效果
                        nums[k][j] += nums[i][j];
                        score += nums[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true;
                        nums[i][j] = 0;
                        continue;
                    }
                }
            }
        }
    }
    //更新页面上的视图
    setTimeout(updateView, 200);
}
//向下移动
function moveDown() {
    for (let j = 0; j < 4; j++) { //i代表行
        for (let i = 2; i >= 0; i--) { //j代表列，从第二列靠i是第一列不需要移动
            if (nums[i][j] != 0) {
                for (let k = 3; k > i; k--) {
                    //如果当前单元格为0，并且第i行的第k-j列之间没有障碍物才可以移动
                    if (nums[k][j] == 0 && noBlockVertical(j, i, k, nums)) {
                        //执行移动操作
                        showMoveAnimation(i, j, k, j); //移动效果
                        nums[k][j] = nums[i][j];
                        nums[i][j] = 0;
                        continue;
                    } else if (nums[k][j] == nums[i][j] && noBlockVertical(j, i, k, nums) && !hasConflicted[k][j]) {
                        //执行移动操作
                        showMoveAnimation(i, j, k, j); //移动效果
                        nums[k][j] += nums[i][j];
                        nums[i][j] = 0;
                        score += nums[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    //更新页面上的视图
    setTimeout(updateView, 200);
}

// function noSpace(nums) {
//     for (var i = 0; i < 4; j++) {
//         if (nums[i][j] == 0) {
//             return false;
//         }
//     }
//     return true;
// }

function noMove(nums) {
    if (canMoveLeft(nums) || canMoveRight(nums) || canMoveUp(nums) || canMoveDown(nums)) {
        return false;
    }
    return true;
}

function isGameOver() {
    if (noSpace(nums) && noMove(nums)) {
        alert("真棒，最终分数是" + score);
    }
}


function settingForMobile() {
    $('#header .wrapper').css('width', containerWidth);

    $('.grid-container').css('width', containerWidth - cellSpace * 2);
    $('.grid-container').css('height', containerWidth - cellSpace * 2);
    $('.grid-container').css('padding', cellSpace);
    $('.grid-container').css('border-radius', containerWidth * 0.02);

    $('.grid-container .grid-cell').css('width', cellWidth);
    $('.grid-container .grid-cell').css('height', cellWidth);
    $('.grid-container .grid-cell').css('border-radius', cellWidth * 0.06);


}



var EventUtil = {
    addHandler: function (element, type, handler) {
        if (element.addEventListener)
            element.addEventListener(type, handler, false);
        else if (element.attachEvent)
            element.attachEvent("on" + type, handler);
        else
            element["on" + type] = handler;
    },
    removeHandler: function (element, type, handler) {
        if (element.removeEventListener)
            element.removeEventListener(type, handler, false);
        else if (element.detachEvent)
            element.detachEvent("on" + type, handler);
        else
            element["on" + type] = handler;
    },
    /**
     * 监听触摸的方向
     * @param target            要绑定监听的目标元素
     * @param isPreventDefault  是否屏蔽掉触摸滑动的默认行为（例如页面的上下滚动，缩放等）
     * @param upCallback        向上滑动的监听回调（若不关心，可以不传，或传false）
     * @param rightCallback     向右滑动的监听回调（若不关心，可以不传，或传false）
     * @param downCallback      向下滑动的监听回调（若不关心，可以不传，或传false）
     * @param leftCallback      向左滑动的监听回调（若不关心，可以不传，或传false）
     */
    listenTouchDirection: function (target, isPreventDefault, upCallback, rightCallback, downCallback, leftCallback) {
        this.addHandler(target, "touchstart", handleTouchEvent);
        this.addHandler(target, "touchend", handleTouchEvent);
        this.addHandler(target, "touchmove", handleTouchEvent);
        var startX;
        var startY;

        function handleTouchEvent(event) {
            switch (event.type) {
                case "touchstart":
                    startX = event.touches[0].pageX;
                    startY = event.touches[0].pageY;
                    break;
                case "touchend":
                    var spanX = event.changedTouches[0].pageX - startX;
                    var spanY = event.changedTouches[0].pageY - startY;

                    if (Math.abs(spanX) > Math.abs(spanY)) { //认定为水平方向滑动
                        if (spanX > 30) { //向右
                            if (rightCallback)
                                rightCallback();
                        } else if (spanX < -30) { //向左
                            if (leftCallback)
                                leftCallback();
                        }
                    } else { //认定为垂直方向滑动
                        if (spanY > 30) { //向下
                            if (downCallback)
                                downCallback();
                        } else if (spanY < -30) { //向上
                            if (upCallback)
                                upCallback();
                        }
                    }

                    break;
                case "touchmove":
                    //阻止默认行为
                    if (isPreventDefault)
                        event.preventDefault();
                    break;
            }
        }
    }
};

// document.addEventListener('touchstart', function (event) {
//     startX = event.touches[0].pageX;
//     startY = event.touches[0].pageY;

// });

// document.addEventListener('touchend', function (event) {
//     endX = event.changedTouches[0].pageX;
//     endY = event.changedTouches[0].pageY;

//     let x = endX - startX;
//     let Y = endY - startY;

//     //滑动距离小于一定值不做任何操作
//     if (Math.abs(x) < documentWidth * 0.08) {
//         return;
//     } else {
//         if (Math.abs(x) >= Math.abs(y)) {
//             if (x > 0) { //向右移动

//             } else { //向左移动

//             }
//         } else {
//             if (y > 0) { //向下移动

//             } else { //向上移动

//             }

//         }
//     }
// });