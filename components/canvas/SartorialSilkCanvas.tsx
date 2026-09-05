'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface SartorialSilkCanvasProps {
  className?: string;
  intensity?: number;
}

export const SartorialSilkCanvas: React.FC<SartorialSilkCanvasProps> = ({
  className = '',
  intensity = 1.0,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera & Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 600;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. Sartorial Woven Silk Surface (Plane Geometry with dynamic vertex displacement)
    const planeGeo = new THREE.PlaneGeometry(32, 20, 64, 40);
    const posAttribute = planeGeo.attributes.position;
    const originalPositions = new Float32Array(posAttribute.array);

    // Deep Sartorial Navy Silk Material with Gold specular sheen
    const planeMat = new THREE.MeshPhongMaterial({
      color: 0x1B1464,
      emissive: 0x0a072b,
      specular: 0xA88A00,
      shininess: 90,
      wireframe: false,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.88,
    });

    const silkMesh = new THREE.Mesh(planeGeo, planeMat);
    silkMesh.rotation.x = -0.35;
    silkMesh.position.y = -1;
    scene.add(silkMesh);

    // 2. Floating Gold Thread Sartorial Particles
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 35;
      particlePositions[i + 1] = (Math.random() - 0.5) * 20;
      particlePositions[i + 2] = (Math.random() - 0.5) * 10;
    }

    particleGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      color: 0xE6C84F, // Shimmering Gold
      size: 0.12,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const goldKeyLight = new THREE.DirectionalLight(0xA88A00, 2.2);
    goldKeyLight.position.set(10, 15, 12);
    scene.add(goldKeyLight);

    const navyFillLight = new THREE.PointLight(0x281F8F, 3.0, 50);
    navyFillLight.position.set(-10, -10, 8);
    scene.add(navyFillLight);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetMouseX = x * 2;
      targetMouseY = y * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Observer
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime() * 0.8 * intensity;

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Dynamic Cloth Undulation Simulation
      const pos = planeGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const u = originalPositions[i * 3];
        const v = originalPositions[i * 3 + 1];

        // Complex undulating wave calculation
        const z =
          Math.sin(u * 0.4 + elapsedTime * 1.5) * 0.7 +
          Math.cos(v * 0.5 + elapsedTime * 1.2) * 0.6 +
          Math.sin((u + v) * 0.3 + elapsedTime) * 0.4 +
          (Math.sin(u * 0.2 + mouseX * 2) * 0.5);

        pos.setZ(i, z);
      }
      pos.needsUpdate = true;
      planeGeo.computeVertexNormals();

      // Gentle movement for particles
      particles.rotation.y = elapsedTime * 0.03;
      particles.rotation.x = Math.sin(elapsedTime * 0.05) * 0.1;

      // Subtle camera tilt with mouse
      camera.position.x = mouseX * 1.2;
      camera.position.y = -mouseY * 0.8;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      planeGeo.dispose();
      planeMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [intensity]);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
};
