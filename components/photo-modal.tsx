"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useCallback, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { useRouter } from "next/navigation";
import classNames from "classnames";
import { X, ChevronLeft, ChevronRight } from "react-feather";
import { Photo } from "@/components/photo";
import { Spinner } from "@/components/spinner";
import { PhotoMetadata } from "@/types";

interface PhotoModalProps {
  slug: string;
  width?: number;
  height?: number;
  metadata?: PhotoMetadata;
  previousSlug?: string;
  nextSlug?: string;
}

function withViewTransition(fn: () => void) {
  if (
    typeof document !== "undefined" &&
    typeof document.startViewTransition !== "undefined"
  ) {
    document.startViewTransition(() => fn());
  } else {
    fn();
  }
}

export const PhotoModal = ({
  slug,
  width,
  height,
  metadata,
  previousSlug,
  nextSlug,
}: PhotoModalProps) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const goBack = useCallback(() => {
    withViewTransition(() => {
      router.replace(`/photos?from=${slug}`, { scroll: false });
      setIsOpen(false);
    });
  }, [router, slug]);

  const goToPrevious = useCallback(() => {
    if (!previousSlug) return;

    withViewTransition(() => {
      router.push(`/photo/${previousSlug}`, { scroll: false });
      setIsOpen(false);
    });
  }, [router, previousSlug]);

  const goToNext = useCallback(() => {
    if (!nextSlug) return;

    withViewTransition(() => {
      router.push(`/photo/${nextSlug}`, { scroll: false });
      setIsOpen(false);
    });
  }, [router, nextSlug]);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <>
      <Dialog.Root
        open={isOpen}
        onOpenChange={(nextOpen) => {
          // Overlay click or programmatic close
          if (!nextOpen) {
            goBack();
          }
        }}
      >
        <Dialog.Portal>
          <Dialog.Content
            className={classNames(
              "fixed inset-0 z-50 flex items-center justify-center outline-none",
              {
                "min-w-6 min-h-6": !isLoaded,
              },
            )}
          >
            <Dialog.Title className="sr-only">Photo viewer</Dialog.Title>
            <Dialog.Description className="sr-only">
              Full-size photo preview. Use the previous and next buttons to
              browse photos, or press Escape to close.
            </Dialog.Description>
            <div className="flex flex-col">
              <Dialog.Close asChild>
                <button
                  autoFocus
                  onClick={(e) => {
                    e.preventDefault();
                    goBack();
                  }}
                  className="fixed top-0 right-0 p-3 text-neutral-400 hover:text-neutral-100 transition-colors duration-200 ease-in-out focus-visible:ring-0"
                >
                  <X />
                  <span className="sr-only">Close photo dialog</span>
                </button>
              </Dialog.Close>
              {!isLoaded && (
                <div
                  className="flex flex-col items-center justify-center absolute inset-0 text-neutral-100"
                  style={{ viewTransitionName: "none" }}
                >
                  <Spinner />
                </div>
              )}
              <div className="pt-4 md:pt-0">
                <Photo
                  slug={slug}
                  width={width}
                  height={height}
                  metadata={metadata}
                  className="block w-auto sm:max-w-[min(calc(100dvw-6rem),calc(1300px-6rem))] h-auto max-h-[min(calc(100dvh-6rem),calc(1300px-6rem))]"
                  captionClassName="wrapper text-sm text-center text-neutral-400"
                  isLoaded={isLoaded}
                  onLoad={() => setIsLoaded(true)}
                />
                {previousSlug && (
                  <div className="fixed top-1/2 left-0 sm:left-2 z-10 -mt-8 md:mt-0 -translate-y-1/2 text-white">
                    <button
                      onClick={goToPrevious}
                      className="block p-1 lg:p-2 text-neutral-100 sm:text-neutral-400 hover:text-neutral-100 transition-colors duration-200 ease-in-out"
                    >
                      <ChevronLeft size={36} />
                      <span className="sr-only">Previous image</span>
                    </button>
                  </div>
                )}
                {nextSlug && (
                  <div className="fixed top-1/2 right-0 sm:right-2 z-10 -mt-8 md:mt-0 -translate-y-1/2 text-white">
                    <button
                      onClick={goToNext}
                      className="block p-1 lg:p-2 text-neutral-100 sm:text-neutral-400 hover:text-neutral-100 transition-colors duration-200 ease-in-out"
                    >
                      <ChevronRight size={36} />
                      <span className="sr-only">Next image</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};
