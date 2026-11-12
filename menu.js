// Menu responsivo: abre e fecha no celular.
document.addEventListener('DOMContentLoaded', () => {
  const botao = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#menu-principal');
  if (!botao || !menu) return;
  botao.addEventListener('click', () => {
    const aberto = botao.getAttribute('aria-expanded') === 'true';
    botao.setAttribute('aria-expanded', String(!aberto));
    botao.setAttribute('aria-label', aberto ? 'Abrir menu' : 'Fechar menu');
    menu.hidden = aberto;
  });
});
