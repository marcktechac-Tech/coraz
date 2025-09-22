const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// Fórmula paramétrica del corazón
function heartFunction(t) {
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
  return { x, y };
}

// Crear partículas que se moverán hacia puntos del corazón
for (let i = 0; i < 800; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = Math.random() * 5;
  particles.push({
    x: centerX,
    y: centerY,
    target: heartFunction(Math.random() * Math.PI * 2),
    speed: 0.02 + Math.random() * 0.02
  });
}

function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    // mover cada partícula hacia su punto objetivo
    p.x += (centerX + p.target.x * 15 - p.x) * p.speed;
    p.y += (centerY + p.target.y * 15 - p.y) * p.speed;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(p.x, p.y);
    ctx.strokeStyle = "rgba(255,0,0,0.3)";
    ctx.lineWidth = 0.3;
    ctx.shadowBlur = 10;
    ctx.shadowColor = "red";
    ctx.stroke();
  });

  requestAnimationFrame(animate);
}

animate();

