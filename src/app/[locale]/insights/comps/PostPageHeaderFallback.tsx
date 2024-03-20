const PostPageHeaderFallback = () => {
  return (
    <div className="grid gap-10 lg:gap-14">
      <div className="grid gap-6 lg:grid-cols-[540fr_700fr] lg:items-start lg:gap-10">
        <h1 className="word-break text-36 text-blu-400 lg:text-48">Keep your curiosity alive.</h1>
        <div
          className="word-break grid gap-3 text-blu-300 lg:gap-4 [&>p]:text-16lig [&>p]:lg:text-20lig"
          dangerouslySetInnerHTML={{
            __html: `<p>Learn about African gastronomy and culinary arts through stories, opinions, and expertise.</p><p>Explore what matters most to you.</p>`,
          }}
        />
      </div>

      <div className="h-px bg-blu-200" />

      <h2 className="text-24 text-blu-400 lg:text-28">Browse all featured insights</h2>
    </div>
  );
};

export default PostPageHeaderFallback;
