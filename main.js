import { musicSrc, lovePhrases, colors, lyricsData } from "./config.js";

document.addEventListener("DOMContentLoaded", () => {
  const indexPage = document.getElementById("index-page");
  const flowerPage = document.getElementById("flower-page");
  const link = document.getElementById("flower-link");
  const audio = document.getElementById("background-music");
  audio.src = musicSrc;

  // Cambiar de portada a flores
  link.addEventListener("click", (e) => {
    e.preventDefault();
    indexPage.classList.add("hidden");
    flowerPage.classList.remove("hidden");
    document.body.classList.replace("index-body", "flower-body");
    audio.play().catch(()=>{});
    createLoveRain();
    createHearts();
    startLyricsAnimation();
  });

  // Corazones flotantes
  function createHearts() {
    setInterval(() => {
      const heart = document.createElement("div");
      heart.className = "heart";
      const size = Math.random() * 20 + 10;
      heart.style.width = size + "px";
      heart.style.height = size + "px";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.top = "100vh";
      heart.style.backgroundColor = colors[Math.floor(Math.random()*colors.length)];
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 6000);
    }, 400);
  }

  // Lluvia de frases
  function createLoveRain() {
    const container = document.getElementById("loveRain");
    setInterval(() => {
      const phrase = document.createElement("div");
      phrase.className = "love-phrase";
      phrase.textContent = lovePhrases[Math.floor(Math.random()*lovePhrases.length)];
      phrase.style.left = Math.random() * 90 + "vw";
      phrase.style.color = colors[Math.floor(Math.random()*colors.length)];
      phrase.style.fontSize = (16 + Math.random()*20) + "px";
      phrase.style.animation = `fall ${5 + Math.random()*5}s linear`;
      container.appendChild(phrase);
      setTimeout(() => phrase.remove(), 8000);
    }, 1000);
  }

  // Letras sincronizadas
  function startLyricsAnimation() {
    const lyrics = document.getElementById("lyrics");
    setInterval(() => {
      const time = Math.floor(audio.currentTime);
      const currentLine = lyricsData.find(line => time >= line.time && time < line.time + 6);
      if (currentLine) {
        lyrics.textContent = currentLine.text;
        lyrics.style.opacity = 1;
      } else {
        lyrics.style.opacity = 0;
      }
    }, 500);
  }
});
