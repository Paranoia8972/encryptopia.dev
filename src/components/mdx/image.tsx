import { ImageProps } from "next/image";
import Image from "next/image";

export default function RoundedImage(props: ImageProps) {
  const { alt, ...rest } = props;
  return <Image alt={alt} className="rounded-lg" {...rest} />;
}
