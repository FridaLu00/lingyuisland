'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: '缘起', href: '#story' },
  { label: '山海', href: '#mountain' },
  { label: '寿时', href: '#cycle' },
  { label: '典藏', href: '#product' },
  { label: '生活', href: '#scenes' },
];

interface HeaderProps {
  onBuyClick: () => void;
}

export default function Header({ onBuyClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${isScrolled 
          ? 'bg-[var(--color-paper)]/95 backdrop-blur-sm shadow-sm' 
          : 'bg-transparent'
        }
      `}
    >
      <div className="container-wide px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* 品牌标识 */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative">
              <img 
                src="/picture/logohei.png" 
                alt="灵屿" 
                className="h-13 w-auto relative top-0.5" 
              />
            </div>
          </a>

          {/* 桌面导航 */}
          <nav className="hidden md:flex items-center gap-12">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm tracking-widest opacity-70 hover:opacity-100 transition-opacity duration-300"
                style={{ 
                  fontFamily: 'Noto Serif SC, serif',
                  color: 'var(--color-ink)'
                }}
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={onBuyClick}
              className="btn-primary text-xs !px-6 !py-3"
            >
              立即典藏
            </button>
          </nav>

          {/* 移动端菜单按钮 */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="菜单"
          >
            {isMenuOpen ? (
              <X size={24} color="var(--color-ink)" />
            ) : (
              <Menu size={24} color="var(--color-ink)" />
            )}
          </button>
        </div>
      </div>

      {/* 移动端菜单 */}
      <div
        className={`
          md:hidden absolute top-20 left-0 right-0 bg-[var(--color-paper)]/98 backdrop-blur-lg
          transition-all duration-300 overflow-hidden
          ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <nav className="px-6 py-8 flex flex-col gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-lg tracking-widest"
              style={{ 
                fontFamily: 'Noto Serif SC, serif',
                color: 'var(--color-ink)'
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => {
              setIsMenuOpen(false);
              onBuyClick();
            }}
            className="btn-primary text-sm mt-4"
          >
            立即典藏
          </button>
        </nav>
      </div>
    </header>
  );
}
