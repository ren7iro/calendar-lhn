const events = [
  {
    name: "⚔️ Battle Flag (Royale)",
    time: "2025-07-01T09:00:00+07:00"
  },
  {
    name: "📈 Exp x8 2hr",
    time: "2025-07-01T11:00:00+07:00"
  },
  {
    name: "🐉 Battle Laglamia",
    time: "2025-07-01T15:00:00+07:00"
  },
  {
    name: "💥 Revenge (Shilon,Lost Realm,Gwh)",
    time: "2025-07-01T22:00:00+07:00"
  },
  {
    name: "🪨 Battle Stone (Desert Saara)",
    time: "2025-07-02T09:00:00+07:00"
  }
];

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatCountdown(ms) {
  const totalSec = Math.floor(ms / 1000);
  const h = String(Math.floor(totalSec / 3600)).padStart(2, '0');
  const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
  const s = String(totalSec % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

function renderEvents() {
  const now = new Date();
  const container = document.getElementById("event-container");
  container.innerHTML = "";

  let nextEvent = null;
  let nextDiff = Infinity;

  events.forEach((event) => {
    const eventTime = new Date(event.time);
    const diff = eventTime - now;

    const countdown = diff > 0 ? formatCountdown(diff) : "⏱️ Passed";

    const row = document.createElement("div");
    row.className = "event-row";

    const name = document.createElement("div");
    name.className = "event-name";
    name.textContent = event.name;

    const time = document.createElement("div");
    time.className = "event-time";
    time.innerHTML = `${formatTime(eventTime)}<br><small>${countdown}</small>`;

    if (diff > 0 && diff < nextDiff) {
      nextEvent = row;
      nextDiff = diff;
    }

    row.appendChild(name);
    row.appendChild(time);
    container.appendChild(row);
  });

  if (nextEvent) {
    nextEvent.style.background = "#2a2a55";
    nextEvent.style.border = "1px solid #715bff";
  }

  document.getElementById("local-time").textContent = new Date().toLocaleTimeString();
}

renderEvents();
setInterval(renderEvents, 10000);
