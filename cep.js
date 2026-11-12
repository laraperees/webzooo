document.addEventListener('DOMContentLoaded', () => {
  const botao = document.querySelector('#buscar-cep');
  const campo = document.querySelector('#cep');
  const status = document.querySelector('#status-cep');
  if (!botao || !campo) return;
  botao.addEventListener('click', async () => {
    const cep = campo.value.replace(/\D/g, '');
    if (cep.length !== 8) { status.textContent = 'Digite um CEP com 8 números.'; return; }
    status.textContent = 'Buscando endereço...';
    botao.disabled = true;
    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!resposta.ok) throw new Error('Falha na consulta');
      const dados = await resposta.json();
      if (dados.erro) { status.textContent = 'Não encontramos esse CEP. Confira os números e tente novamente.'; return; }
      document.querySelector('#rua').value = dados.logradouro || '';
      document.querySelector('#bairro').value = dados.bairro || '';
      document.querySelector('#cidade').value = dados.localidade || '';
      document.querySelector('#estado').value = dados.uf || '';
      status.textContent = `Endereço encontrado: ${dados.logradouro || 'logradouro não informado'}, ${dados.bairro || 'bairro não informado'} - ${dados.localidade}/${dados.uf}.`;
    } catch (erro) { status.textContent = 'Não foi possível consultar o CEP agora. Tente novamente em instantes.'; }
    finally { botao.disabled = false; }
  });
  campo.addEventListener('input', () => { const n = campo.value.replace(/\D/g,'').slice(0,8); campo.value = n.length > 5 ? `${n.slice(0,5)}-${n.slice(5)}` : n; });
});
