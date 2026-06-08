document.body.addEventListener('click', function(event) {
  const card = event.target.closest('.portfolio__card');
  if (card && card.hasAttribute('data-lightbox-content')) {
    event.preventDefault();
    const content = card.getAttribute('data-lightbox-content');
    bp.open({
      items: [{
        html: content,
        width: 800,
        height: 600
      }]
    });
  }
});
