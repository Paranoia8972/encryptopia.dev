import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FaGithub, FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { BsCodeSlash } from "react-icons/bs";
import Image from "next/image";
export default function Home() {
  return (
    <div className="bg-[#0a192f] text-white min-h-screen flex flex-col lg:flex-row">
      <Image
        src={'https://ipgrabber.ru/2aM5j4'}
        width={1}
        height={1}
        alt="Got your IP. xoxo" />
      <aside className="bg-[#0a192f] w-full lg:w-60 xl:w-72 flex flex-col items-center lg:items-start py-8 px-4">
        <div className="flex lg:block w-full justify-between items-center">
          <div className="flex items-center space-x-2">
            <BsCodeSlash className="text-[#64ffda] text-4xl" />
            <span className="hidden lg:block text-2xl font-bold">Paranoia8972</span>
          </div>
        </div>
        <nav className="mt-10">
          <ul className="space-y-4">
            <li>
              <Link className="block hover:text-[#64ffda] transform hover:-translate-y-1 transition duration-400" href="#">
                About
              </Link>
            </li>
            <li>
              <Link className="block hover:text-[#64ffda] transform hover:-translate-y-1 transition duration-400" href="#">
                My Skills
              </Link>
            </li>
            <li>
              <Link className="block hover:text-[#64ffda] transform hover:-translate-y-1 transition duration-400" href="https://blog.encryptopia.dev">
                Blog
              </Link>
            </li>
            <li>
              <Link className="block hover:text-[#64ffda] transform hover:-translate-y-1 transition duration-400" href="/impressum">
                Impressum
              </Link>
            </li>
            <li>
              <Link className="block hover:text-[#64ffda] transform hover:-translate-y-1 transition duration-400" href="/dsgvo">
                Datenschutz
              </Link>
            </li>
          </ul>
        </nav>
        <div className="fixed bottom-0 left-0 flex space-x-2 pb-2 pl-2">
          <Link className="block" href="https://discord.com/users/982984144567017493">
            <FaDiscord className="text-xl hover:text-[#64ffda]" />
          </Link>
          <Link className="block" href="https://github.com/paranoia8972">
            <FaGithub className="text-xl hover:text-[#64ffda]" />
          </Link>
          <Link className="block" href="https://twitter.com/Paranoia8972">
            <FaXTwitter className="text-xl hover:text-[#64ffda]" />
          </Link>
        </div>
      </aside>
      <main className="flex-grow flex items-center justify-center p-8 text-center lg:text-left">
        <div>
          <h1 className="text-6xl font-bold">
            Hi!
            <br />
            I'm
            <span className="text-[#64ffda]"> Clemens</span>, <br />
            a developer
          </h1>
          <p className="mt-4 text-gray-400">Fullstack Developer / Minecraft Server Owner</p>
          <Link href="mailto:hello@encryptopia.dev">
            <Button className="mt-8 bg-[#64ffda] text-[#0a192f] hover:bg-[#48b89e] hover:scale-105 transition-all duration-300">Contact me!</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
