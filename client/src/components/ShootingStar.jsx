import { useEffect, useRef } from "react";

function ShootingStar() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let shootingStars = [];

    const colors = [
      "255, 255, 255", // white
      "128, 0, 128", // purple
      "255, 255, 0", // yellow
      "255, 192, 203", // pink
      "255, 165, 0", // orange
      "255, 0, 0", // red
    ];

    function spawnShootingStar() {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const sizeChoice = ["small", "medium", "large"];
      const size = sizeChoice[Math.floor(Math.random() * sizeChoice.length)];

      let length, lineWidth, speed;
      switch (size) {
        case "small":
          length = Math.random() * 40 + 30; // 30 to 70 px
          lineWidth = 1;
          speed = Math.random() * 4 + 4; // slower speed for small
          break;
        case "medium":
          length = Math.random() * 60 + 50; // 50 to 110 px
          lineWidth = 2;
          speed = Math.random() * 6 + 6; // medium speed
          break;
        case "large":
          length = Math.random() * 100 + 80; // 80 to 180 px
          lineWidth = 3;
          speed = Math.random() * 8 + 8; // faster speed for big
          break;
      }

      shootingStars.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.5,
        length,
        lineWidth,
        speed,
        angle: (Math.random() * (70 - 20) + 20) * (Math.PI / 180),
        baseOpacity: 1,
        opacity: 1,
        sparklePhase: Math.random() * Math.PI * 2,
        color,
        size,
      });

      setTimeout(spawnShootingStar, Math.random() * 4000 + 3000);
    }

    function drawShootingStars() {
      ctx.clearRect(0, 0, width, height);

      shootingStars.forEach((star, index) => {
        star.opacity =
          star.baseOpacity * (0.6 + 0.4 * Math.sin(star.sparklePhase));
        star.sparklePhase += 0.2;

        const endX = star.x + Math.cos(star.angle) * star.length;
        const endY = star.y + Math.sin(star.angle) * star.length;

        const gradient = ctx.createLinearGradient(star.x, star.y, endX, endY);
        gradient.addColorStop(
          0,
          `rgba(${star.color},${star.opacity.toFixed(2)})`
        );
        gradient.addColorStop(1, `rgba(${star.color},0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = star.lineWidth;
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        star.x += star.speed * Math.cos(star.angle);
        star.y += star.speed * Math.sin(star.angle);

        star.baseOpacity -= 0.015;

        if (star.baseOpacity <= 0 || star.x > width || star.y > height) {
          shootingStars.splice(index, 1);
        }
      });

      requestAnimationFrame(drawShootingStars);
    }

    spawnShootingStar();
    drawShootingStars();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
      }}
    />
  );
}

export default ShootingStar;
