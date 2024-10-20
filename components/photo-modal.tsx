"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useTransitionRouter } from "next-view-transitions";
import classNames from "classnames";
import { X } from "react-feather";
import { Photo } from "@/components/photo";
import { Spinner } from "@/components/spinner";

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
        isModalOpen ? "flex flex-col w-dvw h-dvh" : "",
      )}
      style={{ viewTransitionName: "modal" }}
      ref={modalRef}
    >
      <button
        autoFocus
        onClick={goBack}
        className="absolute top-0 right-0 p-3 text-neutral-100 focus-visible:ring-0"
      >
        <X />
        <span className="sr-only">Close photo dialog</span>
      </button>
      <div className="flex flex-col items-center justify-center flex-1 w-full h-full">
        {!isLoaded && (
          <span className="flex flex-col items-center justify-center absolute inset-0 z-10 w-full h-full text-neutral-100">
            <Spinner />
          </span>
        )}
        <Photo
          slug={slug}
          width={width}
          height={height}
          className={classNames("w-full h-full max-w-[900px] max-h-[900px]", {
            block: isLoaded,
          })}
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    </dialog>
  );
};
