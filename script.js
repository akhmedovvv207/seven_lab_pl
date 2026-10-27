let players = [];

fetch('players.json')
  .then(res => res.json())
  .then(data => {
    players = data;
    showPlayers();
  });

function showPlayers() {
  const gList = document.getElementById('goaltenders-list');
  const dList = document.getElementById('defenders-list');
  const fList = document.getElementById('forwards-list');

  players.forEach(player => {
    let card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${player.photo}" class="team-photo">
      <h3>#${player.number} ${player.name}</h3>
      <p>${player.position} | Хват: ${player.grip}</p>
      <button class="btn" onclick="openModal(${player.id})">Подробнее</button>
    `;

    if (player.cat === 'goaltenders') gList.appendChild(card);
    if (player.cat === 'defenders') dList.appendChild(card);
    if (player.cat === 'forwards') fList.appendChild(card);
  });
}

function openModal(id) {
  let player = players.find(item => item.id === id);
  let modal = document.getElementById('player-modal');
  let body = document.getElementById('modal-body');

  body.innerHTML = `
    <h2>${player.name} #${player.number}</h2>
    <img src="${player.photo}" style="width: 150px; margin-bottom: 10px;">
    <p><b>Позиция:</b> ${player.position}</p>
    <p><b>Страна:</b> ${player.country}</p>
    <p><b>Возраст:</b> ${player.age} лет</p>
    <p><b>Рост/Вес:</b> ${player.height}см / ${player.weight}кг</p>
    <p><b>Статистика:</b> ${player.stats}</p>
    <p><b>Описание:</b> ${player.biography}</p>
  `;

  modal.style.display = 'flex';
}

document.getElementById('close-modal').onclick = function() {
  document.getElementById('player-modal').style.display = 'none';
};

window.onclick = function(event) {
  let modal = document.getElementById('player-modal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};