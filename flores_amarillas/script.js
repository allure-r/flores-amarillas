// Manejo del Reproductor de Música
const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');
const musicIcon = document.getElementById('music-icon');
const musicText = document.getElementById('music-text');
let isPlaying = false;

function startExperience() {
  // Desvanecer la pantalla de bienvenida
  const welcomeScreen = document.getElementById('welcome-screen');
  welcomeScreen.style.opacity = '0';
  setTimeout(() => {
    welcomeScreen.style.display = 'none';
  }, 600);

  // Reproducir el archivo de audio
  if (music) {
    music.play().then(() => {
      isPlaying = true;
      updateMusicButtonUI();
    }).catch(error => {
      console.log("Error al reproducir el archivo musica.mp3:", error);
    });
  }
}

function toggleMusic() {
  if (!music) return;

  if (isPlaying) {
    music.pause();
    isPlaying = false;
  } else {
    music.play();
    isPlaying = true;
  }
  updateMusicButtonUI();
}

function updateMusicButtonUI() {
  if (isPlaying) {
    musicIcon.textContent = '🔊';
    musicText.textContent = 'Pausar Música';
  } else {
    musicIcon.textContent = '🔇';
    musicText.textContent = 'Reproducir Música';
  }
}

// Interacción del Sobre y Carta
function toggleLetter() {
  const envelope = document.getElementById('envelope');
  envelope.classList.toggle('open');
}

// Lluvia Interactivas de Pétalos con Canvas
const canvas = document.getElementById('petalCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const petals = [];
const petalColors = ['#ffd166', '#ffb703', '#ffc300', '#fef08a'];

class Petal {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = -20;
    this.size = Math.random() * 8 + 6;
    this.speedY = Math.random() * 1.5 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.angle = Math.random() * 360;
    this.spin = Math.random() * 2 - 1;
    this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
  }

  update() {
    this.y += this.speedY;
    this.x += Math.sin(this.y * 0.01) + this.speedX;
    this.angle += this.spin;

    if (this.y > canvas.height + 20) {
      this.reset();
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.angle * Math.PI) / 180);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, this.size, this.size / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// Generación de 30 pétalos
for (let i = 0; i < 30; i++) {
  petals.push(new Petal());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  petals.forEach(petal => {
    petal.update();
    petal.draw();
  });
  requestAnimationFrame(animate);
}

animate();