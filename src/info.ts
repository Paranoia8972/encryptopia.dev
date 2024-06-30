import {
	IconBrandGithub,
	IconWorld,
	IconBrandX,
	IconNews,
	IconBrandDiscord,
	IconBrandReddit,
	IconBox,
	IconMail
} from '@tabler/icons-react';
import { Link } from './components/link-item';
import { Metadata } from 'next';

export const info = {
	name: 'Clemens',
	avatar: '/avatar.png',
	description: "Hey! I'm Clemens, also known as Paranoia8972."
};

export const pageMetadata: Metadata = {
	title: "Paranoia's Links",
	description: "Paranoia's profile of links."
};

export const links = [
	{
		title: 'Website',
		url: 'https://ecty.dev',
		icon: IconWorld
	},
	{
		title: 'GitHub',
		url: 'https://github.com/Paranoia8972',
		icon: IconBrandGithub
	},
	{
		title: 'Mail',
		url: 'mailto:hello@encryptopia.dev',
		icon: IconMail
	},
	{
		title: 'OnThePixel',
		url: 'https://onthepixel.net',
		icon: IconBox
	},
	{
		title: 'Twitter	',
		url: 'https://twitter.com/Paranoia8972?mx=1',
		icon: IconBrandX
	},
	{
		title: 'Blog',
		url: 'https://blog.encryptopia.dev',
		icon: IconNews
	},
	{
		title: 'Discord',
		url: 'https://discord.com/users/982984144567017493',
		icon: IconBrandDiscord
	},
	{
		title: 'Reddit',
		url: 'https://reddit.com/user/Paranoia8972/',
		icon: IconBrandReddit
	}
] as Link[];
