'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

export default function Model3D({ modelUrl }: { modelUrl: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // 创建场景
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 创建相机（高角度俯视）
    const camera = new THREE.PerspectiveCamera(
      50,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 4, 7);
    camera.lookAt(0, 0, 0);

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 添加光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    
    const mainLight = new THREE.DirectionalLight(0xffffff, 2);
    mainLight.position.set(10, 12, 8);
    mainLight.castShadow = true;
    scene.add(mainLight);
    
    const sideLight = new THREE.DirectionalLight(0xffffcc, 0.5);
    sideLight.position.set(-8, 8, -5);
    scene.add(sideLight);
    
    const bottomLight = new THREE.DirectionalLight(0xffd700, 0.4);
    bottomLight.position.set(0, -3, 5);
    scene.add(bottomLight);

    // 使用FileLoader加载模型
    const fileLoader = new THREE.FileLoader();
    fileLoader.load(
      modelUrl,
      (data: string | ArrayBuffer) => {
        // 如果是 ArrayBuffer，转换为 Blob 然后创建 object URL
        const blob = new Blob([data]);
        const objectUrl = URL.createObjectURL(blob);
        
        const objLoader = new OBJLoader();
        objLoader.load(
          objectUrl,
          (group) => {
            URL.revokeObjectURL(objectUrl);
            
            group.scale.set(15, 15, 15);
            group.position.y = -1;
            
            group.traverse((child) => {
              if (child instanceof THREE.Mesh) {
                child.material = new THREE.MeshStandardMaterial({
                  color: 0xffd700,
                  roughness: 0.25,
                  metalness: 0.9,
                  emissive: 0xffaa00,
                  emissiveIntensity: 0.3,
                  envMapIntensity: 1.0
                });
                child.castShadow = true;
                child.receiveShadow = true;
              }
            });
            
            scene.add(group);
            modelRef.current = group;
            setIsLoaded(true);
          },
          undefined,
          (error) => {
            URL.revokeObjectURL(objectUrl);
            console.error('OBJ解析失败:', error);
            setLoadError(true);
          }
        );
      },
      undefined,
      (error) => {
        console.error('文件加载失败:', error);
        setLoadError(true);
      }
    );

    // 动画循环
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      if (modelRef.current) {
        modelRef.current.rotation.y += 0.005;
      }
      
      renderer.render(scene, camera);
    };
    animate();

    // 响应窗口大小变化
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 清理
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [modelUrl]);

  // 如果加载失败，显示静态图片作为替代
  if (loadError) {
    return (
      <div 
        ref={containerRef} 
        className="w-full h-full flex items-center justify-center"
        style={{ minHeight: '400px' }}
      >
        <img
          src="/picture/CP1.png"
          alt="乘黄·寿"
          className="max-w-full max-h-full object-contain"
          style={{ maxHeight: '400px' }}
        />
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full"
      style={{ minHeight: '400px' }}
    >
      {!isLoaded && (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-sm" style={{ fontFamily: 'Noto Serif SC, serif', color: 'var(--color-ink-light)' }}>
            加载中...
          </div>
        </div>
      )}
    </div>
  );
}
