// замеряет ширину скролла
function updateSlideLength() {
    const rows = document.querySelectorAll(".case__fullslide-row");
    rows.forEach((row) => {
        // Убедимся, что все изображения в строке загружены и имеют реальные размеры
        const images = row.querySelectorAll("img");
        let loadedCount = 0;
        const total = images.length;

        function checkAllLoaded() {
            if (loadedCount === total) {
                const windowWidth = window.innerWidth;
                const blockWidth = row.scrollWidth;
                const slideLength = windowWidth - blockWidth;
                row.style.setProperty("--slideLength", `${slideLength}px`);
            }
        }

        if (total === 0) {
            // Если нет изображений — считаем сразу
            const windowWidth = window.innerWidth;
            const blockWidth = row.scrollWidth;
            const slideLength = windowWidth - blockWidth;
            row.style.setProperty("--slideLength", `${slideLength}px`);
            return;
        }

        images.forEach((img) => {
            if (img.complete) {
                loadedCount++;
                checkAllLoaded();
            } else {
                img.addEventListener("load", () => {
                    loadedCount++;
                    checkAllLoaded();
                });
                img.addEventListener("error", () => {
                    loadedCount++; // всё равно считаем, чтобы не зависнуть
                    checkAllLoaded();
                });
            }
        });
    });
}

// Запускаем после полной загрузки страницы (включая все картинки)
window.addEventListener("load", updateSlideLength);
// Пересчитываем при изменении размеров окна (с небольшим debounce)
let resizeTimer;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(updateSlideLength, 150);
});
