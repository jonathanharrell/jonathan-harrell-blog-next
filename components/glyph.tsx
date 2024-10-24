"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import Glyph1 from "/public/assets/glyphs/glyph-1.svg";
import Glyph2 from "/public/assets/glyphs/glyph-2.svg";
import Glyph3 from "/public/assets/glyphs/glyph-3.svg";
import Glyph4 from "/public/assets/glyphs/glyph-4.svg";
import Glyph5 from "/public/assets/glyphs/glyph-5.svg";
import Glyph6 from "/public/assets/glyphs/glyph-6.svg";
import Glyph7 from "/public/assets/glyphs/glyph-7.svg";

const glyphs = [Glyph1, Glyph2, Glyph3, Glyph4, Glyph5, Glyph6, Glyph7];
const defaultIndex = 3;

export const Glyph = () => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const [isHovering, setIsHovering] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isHovering) {
      intervalRef.current = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * glyphs.length);
        setActiveIndex(randomIndex);
      }, 300);
    } else {
      clearInterval(intervalRef.current);
      setActiveIndex(defaultIndex);
    }
  }, [isHovering]);

  return (
    <span
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      {glyphs.map((glyph, index) => (
        <Image
          key={index}
          src={glyph.src}
          alt=""
          width={32}
          height={32}
          className={classNames("w-8 h-8", {
            "not-sr-only": index === activeIndex,
            "sr-only": index !== activeIndex,
          })}
        />
      ))}
    </span>
  );
};
