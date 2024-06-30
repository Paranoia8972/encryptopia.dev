import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { pageMetadata } from '@/info';

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans'
});

export const metadata: Metadata = pageMetadata;

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/avatar.png" type="image/png" />
			</head>
			<body
				className={cn(
					'min-h-screen h-screen bg-background font-sans antialiased dark',
					fontSans.variable
				)}
			>
				{children}
			</body>
		</html>
	);
}
