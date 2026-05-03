'use client';

import { useEffect, useRef } from 'react';
import { Bed, Coffee, BookOpen, Sunset } from 'lucide-react';

export default function UsageScenes() {
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

  const scenes = [
    {
      image: '/picture/woshi.png',  // 卧室床头场景图
      title: '卧室床头',
      desc: '夜晚入睡前，将手机轻放于乘黄身旁，安心入眠',
      color: '#2d6b5a',   // 山峦青绿
    },
    {
      image: '/picture/shuzhuo.png',  // 书桌一角场景图
      title: '书桌一角',
      desc: '午后阅读时光，乘黄静静守候，陪伴专注时刻',
      color: '#2d5a7b',   // 涧蓝
    },
    {
      image: '/picture/jiaoluo.png',  // 阅读角落场景图
      title: '阅读角落',
      desc: '捧一本好书，让乘黄守护这段静谧的阅读时光',
      color: '#7a6b5a',   // 土褐色
    },
    {
      image: '/picture/chuangbian.png',  // 窗边休闲场景图
      title: '窗边休闲',
      desc: '阳台榻榻米，沐浴夕阳余晖，乘黄相伴慵懒午后',
      color: '#c4a05a',   // 琥珀色
    },
  ];

  return (
    <section ref={sectionRef} id="scenes" className="relative pt-12 pb-20 lg:pt-16 lg:pb-32 bg-transparent overflow-hidden">
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
          <span className="chapter-num">伍 · 生活</span>
          <h2 className="text-title mt-4">栖居于山海之间</h2>
          <p className="text-body mt-6 max-w-xl mx-auto">
            乘黄摆件融入每一个静谧时刻
          </p>
        </div>

        {/* 场景卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {scenes.map((scene, index) => (
            <div
              key={scene.title}
              className="reveal group cursor-pointer"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              {/* 图片区域 */}
              <div 
                className="aspect-[4/3] rounded-lg mb-6 overflow-hidden relative"
                style={{ backgroundColor: 'var(--color-cream)' }}
              >
                {/* 场景图片 */}
                <img 
                  src={scene.image} 
                  alt={scene.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* 底部渐变遮罩 */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-1/2"
                  style={{ 
                    background: `linear-gradient(180deg, transparent 0%, ${scene.color}30 100%)`
                  }}
                />
              </div>

              {/* 文字 */}
              <h4 
                className="text-lg mb-2"
                style={{ fontFamily: 'Noto Serif SC, serif', color: 'var(--color-ink)' }}
              >
                {scene.title}
              </h4>
              <p className="text-sm leading-relaxed opacity-70">{scene.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
