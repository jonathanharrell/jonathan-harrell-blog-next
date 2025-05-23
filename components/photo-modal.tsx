"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Link, useTransitionRouter } from "next-view-transitions";
import classNames from "classnames";
import { X, ChevronLeft, ChevronRight } from "react-feather";
import { Photo } from "@/components/photo";
import { Spinner } from "@/components/spinner";
import { PhotoMetadata } from "@/lib/get-photo-metadata";

interface PhotoModalProps {
  slug: string;
  width?: number;
  height?: number;
  metadata?: PhotoMetadata;
  previousSlug?: string;
  nextSlug?: string;
}

export const PhotoModal = ({
  slug,
  width,
  height,
  metadata,
  previousSlug,
  nextSlug,
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

  const goBack = useCallback(() => {
    if (typeof document.startViewTransition !== "undefined") {
      document.startViewTransition(() => {
        router.replace(`/photos?from=${slug}`, {
          scroll: false,
        });
        router.refresh();
      });
    } else {
      router.replace(`/photos?from=${slug}`, {
        scroll: false,
      });
      router.refresh();
    }
  }, [router]);

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
  }, [goBack]);

  return (
    <dialog
      className={classNames(
        "flex flex-col items-center justify-center !max-w-none !max-h-none bg-transparent backdrop:bg-neutral-900 backdrop:bg-opacity-95",
      )}
      ref={modalRef}
    >
      <div className="flex flex-col">
        <button
          autoFocus
          onClick={goBack}
          className="fixed top-0 right-0 p-3 text-neutral-400 hover:text-neutral-100 transition-colors duration-200 ease-in-out focus-visible:ring-0"
        >
          <X />
          <span className="sr-only">Close photo dialog</span>
        </button>
        {!isLoaded && (
          <div className="flex flex-col items-center justify-center absolute inset-0 text-neutral-100">
            <Spinner />
          </div>
        )}
        <div className="pt-4 md:pt-0">
          <Photo
            slug={slug}
            width={width}
            height={height}
            metadata={metadata}
            className={classNames(
              "block w-auto sm:max-w-[min(calc(100dvw-6rem),calc(1300px-6rem))] h-auto max-h-[min(calc(100dvh-6rem),calc(1300px-6rem))]",
            )}
            captionClassName="wrapper text-sm text-center text-neutral-400"
            isLoaded={isLoaded}
            onLoad={() => setIsLoaded(true)}
          />
        </div>
        {previousSlug && (
          <div className="fixed top-1/2 left-0 sm:left-2 z-10 -translate-1/2 text-white">
            <Link
              href={`/photo/${previousSlug}`}
              scroll={false}
              className="block p-1 lg:p-2 text-neutral-100 sm:text-neutral-400 hover:text-neutral-100 transition-colors duration-200 ease-in-out"
            >
              <ChevronLeft size={36} />
              <span className="sr-only">Previous image</span>
            </Link>
          </div>
        )}
        {nextSlug && (
          <div className="fixed top-1/2 right-0 sm:right-2 z-10 -translate-1/2 text-white">
            <Link
              href={`/photo/${nextSlug}`}
              scroll={false}
              className="block p-1 lg:p-2 text-neutral-100 sm:text-neutral-400 hover:text-neutral-100 transition-colors duration-200 ease-in-out"
            >
              <ChevronRight size={36} />
              <span className="sr-only">Next image</span>
            </Link>
          </div>
        )}
      </div>
    </dialog>
  );
};
