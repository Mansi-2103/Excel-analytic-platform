import { useEffect, useRef } from "react";
import * as THREE from "three";

function ThreeChart({ data, xKey, yKey, zKey }) {
  const mountRef = useRef();

  useEffect(() => {
    const width = 800;
    const height = 500;

    // Clean up previous scene
    mountRef.current.innerHTML = "";

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 100);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const axesHelper = new THREE.AxesHelper(50);
    scene.add(axesHelper);

    // Geometry for data points
    const geometry = new THREE.BufferGeometry();
    const positions = [];

    data.forEach((row, index) => {
      const x = parseFloat(row[xKey]);
      const y = parseFloat(row[yKey]);
      const z = parseFloat(row[zKey]);

      if (!isNaN(x) && !isNaN(y) && !isNaN(z)) {
        positions.push(x * 5, y * 5, z * 5); // scaled for better visibility
      } else {
        console.warn(`Skipping row ${index} due to invalid number:`, row);
      }
    });

    if (positions.length === 0) {
      console.warn("⚠️ No valid numeric data to plot in 3D.");
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );

    const material = new THREE.PointsMaterial({
      color: 0x0077ff,
      size: 3.5,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      points.rotation.y += 0.01;
      points.rotation.x += 0.005;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
    };
  }, [data, xKey, yKey, zKey]);

  return <div ref={mountRef} />;
}

export default ThreeChart;
