import Link from "next/link";
import Image from "next/image";
import fakeLogo from "../../public/fake-logo.svg";

export default function Header() {
  return (
    <header className="bg-bg text-mtext py-4 px-6 flex flex-col sm:flex-row justify-between items-center border-border border-b-2 gap-4">
      <Link href="/" className="text-2xl font-heading">
        Marathon 16.0
      </Link>
      <div className="h-11 w-24 relative">
        <Image
          src={fakeLogo}
          alt="Sponsor Logo"
          fill
          className="object-contain"
        />
      </div>
    </header>
  );
}
