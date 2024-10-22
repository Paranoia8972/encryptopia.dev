import { highlight } from "sugar-high";

export default function Code({
  children,
  ...props
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) {
  const codeHTML = highlight(children?.toString() || "");

  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}
