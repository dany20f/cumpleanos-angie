const eventDate = new Date("2026-08-22T19:00:00-05:00");
const fields = ["days", "hours", "minutes", "seconds"];
const gate = document.getElementById("gate");
const gateCard = document.getElementById("gate-card");
const noScene = document.getElementById("no-scene");
const declineButton = document.getElementById("decline-button");
const hint = document.getElementById("tiny-hint");
let escapes = 0;

function updateCountdown() {
  const total = Math.max(0, eventDate.getTime() - Date.now());
  const values = [Math.floor(total / 86400000), Math.floor((total / 3600000) % 24), Math.floor((total / 60000) % 60), Math.floor((total / 1000) % 60)];
  fields.forEach((field, index) => document.getElementById(field).textContent = String(values[index]).padStart(2, "0"));
}

function openInvitation() {
  gate.classList.add("leaving");
  window.setTimeout(() => { gate.hidden = true; document.getElementById("principal").focus(); }, 480);
  window.setTimeout(() => document.getElementById("principal").scrollIntoView({ behavior: "smooth" }), 540);
}

function showNoScene() {
  gateCard.hidden = true;
  noScene.hidden = false;
  noScene.classList.add("scene-in");
}

function escapeButton() {
  escapes += 1;
  if (escapes >= 3) return showNoScene();
  const positions = [
    { x: "3.5rem", y: "6rem" },
    { x: "-3.5rem", y: "-6rem" },
    
  ];
  const next = positions[escapes - 1];
  declineButton.style.setProperty("--escape-x", next.x);
  declineButton.style.setProperty("--escape-y", next.y);
  declineButton.classList.add("escaped");
  hint.textContent = escapes === 1 ? "Uy… parece que este botón tiene miedo a perderse la fiesta." : "Última oportunidad para decirle que no a Angie…";
}

document.getElementById("accept-button").addEventListener("click", openInvitation);
document.getElementById("comeback-button").addEventListener("click", openInvitation);
document.getElementById("try-again-button").addEventListener("click", () => { noScene.hidden = true; gateCard.hidden = false; escapes = 0; declineButton.classList.remove("escaped"); hint.textContent = "Pista: el segundo botón es un poco dramático."; });
declineButton.addEventListener("click", escapeButton);
document.getElementById("open-invitation").addEventListener("click", () => document.getElementById("invitacion").scrollIntoView({ behavior: "smooth" }));
updateCountdown();
window.setInterval(updateCountdown, 1000);
