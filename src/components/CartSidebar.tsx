"use client";

import { useStore } from "@/store/useStore";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingCart, Tag, Trash2, X } from "lucide-react";

interface CartSidebarProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
	const { cart, removeFromCart, updateQuantity, clearCart } = useStore();

	const subtotal = cart.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);
	const discount = 0; // Simplified for now
	const total = subtotal - discount;

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Overlay */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
						className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[50]"
					/>

					{/* Sidebar */}
					<motion.div
						initial={{ x: "100%" }}
						animate={{ x: 0 }}
						exit={{ x: "100%" }}
						transition={{ type: "spring", damping: 25, stiffness: 200 }}
						className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-800 z-[60] shadow-2xl flex flex-col">
						{/* Header */}
						<div className="p-6 border-b dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-700/50">
							<h2 className="text-2xl font-bold dark:text-white flex items-center gap-3">
								<ShoppingCart className="text-primary w-6 h-6" />
								আপনার কার্ট
							</h2>
							<button
								onClick={onClose}
								className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors">
								<X className="w-6 h-6 dark:text-white" />
							</button>
						</div>

						{/* Items */}
						<div className="flex-1 overflow-y-auto p-6 space-y-6">
							{cart.length === 0 ?
								<div className="h-full flex flex-col items-center justify-center text-center space-y-4">
									<div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
										<ShoppingCart className="w-10 h-10 text-gray-400" />
									</div>
									<p className="text-gray-500 dark:text-gray-400 text-lg">
										আপনার কার্ট খালি
									</p>
									<button
										onClick={onClose}
										className="text-primary font-bold hover:underline">
										শপিং শুরু করুন
									</button>
								</div>
							:	cart.map((item) => (
									<motion.div
										layout
										key={item.id}
										className="flex gap-4 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-600 group">
										<div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-gray-200 dark:border-gray-600">
											<img
												src={item.image}
												alt={item.name}
												className="w-full h-full object-cover"
											/>
										</div>
										<div className="flex-1 min-w-0">
											<h4 className="font-bold text-gray-800 dark:text-white truncate">
												{item.name}
											</h4>
											<p className="text-primary font-bold mb-3">
												৳{item.price.toLocaleString()}
											</p>
											<div className="flex items-center gap-4">
												<div className="flex items-center bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 p-1">
													<button
														onClick={() => updateQuantity(item.id, -1)}
														className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors bg-rose-500 text-white">
														<Minus className="w-4 h-4 " />
													</button>
													<span className="w-8 text-center font-bold dark:text-white">
														{item.quantity}
													</span>
													<button
														onClick={() => updateQuantity(item.id, 1)}
														className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors bg-rose-500 text-white ">
														<Plus className="w-4 h-4 " />
													</button>
												</div>
												<button
													onClick={() => removeFromCart(item.id)}
													className="text-red-500 hover:text-red-600 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all bg-white">
													<Trash2 className="w-5 h-5" />
												</button>
											</div>
										</div>
									</motion.div>
								))
							}
						</div>

						{/* Footer */}
						{cart.length > 0 && (
							<div className="p-6 border-t dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-md space-y-4">
								<div className="flex gap-2">
									<div className="relative flex-1">
										<input
											type="text"
											placeholder="কুপন কোড"
											className="w-full pl-10 pr-4 py-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
										/>
										<Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
									</div>
									<button className="bg-primary text-white px-6 py-2 rounded-xl font-bold hover:bg-primary/90 transition-all">
										অ্যাপ্লাই
									</button>
								</div>

								<div className="space-y-2">
									<div className="flex justify-between text-gray-600 dark:text-gray-400">
										<span>সাবটোটাল:</span>
										<span className="font-medium">
											৳{subtotal.toLocaleString()}
										</span>
									</div>
									<div className="flex justify-between text-gray-600 dark:text-gray-400">
										<span>ডিসকাউন্ট:</span>
										<span className="text-green-500 font-medium">
											-৳{discount.toLocaleString()}
										</span>
									</div>
									<div className="flex justify-between items-center pt-2">
										<span className="text-xl font-bold dark:text-white">
											মোট:
										</span>
										<span className="text-3xl font-extrabold text-primary">
											৳{total.toLocaleString()}
										</span>
									</div>
								</div>

								<button className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-[0.98]">
									চেকআউট করুন
								</button>
							</div>
						)}
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
