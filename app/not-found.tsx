const NotFoundPage = async () => {
  return (
    <div className="flex flex-col justify-center flex-1">
      <div className="wrapper py-8 sm:py-10 md:py-14">
        <div className="jh-prose mx-auto text-center">
          <h1 className="mt-0">404</h1>
          <p>Oh no! I couldn’t find that page.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
