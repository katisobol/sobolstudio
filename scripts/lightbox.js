(function() {
  // Создаём структуру лайтбокса
  function createLightbox() {
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';

    const container = document.createElement('div');
    container.className = 'lightbox-container';

    const loader = document.createElement('div');
    loader.className = 'lightbox-loader';

    const img = document.createElement('img');
    img.className = 'lightbox-image';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close';
    closeBtn.innerHTML = '✕';
    closeBtn.setAttribute('aria-label', 'Закрыть');

    const hint = document.createElement('div');
    hint.className = 'lightbox-zoom-hint';
    hint.textContent = '🔍 Нажмите для увеличения';

    container.appendChild(loader);
    container.appendChild(img);
    container.appendChild(closeBtn);
    container.appendChild(hint);
    overlay.appendChild(container);
    document.body.appendChild(overlay);

    return { overlay, img, closeBtn, hint, loader };
  }

  const lb = createLightbox();
  let currentSrc = '';
  let isZoomed = false;

  // Функция открытия
  function openLightbox(src) {
    currentSrc = src;

    // Показываем лоадер
    lb.overlay.classList.add('loading');
    lb.overlay.style.visibility = 'visible';
    lb.overlay.style.opacity = '1';

    // Загружаем новое изображение
    const tempImg = new Image();
    tempImg.onload = function() {
      lb.img.src = src;
      lb.overlay.classList.remove('loading');

      // Добавляем класс для анимации
      setTimeout(() => {
        lb.overlay.classList.add('active');
      }, 10);

      // Проверяем нужен ли зум
      const imgNaturalW = tempImg.width;
      const imgNaturalH = tempImg.height;
      const maxW = window.innerWidth * 0.9;
      const maxH = window.innerHeight * 0.9;

      if (imgNaturalW > maxW || imgNaturalH > maxH) {
        lb.hint.style.display = 'block';
      } else {
        lb.hint.style.display = 'none';
      }
    };

    tempImg.onerror = function() {
      lb.overlay.classList.remove('loading');
      console.error('Не удалось загрузить изображение:', src);
    };

    tempImg.src = src;
    lb.img.classList.remove('zoomed');
    isZoomed = false;
  }

  // Закрытие с анимацией
  function closeLightbox() {
    lb.overlay.classList.remove('active');
    setTimeout(() => {
      if (!lb.overlay.classList.contains('active')) {
        lb.overlay.style.visibility = 'hidden';
        lb.overlay.style.opacity = '0';
        lb.overlay.classList.remove('loading');
      }
    }, 300);
    lb.img.classList.remove('zoomed');
    isZoomed = false;
  }

  // Переключение зума
  function toggleZoom() {
    if (!isZoomed) {
      const imgNaturalW = lb.img.naturalWidth;
      const imgNaturalH = lb.img.naturalHeight;
      const maxW = window.innerWidth * 0.9;
      const maxH = window.innerHeight * 0.9;
      const needsZoom = (imgNaturalW > maxW || imgNaturalH > maxH);

      if (needsZoom) {
        lb.img.classList.add('zoomed');
        isZoomed = true;
        lb.hint.textContent = '🔍 Нажмите чтобы уменьшить';
      }
    } else {
      lb.img.classList.remove('zoomed');
      isZoomed = false;
      lb.hint.textContent = '🔍 Нажмите для увеличения';
    }
  }

  // Обработчики
  lb.closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeLightbox();
  });

  lb.overlay.addEventListener('click', (e) => {
    if (e.target === lb.overlay) {
      closeLightbox();
    }
  });

  lb.img.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleZoom();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lb.overlay.style.visibility === 'visible') {
      closeLightbox();
    }
  });

  // API инициализации
  window.initLightboxGallery = function(className = 'lightbox-gallery') {
    const elements = document.querySelectorAll(`.${className}`);
    elements.forEach(el => {
      if (el.tagName === 'A' && el.href) {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          openLightbox(el.href);
        });
      } else if (el.tagName === 'IMG') {
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => {
          openLightbox(el.src);
        });
      }
    });
  };

  // Автозапуск
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.initLightboxGallery('lightbox-gallery');
    });
  } else {
    window.initLightboxGallery('lightbox-gallery');
  }
})();
