import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const homeIcon = (
  <svg
    width="11"
    height="11"
    viewBox="0 0 11 11"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M9 9.5L2 2.5M2 2.5h5M2 2.5v5"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export type SiteHeaderProps = {
  homeHref: string;
  homeLabel: string;
  external?: boolean;
};

export default function SiteHeader({
  homeHref,
  homeLabel,
  external = false,
}: SiteHeaderProps) {
  const homeClass = "hdr-home";

  return (
    <header className="hdr">
      {external ? (
        <a
          href={homeHref}
          className={homeClass}
          target="_blank"
          rel="noopener noreferrer"
        >
          {homeIcon}
          {homeLabel}
        </a>
      ) : (
        <Link href={homeHref} className={homeClass}>
          {homeIcon}
          {homeLabel}
        </Link>
      )}
      <div className="hdr-right">
        <ThemeToggle />
      </div>
    </header>
  );
}
