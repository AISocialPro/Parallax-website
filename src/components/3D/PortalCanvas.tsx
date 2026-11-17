import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface PortalCanvasProps {
  scrollProgress: number; // 0 to 1 relative to scene 5
  mouseX: number;
  mouseY: number;
}

export const PortalCanvas: React.FC<PortalCanvasProps> = ({ scrollProgress, mouseX, mouseY }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    rings: THREE.Group;
    vortexParticles: THREE.Points;
    coreLight: THREE.PointLight;
    coreMesh: THREE.Mesh;
  } | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.001);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 2000);
    camera.position.z = 450;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0x0f172a, 1);
    scene.add(ambient);

    const coreLight = new THREE.PointLight(0x38bdf8, 5, 800);
    scene.add(coreLight);

    const ringLight = new THREE.PointLight(0xf43f5e, 3, 600);
    ringLight.position.set(0, 0, 50);
    scene.add(ringLight);

    // Group for Portal concentric rings
    const ringsGroup = new THREE.Group();
    scene.add(ringsGroup);

    // 1. Concentric Singularity Gateway Rings
    const ringRadii = [
      { radius: 100, tube: 3, segs: 64, color: 0x38bdf8, speed: 0.8 },
      { radius: 135, tube: 2, segs: 72, color: 0x818cf8, speed: -0.6 },
      { radius: 175, tube: 4, segs: 80, color: 0xf43f5e, speed: 0.4 },
      { radius: 215, tube: 2.5, segs: 84, color: 0x38bdf8, speed: -0.3 },
    ];

    const ringMeshes: { mesh: THREE.Mesh; speed: number }[] = [];

    ringRadii.forEach(({ radius, tube, segs, color, speed }) => {
      const geo = new THREE.TorusGeometry(radius, tube, 16, segs);
      const mat = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.8,
        wireframe: true,
        roughness: 0.1,
      });
      const mesh = new THREE.Mesh(geo, mat);
      ringsGroup.add(mesh);
      ringMeshes.push({ mesh, speed });
    });

    // 2. Central Event Horizon Core Sphere
    const coreGeo = new THREE.SphereGeometry(65, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x030712,
      emissive: 0x0284c7,
      emissiveIntensity: 0.6,
      roughness: 0.1,
      metalness: 0.9,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    ringsGroup.add(coreMesh);

    // 3. Inward Spiraling Vortex Particles
    const particleCount = 1800;
    const pPositions = new Float32Array(particleCount * 3);
    const pColors = new Float32Array(particleCount * 3);
    const pAngles = new Float32Array(particleCount);
    const pRadii = new Float32Array(particleCount);
    const pSpeeds = new Float32Array(particleCount);

    const cCyan = new THREE.Color(0x38bdf8);
    const cPurple = new THREE.Color(0x818cf8);
    const cAmber = new THREE.Color(0xf59e0b);

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 40 + Math.random() * 320;
      pAngles[i] = angle;
      pRadii[i] = r;
      pSpeeds[i] = 0.01 + (320 - r) * 0.0001;

      pPositions[i * 3] = Math.cos(angle) * r;
      pPositions[i * 3 + 1] = Math.sin(angle) * r;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 120;

      const pick = Math.random();
      const col = pick > 0.6 ? cCyan : pick > 0.3 ? cPurple : cAmber;
      pColors[i * 3] = col.r;
      pColors[i * 3 + 1] = col.g;
      pColors[i * 3 + 2] = col.b;
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

    const pMat = new THREE.PointsMaterial({
      size: 2.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const vortexParticles = new THREE.Points(pGeo, pMat);
    ringsGroup.add(vortexParticles);

    portalRef.current = {
      scene,
      camera,
      renderer,
      rings: ringsGroup,
      vortexParticles,
      coreLight,
      coreMesh,
    };

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Rotate individual concentric rings
      ringMeshes.forEach(({ mesh, speed }, idx) => {
        mesh.rotation.z = elapsed * speed;
        mesh.rotation.x = Math.sin(elapsed * 0.5 + idx) * 0.25;
        mesh.rotation.y = Math.cos(elapsed * 0.4 + idx) * 0.25;
      });

      // Swirl inward vortex particles
      const positions = pGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        pAngles[i] += pSpeeds[i];
        pRadii[i] -= 0.3;
        if (pRadii[i] < 35) {
          pRadii[i] = 320;
          pAngles[i] = Math.random() * Math.PI * 2;
        }
        positions[i * 3] = Math.cos(pAngles[i]) * pRadii[i];
        positions[i * 3 + 1] = Math.sin(pAngles[i]) * pRadii[i];
      }
      pGeo.attributes.position.needsUpdate = true;

      // Pulsing core light
      const pulse = 4 + Math.sin(elapsed * 4) * 2;
      coreLight.intensity = pulse;

      // Subtle breath of the core
      const coreScale = 1 + Math.sin(elapsed * 2) * 0.05;
      coreMesh.scale.set(coreScale, coreScale, coreScale);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      pGeo.dispose();
      pMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ringMeshes.forEach((r) => {
        r.mesh.geometry.dispose();
        if (Array.isArray(r.mesh.material)) r.mesh.material.forEach((m) => m.dispose());
        else r.mesh.material.dispose();
      });
    };
  }, []);

  // Update dynamic scroll & mouse interaction
  useEffect(() => {
    if (!portalRef.current) return;
    const { camera, rings } = portalRef.current;

    // Mouse tilt
    const targetX = mouseX * 60;
    const targetY = -mouseY * 40;
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);

    // Perspective zoom as the user scrolls into the singularity
    const targetZ = 450 - scrollProgress * 220;
    camera.position.z += (targetZ - camera.position.z) * 0.08;

    // Rings tilt reaction
    rings.rotation.y = mouseX * 0.4;
    rings.rotation.x = -mouseY * 0.3;
  }, [scrollProgress, mouseX, mouseY]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
    />
  );
};

