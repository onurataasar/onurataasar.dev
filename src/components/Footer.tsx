import { FaGithubSquare, FaLinkedin, FaMedium } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-auto pt-8 border-t border-zinc-200 dark:border-zinc-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <h3 className="font-semibold">
                Onur Ata Asar{" "}
                <span className="text-zinc-600 dark:text-zinc-400 font-normal text-xs">
                  © {new Date().getFullYear()}
                </span>
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 max-md:text-center">
                Developer
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <a
              href="https://medium.com/@onurataasar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <FaMedium size={24} />
            </a>
            <a
              href="https://github.com/onurataasar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <FaGithubSquare size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/onur-ata-asar/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
