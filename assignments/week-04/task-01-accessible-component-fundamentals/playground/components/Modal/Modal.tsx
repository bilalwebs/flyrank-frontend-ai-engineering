"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Escape Key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  // Focus Trap
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const focusableElements =
      modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    firstElement.focus();

    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTab);

    return () => {
      document.removeEventListener("keydown", handleTab);
    };
  }, [isOpen]);

  // Return Focus
  useEffect(() => {
    if (!isOpen) {
      openButtonRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <section className="rounded-lg border p-6">
      <h2 className="text-2xl font-bold">Modal Component</h2>

      <p className="my-3">
        Status: {isOpen ? "Open" : "Closed"}
      </p>

      <button
        ref={openButtonRef}
        onClick={() => setIsOpen(true)}
        className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
      >
        Open Modal
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div
            ref={modalRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            className="relative w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close Modal"
              className="absolute right-4 top-4 rounded-md p-2 hover:bg-gray-100"
            >
              <X size={24} />
            </button>

            {/* Title */}
            <h3
              id="modal-title"
              className="text-3xl font-bold text-gray-900"
            >
              Welcome 👋
            </h3>

            {/* Description */}
            <p
              id="modal-description"
              className="mt-4 text-gray-600"
            >
              This is an accessible modal built from scratch using React,
              TypeScript, Tailwind CSS and WAI-ARIA practices.
            </p>

            {/* Footer */}
            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg border px-4 py-2 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Modal;