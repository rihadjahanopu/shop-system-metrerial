'use client';

import React from 'react';
import { useStore } from '@/store/useStore';
import { Package, Users, Headphones, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Stats() {
  const { products } = useStore();

  const stats = [
    { label: 'পণ্য', value: products.length, icon: Package, color: 'text-primary' },
    { label: 'গ্রাহক', value: '৫০০০+', icon: Users, color: 'text-secondary' },
    { label: 'সাপোর্ট', value: '২৪/৭', icon: Headphones, color: 'text-accent' },
    { label: 'ডেলিভারি', value: 'ফ্রি', icon: Truck, color: 'text-green-500' },
  ];

  return (
    <section className="py-12 bg-white dark:bg-gray-800 shadow-sm relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-700 mb-4 group-hover:scale-110 transition-transform ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`text-3xl font-bold ${stat.color} mb-1`}>
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
