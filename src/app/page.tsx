import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">Selam, Ben Onur 👋</h1>
        <p className="text-xl text-zinc-700 dark:text-zinc-300">
          İleride buralar çok değerlenecek. Buralar önceden hep dutluktu
          diyebilmek için arada ziyaret edebilirsin. Şimdilik{" "}
          <Link href="/blog" className="text-blue-500">
            bloglara
          </Link>{" "}
          ve{" "}
          <Link href="/dev-notes" className="text-blue-500">
            dev notlarıma
          </Link>{" "}
          göz at.
        </p>
        <p className="text-xl text-zinc-700 dark:text-zinc-300">
          Benimle iletişime geçmek için{" "}
          <a href="mailto:onurataasar@gmail.com" className="text-purple-500">
            onurataasar@gmail.com
          </a>{" "}
          adresine mail at.
        </p>
      </section>
    </div>
  );
}
