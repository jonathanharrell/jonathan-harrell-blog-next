"use client";

import { Link } from "next-view-transitions";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { flushSync } from "react-dom";

export const MobileNav = () => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    if (typeof document.startViewTransition !== "undefined") {
      document.startViewTransition(() => {
        modalRef.current?.showModal();

        flushSync(() => {
          setIsModalOpen(true);
        });
      });
    } else {
      modalRef.current?.showModal();
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    if (typeof document.startViewTransition !== "undefined") {
      document.startViewTransition(() => {
        modalRef.current?.close();
      });
    } else {
      modalRef.current?.close();
    }
  };

  const handleDialogClose = () => {
    setIsModalOpen(false);
  };

  const pathname = usePathname();

  useEffect(() => {
    closeModal();
  }, [pathname]);

  return (
    <div className="lg:hidden">
      <button
        className="py-1.5 px-3 rounded-full border border-neutral-200 hover:border-neutral-400 leading-none transition-colors duration-200 ease-in-out"
        onClick={showModal}
      >
        menu
      </button>
      <dialog
        onClose={handleDialogClose}
        className="w-screen max-w-[100vw] h-screen max-h-[100vh] m-0 p-6 bg-neutral-100"
        ref={modalRef}
      >
        <div className="flex flex-col h-full">
          <button autoFocus onClick={closeModal}>
            Close
          </button>
          <nav aria-labelledby="mobile-navigation-label">
            <h2
              id="mobile-navigation-label"
              className="sr-only"
              aria-hidden="true"
            >
              Site navigation
            </h2>
            <ul className="flex flex-col items-center gap-8 text-xl">
              <li>
                <Link href="/blog" onClick={closeModal}>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/photos" onClick={closeModal}>
                  Photos
                </Link>
              </li>
              <li>
                <Link href="/archive" onClick={closeModal}>
                  Archive
                </Link>
              </li>
              <li>
                <Link href="/about" onClick={closeModal}>
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </dialog>
    </div>
  );
};
