import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const MODEL_PATH = "/models/bottlegltf.gltf";

const Cube3D = () => {
  const mountRef = useRef(null);
  useEffect(() => {
    const width = 1520;
    const height =   720;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0); // fondo transparente
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    mountRef.current.appendChild(renderer.domElement);

    // Luz ambiental y puntual
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const light = new THREE.PointLight(0xffffff, 1, 1000);
    light.position.set(100, 100, 200);
    scene.add(light);
    
        // Luz direccional 
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(-200, 400, 400);
    scene.add(directionalLight);
    camera.position.z = 180;


    const loader = new GLTFLoader();
    let model;
    let bottleMaterial;
    function randomColor() {
      // Colores pastel y claros
      const colors = [0xffb3ba, 0xbaffc9, 0xbae1ff, 0xffffba, 0xffdfba, 0xe2baff, 0xbad7ff, 0xffbae1, 0xc9ffba, 0xfffacd];
      return colors[Math.floor(Math.random() * colors.length)];
    }
    loader.load(MODEL_PATH, (gltf) => {
      model = gltf.scene;
      model.position.set(0, -40, 0);
      model.scale.set(15, 15, 15);

      // Cambia el color de todos los MeshStandardMaterial
      model.traverse((child) => {
        if (child.isMesh && child.material && child.material.isMeshStandardMaterial) {
          bottleMaterial = child.material;
          bottleMaterial.color.set(randomColor());
        }
      });
      scene.add(model);
    });

    // 
    // barra espaciadora
    function handleSpaceColor(e) {
      if (e.code === 'Space' && bottleMaterial) {
        bottleMaterial.color.set(randomColor());
      }
    }
    window.addEventListener('keydown', handleSpaceColor);

    // Animación
    let frameId;
    // Movimiento leve de cámara y modelo
    const camY = 40;
    const radius = 260;
    let modelRotationAngle = 0;
    let camAngle = 0;
    const animate = () => {
      // Movimiento leve del modelo
      if (model) {
        model.rotation.y = Math.sin(modelRotationAngle) * 0.22; // Más notorio
        modelRotationAngle += 0.009; // Un poco más rápido
      }
      // Movimiento leve de la cámara en círculo pequeño
      camAngle += 0.0035; // Más notorio
      camera.position.x = Math.sin(camAngle) * 32; // Círculo más grande
      camera.position.z = radius + Math.cos(camAngle) * 32;
      camera.position.y = camY + Math.sin(camAngle) * 12; 
      camera.lookAt(0, 40, 0);
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener('keydown', handleSpaceColor);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);
  return (
    <div
      ref={mountRef}
      style={{ width: '100vw', height: 520, margin: '5vw 0', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}
    />
  );
};

export default Cube3D;
