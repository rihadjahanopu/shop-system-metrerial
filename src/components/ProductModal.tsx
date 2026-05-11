'use client';

import React from 'react';
import { X, Star, ShoppingCart, Heart, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { Product } from '@/types';
import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  
  if (!product) return null;

  const isWishlisted = wishlist.includes(product.id);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-gray-700/80 backdrop-blur-md rounded-full text-gray-500 hover:text-red-500 transition-colors shadow-lg"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left: Image Section */}
            <div className="w-full md:w-1/2 h-[300px] md:h-auto relative bg-gray-100 dark:bg-gray-700">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="bg-primary/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
                  {product.category}
                </span>
                {product.stock > 0 ? (
                  <span className="bg-green-500/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold">
                    স্টকে আছে
                  </span>
                ) : (
                  <span className="bg-red-500/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold">
                    স্টক আউট
                  </span>
                )}
              </div>
            </div>

            {/* Right: Details Section */}
            <div className="w-full md:w-1/2 p-8 overflow-y-auto">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ({product.reviews.length} রিভিউসমূহ)
                </span>
              </div>

              <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-4 leading-tight">
                {product.name}
              </h2>

              <p className="text-4xl font-black text-primary mb-6">
                ৳{product.price.toLocaleString()}
              </p>

              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-2xl mb-8 border border-gray-100 dark:border-gray-600">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                  <Truck className="w-4 h-4 text-primary" />
                  <span>ফ্রি ডেলিভারি</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                  <RotateCcw className="w-4 h-4 text-primary" />
                  <span>৭ দিনের রিটার্ন</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>নিরাপদ পেমেন্ট</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    addToCart(product);
                    onClose();
                  }}
                  disabled={product.stock === 0}
                  className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg ${
                    product.stock === 0
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-primary text-white hover:bg-primary/90 hover:shadow-primary/30 active:scale-[0.98]'
                  }`}
                >
                  <ShoppingCart className="w-6 h-6" />
                  কার্টে যোগ করুন
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-center shadow-lg ${
                    isWishlisted
                      ? 'bg-secondary/10 border-secondary text-secondary'
                      : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-400 hover:text-secondary hover:border-secondary'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-secondary' : ''}`} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
