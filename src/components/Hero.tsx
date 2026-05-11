'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-pink-500 text-white py-16 md:py-24">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium inline-block mb-4 border border-white/30">
              🎉 নতুন কালেকশন ২০২৪
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              সেরা পণ্য সবচেয়ে কম দামে
            </h1>
            <p className="text-xl mb-8 opacity-90">
              আপনার প্রয়োজনীয় সব পণ্য এখন একই ছাদের নিচে। ফ্রি ডেলিভারি ও ৭ দিনের রিটার্ন পলিসি!
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <button className="bg-white text-primary px-8 py-3 rounded-full font-bold text-lg hover:shadow-xl transition flex items-center group">
                শপিং শুরু করুন 
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-white hover:text-primary transition">
                অফার দেখুন
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hidden md:block"
          >
            <img
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600"
              alt="Shopping"
              className="rounded-2xl shadow-2xl transform hover:rotate-0 transition duration-500 border-4 border-white/20"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
