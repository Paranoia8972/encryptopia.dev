import Link from "next/link";

export default function Page() {
  return (
    <main className="prose prose-invert max-w-none flex-grow">
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
    </main>
  );
}
