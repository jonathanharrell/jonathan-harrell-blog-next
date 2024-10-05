const AboutPage = () => {
  return (
    <div className="wrapper py-4 md:py-8 lg:py-12">
      <div className="prose prose-lg md:prose-xl mx-auto">
        <h1>About this Book</h1>
        <p>
          I’m Jonathan, a{" "}
          <a href="https://www.jonathan-harrell.com/" target="_blank">
            software engineer
          </a>{" "}
          by trade, and a writer, photographer, and designer in my free time.
          I’m using this small corner of the web as a digital{" "}
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
          scrapbook where I can collect things I find interesting, useful, or
          beautiful. This space is designed with an audience of one in mind: me.
          But if anything here catches anyone’s attention, if it leads someone
          to discover a new poet or author or artist, then I will be very
          pleased indeed.
        </p>
        <p>
          Why not a social media platform? There is something fulfilling about
          owning one’s own turf and{" "}
          <a
            href="https://blog.ayjay.org/on-blogging/"
            target="_blank"
            rel="noreferrer"
          >
            tending one’s own garden
          </a>
          . In a world where a handful of companies control everything we do,
          own, and share online, it is a small act of resistance to maintain a
          personal website, in cultivating a blog over years, free from the
          whims of capricious tech moguls. Perhaps some of you will join me in
          doing the same.
        </p>
        <p className="text-lg">▪︎ Jonathan Harrell</p>
      </div>
    </div>
  );
};

export default AboutPage;
