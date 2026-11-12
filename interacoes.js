document.addEventListener('DOMContentLoaded', () => {
  const topo = document.querySelector('.back-to-top');
  if (!topo) return;
  window.addEventListener('scroll', () => topo.classList.toggle('show', window.scrollY > 350));
  topo.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));
});
