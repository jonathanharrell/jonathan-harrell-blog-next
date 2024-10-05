"use client";

import { useRef, useState } from "react";
import classNames from "classnames";
import { flushSync } from "react-dom";
import Link from "next/link";

interface PhotoProps {
  slug: string;
}

export const Photo = ({ slug }: PhotoProps) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    if (document.startViewTransition) {
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
    modalRef.current?.close();
  };

  const handleDialogClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={showModal}>
        <img
          src={`/assets/photos/${slug}`}
          alt=""
          className="aspect-square object-cover"
          loading="lazy"
        />
      </button>
      <dialog
        onClose={handleDialogClose}
        className={classNames(
          "bg-transparent backdrop:bg-gray-950 backdrop:bg-opacity-90",
          isModalOpen ? "flex flex-col" : "",
        )}
        ref={modalRef}
      >
        <button autoFocus onClick={closeModal}>
          Close
        </button>
        <div className="flex flex-col flex-1 min-h-0">
          <img
            src={`/assets/photos/${slug}`}
            alt=""
            className="flex-1 min-h-0 object-contain"
            loading="lazy"
          />
        </div>
      </dialog>
    </>
  );
};
