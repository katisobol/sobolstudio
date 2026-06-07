function initBiggerPicture() {
  const bp = BiggerPicture({
    target: document.body,
  });

  // Находим все карточки, которые ведут на лайтбокс
  const lightboxLinks = document.querySelectorAll('.portfolio-card[data-bp]');

  lightboxLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault(); // Отменяем переход по ссылке
      const options = JSON.parse(link.dataset.bp);
      bp.open(options);
    });
  });
}

// Вызываем инициализацию после загрузки DOM
document.addEventListener('DOMContentLoaded', initBiggerPicture);
