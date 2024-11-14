import { highlight } from "code-syntactic-sugar";

export default function Code({
  children,
  ...props
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) {
  const codeHTML = highlight(children?.toString() || "");

  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}
