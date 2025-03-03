export default function Home() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">Hey, I&apos;m Onur Ata Asar 👋</h1>
        <p className="text-xl text-zinc-700 dark:text-zinc-300">
          I&apos;m a software engineer passionate about building great user
          experiences and solving complex problems. This is my digital garden
          where I share my thoughts, experiences, and learnings.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Latest Posts</h2>
        <div className="grid gap-4">
          {/* Blog posts will be dynamically loaded here */}
          <p className="text-zinc-600 dark:text-zinc-400">Coming soon...</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Dev Notes</h2>
        <div className="grid gap-4">
          {/* Dev notes will be dynamically loaded here */}
          <p className="text-zinc-600 dark:text-zinc-400">Coming soon...</p>
        </div>
      </section>
    </div>
  );
}
