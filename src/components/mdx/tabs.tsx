"use client";
import React, { useState } from "react";
import { Badge } from "../ui/badge";

interface TabProps {
  title: string;
  children: React.ReactNode;
}

interface TabsProps {
  children: React.ReactElement<TabProps>[];
}

const Tab: React.FC<TabProps> = ({ children }) => {
  return <div>{children}</div>;
};

const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="mb-[25px] rounded-lg">
      <div className="flex items-center justify-between rounded-t bg-[#ececec] dark:bg-[#233045]">
        <div className="">
          {children.map((tab, index) => (
            <Badge
              key={index}
              onClick={() => setActiveTab(index)}
              className={`my-2 ml-2 cursor-pointer text-sm font-medium transition-colors ${
                activeTab === index
                  ? "bg-neutral-300 text-slate-950 hover:bg-neutral-300 dark:bg-[#2e3f5b] dark:text-slate-200"
                  : "bg-[#ececec] text-neutral-500 hover:bg-[#ececec] hover:text-neutral-700 dark:bg-[#233045] dark:text-slate-200 dark:hover:text-slate-200/70"
              }`}
            >
              {tab.props.title}
            </Badge>
          ))}
        </div>
      </div>
      <div className="rounded-b bg-[#f7f7f7] p-4 dark:bg-[#1e293b]">
        {children[activeTab]}
      </div>
    </div>
  );
};

export { Tabs, Tab };
