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
          <h2 className="text-title mt-4">闭环体验</h2>
        </div>

        {/* 四步流程 - 横向时间线 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-24">
          {steps.map((step, index) => (
            <div key={step.title} className="reveal text-center" style={{ transitionDelay: `${index * 0.1}s` }}>
              {/* 步骤指示 */}
              <div className="relative inline-block mb-6">
                {index < steps.length - 1 && (
                  <div 
                    className="absolute top-1/2 left-full w-full h-px"
                    style={{ 
                      background: 'linear-gradient(90deg, var(--color-mist), transparent)',
                      width: 'calc(100% - 2rem)'
                    }}
                  />
                )}
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(45, 107, 90, 0.08)' }}
                >
                  <step.icon size={24} color="var(--color-mount-green)" />
                </div>
              </div>
              
              <h4 
                className="text-lg mb-2"
                style={{ fontFamily: 'Noto Serif SC, serif', color: 'var(--color-ink)' }}
              >
                {step.title}
              </h4>
              <p className="text-sm leading-relaxed opacity-70">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* 成长体系 */}
        <div className="reveal">
          <h3 
            className="text-xl text-center mb-12"
            style={{ fontFamily: 'Noto Serif SC, serif', color: 'var(--color-ink)' }}
          >
            寿时成长阶段
          </h3>

          {/* 进度条 */}
          <div className="max-w-3xl mx-auto">
            <div className="flex h-2 rounded-full overflow-hidden">
              {levels.map((level, index) => (
                <div
                  key={level.name}
                  className="relative group"
                  style={{ 
                    flex: index === levels.length - 1 ? 1 : 1,
                    backgroundColor: level.color,
                    opacity: 0.4
                  }}
                >
                  <div className="absolute inset-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>

            {/* 阶段标签 */}
            <div className="flex justify-between mt-6">
              {levels.map((level, index) => (
                <div key={level.name} className="text-center">
                  <span 
                    className="text-sm font-medium"
                    style={{ 
                      fontFamily: 'Noto Serif SC, serif',
                      color: index === 0 ? 'var(--color-ink-faint)' : 'var(--color-ink)'
                    }}
                  >
                    {level.name}
                  </span>
                  <span className="block text-xs mt-1" style={{ color: 'var(--color-ink-faint)' }}>
                    {level.max === Infinity ? '5000+' : `${level.min}-${level.max}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 底部说明 */}
          <p className="text-center text-caption mt-12 max-w-xl mx-auto">
            每托管30分钟即可计入寿簿，解锁对应山海经知识与灵物图鉴
          </p>
        </div>
      </div>
    </section>
  );
}
