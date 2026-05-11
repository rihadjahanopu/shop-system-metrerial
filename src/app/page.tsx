"use client";

import AuthModal from "@/components/AuthModal";
import CartSidebar from "@/components/CartSidebar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ProductGrid from "@/components/ProductGrid";
import ProductModal from "@/components/ProductModal";
import Stats from "@/components/Stats";
import WishlistSidebar from "@/components/WishlistSidebar";
import { useStore } from "@/store/useStore";
import { useEffect, useState } from "react";

export default function Home() {
	const {
		darkMode,
		cartOpen,
		setCartOpen,
		wishlistOpen,
		setWishlistOpen,
		selectedProduct,
		setSelectedProduct,
		authOpen,
		setAuthOpen,
	} = useStore();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const raf = window.requestAnimationFrame(() => setMounted(true));
		return () => window.cancelAnimationFrame(raf);
	}, []);

	useEffect(() => {
		if (!mounted) return;
		document.documentElement.classList.toggle("dark", darkMode);
	}, [darkMode, mounted]);

	return (
		<div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
			<Navbar />
			<main className="flex-1">
				<Hero />
				<Stats />
				<ProductGrid />
			</main>
			<Footer />

			<CartSidebar
				isOpen={cartOpen}
				onClose={() => setCartOpen(false)}
			/>
			<WishlistSidebar
				isOpen={wishlistOpen}
				onClose={() => setWishlistOpen(false)}
			/>
			<ProductModal
				product={selectedProduct}
				onClose={() => setSelectedProduct(null)}
			/>
			<AuthModal
				isOpen={authOpen}
				onClose={() => setAuthOpen(false)}
			/>
		</div>
	);
}
