import { useEffect, useRef } from "react";
import * as THREE from "three";

function ThreeDChart({ data, xKey, yKey, zKey }) {
  const mountRef = useRef();

  useEffect(() => {
    const width = 600;
    const height = 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    mountRef.current.innerHTML = "";
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array(
      data.flatMap((point) => [
        parseFloat(point[xKey]),
        parseFloat(point[yKey]),
        parseFloat(point[zKey]),
      ])
    );
    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial({ color: 0xff0000, size: 3 });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    function animate() {
      requestAnimationFrame(animate);
      points.rotation.y += 0.01;
      renderer.render(scene, camera);
    }

    animate();
  }, [data, xKey, yKey, zKey]);

  return <div ref={mountRef}></div>;
}
