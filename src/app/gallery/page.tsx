import React from "react";
import type { Metadata } from "next";
import { ImageGrid } from "@/components/image-grid";

export const metadata: Metadata = {
  title: "Gallery",
  description: "My Photos",
};

export default function Photos() {
  return (
    <div className="mt-16 flex min-h-screen items-center justify-center">
      <section className="w-full max-w-[640px] px-4">
        <h1 className="text-2xl font-medium tracking-tight">Photos</h1>
        <ImageGrid
          columns={3}
          images={[
            {
              src: "/photos/photo1.jpg",
              alt: "Roman columns",
              href: "https://unsplash.com/photos/people-walking-near-building-during-daytime-dFLBDQQeffU?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
            },
            {
              src: "/photos/photo2.jpg",
              alt: "Big Ben",
              href: "https://unsplash.com/photos/big-ben-london-MdJq0zFUwrw?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
            },
            {
              src: "/photos/photo3.jpg",
              alt: "Sacré-Cœur Basilica",
              href: "https://unsplash.com/photos/a-view-of-the-inside-of-a-building-through-a-circular-window-Tp-3hrx88J4",
            },
            {
              src: "/photos/photo4.jpg",
              alt: "Eiffel Tower",
              href: "https://unsplash.com/photos/the-eiffel-tower-towering-over-the-city-of-paris-OgPuPvPsHLM?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
            },
            {
              src: "/photos/photo5.jpg",
              alt: "Taj Mahal",
              href: "https://unsplash.com/photos/taj-mahal-india-IPlPkWPJ2fo",
            },
            {
              src: "/photos/photo6.jpg",
              alt: "Colosseum",
              href: "https://unsplash.com/photos/brown-concrete-building-under-blue-sky-during-daytime-3cyBR1rIJmA?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
            },
          ]}
        />

        <ImageGrid
          columns={2}
          images={[
            { src: "/photos/photo1.jpg", alt: "Roman columns" },
            { src: "/photos/photo2.jpg", alt: "Big Ben" },
            { src: "/photos/photo3.jpg", alt: "Sacré-Cœur Basilica" },
            { src: "/photos/photo4.jpg", alt: "Eiffel Tower" },
          ]}
        />

        <ImageGrid
          columns={4}
          images={[
            { src: "/photos/photo1.jpg", alt: "Roman columns" },
            { src: "/photos/photo2.jpg", alt: "Big Ben" },
            { src: "/photos/photo3.jpg", alt: "Sacré-Cœur Basilica" },
            { src: "/photos/photo4.jpg", alt: "Eiffel Tower" },
            { src: "/photos/photo5.jpg", alt: "Taj Mahal" },
            { src: "/photos/photo6.jpg", alt: "Colosseum" },
          ]}
        />
      </section>
    </div>
  );
}
