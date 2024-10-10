"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useTransitionRouter } from "next-view-transitions";
import classNames from "classnames";
import { Photo } from "@/components/photo";

interface PhotoModalProps {
  slug: string;
  width?: number;
  height?: number;
}

export const PhotoModal = ({ slug, width, height }: PhotoModalProps) => {
  const router = useTransitionRouter();

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

  const goBack = () => {
    if (typeof document.startViewTransition !== "undefined") {
      document.startViewTransition(() => {
        router.back();
      });
    } else {
      router.back();
    }
  };

  useEffect(() => {
    showModal();
  }, []);

  return (
    <dialog
      className={classNames(
        "bg-transparent backdrop:bg-neutral-900 backdrop:bg-opacity-90",
        isModalOpen ? "flex flex-col" : "",
      )}
      style={{ viewTransitionName: "modal" }}
      ref={modalRef}
    >
      <button autoFocus onClick={goBack} className="text-neutral-100">
        Close<span className="sr-only"> Photo Dialog</span>
      </button>
      <div className="flex flex-col flex-1 min-h-0">
        <Photo
          slug={slug}
          width={width}
          height={height}
          className="flex-1 min-h-0"
        />
      </div>
    </dialog>
  );
};
