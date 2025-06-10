import React, { useRef, useEffect } from "react";
//tamaño del contenedor
const BallField = () => {
  const canvasRef = useRef(null);
  const ballsRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  // Nuevo: tamaño dinámico
  const [size, setSize] = React.useState({ width: 0, height: 0 });
  const containerDiv = useRef(null);

  useEffect(() => {
    function updateSize() {
      if (containerDiv.current) {
        setSize({
          width: containerDiv.current.offsetWidth,
          height: containerDiv.current.offsetHeight
        });
      }
    }
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    if (!size.width || !size.height) return;
    // Inicializa
    const minDist = 80;
    const balls = [];
    let attempts = 0;
    while (balls.length < 26 && attempts < 1000) {
      const radius = Math.random() * 48 + 12;
      const x = Math.random() * (size.width - 2 * radius) + radius;
      const y = Math.random() * (size.height - 2 * radius) + radius;

      //que no se encimen
      let overlaps = false;
      for (let b of balls) {
        const dist = Math.sqrt((b.x - x) ** 2 + (b.y - y) ** 2);
        if (dist < b.radius + radius + minDist * 0.3) {
          overlaps = true;
          break;
        }
      }
      if (!overlaps) {
        balls.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: 0,
          vy: 0,
          radius,
          color: '#f074a8',
        });
      }
      attempts++;
    }
    ballsRef.current = balls;
    ballsRef.current.forEach(b => {
      b.baseX = b.x;
      b.baseY = b.y;
    });

    let running = true;
    function animate() {
      if (!running) return;
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, size.width, size.height);
      ballsRef.current.forEach(ball => {
        // Repulsión por mouse
        const d = distance(ball.x, ball.y, mouseRef.current.x, mouseRef.current.y);
        if (d < 60) {
          const angle = Math.atan2(ball.y - mouseRef.current.y, ball.x - mouseRef.current.x);
          const force = (60 - d) * 0.18;
          ball.vx += Math.cos(angle) * force;
          ball.vy += Math.sin(angle) * force;
        }

        // Restaurar a posición base
        const dx = ball.baseX - ball.x;
        const dy = ball.baseY - ball.y;
        ball.vx += dx * 0.06;
        ball.vy += dy * 0.06;
        // Fricción
        ball.vx *= 0.85;
        ball.vy *= 0.85;
        // Movimiento
        ball.x += ball.vx;
        ball.y += ball.vy;
        // Dibuja
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        // Sin glow
        ctx.shadowBlur = 0;
        ctx.fill();
      });
      requestAnimationFrame(animate);
    }
    animate();
    return () => { running = false; };
  }, [size]);

  function handleMouseMove(e) {
    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
  }
  function handleMouseLeave() {
    mouseRef.current.x = -1000;
    mouseRef.current.y = -1000;
  }

  return (
    <div ref={containerDiv} style={{ width: '100%', height: '100%', position: 'relative' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas
        ref={canvasRef}
        width={size.width}
        height={size.height}
        style={{ width: '100%', height: '100%', background: 'transparent', borderRadius: 18, pointerEvents: 'auto', position: 'absolute', left: 0, top: 0 }}
      />
      {/* Palabra FLOW centrada */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 10
        }}
      >
        <span className="silkscreen-bold" style={{
          color: '#fff',
          fontSize: '5rem',
          letterSpacing: '0.2em',
          textShadow: '0 2px 8px #000a',
          userSelect: 'none',
        }}>FLOW</span>
      </div>
    </div>
  );
};


function distance(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

export default BallField;
