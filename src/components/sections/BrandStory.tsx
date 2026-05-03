'use client';

import { useEffect, useRef } from 'react';

export default function BrandStory() {
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

  const stories = [
    {
      title: '放下',
      desc: '在这个信息爆炸的时代，手机成为我们与世界的唯一连接。夜晚，本该是身心休憩的时刻，却常常被无尽的信息流占据。',
    },
    {
      title: '托付',
      desc: '乘黄，源自《山海经》的瑞兽，「其状如狐，其背有角，乘之寿二千岁」。我们将这份古老的祥瑞，化作今夜的守夜者。',
    },
    {
      title: '收获',
      desc: '每一次真诚的托付，都化作寿时存入寿簿。30分钟的信任，解锁一段山海地理知识，收获一只山海灵物相伴。',
    },
  ];

  return (
    <section ref={sectionRef} id="story" className="relative py-20 lg:py-32 bg-transparent overflow-hidden">
      {/* 背景渐变遮罩 - 头尾深，中间浅 */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(248, 250, 248, 0.95) 0%, rgba(248, 250, 248, 0.3) 50%, rgba(248, 250, 248, 0.95) 100%)',
          zIndex: 0
        }}
      />

      <div className="container-wide px-6 lg:px-12 relative z-10">
        
        {/* 章节标题 */}
        <div className="text-center mb-14 reveal">
          <span className="chapter-num">壹 · 缘起</span>
          <h2 className="text-title mt-3">何以解忧</h2>
        </div>

        {/* 故事内容 - 三栏布局 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 relative">
          {/* 文字下方的渐变遮罩 */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(248, 250, 248, 0.7) 0%, transparent 70%)',
              zIndex: 0
            }}
          />
          
          {stories.map((item, index) => (
            <div
              key={item.title}
              className="reveal text-center relative z-10"
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              {/* 数字 */}
              <span 
                className="text-5xl font-light opacity-10"
                style={{ fontFamily: 'Noto Serif SC, serif' }}
              >
                0{index + 1}
              </span>
              
              {/* 标题 */}
              <h3 
                className="text-lg mt-2 mb-4"
                style={{ fontFamily: 'Noto Serif SC, serif', color: 'var(--color-ink)' }}
              >
                {item.title}
              </h3>
              
              {/* 描述 */}
              <p className="text-body leading-relaxed text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 引用 */}
        <div className="mt-16 text-center reveal">
          <blockquote 
            className="text-lg italic opacity-60 max-w-xl mx-auto"
            style={{ fontFamily: 'Noto Serif SC, serif' }}
          >
            「乘之寿二千岁」
          </blockquote>
          <cite className="text-caption mt-3 block">—— 《山海经·海外西经》</cite>
        </div>
      </div>

      {/* 文字区域下方的径向渐变遮罩 */}
      <div 
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          width: '80%',
          height: '10%',
          top: '50%',
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(248, 250, 248, 1) 0%, transparent 10%)',
          zIndex: 1
        }}
      />
    </section>
  );
}
