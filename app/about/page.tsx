import Image from "next/image";
import glyph from "/public/assets/glyphs/glyph-2.svg";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Human in the Loop",
  description: "About Jonathan Harrell’s commonplace book",
  openGraph: {
    images: ["/assets/api/og.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org/",
  "@type": "WebPage",
  name: "About Human in the Loop",
  description: "About Jonathan Harrell’s commonplace book",
  author: {
    "@type": "Person",
    name: "Jonathan Harrell",
    url: "https://www.jonathan-harrell.com",
  },
};

const AboutPage = () => {
  return (
    <div className="wrapper py-8 sm:py-10 md:py-14">
      <div className="jh-prose mx-auto [&_p]:text-pretty">
        <div className="not-prose mb-4">
          <Image
            src={glyph.src}
            width={64}
            height={64}
            alt=""
            aria-hidden="true"
            className="w-16 h-16"
          />
        </div>
        <h1 className="mt-0">About this Book</h1>
        <p>
          I’m Jonathan, a{" "}
          <a href="https://www.jonathan-harrell.com/" target="_blank">
            software engineer
          </a>{" "}
          by trade, and a writer/
          <wbr />
          photographer/
          <wbr />
          designer in my free time. I’m using this small corner of the web as a
          digital{" "}
          <a
            href="https://en.wikipedia.org/wiki/Commonplace_book"
            target="_blank"
            rel="noreferrer"
          >
            commonplace book
          </a>
          . Distinct from a journal or diary, such books have been kept from
          antiquity as repositories for notes, proverbs, poems, and more. I
          intend this digital space to serve much the same function: a creative
          scrapbook where I collect things I find interesting or beautiful. This
          space is designed with an audience of one in mind: me. But if anything
          here catches anyone’s attention, if it leads someone to discover a new
          poet or author or artist, then I will be very pleased indeed.
        </p>
        <p>
          Why not social media? There is something fulfilling about owning one’s
          own turf and{" "}
          <a
            href="https://blog.ayjay.org/on-blogging/"
            target="_blank"
            rel="noreferrer"
          >
            tending one’s own garden
          </a>
          . In a world where a handful of companies control everything we do,
          own, and share online, it is a small act of resistance to maintain a
          personal website, to cultivate a blog over years. Perhaps some of you
          will join me in doing the same.
        </p>
        <p>
          The title{" "}
          <a
            href="https://en.wikipedia.org/wiki/Human-in-the-loop"
            target="_blank"
            rel="noreferrer"
            className="italic"
          >
            Human in the Loop
          </a>{" "}
          comes from a concept in artificial intelligence, where human
          involvement is integral in the decision-making or learning process of
          an AI system. Rather than a feed that is algorithmically curated, the
          inspirations collected here come primarily from being out in the
          world: library visits, trips to museums and movie theaters, travels
          abroad. Building a collection from the chaotic, the un&shy;predicted,
          the unforeseen, is infinitely more interesting to me than
          regurgitating the same content available cheaply on the nearest social
          media platform.
        </p>
        <p className="text-lg">– Jonathan Harrell</p>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
};

export default AboutPage;
