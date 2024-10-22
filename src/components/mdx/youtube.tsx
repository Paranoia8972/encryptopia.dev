"use client";
import YT from "react-youtube";

interface YouTubeComponentProps {
  videoId: string;
}

export function YouTubeComponent(props: YouTubeComponentProps) {
  return (
    <div className="relative my-6 h-0 w-full pb-[56.25%]">
      <YT
        opts={{
          height: "100%",
          width: "100%",
          playerVars: {
            autoplay: 0,
            rel: 0,
            modestbranding: 1,
          },
        }}
        {...props}
        className="absolute left-0 top-0 h-full w-full"
      />
    </div>
  );
}
