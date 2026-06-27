document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.add-copy-btn').forEach(anchor => {

    // 1. Запоминаем исходный текст элемента и создаём кнопку
    const originalText = anchor.textContent.trim();

    const button = document.createElement('button');
    button.classList.add('copy-btn');
    button.classList.add('btn');
    const buttonText = 'Копировать';
    button.textContent = buttonText;

    // 2. Обработчик, что использует сохранённый текст
    button.addEventListener('click', function() {
      navigator.clipboard.writeText(originalText)
        .then(() => {
          this.textContent = 'Скопировано!';
          setTimeout(() => this.textContent = buttonText, 1500);
        })
        .catch(err => {
          console.error('Ошибка копирования:', err);
          alert('Не скопировалось! Придётся это делать вручную');
        });
    });

    anchor.append(button);
  });
});
