import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";

const banglaFont = Hind_Siliguri({
	variable: "--font-bangla",
	subsets: ["bengali", "latin"],
	weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
	title: "ShopEase Pro - Your Premium Shopping Destination",
	description:
		"Experience the best online shopping with ShopEase Pro. Free delivery and 7 days return policy.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="bn"
			className={`${banglaFont.variable} h-full antialiased`}
			suppressHydrationWarning>
			<head>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
				/>
				<script
					dangerouslySetInnerHTML={{
						__html: `
              (function() {
                try {
                  var storageValue = localStorage.getItem('shopease-storage');
                  var dark = false;

                  if (storageValue) {
                    var parsed = JSON.parse(storageValue);
                    dark = parsed?.state?.darkMode ?? parsed?.darkMode ?? false;
                  } else {
                    dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  }

                  document.documentElement.classList.toggle('dark', dark);
                } catch (e) {
                  console.error(e);
                }
              })();
            `,
					}}
				/>
			</head>
			<body className="font-bangla bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
				{children}
			</body>
		</html>
	);
}
