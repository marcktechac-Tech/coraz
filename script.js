const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

const particles = [];

// Fórmula paramétrica del corazón
function heartFunction(t) {
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
  return { x, y };
}

// Crear partículas
for (let i = 0; i < 1000; i++) {
  particles.push({
    x: centerX,
    y: centerY,
    target: heartFunction(Math.random() * Math.PI * 2),
    speed: 0.02 + Math.random() * 0.03
  });
}

function animate() {
  // Fondo semitransparente para efecto de estela
  ctx.fillStyle = "rgba(0,0,0,0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    // mover cada partícula hacia su punto objetivo
    p.x += (centerX + p.target.x * 15 - p.x) * p.speed;
    p.y += (centerY + p.target.y * 15 - p.y) * p.speed;

    // dibujar línea desde el centro hasta la partícula
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(p.x, p.y);
    ctx.strokeStyle = "rgba(255,0,0,0.5)";
    ctx.lineWidth = 0.2;
    ctx.shadowBlur = 8;
    ctx.shadowColor = "red";
    ctx.stroke();
  });

  requestAnimationFrame(animate);
}

animate();



