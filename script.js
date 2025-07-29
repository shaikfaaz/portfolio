const canvas = document.getElementById("dots-canvas");
        const ctx = canvas.getContext("2d");

        let width, height;
        const dots = [];
        const mouse = { x: null, y: null, radius: 100 };

        function resizeCanvas() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        // Mouse move
        window.addEventListener("mousemove", function (e) {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        // Dot config
        for (let i = 0; i < 120; i++) {
            dots.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 4 + 2, // larger dots
                dx: (Math.random() - 0.5) * 0.7,
                dy: (Math.random() - 0.5) * 0.7,
            });
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);
            for (let dot of dots) {
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
                ctx.fill();

                // Repel effect
                const dx = mouse.x - dot.x;
                const dy = mouse.y - dot.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    const angle = Math.atan2(dy, dx);
                    const repelStrength = 2;
                    dot.x -= Math.cos(angle) * repelStrength;
                    dot.y -= Math.sin(angle) * repelStrength;
                }

                dot.x += dot.dx;
                dot.y += dot.dy;

                // Bounce
                if (dot.x < 0 || dot.x > width) dot.dx *= -1;
                if (dot.y < 0 || dot.y > height) dot.dy *= -1;
            }

            requestAnimationFrame(draw);
        }

        draw();