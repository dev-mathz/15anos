const canvas = document.getElementById("magicCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.body.style.cursor = 'none';

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let particles = [];

const colors = [
  "rgba(255,182,255,0.8)",
  "rgba(209,170,255,0.8)",
  "rgba(255, 215, 0, 0.9)",
  "rgba(255,255,255,0.8)",
  "rgba(192,192,192,0.8)"
];

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 6 + 1;
    this.speedX = (Math.random() - 0.5) * 2;
    this.speedY = (Math.random() - 0.5) * 2;
    this.opacity = 1;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.opacity -= 0.015;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 20;
    ctx.globalAlpha = this.opacity;
    ctx.fill();
    ctx.globalAlpha = 0;
  }
}

function handleParticles() {
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();

    if (particles[i].opacity <= 0) {
      particles.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  requestAnimationFrame(animate);
}

animate();

document.addEventListener("mousemove", (e) => {
  for (let i = 0; i < 6; i++) {
    particles.push(new Particle(e.clientX, e.clientY));
  }
});

document.addEventListener("click", (e) => {
  document.body.style.cursor = "auto";

  const explosion = document.getElementById("explosion");
  const videoContainer = document.getElementById("videoContainer");

  explosion.style.left = `${e.clientX}px`;
  explosion.style.top = `${e.clientY}px`;
  explosion.style.opacity = 1;
  explosion.style.transition = "all 1.2s ease";
  explosion.style.transform = "translate(-50%, -50%) scale(20)";

  setTimeout(() => {
    explosion.style.opacity = 0;

    videoContainer.style.opacity = 1;

    const vid = document.getElementById("magicVideo");
    vid.muted = false;
    vid.play().catch(err => console.error("Erro ao iniciar vídeo:", err));

    // Adiciona o evento para redirecionar quando o vídeo terminar
    vid.onended = () => {
      window.location.href = 'journal1.html';
    };
  }, 1200);
}, { once: true });
