const TOTAL_STOCK = 67000;
let stock = localStorage.getItem('kdiePlushieStock');
if (stock === null) {
  stock = TOTAL_STOCK;
} else {
  stock = parseInt(stock, 10);
  if (isNaN(stock)) stock = TOTAL_STOCK;
}
let cartCount = 0;

const stockNumEl  = document.getElementById('stockNum');
const stockFillEl = document.getElementById('stockFill');
const cartCountEl = document.getElementById('cartCount');
const ctaBtn      = document.getElementById('ctaBtn');
const toastEl     = document.getElementById('toast');

/* ── Render stock bar ── */
function renderStock() {
  stockNumEl.textContent = stock.toLocaleString();
  stockFillEl.style.width = (stock / TOTAL_STOCK * 100) + '%';
  localStorage.setItem('kdiePlushieStock', stock);
}

/* ── Add to cart ── */
const toastMessages = [
  "🍔 Happy Meal added to cart! Ronald approves.",
  "🎉 Another one?? You're unstoppable.",
  "🤡 Ronald is watching. He is proud of you.",
  "😂 bro really ordered another Happy Meal",
  "🏆 Excellent taste. Stock going fast. Panic buy.",
  "🐟 The Filet-O-Fish is jealous of your choice.",
  "🪆 At this point just move into McDonald's.",
];

function addToCart() {
  if (stock <= 0) {
    showToast("💀 Out of stock. Ronald is devastated.");
    return;
  }
  stock -= 1;
  cartCount += 1;
  renderStock();

  cartCountEl.textContent = cartCount;

  ctaBtn.textContent = '✅ ADDED TO CART!';
  ctaBtn.classList.add('done');
  setTimeout(() => {
    ctaBtn.textContent = 'ORDER NOW';
    ctaBtn.classList.remove('done');
  }, 1400);

  const msg = toastMessages[Math.min(cartCount - 1, toastMessages.length - 1)];
  showToast(msg);

  // Generate and show DLC modal
  document.getElementById('dlcCodeText').textContent = generateDlcCode();
  document.getElementById('dlcOverlay').style.display = 'flex';
}

/* ── DLC Modal ── */
function generateDlcCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function closeDlcModal() {
  document.getElementById('dlcOverlay').style.display = 'none';
}

/* ── Toast ── */
let toastTimer;
function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3000);
}

/* ── Image switch ── */
function setImg(btn, src) {
  document.getElementById('mainImg').src = src;
  document.querySelectorAll('.thumb').forEach(t => t.classList.remove('selected'));
  btn.classList.add('selected');
}

/* ── Slow ambient stock drain (meme effect) ── */
setInterval(() => {
  if (stock > 0) {
    stock = Math.max(0, stock - (Math.floor(Math.random() * 21) + 90)); // Drain 90-110 per second
    renderStock();
  }
}, 1000);

/* ── Init ── */
renderStock();
