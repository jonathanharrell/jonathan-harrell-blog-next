export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="wrapper mt-6 py-6">
      <p>Copyright ©{currentYear} Jonathan Harrell</p>
    </footer>
  );
};
