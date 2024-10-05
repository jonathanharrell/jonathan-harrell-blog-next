import { ReactNode } from "react";

export default function PhotosLayout({
  children,
  modal,
}: Readonly<{
  children: ReactNode;
  modal: ReactNode;
}>) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
