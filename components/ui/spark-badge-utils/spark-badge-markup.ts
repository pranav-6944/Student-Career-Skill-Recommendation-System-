export const SPARK_BADGE_MARKUP = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body, html { width: 100%; height: 100%; overflow: hidden; background: #0b1329; font-family: system-ui, -apple-system, sans-serif; }
    
    .badge-container {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      background: radial-gradient(circle at 50% 40%, #1e1b4b 0%, #0f172a 70%, #090d16 100%);
    }

    canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .badge-card {
      position: relative;
      z-index: 2;
      width: 82%;
      max-width: 280px;
      padding: 24px 20px;
      background: rgba(15, 23, 42, 0.75);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(99, 102, 241, 0.35);
      border-radius: 20px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6),
                  0 0 30px rgba(79, 70, 229, 0.25),
                  inset 0 1px 1px rgba(255, 255, 255, 0.2);
      text-align: center;
      transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease;
      cursor: pointer;
    }

    .badge-card:hover {
      transform: translateY(-6px) scale(1.03);
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.7),
                  0 0 45px rgba(99, 102, 241, 0.4),
                  inset 0 1px 2px rgba(255, 255, 255, 0.3);
    }

    .badge-icon {
      width: 56px;
      height: 56px;
      margin: 0 auto 14px;
      border-radius: 16px;
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 10px 20px rgba(79, 70, 229, 0.4), 0 0 15px rgba(124, 58, 237, 0.5);
      animation: iconGlow 3s infinite ease-in-out alternate;
    }

    @keyframes iconGlow {
      0% { box-shadow: 0 10px 20px rgba(79, 70, 229, 0.4), 0 0 15px rgba(124, 58, 237, 0.5); }
      100% { box-shadow: 0 12px 28px rgba(79, 70, 229, 0.7), 0 0 30px rgba(16, 185, 129, 0.6); }
    }

    .badge-icon svg {
      width: 28px;
      height: 28px;
      fill: none;
      stroke: #ffffff;
      stroke-width: 2.2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .badge-title {
      font-size: 15px;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: -0.01em;
      margin-bottom: 4px;
    }

    .badge-subtitle {
      font-size: 11px;
      font-weight: 600;
      color: #818cf8;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 14px;
    }

    .badge-pills {
      display: flex;
      justify-content: center;
      gap: 6px;
      flex-wrap: wrap;
    }

    .pill {
      font-size: 10px;
      font-weight: 600;
      padding: 3px 8px;
      border-radius: 99px;
      background: rgba(99, 102, 241, 0.15);
      color: #a5b4fc;
      border: 1px solid rgba(99, 102, 241, 0.25);
    }

    .pill.verified {
      background: rgba(16, 185, 129, 0.15);
      color: #34d399;
      border-color: rgba(16, 185, 129, 0.3);
    }
  </style>
</head>
<body>
  <div class="badge-container">
    <canvas id="rainCanvas"></canvas>
    
    <div class="badge-card">
      <div class="badge-icon">
        <svg viewBox="0 0 24 24">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
        </svg>
      </div>
      <div class="badge-title">AI Career Certified</div>
      <div class="badge-subtitle">Verified Readiness · 94.8%</div>
      <div class="badge-pills">
        <span class="pill verified">✓ Python</span>
        <span class="pill verified">✓ Data Science</span>
        <span class="pill">SQL Master</span>
      </div>
    </div>
  </div>

  <script>
    const canvas = document.getElementById('rainCanvas');
    const ctx = canvas.getContext('2d');
    
    let width, height;
    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const particles = [];
    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 12 + 6,
        speed: Math.random() * 2 + 1.2,
        opacity: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.5 ? '#818cf8' : '#34d399'
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        ctx.beginPath();
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.lineWidth = 1.2;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.length * 0.3, p.y + p.length);
        ctx.stroke();

        p.y += p.speed;
        p.x -= p.speed * 0.3;

        if (p.y > height) {
          p.y = -10;
          p.x = Math.random() * width;
        }
      });

      requestAnimationFrame(animate);
    }
    animate();
  </script>
</body>
</html>
`;
