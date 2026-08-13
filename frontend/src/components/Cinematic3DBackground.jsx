import React, { useEffect, useRef } from 'react';

export default function Cinematic3DBackground() {
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

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Film Dust & Light Particles
    const particleCount = 45;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 2 + 0.5,
        radius: Math.random() * 2 + 0.8,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.5 + 0.2,
        color: ['#6366f1', '#38bdf8', '#f59e0b', '#ec4899'][Math.floor(Math.random() * 4)]
      });
    }

    // Camera Aperture Lens Ring Parameters
    let apertureAngle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation for 3D depth parallax
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // 1. Draw Anamorphic Lens Flare Gradient Background
      const flareX = mouseX;
      const flareY = mouseY;

      const grad = ctx.createRadialGradient(flareX, flareY, 20, flareX, flareY, Math.max(width, height) * 0.5);
      grad.addColorStop(0, 'rgba(99, 102, 241, 0.12)');
      grad.addColorStop(0.4, 'rgba(56, 189, 248, 0.04)');
      grad.addColorStop(1, 'rgba(11, 15, 25, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Horizontal Anamorphic Streak Line
      ctx.beginPath();
      ctx.moveTo(0, flareY);
      ctx.lineTo(width, flareY);
      const streakGrad = ctx.createLinearGradient(0, 0, width, 0);
      streakGrad.addColorStop(0, 'rgba(99, 102, 241, 0)');
      streakGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.15)');
      streakGrad.addColorStop(1, 'rgba(99, 102, 241, 0)');
      ctx.strokeStyle = streakGrad;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 3. Draw Rotating 3D Camera Lens Aperture Ring
      apertureAngle += 0.003;
      const cx = width > 768 ? width * 0.8 : width * 0.5;
      const cy = height * 0.45;
      const radius = 140;
      const blades = 7;

      ctx.save();
      ctx.translate(cx + (mouseX - width / 2) * 0.03, cy + (mouseY - height / 2) * 0.03);
      ctx.rotate(apertureAngle);

      for (let i = 0; i < blades; i++) {
        const angle = (i * 2 * Math.PI) / blades;
        const x1 = Math.cos(angle) * radius;
        const y1 = Math.sin(angle) * radius;
        const x2 = Math.cos(angle + 0.6) * (radius * 0.45);
        const y2 = Math.sin(angle + 0.6) * (radius * 0.45);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(129, 140, 248, ${0.12 + (i % 2) * 0.08})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // Outer Lens Housing Ring
      ctx.beginPath();
      ctx.arc(0, 0, radius * 1.1, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();

      // 4. Render 3D Floating Cinematic Dust Particles
      particles.forEach((p) => {
        p.x += p.speedX * p.z;
        p.y += p.speedY * p.z;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * p.z, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * 0.7;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
    />
  );
}
