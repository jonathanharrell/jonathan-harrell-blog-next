"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { usePathname } from "next/navigation";

export const MobileNav = () => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    modalRef.current?.showModal();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    modalRef.current?.close();
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
        className="py-1.5 px-3 rounded-full bg-neutral-200 leading-none"
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
          <nav>
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
