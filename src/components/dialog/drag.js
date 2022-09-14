/*
 * @Author: zhangyang
 * @Date: 2021-05-13 10:52:30
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-05-13 10:52:47
 * @Description: file content
 */
const addEvent = (el, func) => {
    const elDialogHeader = el.querySelector('.el-dialog__header');

    elDialogHeader.style.cursor = 'move';
    elDialogHeader.addEventListener('mousedown', function (e) { return func(e) }, false);
}
const getContainer = (el) => {
    const elDialogHeader = el.querySelector('.el-dialog__header');
    const elDialog = el.querySelector('.el-dialog');
    const headerHeight = elDialogHeader.clientHeight;
    const width = elDialog.clientWidth;
    const height = elDialog.clientHeight + headerHeight / 4;
    const offsetWidth = elDialog.offsetWidth;
    const offsetHeight = elDialog.offsetHeight;
    const left = elDialog.offsetLeft;
    const top = elDialog.offsetTop;

    return { width, height, offsetWidth, offsetHeight, left, top }
}
const getScreen = () => {
    const body = document.body;
    const screenW = body.clientWidth;
    const screenH = body.clientHeight;

    return { screenW, screenH }
}
const getBorder = (el) => {
    const { screenW, screenH } = getScreen();
    const { width, height, left, top } = getContainer(el);

    const minLeft = left / 2;
    const maxLeft = screenW - width / 2;
    const minTop = top / 2;
    const maxTop = screenH - height / 2;

    return { minLeft, maxLeft, minTop, maxTop };
}
const moveCoordinate = (ev, initMouseX, initMouseY, left, top) => {
    const moveX = ev.clientX - initMouseX + left;
    const moveY = ev.clientY - initMouseY + top;

    return { moveX, moveY };
}
const getMoveRunX = (moveX, minLeft, maxLeft, width) => {
    if (moveX - minLeft < width / 2 - minLeft) {
        return width / 2;
    } else if (moveX >= maxLeft) {
        return maxLeft;
    }
    return moveX;
}
const getMoveRunY = (moveY, minTop, maxTop, height) => {
    if (moveY - minTop < height / 2 - minTop) {
        return height / 2;
    } else if (moveY >= maxTop) {
        return maxTop;
    }
    return moveY;
}
export default {
    bind(el) {
        addEvent(el, function (e) {
            const elDialog = el.querySelector('.el-dialog');
            const { width, height, left, top } = getContainer(el);
            const { minLeft, maxLeft, minTop, maxTop } = getBorder(el);
            const initMouseX = e.clientX;
            const initMouseY = e.clientY;

            document.onmousemove = function (ev) {
                const { moveX, moveY } = moveCoordinate(ev, initMouseX, initMouseY, left, top);
                const moveRunX = getMoveRunX(moveX, minLeft, maxLeft, width);
                const moveRunY = getMoveRunY(moveY, minTop, maxTop, height);

                elDialog.style.left = `${moveRunX}px`;
                elDialog.style.top = `${moveRunY}px`;
            }

            document.onmouseup = function (ev) {
                document.onmousedown = null;
                document.onmousemove = null;
                document.onmouseup = null;
            };

            return false;
        })
    },
    update(el, binding, vnode, old) {
        const elDialog = el.querySelector('.el-dialog');
        setTimeout(() => {
            if (el.style.display === 'none') {
                elDialog.style.top = '';
                elDialog.style.left = '';
            }
        }, 333);
    },
}