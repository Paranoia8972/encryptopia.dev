"use client";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

interface DisclosureProps {
  title: string;
  children: React.ReactNode;
}

export const Disclosure: React.FC<DisclosureProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-12">
      <button
        className="my-2 flex w-full items-center rounded-md p-2 text-left transition hover:bg-gray-100 dark:hover:bg-white/5"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ChevronRight
          className={`transition-transform ${isOpen ? "rotate-90" : ""} mr-2`}
        />
        <span className="font-bold">{title}</span>
      </button>
      {isOpen && <div className="mt-2">{children}</div>}
    </div>
  );
};
