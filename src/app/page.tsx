import Image from "next/image";
import { socialLinks } from "@/config";

export default function Page() {
  return (
    <section>
      <a href={socialLinks.twitter} target="_blank">
        <Image
          src="/profile.png"
          alt="Profile photo"
          className="rounded-full bg-gray-100 block lg:mt-5 mt-0 lg:mb-5 mb-10 mx-auto sm:float-right sm:ml-5 sm:mb-5"
          unoptimized
          width={160}
          height={160}
          priority
        />
      </a>

      <h1 className="mb-8 text-2xl font-medium tracking-tight">
        My passion is building cool stuff.
      </h1>

      <div className="prose prose-neutral dark:prose-invert">
        <p>
          I&apos;m a 15 year old high school student in 10th grade. I love
          exploring and working with Servers (Minecraft, Linux), Web Development
          and Raspberry Pis projects.
        </p>
        <p>
          I enjoy self-hosting stuff, enhancing my ethical hacking skills, and
          contributing to open-source projects.
        </p>
      </div>
    </section>
  );
}
