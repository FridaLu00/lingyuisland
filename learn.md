'use client';

import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  onBuyClick: () => void;
}

export default function Hero({ onBuyClick }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 水墨山水动画
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // 山峦数据 - 青绿山水配色
    const mountains = [
      { baseY: 0.72, amplitude: 0.14, frequency: 1.4, color: '45, 107, 90' },   // 山峦青绿
      { baseY: 0.78, amplitude: 0.11, frequency: 1.9, color: '45, 90, 123' },   // 涧蓝
      { baseY: 0.85, amplitude: 0.07, frequency: 2.8, color: '90, 139, 184' },  // 浅蓝
    ];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.005;

      // 绘制山峦
      mountains.forEach((mountain, index) => {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);

        for (let x = 0; x <= canvas.width; x += 2) {
          const normalizedX = x / canvas.width;
          const y = canvas.height * mountain.baseY 
            - Math.sin(normalizedX * Math.PI * mountain.frequency + time + index) * canvas.height * mountain.amplitude
            - Math.sin(normalizedX * Math.PI * mountain.frequency * 2.5) * canvas.height * mountain.amplitude * 0.3;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();

        // 渐变填充
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, `rgba(${mountain.color}, 0.15)`);
        gradient.addColorStop(0.5, `rgba(${mountain.color}, 0.08)`);
        gradient.addColorStop(1, `rgba(${mountain.color}, 0.02)`);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // 绘制云雾
      for (let i = 0; i < 3; i++) {
        const cloudY = canvas.height * (0.4 + i * 0.15);
        const cloudX = Math.sin(time * 0.5 + i) * 100 + canvas.width * 0.3;

        ctx.beginPath();
        const gradient = ctx.createRadialGradient(cloudX, cloudY, 0, cloudX, cloudY, 150);
        gradient.addColorStop(0, 'rgba(197, 204, 201, 0.15)');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.arc(cloudX, cloudY, 150, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-[var(--color-paper)]">
      {/* 水墨山水背景动画 */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.7 }}
      />

      {/* 渐变遮罩 */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 85% 65% at 75% 35%, transparent 0%, rgba(248, 250, 248, 0.95) 65%)'
        }}
      />

      {/* 主内容 - 非对称布局 */}
      <div className="container-wide relative z-10 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[80vh]">
          
          {/* 左侧 - 品牌区 */}
          <div className="lg:col-span-5 space-y-8">
            {/* 小标签 */}
            <div className="flex items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <span className="stamp">屿</span>
              <span className="text-caption tracking-widest">山海经神兽系列</span>
            </div>

            {/* 主标题 */}
            <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <h1 
                className="text-title leading-tight"
                style={{ letterSpacing: '0.15em' }}
              >
                乘黄守夜
              </h1>
              <p 
                className="text-subtitle opacity-80"
                style={{ letterSpacing: '0.3em' }}
              >
                寿时归身 · 安眠托付
              </p>
            </div>

            {/* 分隔线 */}
            <div className="divider !my-8 !mx-0" />

            {/* 副标题 */}
            <p 
              className="text-body max-w-md animate-fade-in-up"
              style={{ animationDelay: '0.6s' }}
            >
              将手机交付于山海经神兽乘黄
              <br />
              托管时长化作寿时，累积入簿
              <br />
              解锁山海地理知识，收获灵物陪伴
            </p>

            {/* 行动按钮 */}
            <div 
              className="flex flex-wrap gap-4 pt-4 animate-fade-in-up"
              style={{ animationDelay: '0.8s' }}
            >
              <a href="#mountain" className="btn-primary">
                探索灵屿
              </a>
              <button onClick={onBuyClick} className="btn-outline">
                立即典藏
              </button>
            </div>

            {/* 数据展示 */}
            <div 
              className="flex gap-12 pt-8 animate-fade-in-up"
              style={{ animationDelay: '1s' }}
            >
              <div>
                <div 
                  className="text-3xl font-semibold"
                  style={{ fontFamily: 'Noto Serif SC, serif', color: 'var(--color-ink)' }}
                >
                  30+
                </div>
                <div className="text-caption mt-1">分钟起计寿时</div>
              </div>
              <div>
                <div 
                  className="text-3xl font-semibold"
                  style={{ fontFamily: 'Noto Serif SC, serif', color: 'var(--color-ink)' }}
                >
                  500+
                </div>
                <div className="text-caption mt-1">山海经知识</div>
              </div>
              <div>
                <div 
                  className="text-3xl font-semibold"
                  style={{ fontFamily: 'Noto Serif SC, serif', color: 'var(--color-ink)' }}
                >
                  ∞
                </div>
                <div className="text-caption mt-1">灵物收集</div>
              </div>
            </div>
          </div>

          {/* 右侧 - 视觉区（留白为主，乘黄形象） */}
          <div className="lg:col-span-7 relative hidden lg:block">
            {/* 居中的乘黄形象 */}
            <div className="relative w-full aspect-square max-w-xl mx-auto">
              {/* 外圈 - 晕染效果 */}
              <div 
                className="absolute inset-0 rounded-full animate-breathe"
                style={{
                  background: 'radial-gradient(circle, rgba(61, 124, 107, 0.1) 0%, transparent 70%)'
                }}
              />

              {/* 内圈 - 主视觉 */}
              <div className="absolute inset-[10%] rounded-full flex items-center justify-center overflow-hidden">
                <img 
                  src="/picture/CH.png" 
                  alt="乘黄" 
                  className="w-full h-full object-contain animate-float"
                />
              </div>

              {/* 装饰 - 祥云 */}
              <div 
                className="absolute top-[5%] right-[10%] w-20 h-20 opacity-30"
                style={{ animation: 'floatIn 8s ease-in-out infinite', animationDelay: '1s' }}
              >
                <svg viewBox="0 0 80 80" fill="none">
                  <path d="M40 60 Q20 50 20 35 Q20 15 40 15 Q50 15 55 25 Q65 20 70 35 Q75 50 55 55 Q50 60 40 60" 
                        fill="var(--color-mount-green)" opacity="0.3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部滚动提示 */}
      <div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce"
      >
        <span className="text-caption tracking-widest">向下探索</span>
        <ChevronDown size={20} color="var(--color-ink-faint)" />
      </div>
    </section>
  );
}