import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4">
      <ul className="flex flex-wrap gap-6 justify-center">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/projects">Projects</Link></li>
        <li><Link href="/skills">Skills</Link></li>
        <li><Link href="/certifications">Certifications</Link></li>
        <li><Link href="/contact">Contact</Link></li>
        <li><Link href="/health">Health</Link></li>
      </ul>
    </nav>
  );
}