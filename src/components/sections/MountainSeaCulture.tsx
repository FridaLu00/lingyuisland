'use client';

import { useEffect, useRef } from 'react';

export default function MountainSeaCulture() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 150);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="mountain" className="relative pt-16 pb-12 lg:pt-24 lg:pb-16 bg-transparent overflow-hidden">
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
        <div className="text-center mb-0 reveal">
          <span className="chapter-num">贰 · 山海</span>
          <h2 className="text-title mt-0 mb-0" style={{ marginTop: 0, marginBottom: 0 }}>乘黄典故</h2>
        </div>

        {/* 主要内容区域 */}
        <div className="max-w-4xl mx-auto">
          
          {/* 典籍图片 - 左右拉伸到屏幕边缘，可变形 */}
          <div className="reveal" style={{ marginBottom: -20, paddingBottom: 0 }}>
            <div className="relative w-full" style={{ marginLeft: '-50vw', marginRight: '-50vw', left: '50%', width: '100vw', height: '400px' }}>
              <img 
                src="/picture/sizhi1.png" 
                alt="典籍" 
                className="w-full h-full object-fill" 
                style={{ marginBottom: 0, paddingBottom: 0, opacity: 0.9, mixBlendMode: 'multiply', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'}}
              />
            </div>
          </div>

          {/* 神兽乘黄 - 典故介绍 */}
          <div style={{ marginTop: -40, paddingTop: 0 }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div>
                <p className="text-body text-sm mb-3 leading-relaxed" style={{ marginTop: 0 }}>
                  乘黄，又名「飞黄」，是《山海经》中记载的祥瑞之兽。它栖息于极东的白民之国，形状如同狐狸，背上长有犄角。传说中，能够骑乘此兽之人，寿命可延长至两千岁。
                </p>
                <p className="text-body text-sm leading-relaxed">
                  乘黄象征着长寿与吉祥，是古人对生命延续的美好向往。它不仅是神话中的神兽，更是一种精神寄托——代表着人们对时间的敬畏与对生命的珍视。
                </p>
              </div>
              <div className="relative flex flex-col justify-center items-center h-full">
                {/* 乘黄形象装饰 - 视频羽化效果 */}
                <div 
                  className="aspect-square max-w-sm"
                  style={{
                    WebkitMaskImage: 'radial-gradient(ellipse 70% 37% at 50% 50%, black 30%, transparent 70%)',
                    maskImage: 'radial-gradient(ellipse 70% 37% at 50% 53%, black 30%, transparent 70%)'
                  }}
                >
                  <video 
                    src="https://frida-coding-files-2026-1376334049.cos.ap-guangzhou.myqcloud.com/donghua.mp4" 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
