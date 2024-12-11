import Link from "next/link";

export default function Impressum() {
  return (
    <div className="prose mx-auto pb-12 dark:prose-invert">
      <h2 className="text-lg font-medium text-gray-100">Privacy Policy</h2>
      <hr />
      <h2 className="mb-4 mt-8 text-xl font-semibold">1. Analytics</h2>
      <p>
        We use our own analytics service to gather information about the usage
        of our website. The data collected by our analytics service includes
        information such as:
      </p>
      <ul>
        <li>Page views</li>
        <li>Your Country (based on anonymized IP addresses by Vercel)</li>
      </ul>
      <p>
        This data is used solely for the purpose of improving our website and
        content. We do not collect personally identifiable information or share
        this data with third parties. By using our website, you agree to the use
        of the collection of this data.
      </p>
      {/* <p>
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
      </p> */}
    </div>
  );
}
