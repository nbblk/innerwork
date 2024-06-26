import { Sacramento } from "next/font/google";
import Link from "next/link";

const sacramento = Sacramento({ weight: "400", subsets: ["latin"] });

const menus = [
    { name: "home", url: "/" },
    { name: "write", url: "/write" },
    { name: "login", url: "/login" },
];

export default function Header() {
    return (
        <header className="fixed top-0 z-20 w-full flex justify-between items-center p-4">
            <h1 className={`${sacramento.className} text-8xl`}>innerwork</h1>
            <nav className="flex justify-start items-start text-2xl">
                <ul className="flex gap-4">
                    {menus.map((menu) => (
                        <li key={menu.name} className="border border-black border-2 rounded-full py-2 px-4 hover:bg-black hover:text-white transition hover:transition-colors">
                            <Link href={menu.url}>{menu.name}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
};