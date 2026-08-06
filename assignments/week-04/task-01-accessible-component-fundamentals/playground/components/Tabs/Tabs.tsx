"use client";

import { useRef, useState } from "react";

const tabs = [
  {
    id: "tab-1",
    title: "React",
    content: "React is a JavaScript library for building user interfaces.",
  },
  {
    id: "tab-2",
    title: "Next.js",
    content: "Next.js is a React framework for production applications.",
  },
  {
    id: "tab-3",
    title: "TypeScript",
    content: "TypeScript adds static typing to JavaScript.",
  },
];

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    let newIndex = index;

    if (event.key === "ArrowRight") {
      newIndex = (index + 1) % tabs.length;
    }

    if (event.key === "ArrowLeft") {
      newIndex = (index - 1 + tabs.length) % tabs.length;
    }

    if (newIndex !== index) {
      setActiveTab(newIndex);
      tabRefs.current[newIndex]?.focus();
    }
  };

  return (
    <section className="mt-12 rounded-xl border bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">
        Accessible Tabs
      </h2>

      <div
        role="tablist"
        aria-label="Programming Tabs"
        className="flex gap-3 border-b pb-3"
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            role="tab"
            id={tab.id}
            aria-selected={activeTab === index}
            aria-controls={`${tab.id}-panel`}
            tabIndex={activeTab === index ? 0 : -1}
            onClick={() => setActiveTab(index)}
            onKeyDown={(event) =>
              handleKeyDown(event, index)
            }
            className={`rounded-lg px-4 py-2 transition ${
              activeTab === index
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`${tabs[activeTab].id}-panel`}
        aria-labelledby={tabs[activeTab].id}
        className="mt-6 rounded-lg bg-gray-50 p-5"
      >
        <h3 className="mb-2 text-xl font-semibold">
          {tabs[activeTab].title}
        </h3>

        <p className="text-gray-700">
          {tabs[activeTab].content}
        </p>
      </div>
    </section>
  );
};

export default Tabs;