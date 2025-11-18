const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 8001;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// tracking/storing everything, could be upgraded to db in future. unlocked stores unlocked acheivements
// when adding new events to track, add countere here.
let state = {
  counters: {
    searches: 0,
    clicks: 0
  },
  unlocked: []
};

// Achievement rules - when adding new events add the acheviement and condition here.
const achievements = [
  { id: 'test1', name: 'achievement test1', check: s => s.counters.searches >= 1 }
];

// Check and unlock achievements
function checkAchievements() {
  for (const a of achievements) {
    if (!state.unlocked.includes(a.id) && a.check(state)) {
      state.unlocked.push(a.id);
    }
  }
}

// Return achievement status in JSON form to test
app.get('/achievements', (req, res) => {
  const unlocked = achievements.filter(a => state.unlocked.includes(a.id));
  const locked = achievements.filter(a => !state.unlocked.includes(a.id));
  res.json({ unlocked, locked, counters: state.counters });
});

// Receive events from test program or dashboard
app.post('/events', (req, res) => {
  const { type } = req.body || {};
  if (!type) return res.status(400).json({ error: 'Missing event type' });

  applyEvent(type);
  res.json({ ok: true, counters: state.counters, unlocked: state.unlocked });
});

// Handle route errors
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

// Update counters- when adding new event add it here as well
function applyEvent(type) {
  if (type === 'search') {
    state.counters.searches++;
  }
  if (type === 'click') {
    state.counters.clicks++;
  }

  checkAchievements();
}

app.listen(PORT, () => {
  console.log(`Achievement Service running on port ${PORT}`);
});