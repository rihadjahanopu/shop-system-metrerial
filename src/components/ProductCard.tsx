'use client';

import React from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '@/types';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, wishlist, setSelectedProduct } = useStore();
  const isWishlisted = wishlist.includes(product.id);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-2xl border border-transparent hover:border-primary/20"
    >
      <div 
        className="relative aspect-square overflow-hidden cursor-pointer"
        onClick={() => setSelectedProduct(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.stock === 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-2 py-1 rounded-full font-bold">
            স্টক আউট
          </span>
        )}
        {product.stock > 0 && product.stock < 5 && (
          <span className="absolute top-2 left-2 bg-orange-500 text-white text-[10px] px-2 py-1 rounded-full font-bold">
            শুধু {product.stock}টি বাকি
          </span>
        )}
        
        <button 
          onClick={() => toggleWishlist(product.id)}
          className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-lg backdrop-blur-md ${
            isWishlisted ? 'bg-secondary text-white' : 'bg-white/80 text-gray-400 hover:text-secondary'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
        </button>

        <span className="absolute bottom-2 left-2 bg-primary/90 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full capitalize">
          {product.category}
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-1 mb-1">
          {renderStars(product.rating)}
          <span className="text-[10px] text-gray-500 ml-1">({product.reviews.length})</span>
        </div>
        
        <h3 
          onClick={() => setSelectedProduct(product)}
          className="font-bold text-lg mb-1 dark:text-white line-clamp-1 hover:text-primary transition-colors cursor-pointer"
        >
          {product.name}
        </h3>
        
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-3 line-clamp-2 min-h-[40px]">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-primary">৳{product.price.toLocaleString()}</span>
          <button 
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              product.stock === 0 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-primary text-white hover:bg-primary/90 hover:shadow-lg active:scale-95'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="text-sm">{product.stock === 0 ? 'স্টক আউট' : 'কার্টে যোগ'}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
