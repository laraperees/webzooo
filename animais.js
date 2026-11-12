document.addEventListener('DOMContentLoaded', () => {
  const classe = document.querySelector('#filtro-classe');
  const alimentacao = document.querySelector('#filtro-alimentacao');
  const bioma = document.querySelector('#filtro-bioma');
  const cards = [...document.querySelectorAll('.animal-detail')];
  const resultado = document.querySelector('#resultado-filtros');
  const vazio = document.querySelector('#sem-resultados');
  const limpar = document.querySelector('#limpar-filtros');
  function filtrar() {
    let total = 0;
    cards.forEach(card => {
      const okClasse = classe.value === 'todos' || card.dataset.classe === classe.value;
      const okAlimento = alimentacao.value === 'todos' || card.dataset.alimentacao === alimentacao.value;
      const okBioma = bioma.value === 'todos' || card.dataset.biomas.split(' ').includes(bioma.value);
      const mostrar = okClasse && okAlimento && okBioma;
      card.hidden = !mostrar;
      if (mostrar) total++;
    });
    resultado.textContent = `${total} ${total === 1 ? 'animal encontrado' : 'animais encontrados'}.`;
    vazio.hidden = total !== 0;
  }
  [classe, alimentacao, bioma].forEach(campo => campo.addEventListener('change', filtrar));
  limpar.addEventListener('click', () => { classe.value = alimentacao.value = bioma.value = 'todos'; filtrar(); });
});
