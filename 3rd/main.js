// main.js
console.log('main.js');
console.log('gsap', gsap);


// 1.ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 2. animación básica para .box:
gsap.fromTo(".box", 
	{ x: "-0" },  // valor inicial a la izquierda
	{ 
		x: () => {
			const box = document.querySelector('.box');
			return window.innerWidth - box.offsetWidth + "px";
		},
		backgroundColor: "#e74c3c", 
		duration: 1,             
		scrollTrigger: {
			trigger: ".box",       
			start: "top+=1000vh 80%", // Inicia 
			end: "top+=1000vh 30%",   // Termina
			scrub: true,           
			// markers: true,      // <--- guías de inicio/fin
		} 
	});

// Animación de opacidad para la capa superior del poster:
gsap.to([".poster-blur", ".texto", ".rectangulo", ".cruz"], {
    opacity: 0,
    ease: "none",
    scrollTrigger: {
        trigger: ".poster-container",
        start: "top top",       //empieza
        end: "+=1000vh",      // acaba
        scrub: true,
        pin: true,            // Mantiene el poster fijo
        //markers: true      // para visualizar el área de activación
    }
});

// Define la posición inicial, escala y parallax para cada capa
const layers = [
  { selector: '.poster-layer1', x: '0%', y: '0%', scale: 1.2, parallax: -400 },
  { selector: '.poster-layer2', x: '-37%', y: '-13%', scale: 0.25, parallax: 1500 },
  { selector: '.poster-layer3', x: '0%', y: '15%', scale: 1.2, parallax: 400 },
  { selector: '.poster-layer4', x: '0%', y: '35%', scale: 1.2, parallax: 800 }
];
layers.forEach((layer) => {
  // Configura el estado inicial según lo acomodado
  gsap.set(layer.selector, {
    xPercent: -50,
    yPercent: -50,
    x: layer.x,
    y: layer.y,
    scale: layer.scale
  });
  // Aplica el parallax solo si parallax vale distinto de 0
  if (layer.parallax !== 0) {
    gsap.to(layer.selector, {
      x: "+=" + layer.parallax + "px",
      ease: 'none',
      scrollTrigger: {
        trigger: '.poster-container.poster-p3',
        start: 'widh +=1000vh',
        end: 'widh+=1000vh',
        scrub: true,
        // markers: true
      }
    });
  }
});