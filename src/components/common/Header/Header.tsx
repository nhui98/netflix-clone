import { NAV_LINKS } from "./Header.data";
import { BsSearch, BsFillBellFill } from "react-icons/bs";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [isScrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 0 ? setScrolled(true) : setScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`py4 fixed top-0 z-50 flex w-full items-center justify-between px-4 py-4 transition-all duration-200 lg:px-10 lg:py-6 ${
        isScrolled && "bg-[#141414]"
      }`}
    >
      {/* logo + links */}
      <div className="flex items-center space-x-2 md:space-x-10">
        <img
          src="/netflix-logo.svg"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
          alt="logo"
        />

        <ul className="hidden space-x-4 md:flex">
          {NAV_LINKS.map(({ id, title }) => (
            <li key={id} className="headerLink">
              {title}
            </li>
          ))}
        </ul>
      </div>

      {/* icons + avatar*/}
      <div className="flex items-center space-x-4 text-sm font-light">
        <BsSearch className="hidden h-6 w-6 sm:inline" />
        <p className="hidden lg:inline">Kids</p>
        <BsFillBellFill className="h-6 w-6" />
        <Link href={"/account"}>
          <img
            src="/avatar.png"
            alt="avatar"
            className="cursor-pointer rounded"
          />
        </Link>
      </div>
    </header>
  );
}
