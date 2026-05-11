import { initialProducts } from "@/data/products";
import { CartItem, Merchant, Product, User } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AppState {
	products: Product[];
	cart: CartItem[];
	wishlist: number[];
	currentUser: User | null;
	currentMerchant: Merchant | null;
	darkMode: boolean;
	searchQuery: string;
	cartOpen: boolean;
	wishlistOpen: boolean;
	selectedProduct: Product | null;
	authOpen: boolean;

	// Actions
	toggleDarkMode: () => void;
	setDarkMode: (value: boolean) => void;
	setSearchQuery: (value: string) => void;
	setCartOpen: (open: boolean) => void;
	setWishlistOpen: (open: boolean) => void;
	setSelectedProduct: (product: Product | null) => void;
	setAuthOpen: (open: boolean) => void;
	addProduct: (product: Product) => void;
	updateProduct: (product: Product) => void;
	deleteProduct: (id: number) => void;
	addToCart: (product: Product) => void;
	removeFromCart: (productId: number) => void;
	updateQuantity: (productId: number, change: number) => void;
	toggleWishlist: (productId: number) => void;
	setCustomer: (user: User | null) => void;
	setMerchant: (merchant: Merchant | null) => void;
	clearCart: () => void;
}

export const useStore = create<AppState>()(
	persist(
		(set) => ({
			products: initialProducts,
			cart: [],
			wishlist: [],
			currentUser: null,
			currentMerchant: null,
			darkMode: false,
			searchQuery: "",
			cartOpen: false,
			wishlistOpen: false,
			selectedProduct: null,
			authOpen: false,

			toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
			setDarkMode: (value) => set({ darkMode: value }),
			setCartOpen: (open) => set({ cartOpen: open }),
			setWishlistOpen: (open) => set({ wishlistOpen: open }),
			setSelectedProduct: (product) => set({ selectedProduct: product }),
			setAuthOpen: (open) => set({ authOpen: open }),
			setSearchQuery: (value) => set({ searchQuery: value }),

			addProduct: (product) =>
				set((state) => ({
					products: [...state.products, { ...product, id: Date.now() }],
				})),

			updateProduct: (product) =>
				set((state) => ({
					products: state.products.map((p) =>
						p.id === product.id ? product : p
					),
				})),

			deleteProduct: (id) =>
				set((state) => ({
					products: state.products.filter((p) => p.id !== id),
				})),

			addToCart: (product) =>
				set((state) => {
					const existing = state.cart.find((item) => item.id === product.id);
					if (existing) {
						return {
							cart: state.cart.map((item) =>
								item.id === product.id ?
									{ ...item, quantity: item.quantity + 1 }
								:	item
							),
						};
					}
					return { cart: [...state.cart, { ...product, quantity: 1 }] };
				}),

			removeFromCart: (productId) =>
				set((state) => ({
					cart: state.cart.filter((item) => item.id !== productId),
				})),

			updateQuantity: (productId, change) =>
				set((state) => ({
					cart: state.cart
						.map((item) => {
							if (item.id === productId) {
								const newQty = Math.max(0, item.quantity + change);
								return { ...item, quantity: newQty };
							}
							return item;
						})
						.filter((item) => item.quantity > 0),
				})),

			toggleWishlist: (productId) =>
				set((state) => ({
					wishlist:
						state.wishlist.includes(productId) ?
							state.wishlist.filter((id) => id !== productId)
						:	[...state.wishlist, productId],
				})),

			setCustomer: (user) => set({ currentUser: user }),
			setMerchant: (merchant) => set({ currentMerchant: merchant }),
			clearCart: () => set({ cart: [] }),
		}),
		{
			name: "shopease-storage",
			storage: createJSONStorage(() => localStorage),
		}
	)
);
