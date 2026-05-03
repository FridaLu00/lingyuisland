'use client';

import { useState } from 'react';
import Header from '@/components/sections/Header';
import Hero from '@/components/sections/Hero';
import BrandStory from '@/components/sections/BrandStory';
import MountainSeaCulture from '@/components/sections/MountainSeaCulture';
import ProductDetails from '@/components/sections/ProductDetails';
import ProductCycle from '@/components/sections/ProductCycle';
import UsageScenes from '@/components/sections/UsageScenes';
import Footer from '@/components/sections/Footer';
import PurchaseModal from '@/components/sections/PurchaseModal';

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = '';
  };

  return (
    <main className="min-h-screen">
      <Header onBuyClick={openModal} />
      <Hero onBuyClick={openModal} />
      <BrandStory />
      <MountainSeaCulture />
      <ProductCycle />
      <ProductDetails onBuyClick={openModal} />
      <UsageScenes />
      <Footer onBuyClick={openModal} />
      <PurchaseModal isOpen={showModal} onClose={closeModal} />
    </main>
  );
}
