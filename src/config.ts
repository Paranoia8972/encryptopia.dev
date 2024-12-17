import {
  IconBrandDiscord,
  IconBrandReddit,
  IconRss,
  IconBrandX,
  IconWorld,
  IconBrandGithub,
  IconCube,
  IconMail,
} from "@tabler/icons-react";

export const metaData = {
  baseUrl: "https://clemensh.me/",
  // baseUrl: "http://localhost:3000/",
  title: "Clemens Hoffmann",
  name: "Clemens Hoffmann",
  ogImage: "/opengraph-image.png",
  description: "My knowledge, noted down.",
  username: "Paranoia8972",
  avatar: "/profile.avif",
  about: "I'm a student and developer from Germany.",
};

export const socialLinks = {
  twitter: "https://x.com/paranoia8972",
  github: "https://github.com/Paranoia8972",
  email: "mailto:hello@encryptopia.dev",
};

export const umami = {
  websiteId: "405b74dd-141a-439c-9bdd-3392f560f7dd", // umami website id
  src: "https://umami-seven-topaz.vercel.app/script.js", // umami src
};

export const links = [
  {
    title: "Website",
    url: "/",
    icon: IconWorld,
  },
  {
    title: "GitHub",
    url: "https://github.com/Paranoia8972",
    icon: IconBrandGithub,
  },
  {
    title: "Mail",
    url: "mailto:hello@encryptopia.dev",
    icon: IconMail,
  },
  {
    title: "OnThePixel",
    url: "https://onthepixel.net",
    icon: IconCube,
  },
  {
    title: "Twitter	",
    url: "https://twitter.com/paranoia8972",
    icon: IconBrandX,
  },
  {
    title: "Blog",
    url: "https://encryptopia.dev/blog",
    icon: IconRss,
  },
  {
    title: "Discord",
    url: "https://discord.com/users/982984144567017493",
    icon: IconBrandDiscord,
  },
  {
    title: "Reddit",
    url: "https://reddit.com/user/Paranoia8972/",
    icon: IconBrandReddit,
  },
];
