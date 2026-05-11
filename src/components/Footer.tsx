'use client';

import React from 'react';
import { ShoppingBag, Globe, Link2, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              <ShoppingBag className="text-primary" />
              ShopEase Pro
            </h3>
            <p className="text-gray-400 leading-relaxed">
              আপনার বিশ্বস্ত অনলাইন শপিং ডেস্টিনেশন। আমরা সেরা মানের পণ্য এবং চমৎকার গ্রাহক সেবা নিশ্চিত করি।
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-secondary transition-all duration-300">
                <Link2 className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-accent transition-all duration-300">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-gray-800 pb-2 inline-block">দ্রুত লিংক</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">হোম</a></li>
              <li><a href="#products" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">প্রোডাক্টস</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">অফারসমূহ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">অর্ডার হিস্টোরি</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-gray-800 pb-2 inline-block">সাপোর্ট</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">হেল্প সেন্টার</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">রিটার্ন পলিসি</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">শিপিং তথ্য</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">প্রাইভেসি পলিসি</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-gray-800 pb-2 inline-block">যোগাযোগ</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>১০/বি, বনানী, ঢাকা-১২১৩, বাংলাদেশ</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+৮৮০ ১২৩৪ ৫৬৭৮৯০</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>support@shopeasepro.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p>&copy; ২০২৪ ShopEase Pro. সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-6">
            <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="h-6 grayscale hover:grayscale-0 transition opacity-50 hover:opacity-100" />
            <img src="https://img.icons8.com/color/48/mastercard.png" alt="Mastercard" className="h-6 grayscale hover:grayscale-0 transition opacity-50 hover:opacity-100" />
            <img src="https://img.icons8.com/color/48/paypal.png" alt="Paypal" className="h-6 grayscale hover:grayscale-0 transition opacity-50 hover:opacity-100" />
          </div>
        </div>
      </div>
    </footer>
  );
}
