import {Nav} from "@/components/nav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav />
      <main className="md:w-[95vw] lg:w-[90vw] 2xl:w-[80vw] max-w-[1300px] mx-auto px-8 sm:px-12">
        {children}
      </main>
    </>
  );
}
