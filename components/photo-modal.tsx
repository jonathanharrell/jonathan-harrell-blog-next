"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useTransitionRouter } from "next-view-transitions";
import classNames from "classnames";
import { X } from "react-feather";
import { Photo } from "@/components/photo";
import { Spinner } from "@/components/spinner";
import { PhotoMetadata } from "@/lib/get-photo-metadata";

interface PhotoModalProps {
  slug: string;
  width?: number;
  height?: number;
  metadata?: PhotoMetadata;
}

export const PhotoModal = ({
  slug,
  width,
  height,
  metadata,
}: PhotoModalProps) => {
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

    const handleClick = (event: MouseEvent) => {
      if (modalRef.current === event.target) {
        goBack();
      }
    };

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        goBack();
      }
    };

    document.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return (
    <dialog
      className={classNames(
        "flex flex-col items-center justify-center !max-w-none !max-h-none bg-transparent backdrop:bg-neutral-900 backdrop:bg-opacity-90",
      )}
      style={{ viewTransitionName: "modal" }}
      ref={modalRef}
    >
      <button
        autoFocus
        onClick={goBack}
        className="fixed top-0 right-0 p-3 text-neutral-100 focus-visible:ring-0"
      >
        <X />
        <span className="sr-only">Close photo dialog</span>
      </button>
      {!isLoaded && (
        <span className="flex flex-col items-center justify-center absolute inset-0 z-10 w-full h-full text-neutral-100">
          <Spinner />
        </span>
      )}
      <Photo
        slug={slug}
        width={width}
        height={height}
        metadata={metadata}
        className={classNames(
          "block h-[min(calc(100dvh-4rem),1200px)] max-w-[min(calc(100dvw-4rem),1200px)]",
        )}
        onLoad={() => setIsLoaded(true)}
      />
    </dialog>
  );
};
