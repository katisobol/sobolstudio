// drag-to-scroll + snap to center
(function() {
  // Находим все галереи на странице
  const galleries = document.querySelectorAll('.case__gallery');

  galleries.forEach(gallery => {
    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;

    // Вспомогательная функция: определение ближайшего к центру элемента
    function getNearestCenterItem(container) {
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;
      let nearestItem = null;
      let minDistance = Infinity;

      // Перебираем дочерние элементы (слайды)
      const items = container.children; // или .case__gallery-item, если класс добавлен
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const itemRect = item.getBoundingClientRect();
        const itemCenter = itemRect.left + itemRect.width / 2;
        const distance = Math.abs(containerCenter - itemCenter);
        if (distance < minDistance) {
          minDistance = distance;
          nearestItem = item;
        }
      }
      return nearestItem;
    }

    // Плавная прокрутка к центру выбранного элемента
    function snapToCenter(container) {
      const targetItem = getNearestCenterItem(container);
      if (!targetItem) return;

      const containerRect = container.getBoundingClientRect();
      const itemRect = targetItem.getBoundingClientRect();
      // Вычисляем позицию scrollLeft, чтобы элемент оказался по центру
      const scrollTarget = container.scrollLeft + (itemRect.left - containerRect.left) -
                           (containerRect.width / 2) + (itemRect.width / 2);

      // Используем плавную прокрутку
      container.scrollTo({
        left: scrollTarget,
        behavior: 'smooth'
      });
    }

    // Обработчик начала перетаскивания
    function onMouseDown(e) {
      // ЛКМ (код 1)
      if (e.button !== 0) return;

      // Предотвращаем случайное выделение текста или перетаскивание картинок
      e.preventDefault();
      isDragging = true;
      startX = e.clientX;
      startScrollLeft = gallery.scrollLeft;

      // Добавляем модификатор для стилизации (например, курсор "grabbing")
      gallery.classList.add('case__gallery--dragging');

      // Отключаем стандартное перетаскивание изображений внутри галереи
      const images = gallery.querySelectorAll('img');
      images.forEach(img => img.setAttribute('draggable', 'false'));

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }

    function onMouseMove(e) {
      if (!isDragging) return;
      e.preventDefault();

      const deltaX = e.clientX - startX;
      // При движении влево (+delta) увеличиваем scrollLeft
      gallery.scrollLeft = startScrollLeft - deltaX;
    }

    function onMouseUp(e) {
      if (!isDragging) return;
      isDragging = false;
      gallery.classList.remove('case__gallery--dragging');

      // Возвращаем draggable обратно (опционально)
      const images = gallery.querySelectorAll('img');
      images.forEach(img => img.setAttribute('draggable', 'true'));

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      // Притягиваем ближайший элемент к центру
      snapToCenter(gallery);
    }

    // Назначаем слушатель на галерею
    gallery.addEventListener('mousedown', onMouseDown);

    // Предотвращаем выделение текста при двойном клике (опционально)
    gallery.addEventListener('dragstart', (e) => e.preventDefault());
  });
})();
