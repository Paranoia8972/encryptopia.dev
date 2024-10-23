import Image from "next/image";
import { metaData } from "@/config";

export default function Page() {
  return (
    <div className="mt-8 flex min-h-screen justify-center lg:mt-32">
      <section className="w-full max-w-[640px] px-4">
        <Image
          src="/profile.avif"
          alt={`${metaData.username}'s profile`}
          className="mx-auto mb-10 mt-0 block rounded-full bg-gray-100 sm:float-right sm:mb-5 sm:ml-5 lg:mb-5 lg:mt-5"
          width={160}
          height={160}
          priority
          unoptimized
        />

        <h1 className="mb-8 text-2xl font-medium tracking-tight">
          My passion is building cool stuff.
        </h1>

        <div className="prose prose-neutral dark:prose-invert">
          <p>
            I&apos;m a 15 year old high school student in 10th grade. I love
            exploring and working with Servers (Minecraft, Linux), Web
            Development and Raspberry Pis projects.
          </p>
          <p>
            I enjoy self-hosting stuff, enhancing my ethical hacking skills, and
            contributing to open-source projects.
          </p>
        </div>
      </section>
    </div>
  );
}
