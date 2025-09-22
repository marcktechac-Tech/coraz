const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

const particles = [];
const heartPoints = [];

// Fórmula paramétrica del corazón (contorno)
function heartFunction(t) {
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
  return { x, y };
}

// Generar puntos del contorno del corazón
for (let t = 0; t < Math.PI * 2; t += 0.03) {
  const p = heartFunction(t);
  heartPoints.push({ x: p.x * 20, y: p.y * 20 }); // escala
}

// Crear partículas desde los bordes hacia puntos del corazón
for (let i = 0; i < 2000; i++) {
  let x, y;
  const side = Math.floor(Math.random() * 4);
  if (side === 0) { x = Math.random() * canvas.width; y = 0; }
  if (side === 1) { x = Math.random() * canvas.width; y = canvas.height; }
  if (side === 2) { x = 0; y = Math.random() * canvas.height; }
  if (side === 3) { x = canvas.width; y = Math.random() * canvas.height; }

  const target = heartPoints[Math.floor(Math.random() * heartPoints.length)];

  particles.push({
    startX: x,
    startY: y,
    targetX: centerX + target.x,
    targetY: centerY + target.y,
    x, y,
    offset: Math.random() * Math.PI * 2
  });
}

let startTime = null;
let pulse = 0;
const duration = 5000; // 5 segundos

function animate(timestamp) {
  if (!startTime) startTime = timestamp;
  const elapsed = timestamp - startTime;
  const progress = Math.min(elapsed / duration, 1); // 0 → 1 en 5s

  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  pulse += 0.1;
  const glow = 8 + Math.sin(pulse) * 6; // efecto de latido

  particles.forEach(p => {
    // interpolación lineal: desde el borde hasta el contorno en 5s
    p.x = p.startX + (p.targetX - p.startX) * progress;
    p.y = p.startY + (p.targetY - p.startY) * progress;

    // vibración ligera en el borde (palpitar)
    const vibrateX = Math.sin(pulse + p.offset) * 1.5 * progress;
    const vibrateY = Math.cos(pulse + p.offset) * 1.5 * progress;

    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.targetX + vibrateX, p.targetY + vibrateY);
    ctx.strokeStyle = "rgba(255,0,0,0.7)";
    ctx.lineWidth = 0.3;
    ctx.shadowBlur = glow;
    ctx.shadowColor = "red";
    ctx.stroke();
  });

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);



