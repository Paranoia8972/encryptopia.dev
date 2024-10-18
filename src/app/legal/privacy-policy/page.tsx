"use client";
import { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Impressum() {
  const router = useRouter();

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        window.location.reload();
      }
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  return (
    <div className="prose mx-auto pb-12 dark:prose-invert">
      <button
        onClick={() => router.back()}
        className="flex items-center pt-12 hover:underline"
      >
        <FaArrowLeft className="my-auto mr-1 size-3" />
        <span>Back</span>
      </button>
      <h1>Privacy Policy</h1>
      <hr />
      <p>
        <strong>1. Analytics (Umami)</strong>
        <br />
        <br />
        We use Umami, a privacy-focused analytics service, to gather information
        about the usage of our website. Umami does not use cookies, nor does it
        collect personally identifiable information. The data collected by Umami
        is anonymized and includes information such as:
      </p>
      <ul>
        <li>Page views</li>
        <li>Referring websites</li>
        <li>Browser and device types</li>
        <li>
          Approximate geographic location (based on anonymized IP addresses)
        </li>
      </ul>
      <p>
        This data is used solely for the purpose of improving our website and
        content.
        <br />
        <br />
        <strong>2. Comments (Giscus)</strong>
        <br />
        Our website uses Giscus as a comment platform, which is based on GitHub
        Discussions. When you post a comment using Giscus, your GitHub profile
        information (e.g., username, profile picture) and the content of your
        comment will be publicly visible. By interacting with the Giscus comment
        system, you agree to GitHub's{" "}
        <Link
          href={
            "https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
          }
        >
          Privacy Policy
        </Link>
        .
        <br />
        <br />
        We do not have access to or control over the data that GitHub collects
        through Giscus. For more information on how GitHub handles your data,
        please refer to their privacy policy.
      </p>
    </div>
  );
}
