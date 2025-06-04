import React, { useEffect, useRef } from "react";
import * as THREE from "three";

function ThreeChart({ data, xKey, yKey, zKey }) {
  const mountRef = useRef();

  useEffect(() => {
    const mount = mountRef.current;
    const width = 600;
    const height = 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    mount.innerHTML = "";
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array(
      data.flatMap((row) => [parseFloat(row[xKey]), parseFloat(row[yKey]), parseFloat(row[zKey])])
    );
    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial({ color: 0x00ff00, size: 2 });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const animate = () => {
      requestAnimationFrame(animate);
      points.rotation.x += 0.01;
      points.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();
  }, [data, xKey, yKey, zKey]);

  return <div ref={mountRef} />;
}

export default ThreeChart;
