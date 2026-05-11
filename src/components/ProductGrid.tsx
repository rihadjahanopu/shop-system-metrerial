"use client";

import { useStore } from "@/store/useStore";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";

const categories = [
	{ id: "all", name: "সব" },
	{ id: "electronics", name: "ইলেকট্রনিক্স" },
	{ id: "fashion", name: "ফ্যাশন" },
	{ id: "home", name: "হোম" },
	{ id: "sports", name: "স্পোর্টস" },
];

export default function ProductGrid() {
	const { products, searchQuery } = useStore();
	const [activeCategory, setActiveCategory] = useState("all");
	const [sortBy, setSortBy] = useState("default");
	const [priceRange, setPriceRange] = useState(10000);

	const filteredProducts = useMemo(() => {
		let result = products.filter((p) => p.price <= priceRange);

		if (searchQuery.trim().length > 0) {
			const words = searchQuery
				.trim()
				.toLowerCase()
				.split(/\s+/)
				.filter(Boolean);
			result = result.filter((product) =>
				words.every(
					(word) =>
						product.name.toLowerCase().includes(word) ||
						product.category.toLowerCase().includes(word) ||
						product.description.toLowerCase().includes(word)
				)
			);
		}

		if (activeCategory !== "all") {
			result = result.filter((p) => p.category === activeCategory);
		}

		switch (sortBy) {
			case "price-low":
				result.sort((a, b) => a.price - b.price);
				break;
			case "price-high":
				result.sort((a, b) => b.price - a.price);
				break;
			case "name":
				result.sort((a, b) => a.name.localeCompare(b.name));
				break;
			case "rating":
				result.sort((a, b) => b.rating - a.rating);
				break;
		}

		return result;
	}, [products, searchQuery, activeCategory, sortBy, priceRange]);

	return (
		<section
			id="products"
			className="py-12 bg-gray-50 dark:bg-gray-900/50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Filters Header */}
				<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-12 border border-gray-100 dark:border-gray-700">
					<div className="flex flex-col lg:flex-row gap-6 justify-between items-center">
						{/* Category Pills */}
						<div className="flex flex-wrap gap-2 justify-center lg:justify-start">
							{categories.map((cat) => (
								<button
									key={cat.id}
									onClick={() => setActiveCategory(cat.id)}
									className={`px-6 py-2 rounded-full font-medium transition-all duration-300 border-2 ${
										activeCategory === cat.id ?
											"bg-primary border-primary text-white shadow-lg scale-105"
										:	"border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-primary hover:text-primary"
									}`}>
									{cat.name}
								</button>
							))}
						</div>

						{/* Price & Sort Controls */}
						<div className="flex flex-wrap gap-6 items-center justify-center">
							<div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-700/50 px-4 py-2 rounded-xl border border-gray-100 dark:border-gray-600">
								<span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
									দাম:
								</span>
								<input
									type="range"
									min="0"
									max="10000"
									step="100"
									value={priceRange}
									onChange={(e) => setPriceRange(Number(e.target.value))}
									className="w-32 accent-primary cursor-pointer"
								/>
								<span className="text-primary font-bold min-w-[70px]">
									৳{priceRange.toLocaleString()}
								</span>
							</div>

							<div className="relative">
								<select
									value={sortBy}
									onChange={(e) => setSortBy(e.target.value)}
									className="appearance-none bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-xl px-5 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer font-medium">
									<option value="default">সর্ট করুন</option>
									<option value="price-low">দাম: কম থেকে বেশি</option>
									<option value="price-high">দাম: বেশি থেকে কম</option>
									<option value="name">নাম</option>
									<option value="rating">রেটিং</option>
								</select>
								<ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
							</div>
						</div>
					</div>
				</div>

				{/* Products Grid */}
				{filteredProducts.length > 0 ?
					<motion.div
						layout
						className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
						<AnimatePresence mode="popLayout">
							{filteredProducts.map((product) => (
								<ProductCard
									key={product.id}
									product={product}
								/>
							))}
						</AnimatePresence>
					</motion.div>
				:	<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="text-center py-24 bg-white dark:bg-gray-800 rounded-3xl shadow-inner">
						<div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
							<Search className="w-10 h-10 text-gray-400" />
						</div>
						<h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
							কোনো প্রোডাক্ট পাওয়া যায়নি
						</h3>
						<p className="text-gray-500 dark:text-gray-400">
							ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন
						</p>
					</motion.div>
				}

				{/* Load More */}
				{filteredProducts.length > 0 && (
					<div className="text-center mt-16">
						<button className="group relative px-8 py-3 bg-white dark:bg-gray-800 border-2 border-primary text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-primary/30 flex items-center gap-2 mx-auto overflow-hidden">
							<span className="relative z-10 flex items-center gap-2">
								আরও দেখুন{" "}
								<ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
							</span>
						</button>
					</div>
				)}
			</div>
		</section>
	);
}
