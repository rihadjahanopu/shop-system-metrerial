"use client";

import { useStore } from "@/store/useStore";
import { AnimatePresence, motion } from "framer-motion";
import {
	Heart,
	LogOut,
	Search,
	ShoppingBag,
	ShoppingCart,
	User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function Navbar() {
	const {
		products,
		cart,
		wishlist,
		currentUser,
		setCustomer,
		searchQuery,
		setSearchQuery,
		setCartOpen,
		setWishlistOpen,
		setAuthOpen,
	} = useStore();

	const [isSearchFocused, setIsSearchFocused] = useState(false);
	const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

	const searchResults = useMemo(() => {
		const query = searchQuery.trim().toLowerCase();
		if (!query) return [];

		const words = query.split(/\s+/).filter(Boolean);
		return products
			.filter((product) =>
				words.every(
					(word) =>
						product.name.toLowerCase().includes(word) ||
						product.category.toLowerCase().includes(word) ||
						product.description.toLowerCase().includes(word)
				)
			)
			.slice(0, 6);
	}, [products, searchQuery]);

	return (
		<nav className="bg-white dark:bg-gray-800 shadow-xl sticky top-0 z-40 transition-all duration-300">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Top Row: Logo & Icons */}
				<div className="flex justify-between items-center h-16 md:h-20">
					{/* Logo */}
					<div className="flex items-center shrink-0">
						<Link
							href="/"
							className="text-xl md:text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-primary via-accent to-secondary flex items-center">
							<ShoppingBag className="mr-2 text-primary w-6 h-6 md:w-8 md:h-8" />
							<span>ShopEase Pro</span>
						</Link>
					</div>

					{/* Desktop Search (Hidden on Mobile) */}
					<div className="hidden lg:flex flex-1 max-w-xl mx-8 relative">
						<div className="relative w-full">
							<input
								type="text"
								placeholder="প্রোডাক্ট খুঁজুন..."
								className="w-full border-2 border-primary/20 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-full px-5 py-3 pl-14 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-300 shadow-sm"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								onFocus={() => setIsSearchFocused(true)}
								onBlur={() => setTimeout(() => setIsSearchFocused(false), 150)}
							/>
							<Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />

							<AnimatePresence>
								{isSearchFocused && searchResults.length > 0 && (
									<SearchDropdown results={searchResults} />
								)}
							</AnimatePresence>
						</div>
					</div>

					{/* Right Actions */}
					<div className="flex items-center space-x-2 md:space-x-3">
						<button
							onClick={() => setWishlistOpen(true)}
							className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all">
							<Heart className="w-6 h-6" />
							{wishlist.length > 0 && (
								<span className="absolute top-1 right-1 bg-secondary text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-lg animate-pulse">
									{wishlist.length}
								</span>
							)}
						</button>

						<button
							onClick={() => setCartOpen(true)}
							className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all">
							<ShoppingCart className="w-6 h-6" />
							{cartCount > 0 && (
								<span className="absolute top-1 right-1 bg-primary text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-lg">
									{cartCount}
								</span>
							)}
						</button>

						<div className="h-8 w-px bg-gray-200 dark:bg-gray-700 mx-1 hidden sm:block"></div>

						<div className="flex items-center">
							{currentUser ?
								<div className="flex items-center gap-2">
									<div className="w-9 h-9 bg-linear-to-br from-primary to-accent text-white rounded-xl flex items-center justify-center font-bold shadow-lg shadow-primary/30 cursor-pointer">
										{currentUser.name[0]}
									</div>
									<button
										onClick={() => setCustomer(null)}
										className="hidden sm:flex p-2 text-gray-400 hover:text-red-500 transition-colors">
										<LogOut className="w-5 h-5" />
									</button>
								</div>
							:	<button
									onClick={() => setAuthOpen(true)}
									className="bg-primary text-white px-4 py-2 rounded-xl font-bold hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-95 flex items-center gap-2">
									<User className="w-4 h-4" />
									<span className="hidden sm:inline">লগইন</span>
								</button>
							}
						</div>
					</div>
				</div>

				{/* Mobile Search Bar (Always Visible on Mobile, Hidden on Desktop) */}
				<div className="lg:hidden pb-4 relative">
					<div className="relative w-full">
						<input
							type="text"
							placeholder="প্রোডাক্ট খুঁজুন..."
							className="w-full border-2 border-primary/20 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white rounded-2xl px-5 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-inner"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							onFocus={() => setIsSearchFocused(true)}
							onBlur={() => setTimeout(() => setIsSearchFocused(false), 150)}
						/>
						<Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
					</div>

					<AnimatePresence>
						{isSearchFocused && searchResults.length > 0 && (
							<SearchDropdown results={searchResults} />
						)}
					</AnimatePresence>
				</div>
			</div>
		</nav>
	);
}

function SearchDropdown({ results }: { results: any[] }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -10 }}
			className="absolute left-0 right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden z-50">
			<div className="divide-y divide-gray-100 dark:divide-gray-800 max-h-[60vh] overflow-y-auto">
				{results.map((product) => (
					<div
						key={product.id}
						className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
						<div className="relative h-12 w-12 rounded-lg overflow-hidden bg-gray-100">
							<Image
								src={product.image}
								alt={product.name}
								fill
								className="object-cover"
							/>
						</div>
						<div className="min-w-0">
							<p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
								{product.name}
							</p>
							<p className="text-xs text-primary font-bold">
								৳{product.price.toLocaleString()}
							</p>
						</div>
					</div>
				))}
			</div>
		</motion.div>
	);
}
