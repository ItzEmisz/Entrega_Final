import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GsapEffects() {
  useEffect(() => {
    // Animación básica para .box
    gsap.fromTo(
      ".box",
      { x: "-0" },
      {
        x: () => {
          const box = document.querySelector(".box");
          return window.innerWidth - box.offsetWidth + "px";
        },
        backgroundColor: "#e74c3c",
        duration: 1,
        scrollTrigger: {
          trigger: ".box",
          start: "top+=1000vh 80%",
          end: "top+=1000vh 30%",
          scrub: true,
          // markers: true,
        },
      }
    );

    // Animación de opacidad para la capa superior del poster
    gsap.to([".poster-blur", ".texto", ".rectangulo", ".cruz"], {
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".poster-container",
        start: "top top",
        end: "+=1000vh",
        scrub: true,
        pin: true,
        // markers: true,
      },
    });

    // Parallax para las capas del poster P3
    const layers = [
      { selector: ".poster-layer1", x: "0%", y: "0%", scale: 1.2, parallax: -400 },
      { selector: ".poster-layer2", x: "-37%", y: "-13%", scale: 0.25, parallax: 1500 },
      { selector: ".poster-layer3", x: "0%", y: "15%", scale: 1.2, parallax: 400 },
      { selector: ".poster-layer4", x: "0%", y: "35%", scale: 1.2, parallax: 800 },
    ];
    layers.forEach((layer) => {
      gsap.set(layer.selector, {
        xPercent: -50,
        yPercent: -50,
        x: layer.x,
        y: layer.y,
        scale: layer.scale,
      });
      if (layer.parallax !== 0) {
        gsap.to(layer.selector, {
          x: `+=${layer.parallax}px`,
          ease: "none",
          scrollTrigger: {
            trigger: ".poster-container.poster-p3",
            start: "top top",
            end: "+=1000vh",
            scrub: true,
            // markers: true,
          },
        });
      }
    });
  }, []);
  return null;
}
