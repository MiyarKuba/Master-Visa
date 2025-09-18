// Master Visa logic
// Assumption: start from 20% base score, then apply adjustments. Capped 0..100.
const BASE = 10;
const ADJUST = {
  marital: { single: -5, married: 8 },
  children: { yes: 3, no: 0 },
  age50: { yes: 3, no: 0 },
  bank: { yes: 10, no: 0 },
  company: { yes: 18, no: 0 },
  booking: { yes: 2, no: 0 },
  insurance: { yes: 2, no: 0 },
  prev: { yes: 30, no: 0 }
};

const form = document.getElementById("quizForm");
const scoreEl = document.getElementById("scoreValue");
const resultBtn = document.getElementById("submitBtn");
const errorMsg = document.getElementById("errorMsg");
const yearEl = document.getElementById("year");
yearEl.textContent = new Date().getFullYear();

function getScore() {
  let score = BASE;
  const data = new FormData(form);
  for (const k in ADJUST) {
    const v = data.get(k);
    if (v) score += ADJUST[k][v];
  }
  return Math.max(0, Math.min(100, score));
}

function updateScore() {
  scoreEl.textContent = getScore() + "%";
}
form.addEventListener("change", updateScore);

resultBtn.addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!name || !phone || !email) {
    errorMsg.textContent = "Please fill in your name, phone, and email.";
    return;
  }

  // simple validation
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    errorMsg.textContent = "Enter a valid email.";
    return;
  }

  // redirect to contact page
  window.location.href = "contact.html";
});
