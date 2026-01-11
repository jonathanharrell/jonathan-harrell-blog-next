export const Footer = async () => {
  "use cache";
  const currentYear = new Date().getFullYear();

  return (
    <footer className="wrapper flex flex-col lg:flex-row items-center lg:items-start lg:justify-between gap-4 mt-6 py-6 text-center">
      <p className="text-center lg:text-left">
        Copyright ©{currentYear} Jonathan Harrell. Typeset in{" "}
        <a
          href="https://edwardtufte.github.io/et-book/"
          target="_blank"
          rel="noreferrer"
          className="underline hover:no-underline decoration-1 underline-offset-2"
        >
          ET Book
        </a>
        , with{` `}
        <a
          href="https://www.kickstarter.com/projects/mrcraigward/fe2o3-glyphs-a-conceptual-ornamental-type-system"
          target="_blank"
          rel="noreferrer"
          className="underline hover:no-underline decoration-1 underline-offset-2"
        >
          Fe<sub>2</sub>O<sub>3</sub> glyphs
        </a>
        <br />
        If an image or text lacks a citation, it is my own.
      </p>
      <section>
        <h2 id="social-label" className="sr-only">
          Social links
        </h2>
        <ul
          className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6"
          aria-labelledby="social-label"
        >
          <li>
            <a
              href="https://www.jonathanharrell.com/"
              target="_blank"
              className="underline hover:no-underline decoration-1 underline-offset-2"
            >
              Dev Blog
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/harrellofdurham/"
              target="_blank"
              rel="noreferrer"
              className="underline hover:no-underline decoration-1 underline-offset-2"
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              href="/rss"
              target="_blank"
              className="underline hover:no-underline decoration-1 underline-offset-2"
            >
              RSS
            </a>
          </li>
        </ul>
      </section>
    </footer>
  );
};
