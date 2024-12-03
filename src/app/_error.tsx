"use client";

import { useEffect } from "react";

export default function ErrorComponent({
  error,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <p>Oops! Something went wrong... maybe try refreshing?</p>
    </div>
  );
}
