import Link from "next/link";
import Image from "next/image";
import { Twitter, Youtube, Facebook } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t text-sm text-gray-700">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6 py-12">
        {/* Logo & Description */}
        <div className="space-y-2">
          <Image
            src="/images/footer-logo.png"
            alt="Logo"
            width={50}
            height={50}
          />
          <p className="font-medium">Cisco Chemicals Inc.</p>
          <p>Providing reliable service since 1992</p>
        </div>

        {/* Services */}
        <div>
          <p className="font-bold text-gray-800 mb-3">SERVICES</p>
          <ul className="space-y-2">
            <li>
              <Link href="#">Branding</Link>
            </li>
            <li>
              <Link href="#">Design</Link>
            </li>
            <li>
              <Link href="#">Marketing</Link>
            </li>
            <li>
              <Link href="#">Advertisement</Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <p className="font-bold text-gray-800 mb-3">COMPANY</p>
          <ul className="space-y-2">
            <li>
              <Link href="#">About us</Link>
            </li>
            <li>
              <Link href="#">Contact</Link>
            </li>
            <li>
              <Link href="#">Jobs</Link>
            </li>
            <li>
              <Link href="#">Press kit</Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <p className="font-bold text-gray-800 mb-3">SOCIAL</p>
          <div className="flex items-center gap-4">
            <Link href="#">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="#">
              <Youtube className="w-5 h-5" />
            </Link>
            <Link href="#">
              <Facebook className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
