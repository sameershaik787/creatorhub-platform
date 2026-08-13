import React, { useEffect, useRef } from 'react';

export default function AdobeCreativeBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const canvas = mountRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    const handleResize = () => {
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Pointer tracking for responsiveness
    let mouseX = width / 2;
    let mouseY = height / 2;

    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    window.addEventListener('pointermove', handlePointerMove);

    // Adobe Creative Tool Badges (Ps, Pr, Ae, Lr, Au, Ai)
    const toolBadges = [
      { text: 'Pr', name: 'Premiere Pro', color: '#9999FF', bg: '#000055', x: width * 0.15, y: height * 0.25, vx: 0.3, vy: 0.2 },
      { text: 'Ae', name: 'After Effects', color: '#D685FF', bg: '#160033', x: width * 0.82, y: height * 0.3, vx: -0.25, vy: 0.3 },
      { text: 'Ps', name: 'Photoshop', color: '#31A8FF', bg: '#001E36', x: width * 0.75, y: height * 0.7, vx: -0.3, vy: -0.2 },
      { text: 'Au', name: 'Audition', color: '#00E5B3', bg: '#002B24', x: width * 0.2, y: height * 0.75, vx: 0.2, vy: -0.3 },
      { text: 'Lr', name: 'Lightroom', color: '#31A8FF', bg: '#001E36', x: width * 0.5, y: height * 0.15, vx: 0.15, vy: 0.2 },
      { text: 'Ai', name: 'Illustrator', color: '#FF9A00', bg: '#331000', x: width * 0.5, y: height * 0.85, vx: -0.2, vy: -0.15 }
    ];

    // Morphing Fluid Gradient Blobs
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.008;

      // 1. Adobe Creative Fluid Mesh Gradient Background
      const blob1X = width * 0.3 + Math.sin(time * 0.7) * 120 + (mouseX - width / 2) * 0.05;
      const blob1Y = height * 0.4 + Math.cos(time * 0.5) * 80 + (mouseY - height / 2) * 0.05;

      const blob2X = width * 0.7 + Math.cos(time * 0.6) * 140;
      const blob2Y = height * 0.5 + Math.sin(time * 0.8) * 100;

      const grad1 = ctx.createRadialGradient(blob1X, blob1Y, 30, blob1X, blob1Y, Math.max(width, height) * 0.45);
      grad1.addColorStop(0, 'rgba(79, 70, 229, 0.18)'); // Electric Indigo
      grad1.addColorStop(0.5, 'rgba(192, 38, 211, 0.08)'); // Adobe Magenta
      grad1.addColorStop(1, 'rgba(11, 15, 25, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(blob2X, blob2Y, 40, blob2X, blob2Y, Math.max(width, height) * 0.4);
      grad2.addColorStop(0, 'rgba(2, 132, 199, 0.14)'); // Creative Cyan
      grad2.addColorStop(0.6, 'rgba(124, 58, 237, 0.06)');
      grad2.addColorStop(1, 'rgba(11, 15, 25, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Floating Adobe Creative Tool Badges
      toolBadges.forEach((b) => {
        b.x += b.vx;
        b.y += b.vy;

        if (b.x < 50 || b.x > width - 50) b.vx *= -1;
        if (b.y < 50 || b.y > height - 50) b.vy *= -1;

        // Draw Square Adobe Badge Box
        const size = width < 640 ? 32 : 40;
        ctx.save();
        ctx.translate(b.x, b.y);

        // Badge Fill
        ctx.fillStyle = b.bg;
        ctx.strokeStyle = b.color;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = b.color;
        ctx.shadowBlur = 12;

        ctx.beginPath();
        ctx.roundRect(-size / 2, -size / 2, size, size, 8);
        ctx.fill();
        ctx.stroke();

        // Badge Text
        ctx.shadowBlur = 0;
        ctx.fillStyle = b.color;
        ctx.font = `bold ${size * 0.45}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(b.text, 0, 1);

        ctx.restore();
      });

      // 3. Draw Fine Creative Grid Overlay
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return (
    <canvas
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
    />
  );
}
