document.addEventListener('DOMContentLoaded', function() {
    // Создаём структуру лайтбокса, если её нет
    let modal = document.querySelector('.lightbox-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.className = 'lightbox-modal';
        modal.innerHTML = `
            <div class="lightbox-overlay"></div>
            <div class="lightbox-container">
                <button class="lightbox-close" aria-label="Кнопка для закрытия всплывающего окна галереи" title="Esc"></button>
                <div class="lightbox-content"></div>
            </div>
        `;
        document.body.appendChild(modal);

        // Закрытие по клику на оверлей
        const overlay = modal.querySelector('.lightbox-overlay');
        overlay.addEventListener('click', closeLightbox);

        // Закрытие по кнопке
        const closeBtn = modal.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', closeLightbox);

        // Закрытие по клавише Esc
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    function openLightbox(htmlContent) {
        const contentDiv = modal.querySelector('.lightbox-content');
        contentDiv.innerHTML = htmlContent;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // запрещаем скролл фона
    }

    function closeLightbox() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        // Очищаем контент, чтобы не накапливалось
        setTimeout(() => {
            const contentDiv = modal.querySelector('.lightbox-content');
            contentDiv.innerHTML = '';
        }, 300);
    }

    // Находим все карточки лайтбокса
    const cards = document.querySelectorAll('.portfolio__card--lightbox');
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const contentId = this.getAttribute('data-lightbox-id');
            const contentElement = document.getElementById(contentId);
            if (contentElement) {
                // Копируем содержимое, чтобы не изменять оригинал
                const clone = contentElement.cloneNode(true);
                openLightbox(clone.innerHTML);
            }
        });
    });
});
