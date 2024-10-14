export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="wrapper mt-6 py-6 text-center sm:text-left">
      <p>Copyright ©{currentYear} Jonathan Harrell</p>
      <p>
        Typeset in{" "}
        <a
          href="https://edwardtufte.github.io/et-book/"
          target="_blank"
          rel="noreferrer"
          className="underline hover:no-underline"
        >
          ET Book
        </a>
        , with{` `}
        <a
          href="https://www.kickstarter.com/projects/mrcraigward/fe2o3-glyphs-a-conceptual-ornamental-type-system"
          target="_blank"
          rel="noreferrer"
          className="underline hover:no-underline"
        >
          Fe<sub>2</sub>O<sub>3</sub> glyphs
        </a>
      </p>
    </footer>
  );
};
