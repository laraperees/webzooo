document.addEventListener('DOMContentLoaded', () => {
  const botao = document.querySelector('#buscar-clima');
  const resultado = document.querySelector('#resultado-clima');
  if (!botao || !resultado) return;
  const descricao = {0:'Céu limpo',1:'Predominantemente limpo',2:'Parcialmente nublado',3:'Nublado',45:'Neblina',48:'Neblina com geada',51:'Garoa leve',53:'Garoa moderada',55:'Garoa intensa',61:'Chuva leve',63:'Chuva moderada',65:'Chuva forte',80:'Pancadas de chuva',81:'Pancadas moderadas',82:'Pancadas fortes',95:'Trovoadas'};
  botao.addEventListener('click', async () => {
    resultado.innerHTML = '<p>Consultando a previsão do tempo...</p>';
    botao.disabled = true;
    try {
      const url = 'https://api.open-meteo.com/v1/forecast?latitude=-23.65&longitude=-46.62&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=America%2FSao_Paulo&forecast_days=1';
      const resposta = await fetch(url);
      if (!resposta.ok) throw new Error('Erro na API');
      const dados = await resposta.json();
      const temp = Math.round(dados.current.temperature_2m);
      const max = Math.round(dados.daily.temperature_2m_max[0]);
      const min = Math.round(dados.daily.temperature_2m_min[0]);
      const chuva = dados.daily.precipitation_probability_max[0] ?? 'Não disponível';
      const clima = descricao[dados.current.weather_code] || 'Condição meteorológica atualizada';
      resultado.innerHTML = `<p class="weather-number">${temp} °C</p><p><strong>${clima}</strong></p><p>Máxima de ${max} °C e mínima de ${min} °C.</p><p>Chance de chuva: ${chuva}%.</p><small>Dados meteorológicos: Open-Meteo.</small>`;
    } catch (erro) { resultado.textContent = 'A previsão do tempo não está disponível no momento. Tente novamente mais tarde.'; }
    finally { botao.disabled = false; }
  });
});
