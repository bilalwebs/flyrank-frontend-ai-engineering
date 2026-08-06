"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const Disclosure = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="mt-10 rounded-xl border bg-white p-6 shadow-md">
      <h2 className="mb-6 text-2xl font-bold">
        Disclosure Component
      </h2>

      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="disclosure-content"
        className="flex w-full items-center justify-between rounded-lg bg-blue-600 px-5 py-3 text-left font-medium text-white transition hover:bg-blue-700"
      >
        <span>What is Accessibility?</span>

        {isOpen ? (
          <ChevronUp size={20} />
        ) : (
          <ChevronDown size={20} />
        )}
      </button>

      {isOpen && (
        <div
          id="disclosure-content"
          className="mt-4 rounded-lg border bg-gray-50 p-4 text-gray-700"
        >
          <p>
            Accessibility means building websites and applications that
            everyone can use, including people who rely on keyboards,
            screen readers, or other assistive technologies.
          </p>
        </div>
      )}
    </section>
  );
};

export default Disclosure;