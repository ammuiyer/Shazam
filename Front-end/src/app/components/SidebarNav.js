import Link from "next/link";

export default function SidebarNav() {
  return (
    <nav className="w-64 bg-[var(--s3)] p-5 mt-5">
      <ul className="space-y-10">
        <li className="flex justify-center items-center">
          <Link
            href="/"
            className="text-2xl font-semibold text-white hover:text-[var(--p2)]"
          >
            Homepage
          </Link>
        </li>
        <li className="flex justify-center items-center">
          <Link
            href="/analytics"
            className="text-2xl font-semibold text-white hover:text-[var(--p2)]"
          >
            Analytics
          </Link>
        </li>
      </ul>
    </nav>
  );
}
