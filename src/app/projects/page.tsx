import React from "react";
import type { Metadata } from "next";
import { projects } from "./project-data";

export const metadata: Metadata = {
  title: "Projects",
  description: "My Projects",
};

export default function Projects() {
  return (
    <div className="mt-16 flex min-h-screen justify-center">
      <section className="w-full max-w-[640px] px-4">
        <h1 className="mb-8 text-2xl font-medium tracking-tight">Projects</h1>
        <div className="space-y-6">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block transition-opacity duration-200 hover:opacity-80"
            >
              <div className="flex flex-col">
                <div className="flex w-full items-baseline justify-between">
                  <span className="font-medium tracking-tight text-black dark:text-white">
                    {project.title}
                  </span>
                  <span className="text-sm tabular-nums text-neutral-600 dark:text-neutral-400">
                    {project.year}
                  </span>
                </div>
                <p className="prose prose-neutral pt-3 dark:prose-invert">
                  {project.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
