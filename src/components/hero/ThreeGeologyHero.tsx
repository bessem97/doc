'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ThreeGeologyHeroProps {
  className?: string;
}

export const ThreeGeologyHero: React.FC<ThreeGeologyHeroProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null; // transparent background

    // Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(12, 10, 16);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x10b981, 1.2);
    dirLight1.position.set(10, 20, 15);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x06b6d4, 0.9);
    dirLight2.position.set(-10, -10, -10);
    scene.add(dirLight2);

    // Main Group for slow rotation
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // 1. Surface Plane (Ground Level)
    const surfaceGeo = new THREE.PlaneGeometry(12, 12, 24, 24);
    // Add subtle elevation wave
    const posAttr = surfaceGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const u = posAttr.getX(i);
      const v = posAttr.getY(i);
      posAttr.setZ(i, Math.sin(u * 0.5) * 0.3 + Math.cos(v * 0.5) * 0.2);
    }
    surfaceGeo.computeVertexNormals();

    const surfaceMat = new THREE.MeshStandardMaterial({
      color: 0x06281e,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const surfaceMesh = new THREE.Mesh(surfaceGeo, surfaceMat);
    surfaceMesh.rotation.x = -Math.PI / 2;
    surfaceMesh.position.y = 2.5;
    modelGroup.add(surfaceMesh);

    // 2. Subsurface Aquifer Strata Layers (3 horizontal slabs offset by fault)
    const layerColors = [0x0e4835, 0x166548, 0x06b6d4];
    const layerDepths = [1.2, -0.2, -1.6];

    layerDepths.forEach((yPos, idx) => {
      // Left compartment block
      const slabGeoLeft = new THREE.BoxGeometry(5.5, 0.8, 10);
      const slabMatLeft = new THREE.MeshStandardMaterial({
        color: layerColors[idx],
        roughness: 0.4,
        metalness: 0.1,
        transparent: true,
        opacity: 0.85
      });
      const slabLeft = new THREE.Mesh(slabGeoLeft, slabMatLeft);
      slabLeft.position.set(-3, yPos, 0);
      modelGroup.add(slabLeft);

      // Right compartment block (down-thrown fault block)
      const slabGeoRight = new THREE.BoxGeometry(5.5, 0.8, 10);
      const slabMatRight = new THREE.MeshStandardMaterial({
        color: layerColors[idx],
        roughness: 0.4,
        metalness: 0.1,
        transparent: true,
        opacity: 0.85
      });
      const slabRight = new THREE.Mesh(slabGeoRight, slabMatRight);
      slabRight.position.set(3, yPos - 0.9, 0); // throw offset
      modelGroup.add(slabRight);
    });

    // 3. Fault Plane (Glowing Inclined Surface passing through centre)
    const faultGeo = new THREE.PlaneGeometry(1.2, 8);
    const faultMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.65
    });
    const faultMesh = new THREE.Mesh(faultGeo, faultMat);
    faultMesh.rotation.z = Math.PI / 3; // 60 degree dip angle
    faultMesh.rotation.y = Math.PI / 12;
    faultMesh.position.set(0, 0, 0);
    modelGroup.add(faultMesh);

    // 4. Observation Points Grid on Surface (Gravity Sensors)
    const sensorGeo = new THREE.SphereGeometry(0.12, 12, 12);
    const sensorMat = new THREE.MeshBasicMaterial({ color: 0x34d399 });
    for (let x = -5; x <= 5; x += 1.8) {
      for (let z = -5; z <= 5; z += 1.8) {
        const sensor = new THREE.Mesh(sensorGeo, sensorMat);
        sensor.position.set(x, 2.7, z);
        modelGroup.add(sensor);
      }
    }

    // 5. Flow Particles (Groundwater Particles moving through fault zone)
    const particleCount = 80;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 8;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 3;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x06b6d4,
      size: 0.25,
      transparent: true,
      opacity: 0.9
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    modelGroup.add(particleSystem);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Slow elegant rotation of geological model
      modelGroup.rotation.y = elapsedTime * 0.15;

      // Pulsate fault plane glow
      faultMat.opacity = 0.5 + Math.sin(elapsedTime * 2) * 0.25;

      // Animate groundwater flow particles
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        // Move towards fault centre and down
        positions[i * 3 + 1] -= 0.015;
        if (positions[i * 3 + 1] < -2.5) {
          positions[i * 3 + 1] = 2.0;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative w-full h-full min-h-[380px] sm:min-h-[460px] ${className}`}>
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Scientific Labels as requested in Prompt Section 6 */}
      <div className="absolute top-4 left-4 glass-panel px-2.5 py-1 rounded-md text-[10px] font-mono text-emerald-300 border border-emerald-500/30 shadow animate-pulse">
        ● Points gravimétriques
      </div>
      <div className="absolute top-1/3 right-6 glass-panel px-2.5 py-1 rounded-md text-[10px] font-mono text-cyan-300 border border-cyan-500/30 shadow">
        ◆ Plan de faille (60°)
      </div>
      <div className="absolute bottom-12 left-8 glass-panel px-2.5 py-1 rounded-md text-[10px] font-mono text-emerald-400 border border-emerald-500/30 shadow">
        Écoulement aquifère
      </div>
      <div className="absolute bottom-4 right-10 glass-panel px-2.5 py-1 rounded-md text-[10px] font-mono text-amber-300 border border-amber-500/30 shadow">
        Probabilité IA
      </div>
    </div>
  );
};
