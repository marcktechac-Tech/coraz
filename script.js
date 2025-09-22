const canvas = document.getElementById("corazonCanvas");
const ctx = canvas.getContext("2d");

// Centrar y escalar
ctx.translate(canvas.width / 2, canvas.height / 2);
ctx.scale(10, 10);

let t = 0;
ctx.beginPath();

function animar() {
  if (t > Math.PI * 2) return; // detener al completar

  // Fórmula paramétrica del corazón
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));

  ctx.lineTo(x, y);
  ctx.strokeStyle = "rgba(255,0,0,0.9)";
  ctx.shadowBlur = 15;
  ctx.shadowColor = "red";
  ctx.lineWidth = 0.5;
  ctx.stroke();

  t += 0.02; // velocidad del trazo
  requestAnimationFrame(animar);
}

animar();

