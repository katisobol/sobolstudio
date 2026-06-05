// если доступа к Unsplash у пользователя нет
document.addEventListener('DOMContentLoaded', function() {
  const gallery = document.querySelectorAll('.gallery.moodboard');
  if (!gallery) return;
  const images = gallery.querySelectorAll('img');
  let anyImageLoaded = false;
  images.forEach(img => {
    img.addEventListener('load', () => anyImageLoaded = true);
    img.addEventListener('error', () => {});
  });
  // через небольшую задержку проверим, загрузилась ли хоть одна картинка
  setTimeout(() => {
    if (!anyImageLoaded) {
      // Или скрыть галерею: gallery.style.display = 'none';
      gallery.innerHTML = '<p class="small">На территории РФ просто взяли и заблокировали фотогрфии. Даже просто фотокарточки, Карл!</p>';
    }
  }, 2000);
});
