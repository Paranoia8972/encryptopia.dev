"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { getMetadata } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

interface EmbedProps {
  url: string;
}

interface Metadata {
  title: string;
  description: string;
  image: string;
  domain: string;
}

export default function Embed({ url }: EmbedProps) {
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const data = await getMetadata(url);
        if (data) {
          setMetadata(data);
        } else {
          setError("Failed to fetch metadata");
        }
      } catch (err) {
        setError("Error fetching metadata");
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, [url]);

  if (loading) {
    return (
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col overflow-hidden rounded-lg border no-underline shadow-sm transition-shadow hover:shadow-md sm:flex-row"
      >
        <div className="flex flex-col justify-between px-4 pb-4 group-hover:bg-gray-800/10 sm:w-2/3">
          <div>
            <h3 className="line-clamp-2 text-xl font-semibold" id="toc-ignore">
              Loading...
            </h3>
            <p className="mt-2 line-clamp-2 text-sm">
              The embed is still loading
            </p>
          </div>
          <div className="mt-4 flex items-center text-sm group-hover:underline">
            <ExternalLink className="mr-1 h-4 w-4" />
            encryptopia.dev
          </div>
        </div>
        <div className="relative h-48 sm:h-auto sm:w-1/3">
          <Image
            src={metadata?.image || "/opengraph-image.png"}
            alt={metadata?.title || "Loading..."}
            fill
            className="object-cover group-hover:brightness-110"
            sizes="(max-width: 640px) 100vw, 33vw"
          />
        </div>
      </Link>
    );
  }

  if (error) {
    return <Card className="my-4 p-4 text-red-500">{error}</Card>;
  }

  if (!metadata) {
    return null;
  }

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-lg border no-underline shadow-sm transition-shadow hover:shadow-md sm:flex-row"
    >
      <div className="flex flex-col justify-between px-4 pb-4 group-hover:bg-gray-800/10 sm:w-2/3">
        <div>
          <h3 className="line-clamp-2 text-xl font-semibold" id="toc-ignore">
            {metadata.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm">{metadata.description}</p>
        </div>
        <div className="mt-4 flex items-center text-sm group-hover:underline">
          <ExternalLink className="mr-1 h-4 w-4" />
          {metadata.domain}
        </div>
      </div>
      <div className="relative h-48 sm:h-auto sm:w-1/3">
        <Image
          src={metadata.image}
          alt={metadata.title}
          fill
          className="object-cover group-hover:brightness-110"
          sizes="(max-width: 640px) 100vw, 33vw"
        />
      </div>
    </Link>
  );
}
