import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import React, { useEffect } from 'react';

const ThreeDModel = ({ modelUrl }) => {
  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee); // Đặt nền cảnh thành màu xám sáng
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const loader = new GLTFLoader();
    loader.load(modelUrl, (gltf) => {
      console.log(gltf); // Kiểm tra xem mô hình có được tải không
      scene.add(gltf.scene);
      camera.position.set(0, 0, 5); // Đảm bảo camera có vị trí hợp lý

      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      animate();
    });
  }, [modelUrl]);

  return <div />;
};

export default ThreeDModel;
