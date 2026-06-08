document.addEventListener('DOMContentLoaded', function() {
  const bp = BiggerPicture({
    target: document.body,
    animation: 'fade',           // меняем анимацию на fade (вместо странного растяжения)
    animationDuration: 150,      // длительность в мс
    backgroundClose: true,       // закрытие по клику на фон
    keyboard: true,              // навигация с клавиатуры
    scrollable: true,            // разрешаем скролл внутри контента
    disableScrollOnOpen: false   // НЕ блокируем скролл страницы (или true, не принципиально)
  });

  document.body.addEventListener('click', function(event) {
    const card = event.target.closest('.portfolio__card[data-bp]');
    if (card) {
      event.preventDefault();
      try {
        const options = JSON.parse(card.getAttribute('data-bp'));
        bp.open(options);
      } catch (e) {
        console.error('Ошибка парсинга data-bp:', e);
      }
    }
  });
});
