import Link from "next/link";
import Image from "next/image";
import fakeLogo from "../../public/fake-logo.svg";

export function Header() {
  return (
    <header className="bg-main text-mtext py-4 px-6 flex flex-col sm:flex-row justify-between items-center shadow-md gap-4">
      <Link href="/" className="text-2xl font-heading">
        Marathon 16.0
      </Link>
      <div className="h-10 w-32 relative">
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
