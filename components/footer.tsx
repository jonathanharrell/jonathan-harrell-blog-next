export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="wrapper mt-6 py-6 text-center sm:text-left">
      <p>Copyright ©{currentYear} Jonathan Harrell</p>
    </footer>
  );
};
