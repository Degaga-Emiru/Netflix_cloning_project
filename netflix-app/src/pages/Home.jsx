import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <FAQ />
      <Footer />
    </div>
  );
}