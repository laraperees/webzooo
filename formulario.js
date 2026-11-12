document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#form-participe');
  if (!form) return;
  const mensagem = document.querySelector('#mensagem');
  const contador = document.querySelector('#contador-mensagem');
  mensagem.addEventListener('input', () => { contador.textContent = `${mensagem.value.length} caracteres (mínimo de 10).`; });
  const erros = {nome:'erro-nome',email:'erro-email',cep:'erro-cep',assunto:'erro-assunto',mensagem:'erro-mensagem',aceite:'erro-aceite'};
  form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    Object.values(erros).forEach(id => { const el = document.getElementById(id); if(el) el.textContent = ''; });
    let valido = true;
    const nome = document.querySelector('#nome').value.trim();
    const email = document.querySelector('#email').value.trim();
    const cep = document.querySelector('#cep').value.replace(/\D/g,'');
    const assunto = document.querySelector('#assunto').value;
    const texto = mensagem.value.trim();
    const aceite = document.querySelector('#aceite').checked;
    function erro(campo, textoErro) { document.getElementById(erros[campo]).textContent = textoErro; valido = false; }
    if (nome.split(/\s+/).length < 2) erro('nome','Informe o nome completo.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) erro('email','Informe um e-mail válido.');
    if (cep.length !== 8) erro('cep','Digite um CEP com 8 números.');
    if (!assunto) erro('assunto','Selecione um assunto.');
    if (texto.length < 10) erro('mensagem','Escreva uma mensagem com pelo menos 10 caracteres.');
    if (!aceite) erro('aceite','É necessário aceitar para continuar.');
    const feedback = document.querySelector('#form-feedback');
    if (valido) { feedback.textContent = `Cadastro recebido! Obrigado por participar do WebZoo, ${nome}. Este formulário é demonstrativo: nenhum dado foi enviado ou armazenado.`; form.reset(); contador.textContent = '0 caracteres (mínimo de 10).'; }
    else feedback.textContent = 'Confira os campos destacados e tente novamente.';
  });
});
