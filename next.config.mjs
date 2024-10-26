import NextMdx from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  redirects() {
    return [
      {
        source: "/",
        destination: "/blog",
        permanent: true,
      },
    ];
  },
  images: {
    deviceSizes: [390, 600, 900, 1200],
  },
};

const withMdx = NextMdx({
  options: {},
});

export default withMdx(nextConfig);
