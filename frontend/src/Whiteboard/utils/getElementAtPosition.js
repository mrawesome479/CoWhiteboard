import { cursorPositions, toolTypes } from "../../constants";

const nearPoint = (x, y, x1, y1, cursorPosition) => {
    return Math.abs(x - x1) < 5 && Math.abs(y - y1) ? cursorPosition : null;
}

const positionWithInElement = (x, y, element) => {
    const {type, x1, x2, y1, y2} = element;
    switch(type){
        case toolTypes.RECTANGLE:
            const topLeft = nearPoint(x, y, x1, y1, cursorPositions.TOP_LEFT);
            const topRight = nearPoint(x, y, x2, y1, cursorPositions.TOP_RIGHT);
            const bottomLeft = nearPoint(x, y, x1, y2, cursorPositions.BOTTOM_LEFT);
            const bottomRight = nearPoint(x, y, x2, y2, cursorPositions.BOTTOM_RIGHT);
            const inside = x >= x1 && x <= x2 && y >= y1 && y <= y2 ? cursorPositions.INSIDE : null;
            return topLeft || topRight || bottomLeft || bottomRight || inside;
        case toolTypes.TEXT:
            return x >= x1 && x <= x2 && y >= y1 && y <= y2 ? cursorPositions.INSIDE : null;
        default:
    }
}

export const getElementAtPosition = (x, y, elements) => {
    return elements.map((element) => ({
        ...element,
        position: positionWithInElement(x, y, element)
    }))
    .find(element => element.position !== null && element.position !== undefined)
}