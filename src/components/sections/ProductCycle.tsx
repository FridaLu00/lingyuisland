'use client';

import { useEffect, useRef } from 'react';
import { Smartphone, BookOpen, Gift, Home } from 'lucide-react';

export default function ProductCycle() {
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

  const steps = [
    {
      icon: Smartphone,
      title: '托付',
      desc: '将手机轻放于乘黄摆件之上，NFC轻触，开启守护',
    },
    {
      icon: BookOpen,
      title: '守眠',
      desc: '放下手机，安然入睡，乘黄开始计时守护',
    },
    {
      icon: Gift,
      title: '结算',
      desc: '晨起查看寿时收益，30分钟即可计入寿簿',
    },
    {
      icon: Home,
      title: '栖居',
      desc: '解锁山海知识与灵物，装扮你的专属寿界',
    },
  ];

  const levels = [
    { name: '初眠', min: 0, max: 60, color: '#b5c5be' },       // 薄雾色
    { name: '安眠', min: 60, max: 300, color: '#5a8cb8' },     // 涧蓝浅
    { name: '深眠', min: 300, max: 1000, color: '#4a9a85' },   // 青绿浅
    { name: '长眠', min: 1000, max: 5000, color: '#2d6b5a' },  // 山峦青绿
    { name: '乘黄', min: 5000, max: Infinity, color: '#c4a05a' }, // 琥珀色
  ];

  return (
    <section ref={sectionRef} id="cycle" className="relative pt-12 pb-12 lg:pt-16 lg:pb-16 bg-transparent overflow-hidden">
      {/* 渐变遮罩 - 头尾深，中间浅 */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(248, 250, 248, 0.95) 0%, rgba(248, 250, 248, 0.3) 50%, rgba(248, 250, 248, 0.95) 100%)',
          zIndex: 0
        }}
      />
      <div className="container-wide px-6 lg:px-12 relative z-10">
        
        {/* 章节标题 */}
        <div className="text-center mb-20 reveal">
          <span className="chapter-num">叁 · 寿时</span>
          <h2 className="text-title mt-4">寿时之约</h2>
        </div>

        {/* 视频播放器 */}
        <div className="max-w-4xl mx-auto reveal" style={{ marginTop: 80, marginBottom: 80 }}>
          <video
            src="https://frida-coding-files-2026-1376334049.cos.ap-guangzhou.myqcloud.com/xuanchuan.mp4"
            poster="/picture/XCfengmian.jpg"
            controls
            playsInline
            className="w-full rounded-xl"
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
            }}
          >
            您的浏览器不支持视频播放
          </video>
        </div>
      </div>
    </section>
  );
}
