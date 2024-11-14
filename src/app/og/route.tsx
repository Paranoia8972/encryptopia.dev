import { ImageResponse } from "next/og";
import { metaData, socialLinks } from "@/config";

export function GET(request: Request) {
  const url = new URL(request.url);
  const title = url.searchParams.get("title") || metaData.title;

  return new ImageResponse(
    (
      <div tw="flex relative flex-col p-12 w-full h-full items-start text-white bg-slate-900">
        <div tw="flex items-center">
          <p tw="font-bold text-2xl"></p>
        </div>
        <div tw="flex flex-col flex-1 py-10">
          <div tw="flex text-xl uppercase font-bold tracking-tight font-normal">
            BLOG POST
          </div>
          <div tw="flex text-[80px] font-bold text-[50px]">{title}</div>
        </div>
        <div tw="flex items-center w-full justify-between">
          <div tw="flex text-xl">
            {metaData.baseUrl.replace(/https?:\/\//, "").replace(/\/$/, "")}
          </div>
          <div tw="flex items-center text-xl">
            <div tw="flex ml-2">
              {socialLinks.github.replace(/https?:\/\//, "").replace(/\/$/, "")}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
