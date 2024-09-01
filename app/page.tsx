import {getPostTeasers} from "@/lib/utils";

const HomePage = async () => {
  const poetryTeasers = await getPostTeasers({ tag: "poetry,!jdch", perPage: 4 });
  const readingTeasers = await getPostTeasers({ tag: "reading", perPage: 4 });
  const watchingTeasers = await getPostTeasers({ tag: "watching", perPage: 4 });
  const museumTeasers = await getPostTeasers({ tag: "museum", perPage: 4 });
  const artDesignTeasers = await getPostTeasers({ tag: "art,design,!museum,!jdch", perPage: 4 });
  const photoTeasers = await getPostTeasers({ tag: "photography,!travel,!poetry,jdch", perPage: 4 });
  const myPoetryTeasers = await getPostTeasers({ tag: "poetry,jdch", perPage: 4 });
  const travelTeasers = await getPostTeasers({ tag: "travel", perPage: 4 });

  return (
    <div className="grid grid-col gap-8 py-16">
      <section>
        <h2 className="text-xl">Photography</h2>
        <div className="grid grid-cols-4 gap-4">
          {photoTeasers.map((teaser) => (
            <article key={teaser.slug}>
              <img
                src={teaser.images[0]}
                alt=""
                className="aspect-[5/4] object-cover"
                loading="lazy"
              />
              <h3>{teaser.frontmatter?.date}</h3>
            </article>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-xl">Museum Visits</h2>
        <div className="grid grid-cols-4 gap-4">
          {museumTeasers.map((teaser) => (
            <article key={teaser.slug}>
              <img
                src={teaser.images[0]}
                alt=""
                className="aspect-[5/4] object-cover"
                loading="lazy"
              />
              <h3>{teaser.frontmatter?.date}</h3>
            </article>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-xl">Poetry Inspiration</h2>
        <div className="grid grid-cols-4 gap-4">
          {poetryTeasers.map((teaser) => (
            <article key={teaser.slug}>
              <h3>{teaser.frontmatter?.date}</h3>
              <p>{teaser.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-xl">Art & Design Inspiration</h2>
        <div className="grid grid-cols-4 gap-4">
          {artDesignTeasers.map((teaser) => (
            <article key={teaser.slug}>
              <img
                src={teaser.images[0]}
                alt=""
                className="aspect-[5/4] object-cover"
                loading="lazy"
              />
              <h3>{teaser.frontmatter?.date}</h3>
            </article>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-xl">Reading</h2>
        <div className="grid grid-cols-4 gap-4">
          {readingTeasers.map((teaser) => (
            <article key={teaser.slug}>
              <h3>{teaser.frontmatter?.date}</h3>
              <p>{teaser.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-xl">Travel</h2>
        <div className="grid grid-cols-4 gap-4">
          {travelTeasers.map((teaser) => (
            <article key={teaser.slug}>
              <img
                src={teaser.images[0]}
                alt=""
                className="aspect-[5/4] object-cover"
                loading="lazy"
              />
              <h3>{teaser.frontmatter?.date}</h3>
            </article>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-xl">Watching</h2>
        <div className="grid grid-cols-4 gap-4">
          {watchingTeasers.map((teaser) => (
            <article key={teaser.slug}>
              <h3>{teaser.frontmatter?.date}</h3>
              <p>{teaser.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-xl">My Poetry</h2>
        <div className="grid grid-cols-4 gap-4">
          {myPoetryTeasers.map((teaser) => (
            <article key={teaser.slug}>
              <img
                src={teaser.images[0]}
                alt=""
                className="aspect-[5/4] object-cover"
                loading="lazy"
              />
              <h3>{teaser.frontmatter?.date}</h3>
              <p>{teaser.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;