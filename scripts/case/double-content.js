// берём контент и дублируем его в конец блока
document.addEventListener('DOMContentLoaded', function() {
    const containers = document.querySelectorAll(".double-content");
    containers.forEach((container) => {
        const items = container.querySelectorAll("*");
        items.forEach ((item) => {
            const clone = item.cloneNode(true);
            container.appendChild(clone);
        });
    });
});
