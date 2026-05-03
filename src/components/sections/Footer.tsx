'use client';

interface FooterProps {
  onBuyClick: () => void;
}

export default function Footer({ onBuyClick }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const links = {
    product: [
      { label: '产品介绍', href: '#product' },
      { label: '山海文化', href: '#mountain' },
      { label: '寿时体系', href: '#cycle' },
    ],
    support: [
      { label: '使用指南', href: '#' },
      { label: '常见问题', href: '#' },
      { label: '联系我们', href: '#' },
    ],
    about: [
      { label: '关于灵屿', href: '#' },
      { label: '加入我们', href: '#' },
      { label: '媒体合作', href: '#' },
    ],
  };

  return (
    <footer className="relative bg-transparent border-t" style={{ borderColor: 'rgba(45, 107, 90, 0.2)' }}>
      {/* 半透明遮罩 */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'rgba(248, 250, 248, 0.9)',
          zIndex: 0
        }}
      />
      <div className="container-wide px-6 lg:px-12 py-16 relative z-10">
        
        {/* 主内容 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* 品牌区 */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/picture/logohei.png" 
                alt="灵屿" 
                className="h-12 w-auto" 
              />
            </div>
            <p className="text-body text-sm max-w-xs leading-relaxed mb-6">
              源自《山海经》的睡眠养成品牌
              <br />
              让每一次放下，都成为与神兽的契约
            </p>
            
            {/* 立即典藏按钮 */}
            <button
              onClick={onBuyClick}
              className="px-6 py-3 text-sm tracking-widest transition-all duration-300 hover:shadow-lg"
              style={{ 
                backgroundColor: 'var(--color-ink)',
                color: 'var(--color-paper)',
                fontFamily: 'Noto Serif SC, serif'
              }}
            >
              立即典藏
            </button>
          </div>

          {/* 链接 */}
          <div>
            <h4 
              className="text-sm font-medium mb-4"
              style={{ fontFamily: 'Noto Serif SC, serif', color: 'var(--color-ink)' }}
            >
              产品
            </h4>
            <ul className="space-y-3">
              {links.product.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-sm opacity-60 hover:opacity-100 transition-opacity"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 
              className="text-sm font-medium mb-4"
              style={{ fontFamily: 'Noto Serif SC, serif', color: 'var(--color-ink)' }}
            >
              支持
            </h4>
            <ul className="space-y-3">
              {links.support.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-sm opacity-60 hover:opacity-100 transition-opacity"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 
              className="text-sm font-medium mb-4"
              style={{ fontFamily: 'Noto Serif SC, serif', color: 'var(--color-ink)' }}
            >
              关于
            </h4>
            <ul className="space-y-3">
              {links.about.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-sm opacity-60 hover:opacity-100 transition-opacity"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 底部 */}
        <div 
          className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: 'var(--color-cream)' }}
        >
          <p className="text-caption text-xs">
            © {currentYear} 灵屿 island. 保留所有权利。
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-caption text-xs hover:opacity-100 opacity-60">
              隐私政策
            </a>
            <a href="#" className="text-caption text-xs hover:opacity-100 opacity-60">
              用户协议
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
