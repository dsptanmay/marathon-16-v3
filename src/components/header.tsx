import Link from "next/link";
import ImageMarquee from "./img-marquee";

export default function Header() {
  return (
    <header className="bg-background text-mtext py-4 px-6 flex flex-col sm:flex-row justify-between items-center border-border border-b-2 gap-4 w-full">
      <Link href="/" className="text-2xl font-heading">
        Marathon 16.0
      </Link>
      <div className="relative flex flex-row ">
        <ImageMarquee />
      </div>
    </header>
  );
}
