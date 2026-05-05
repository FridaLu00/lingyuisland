'use client';

import { useEffect, useRef } from 'react';
import { Cpu, Wifi, Battery, Shield } from 'lucide-react';
import Model3D from '../Model3D';

interface ProductDetailsProps {
  onBuyClick: () => void;
}

export default function ProductDetails({ onBuyClick }: ProductDetailsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Cpu,
      title: 'NFC触碰',
      desc: '轻轻一放，即可开启托管',
    },
    {
      icon: Wifi,
      title: '蓝牙连接',
      desc: '实时同步托管数据',
    },
    {
      icon: Battery,
      title: '无线充电',
      desc: '托管同时为手机充电',
    },
    {
      icon: Shield,
      title: '隐私保护',
      desc: '本地数据加密存储',
    },
  ];

  const specs = [
    { label: '材质', value: '石粉复合PU树脂/高精度光固化树脂' },
    { label: '尺寸', value: '204.0 x 126.3 x 127.1 mm' },
    { label: '重量', value: '约 450-650g' },
    { label: '连接', value: 'NFC + 蓝牙 5.0' },
    { label: '充电', value: 'Qi 15W 无线快充' },
    { label: '适配', value: 'iOS 14+ / Android 8+' },
  ];

  return (
    <section ref={sectionRef} id="product" className="relative py-8 lg:py-12 bg-transparent overflow-hidden">
      {/* 渐变遮罩 - 头尾深，中间浅 */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(248, 250, 248, 0.95) 0%, rgba(248, 250, 248, 0.3) 50%, rgba(248, 250, 248, 0.95) 100%)',
          zIndex: 0
        }}
      />
      {/* 渐变遮罩 - 右侧文字区域更清晰（直接在背景层） */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 55% 90% at 60% 50%, rgba(248, 250, 248, 0.95) 0%, rgba(248, 250, 248, 0.7) 40%, rgba(248, 250, 248, 0.3) 65%, transparent 90%)',
          zIndex: 1
        }}
      />
      <div className="container-wide px-6 lg:px-12 relative z-10">
        
        {/* 章节标题 */}
        <div className="text-center mb-6 reveal">
          <span className="chapter-num">肆 · 典藏</span>
          <h2 className="text-title mt-4">臻品鉴赏</h2>
        </div>

        {/* 左右布局 */}
        <div className="asymmetric-layout" style={{ gridTemplateColumns: '1fr 1fr' }}>
          {/* 左侧 - 3D模型展示 */}
          <div className="reveal flex items-center justify-center">
            {/* 3D模型容器 */}
            <div 
              className="w-full max-w-md aspect-[4/5] rounded-lg relative overflow-hidden"
            >
              <Model3D modelUrl="https://frida-coding-files-2026-1376334049.cos.ap-guangzhou.myqcloud.com/chenghuang.obj" />
            </div>
          </div>

          {/* 右侧 - 详情 */}
          <div className="space-y-3">
            {/* 产品名 */}
            <div className="reveal flex items-start gap-8">
              <div>
                <h3 
                  className="text-2xl mb-2"
                  style={{ fontFamily: 'Noto Serif SC, serif', color: 'var(--color-ink)' }}
                >
                  乘黄·寿 智能摆件
                </h3>
                <p className="text-caption">Chenghuang · Shou Smart Ornament</p>
              </div>
              {/* 立即典藏按钮 */}
              <button onClick={onBuyClick} className="btn-primary flex-shrink-0">
                立即典藏
              </button>
            </div>

            {/* 功能特点 */}
            <div className="grid grid-cols-2 gap-6 reveal">
              {features.map((f) => (
                <div key={f.title} className="flex items-start gap-3">
                  <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(45, 107, 90, 0.08)' }}
                >
                  <f.icon size={18} color="var(--color-mount-green)" />
                </div>
                  <div>
                    <h4 
                      className="text-sm font-medium mb-1"
                      style={{ fontFamily: 'Noto Serif SC, serif', color: 'var(--color-ink)' }}
                    >
                      {f.title}
                    </h4>
                    <p className="text-xs opacity-60">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 规格参数 */}
            <div className="reveal">
              <h4 
                className="text-sm mb-4"
                style={{ fontFamily: 'Noto Serif SC, serif', color: 'var(--color-ink)' }}
              >
                产品规格
              </h4>
              <div className="space-y-3">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between text-sm border-b border-gray-100 pb-2">
                    <span className="opacity-60">{spec.label}</span>
                    <span style={{ fontFamily: 'Noto Serif SC, serif', color: 'var(--color-ink)' }}>
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
}
