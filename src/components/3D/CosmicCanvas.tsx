import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CosmicCanvasProps {
  scrollProgress: number; // 0 to 1 relative to cosmic scene
  mouseX: number;
  mouseY: number;
}

export const CosmicCanvas: React.FC<CosmicCanvasProps> = ({ scrollProgress, mouseX, mouseY }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    planetGroup: THREE.Group;
    rings: THREE.Mesh;
    artifacts: THREE.Mesh[];
    starField: THREE.Points;
    starPositions: Float32Array;
  } | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.0015);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 2000);
    camera.position.z = 600;

    // WebGL Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    } catch {
      return; // Graceful WebGL fallback
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x38bdf8, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(400, 300, 500);
    scene.add(dirLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 3, 1000);
    purpleLight.position.set(-300, -200, 200);
    scene.add(purpleLight);

    // 1. Giant Planet with Atmosphere Glow
    const planetGroup = new THREE.Group();
    planetGroup.position.set(120, -20, 0);

    // Planet core sphere
    const planetGeo = new THREE.SphereGeometry(140, 64, 64);
    const planetMat = new THREE.MeshStandardMaterial({
      color: 0x1e1b4b,
      roughness: 0.6,
      metalness: 0.2,
      bumpScale: 3,
    });
    const planetMesh = new THREE.Mesh(planetGeo, planetMat);
    planetGroup.add(planetMesh);

    // Planet Atmosphere Corona
    const coronaGeo = new THREE.SphereGeometry(146, 64, 64);
    const coronaMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.22,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
    planetGroup.add(coronaMesh);

    // Planetary Rings
    const ringGeo = new THREE.RingGeometry(180, 290, 80);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x818cf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75,
      roughness: 0.4,
    });
    const rings = new THREE.Mesh(ringGeo, ringMat);
    rings.rotation.x = Math.PI / 2.3;
    rings.rotation.y = -Math.PI / 8;
    planetGroup.add(rings);

    scene.add(planetGroup);

    // 2. Sacred Geometric Floating 3D Artifacts
    const artifacts: THREE.Mesh[] = [];
    const geometries = [
      new THREE.IcosahedronGeometry(25, 0),
      new THREE.OctahedronGeometry(20, 0),
      new THREE.DodecahedronGeometry(22, 0),
      new THREE.TorusGeometry(20, 6, 16, 50),
    ];

    const positions = [
      new THREE.Vector3(-240, 140, 150),
      new THREE.Vector3(-180, -160, 220),
      new THREE.Vector3(260, 180, 100),
      new THREE.Vector3(-320, 20, 50),
    ];

    geometries.forEach((geo, i) => {
      const mat = new THREE.MeshPhysicalMaterial({
        color: i % 2 === 0 ? 0x38bdf8 : 0xf43f5e,
        metalness: 0.8,
        roughness: 0.15,
        wireframe: true,
        emissive: i % 2 === 0 ? 0x0284c7 : 0xe11d48,
        emissiveIntensity: 0.4,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(positions[i]);
      scene.add(mesh);
      artifacts.push(mesh);
    });

    // 3. Deep 3D Starfield
    const starCount = 2500;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const colorCyan = new THREE.Color(0x38bdf8);
    const colorWhite = new THREE.Color(0xffffff);
    const colorRose = new THREE.Color(0xf43f5e);

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 1600;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 1600;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 1600;

      const choice = Math.random();
      const c = choice > 0.8 ? colorRose : choice > 0.4 ? colorCyan : colorWhite;
      starColors[i * 3] = c.r;
      starColors[i * 3 + 1] = c.g;
      starColors[i * 3 + 2] = c.b;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    sceneRef.current = {
      scene,
      camera,
      renderer,
      planetGroup,
      rings,
      artifacts,
      starField,
      starPositions,
    };

    // Resize handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Planet slow rotation
      planetGroup.rotation.y = elapsed * 0.08;
      rings.rotation.z = elapsed * 0.04;

      // Artifacts tumbling
      artifacts.forEach((art, idx) => {
        art.rotation.x = elapsed * (0.3 + idx * 0.1);
        art.rotation.y = elapsed * (0.4 + idx * 0.05);
        art.position.y += Math.sin(elapsed * 1.5 + idx) * 0.25;
      });

      // Starfield slow drift
      starField.rotation.y = elapsed * 0.02;

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
      planetGeo.dispose();
      planetMat.dispose();
      coronaGeo.dispose();
      coronaMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      geometries.forEach((g) => g.dispose());
      starGeo.dispose();
      starMat.dispose();
    };
  }, []);

  // Update dynamic scroll & mouse interaction
  useEffect(() => {
    if (!sceneRef.current) return;
    const { camera, planetGroup, artifacts, starField } = sceneRef.current;

    // Mouse tilt lerp
    const targetX = mouseX * 50;
    const targetY = -mouseY * 40;
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);

    // Scroll depth zoom & travel into space
    // As user scrolls, camera moves forward, planet scales / translates
    const zoomZ = 600 - scrollProgress * 350;
    camera.position.z += (zoomZ - camera.position.z) * 0.1;

    planetGroup.position.x = 120 - scrollProgress * 180;
    planetGroup.position.y = -20 + scrollProgress * 60;
    planetGroup.position.z = scrollProgress * 150;

    // Artifacts parallax displacement
    artifacts.forEach((art, i) => {
      art.position.z = (i % 2 === 0 ? 150 : 200) + scrollProgress * 200;
    });

    // Starfield warp effect
    starField.position.z = scrollProgress * 400;
  }, [scrollProgress, mouseX, mouseY]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
    />
  );
};

