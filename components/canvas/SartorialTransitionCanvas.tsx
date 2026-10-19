'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const SartorialTransitionCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 120;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 15);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. Dynamic Woven Ribbon Geometry
    const waveSegments = 80;
    const ribbonGeo = new THREE.PlaneGeometry(36, 6, waveSegments, 16);
    const pos = ribbonGeo.attributes.position;
    const initialZ = new Float32Array(pos.count);
    for (let i = 0; i < pos.count; i++) {
      initialZ[i] = pos.getZ(i);
    }

    // Material with Luxury Gold Specular Sheen
    const ribbonMat = new THREE.MeshPhongMaterial({
      color: 0x1B1464, // Deep Sartorial Navy
      specular: 0xD4AF37, // Rich Gold Sheen
      shininess: 90,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.65,
      wireframe: false,
    });

    const ribbonMesh = new THREE.Mesh(ribbonGeo, ribbonMat);
    ribbonMesh.rotation.x = -0.4;
    scene.add(ribbonMesh);

    // 2. Ambient & Gold Directional Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const goldLight = new THREE.PointLight(0xD4AF37, 2.5, 30);
    goldLight.position.set(0, 4, 8);
    scene.add(goldLight);

    // 3. Floating Sartorial Thread Particles
    const particleCount = 45;
    const particleGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pPositions[i * 3] = (Math.random() - 0.5) * 32;
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xD4AF37,
      size: 0.08,
      transparent: true,
      opacity: 0.75,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Animation Loop with Scroll Reactivity
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Undulate Silk Wave
      const positionAttr = ribbonGeo.attributes.position;
      for (let i = 0; i < positionAttr.count; i++) {
        const x = positionAttr.getX(i);
        const y = positionAttr.getY(i);
        const z = Math.sin(x * 0.4 + elapsedTime * 1.5) * 0.9 + Math.cos(y * 0.6 + elapsedTime * 1.2) * 0.5;
        positionAttr.setZ(i, z);
      }
      positionAttr.needsUpdate = true;

      // Subtle particle float
      particles.rotation.y = elapsedTime * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      ribbonGeo.dispose();
      ribbonMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-stone-900 via-brand-canvas-alt to-brand-canvas-alt pointer-events-none select-none">
      {/* Three.js Interactive WebGL Silk Canvas */}
      <div ref={mountRef} className="w-full h-24 sm:h-32 opacity-80" />
      
      {/* Sartorial Gold Measurement Ribbon Edge */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent" />
        <div className="absolute w-8 h-8 rounded-full border border-brand-gold/40 bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md">
          <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
        </div>
      </div>
    </div>
  );
};
