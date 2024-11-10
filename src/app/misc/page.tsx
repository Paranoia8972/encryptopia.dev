import Link from "next/link";

interface MiscLink {
	title: string;
	href: string;
}

export default function Component() {
	const miscLinks: MiscLink[] = [
		{
			title: "Project One (Description)",
			href: "/projects/one",
		},
		{
			title: "My Writing on Technology",
			href: "/writing/tech",
		},
	];

	return (
		<main className="prose prose-invert max-w-none flex-grow">
			<h1 className="text-2xl font-bold mb-6">Misc</h1>

			<h2 className="text-xl font-semibold mt-8 mb-4">Projects</h2>
			<ul className="list-disc pl-5 space-y-2">
				<li>
					<Link
						href="https://onthepixel.net"
						className="text-emerald-500 hover:text-emerald-400"
					>
						OnThePixel.net
					</Link>{" "}
					- My Minecraft Server, June 2024 - Present
				</li>
			</ul>

			<h2 className="text-xl font-semibold mt-8 mb-4">Writeups</h2>
			<ul className="list-disc pl-5 space-y-2">
				<li>
					<Link href="#" className="text-emerald-500 hover:text-emerald-400">
						HackTheBox - Writeups
					</Link>{" "}
					- HackTheBox, May 2023 - Present (Coming Soon)
				</li>
			</ul>
			{/* <h2 className="text-xl font-semibold mt-8 mb-4">Pages</h2>
			<ul className="list-disc pl-5 space-y-2">
				<li>
					<Link
						href="/onthepixel"
						className="text-emerald-500 hover:text-emerald-400"
					>
						OnThePixel
					</Link>{" "}
					- My Minecraft Server
				</li>
			</ul> */}
		</main>
	);
}
