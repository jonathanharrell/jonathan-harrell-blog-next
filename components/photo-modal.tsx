"use client";

import { KeyboardEventHandler, useEffect, useRef, useState } from "react";
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
  const [isLoaded, setIsLoaded] = useState(false);

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

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        goBack();
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
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
      <div className="flex flex-col flex-1">
        {!isLoaded && <span className="text-neutral-100">Loading...</span>}
        <Photo
          slug={slug}
          width={width}
          height={height}
          className={classNames("flex-1 min-h-0 max-w-[900px] max-h-[900px]", {
            block: isLoaded,
          })}
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    </dialog>
  );
};
