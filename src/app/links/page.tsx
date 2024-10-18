import { LinkItem } from "@/components/link-item";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { metaData, links } from "@/config";

export default function Links() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <Avatar className="h-[96px] w-[96px]">
        <AvatarImage
          src={metaData.avatar}
          alt={`${metaData.name}'s avatar`}
          height={96}
          width={96}
        />
        <AvatarFallback>Loading...</AvatarFallback>
      </Avatar>

      <div className="text-center">
        <h1 className="text-xl font-bold">{metaData.name}</h1>
        <p className="text-base">{metaData.about}</p>
      </div>

      <div className="flex flex-col gap-2" id="links">
        {links.map((link) => (
          <LinkItem key={link.title} link={link} />
        ))}
      </div>
    </main>
  );
}
