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
    name: "💥 Revenge (Shilon, Lost Realm, Gwh)",
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

  events.forEach(event => {
    const eventTime = new Date(event.time);
    const diff = eventTime - now;

    let rightText = "";
    if (diff > 0) {
      rightText = formatCountdown(diff);
    } else if (diff > -7200000) { // if event is within the last 2 hours
      rightText = "<span class='ongoing'>ON GOING</span>";
    } else {
      rightText = "Done";
    }

    const row = document.createElement("div");
    row.className = "event-row";
    row.innerHTML = `
      <div class="event-name">${event.name}</div>
      <div class="event-time">${formatTime(eventTime)}<br><small>${rightText}</small></div>
    `;
    container.appendChild(row);
  });

  document.getElementById("local-time").textContent = new Date().toLocaleTimeString();
}

renderEvents();
setInterval(renderEvents, 10000);
