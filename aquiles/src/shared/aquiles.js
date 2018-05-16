import * as identifiers from './identifiers';
import * as standarts from './standarts';

export const compareToPathStandards = (coord) => {
    return coord.indexOf(identifiers.LENGTH) >= 0 ?
        coord.split(identifiers.LENGTH)[0]
            &&
            coord.split(identifiers.LENGTH)[0] <= standarts.MAX_DEGREE
            &&
            coord.split(identifiers.LENGTH)[0] >= standarts.MIN_DEGREE ?
            coord.split(identifiers.LENGTH)[1] > 0
                &&
                coord.split(identifiers.LENGTH)[1] <= standarts.MAX_LENGTH ?
                true
                : false
            : false
        : false;
}

export const draw = (id, coords) => {

    const canvas = document.querySelector(`[data-canvas-id='${id}']`);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let initialPoint = {
        x: 150,
        y: 150
    }

    let segment;

    ctx.beginPath();

    // draw all segments
    coords.map(path => {

            segment = {
                degrees: path.split(identifiers.LENGTH)[0],
                length: path.split(identifiers.LENGTH)[1]
            }

            ctx.moveTo(initialPoint.x, initialPoint.y);

            let angle = segment.degrees * Math.PI / 180;
            let _x = Math.cos(angle) * segment.length;
            let _y = Math.sin(angle) * segment.length;
            initialPoint.x += _x;
            initialPoint.y += _y;

            ctx.lineTo(initialPoint.x, initialPoint.y);

    })

    ctx.stroke();
}


