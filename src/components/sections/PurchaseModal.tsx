'use client';

import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PurchaseModal({ isOpen, onClose }: PurchaseModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const productImages = [
    '/picture/CP1.png',
    '/picture/CP2.png',
    '/picture/CP3.png',
  ];

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // 打开淘宝主页
  const handleOpenTaobao = () => {
    window.open('https://www.taobao.com', '_blank');
  };

  // 切换到上一张图片
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));
  };

  // 切换到下一张图片
  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 背景遮罩 */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 弹窗内容 - 响应式宽度 */}
      <div
        className="relative w-full max-w-sm mx-auto overflow-hidden"
        style={{
          maxWidth: '90vw',
          maxHeight: '90vh',
          backgroundColor: 'var(--color-paper)',
          borderRadius: '20px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
          fontFamily: 'Noto Serif SC, serif',
        }}
      >
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors z-10"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
        >
          <X size={18} style={{ color: 'var(--color-ink)' }} />
        </button>

        {/* 内容区域 */}
        <div className="p-6 text-center">
          {/* Logo */}
          <img
            src="/picture/logohei.png"
            alt="灵屿"
            className="h-12 w-auto mx-auto mb-4"
          />

          {/* 标题 */}
          <h2 className="text-xl mb-2" style={{ color: 'var(--color-ink)' }}>
            乘黄·寿
          </h2>
          <p className="text-sm opacity-60 mb-4" style={{ color: 'var(--color-ink)' }}>
            标准版 · ¥60
          </p>

          {/* 商品图片区域 */}
          <div className="relative mb-4">
            {/* 左箭头 */}
            <button
              onClick={handlePrevImage}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-white transition-all z-10"
            >
              <ChevronLeft size={18} style={{ color: 'var(--color-ink)' }} />
            </button>

            {/* 商品图片 - 响应式大小 */}
            <img
              src={productImages[currentImageIndex]}
              alt={`乘黄·寿 ${currentImageIndex + 1}`}
              className="mx-auto object-contain rounded-xl"
              style={{
                width: '180px',
                height: '180px',
                maxWidth: '70vw',
                maxHeight: '70vw',
                backgroundColor: 'var(--color-cream)',
              }}
            />

            {/* 右箭头 */}
            <button
              onClick={handleNextImage}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-white transition-all z-10"
            >
              <ChevronRight size={18} style={{ color: 'var(--color-ink)' }} />
            </button>
          </div>

          {/* 图片指示器 */}
          <div className="flex justify-center gap-2 mb-6">
            {productImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex
                    ? 'w-5 bg-[var(--color-mount-green)]'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* 打开淘宝按钮 */}
          <button
            onClick={handleOpenTaobao}
            className="w-full py-3.5 text-base tracking-widest transition-all duration-300 hover:shadow-lg active:scale-[0.98]"
            style={{
              backgroundColor: 'var(--color-vermillion)',
              color: 'var(--color-paper)',
              borderRadius: '10px',
            }}
          >
            前往淘宝购买
          </button>
        </div>

        {/* 底部渐变 */}
        <div
          className="h-1"
          style={{
            background: 'linear-gradient(90deg, var(--color-amber), var(--color-water-blue), var(--color-mount-green))',
          }}
        />
      </div>
    </div>
  );
}
