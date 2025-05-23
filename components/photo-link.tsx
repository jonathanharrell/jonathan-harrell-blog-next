"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Link } from "next-view-transitions";
import { Photo } from "@/components/photo";

interface PhotoProps {
  slug: string;
}

export const PhotoLink = ({ slug }: PhotoProps) => {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  const wrapperRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  useEffect(() => {
    if (from === slug) {
      wrapperRef.current?.querySelector("a")?.focus();
      router.replace("photos", { scroll: false });
    }
  }, [from, router, slug]);

  return (
    <div ref={wrapperRef}>
      <Link href={`/photo/${slug}`} scroll={false} aria-label="Enlarge photo">
        <Photo
          slug={slug}
          width={390}
          height={390}
          quality={40}
          className="w-full h-full max-w-[390px] max-h-[390px] aspect-square object-cover"
        />
      </Link>
    </div>
  );
};
