document.addEventListener('DOMContentLoaded', function() {

    //const container = document.querySelector('.add-guides');
    const parentStyles = getComputedStyle(container);
    container.style.position = 'relative';

    const guideTemplate = document.createElement("img");

    guideTemplate.src = "assets/img/patterns/crop-marks.svg";
    guideTemplate.style.position = "absolute";
    guideTemplate.style.width = "100px";
    guideTemplate.style.height = "100px";
    guideTemplate.style.transformOrigin = "left top";

    if (!guideTemplate) {
        console.log('Нет, направляющая не создалась');
        return;
    }

    [0, 90, 180, 270].forEach((angle, i) => {
        const clone = guideTemplate.cloneNode(true);
        clone.style.transform = `rotate(${angle}deg)`;

        if (angle == 0) {
            clone.style = "right-bottom";
            var padding = parentStyles.paddingRight;
            clone.style.right = `calc(0 - ${padding})`;
            clone.style.bottom = "0";
        }
        container.appendChild(clone);
    });

});
