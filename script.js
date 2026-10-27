let playersData = [];

// Ссылки на контейнеры списков
const goaltendersContainer = document.getElementById('goaltenders-list');
const defendersContainer = document.getElementById('defenders-list');
const forwardsContainer = document.getElementById('forwards-list');

// Ссылки на модальное окно
const modal = document.getElementById('player-modal');
const modalBody = document.getElementById('modal-body');
const closeModalBtn = document.getElementById('close-modal');

// 1. Функция запроса данных из JSON
fetch('players.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Не удалось загрузить JSON файл');
    }
    return response.json();
  })
  .then(data => {
    playersData = data;
    renderAllLists(playersData); // Вывод карт хоккеистов (LIST)
  })
  .catch(error => console.error('Ошибка загрузки данных:', error));

// 2. Функция распределения и отрисовки списков (LIST)
function renderAllLists(players) {
  if (!goaltendersContainer || !defendersContainer || !forwardsContainer) return;

  // Очищаем блоки перед вставкой
  goaltendersContainer.innerHTML = '';
  defendersContainer.innerHTML = '';
  forwardsContainer.innerHTML = '';

  players.forEach(player => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <img src="${player.photo}" alt="${player.name}" class="team-photo">
      <h3 class="infa">#${player.number} ${player.name}</h3>
      <p>${player.position} | Хват: ${player.grip}</p>
      <button class="btn" onclick="openDetail(${player.id})">Подробнее</button>
    `;

    // Распределяем карточки в нужную секцию
    if (player.cat === 'goaltenders') {
      goaltendersContainer.appendChild(card);
    } else if (player.cat === 'defenders') {
      defendersContainer.appendChild(card);
    } else if (player.cat === 'forwards') {
      forwardsContainer.appendChild(card);
    }
  });
}

// 3. Функция открывания подробной карточки игрока (DETAIL)
function openDetail(id) {
  const player = playersData.find(item => item.id === id);
  if (!player) return;

  // Формируем блок статистики
  let statsContent = '';
  if (player.position === 'Вратарь') {
    statsContent = `
      <li><strong>Игры:</strong> ${player.stats.games}</li>
      <li><strong>% отраженных бросков:</strong> ${player.stats.saves}</li>
      <li><strong>Коэффициент надежности:</strong> ${player.stats.gaa}</li>
    `;
  } else {
    statsContent = `
      <li><strong>Игры:</strong> ${player.stats.games}</li>
      <li><strong>Голы:</strong> ${player.stats.goals}</li>
      <li><strong>Передачи:</strong> ${player.stats.assists}</li>
      <li><strong>Очки (Г+П):</strong> ${player.stats.points}</li>
    `;
  }

  // Заполняем содержимое модалки
  modalBody.innerHTML = `
    <div class="modal-detail-header">
      <img src="${player.photo}" alt="${player.name}">
      <div class="modal-detail-info">
        <h2>${player.name} #${player.number}</h2>
        <p><strong>Позиция:</strong> ${player.position}</p>
        <p><strong>Хват:</strong> ${player.grip}</p>
        <p><strong>Страна:</strong> ${player.country}</p>
        <p><strong>Возраст:</strong> ${player.age} лет</p>
        <p><strong>Рост / Вес:</strong> ${player.height} см / ${player.weight} кг</p>
      </div>
    </div>
    
    <div class="modal-stats-box">
      <strong>Статистика сезона:</strong>
      <ul>${statsContent}</ul>
    </div>
    
    <p><strong>Информация:</strong> ${player.biography}</p>
  `;

  // Показываем модальное окно
  modal.style.display = 'flex';
}

// 4. Логика закрытия модалки
if (closeModalBtn) {
  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });
}

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});