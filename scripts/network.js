// Clase para crear y gestionar una animación de red neuronal visual
class NeuralNetwork {
    constructor() {
        // Inicialización de variables principales
        this.canvas = document.getElementById("networkCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.particles = [];
        this.numberOfParticles = 50; // Número de partículas en la red
        this.connectionDistance = 150; // Distancia máxima para conectar partículas

        this.init();
    }

    // Método de inicialización y configuración de eventos
    init() {
        this.resizeCanvas();
        this.createParticles();
        this.animate();
        // Evento para redimensionar el canvas cuando cambia el tamaño de la ventana
        window.addEventListener("resize", () => {
            this.resizeCanvas();
            this.createParticles();
        });
    }

    // Ajusta el tamaño del canvas al tamaño de la ventana
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    // Crea un array de partículas con propiedades aleatorias
    createParticles() {
        this.particles = Array.from({ length: this.numberOfParticles }, () => ({
            x: Math.random() * this.canvas.width, // Posición X aleatoria
            y: Math.random() * this.canvas.height, // Posición Y aleatoria
            speedX: (Math.random() - 0.5) * 2, // Velocidad X aleatoria
            speedY: (Math.random() - 0.5) * 2, // Velocidad Y aleatoria
            size: Math.random() * 3 + 1, // Tamaño aleatorio entre 1 y 4
        }));
    }

    // Dibuja la conexión entre dos partículas con efecto de brillo
    drawConnection(particle, otherParticle, distance) {
        const opacity = 1 - distance / this.connectionDistance;

        // Efecto de brillo (línea más gruesa y clara)
        this.ctx.beginPath();
        this.ctx.moveTo(particle.x, particle.y);
        this.ctx.lineTo(otherParticle.x, otherParticle.y);
        this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
        this.ctx.lineWidth = 3;
        this.ctx.stroke();

        // Línea principal (más delgada y de color)
        this.ctx.beginPath();
        this.ctx.moveTo(particle.x, particle.y);
        this.ctx.lineTo(otherParticle.x, otherParticle.y);
        this.ctx.strokeStyle = `rgba(0, 255, 234, ${opacity})`;
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
    }

    // Dibuja una partícula individual con efecto de brillo
    drawParticle(particle) {
        // Efecto de brillo (círculo exterior)
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size + 2, 0, Math.PI * 2);
        this.ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        this.ctx.fill();

        // Partícula principal
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fillStyle = "#00ffea";
        this.ctx.fill();
    }

    // Actualiza y dibuja todas las partículas y sus conexiones
    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((particle) => {
            // Actualiza la posición de la partícula
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Rebote en los bordes del canvas
            if (particle.x < 0 || particle.x > this.canvas.width)
                particle.speedX *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height)
                particle.speedY *= -1;

            this.drawParticle(particle);

            // Dibuja conexiones con otras partículas cercanas
            this.particles.forEach((otherParticle) => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.connectionDistance) {
                    this.drawConnection(particle, otherParticle, distance);
                }
            });
        });
    }

    // Método de animación que se ejecuta continuamente
    animate() {
        this.drawParticles();
        requestAnimationFrame(this.animate.bind(this));
    }
}

// Inicia la animación cuando el DOM está completamente cargado
document.addEventListener("DOMContentLoaded", () => new NeuralNetwork());
