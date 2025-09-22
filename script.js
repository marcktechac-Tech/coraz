const canvas = document.getElementById("corazonCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 200;
canvas.height = 200;

function dibujarCorazon(t) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(100, 100);
  ctx.scale(8, 8);
  ctx.beginPath();
  for (let i = 0; i < Math.PI * 2; i += 0.01) {
    const x = 16 * Math.pow(Math.sin(i), 3);
    const y = -(
      13 * Math.cos(i) -
      5 * Math.cos(2 * i) -
      2 * Math.cos(3 * i) -
      Math.cos(4 * i)
    );
    ctx.lineTo(x, y);
  }
  ctx.strokeStyle = `rgba(255, 0, 0, ${0.7 + 0.3 * Math.sin(t / 10)})`;
  ctx.shadowBlur = 10;
  ctx.shadowColor = "red";
  ctx.lineWidth = 0.5;
  ctx.stroke();
  ctx.restore();
}

let tiempo = 0;
function animar() {
  dibujarCorazon(tiempo);
  tiempo++;
  requestAnimationFrame(animar);
}
animar();
