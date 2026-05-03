import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '灵屿 | 乘黄·寿 睡眠养成手机托管摆件',
    template: '%s | 灵屿',
  },
  description:
    '灵屿品牌官网，乘黄·寿睡眠养成手机托管摆件，将山海经神兽文化与现代睡眠科技完美融合。手机托管时长转化为乘黄寿时，解锁山海地理知识与灵物收集，治愈每一夜。',
  keywords: [
    '灵屿',
    '乘黄',
    '睡眠养成',
    '手机托管',
    '山海经',
    '数字宠物',
    '家居科技',
    '睡眠摆件',
    '寿时',
    '神兽',
  ],
  authors: [{ name: '灵屿', url: 'https://lingyu.com' }],
  generator: '灵屿',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: '灵屿 | 乘黄·寿 睡眠养成',
    description:
      '把每一个夜晚，托付给山海神兽。让手机入座，乘黄守夜，寿时归身。',
    url: 'https://lingyu.com',
    siteName: '灵屿',
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '灵屿 | 乘黄·寿 睡眠养成',
    description: '把每一个夜晚，托付给山海神兽。',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen antialiased paper-texture">
        {children}
      </body>
    </html>
  );
}
