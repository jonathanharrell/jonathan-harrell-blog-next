import NextMdx from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include MDX files
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
    deviceSizes: [390, 600, 900],
  },
};

const withMdx = NextMdx({
  options: {},
});

export default withMdx(nextConfig);
