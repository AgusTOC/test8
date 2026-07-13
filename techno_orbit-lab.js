const presetPool = [
  {
    name: 'Retro Transit UI',
    note: 'Ticket flow with bold typography, oversized route chips, and one-tap station hopping.'
  },
  {
    name: 'Calm Health Dashboard',
    note: 'Daily metrics in soft cards with gentle trend highlights and frictionless check-ins.'
  },
  {
    name: 'Indie Book Finder',
    note: 'Discovery-first catalog using mood tags, shelf maps, and social annotation snippets.'
  },
  {
    name: 'Civic Help Console',
    note: 'Issue reporting with urgency filters, map overlays, and neighborhood update threads.'
  },
  {
    name: 'Studio Sprint Board',
    note: 'Task lanes for micro-teams with timer blocks and quick voice recap notes.'
  }
];

const shuffleBtn = document.getElementById('shuffle-btn');
const presetName = document.getElementById('preset-name');
const presetNote = document.getElementById('preset-note');
const historyList = document.getElementById('history-list');
const historyEmpty = document.getElementById('history-empty');

const viewedPresets = [];

function randomPreset() {
  return presetPool[Math.floor(Math.random() * presetPool.length)];
}

function renderHistory() {
  historyList.innerHTML = '';

  if (viewedPresets.length === 0) {
    historyEmpty.hidden = false;
    return;
  }

  historyEmpty.hidden = true;

  viewedPresets.forEach((preset) => {
    const item = document.createElement('li');
    item.textContent = preset;
    historyList.appendChild(item);
  });
}

function showPreset() {
  const preset = randomPreset();
  presetName.textContent = preset.name;
  presetNote.textContent = preset.note;

  viewedPresets.unshift(preset.name);

  const uniqueRecent = viewedPresets.filter((name, index, allNames) => {
    return allNames.indexOf(name) === index;
  });

  viewedPresets.length = 0;
  viewedPresets.push(...uniqueRecent.slice(0, 6));

  renderHistory();
}

shuffleBtn.addEventListener('click', showPreset);
