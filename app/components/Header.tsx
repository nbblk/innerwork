"use client";
import { Sacramento } from "next/font/google";
import Link from "next/link";
import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import Login from "./Login";

const sacramento = Sacramento({ weight: "400", subsets: ["latin"] });

const loggedInMenus = [
  { name: "posts", url: "/posts" },
  { name: "write", url: "/write" },
];

export default function Header() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error getting session:", error.message);
        return;
      }
      setUser(data.session?.user ?? null);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <header className="fixed top-0 z-20 w-full flex justify-between items-center p-4">
      <h1 className={`${sacramento.className} text-8xl`}>innerwork</h1>
      <nav className="flex justify-start items-start text-2xl">
        <ul className="flex gap-4">
          {user ? (
            <>
              {loggedInMenus.map((menu) => (
                <li
                  key={menu.name}
                  className="border border-black border-2 rounded-full py-2 px-4 hover:bg-black hover:text-white transition hover:transition-colors"
                >
                  <Link href={menu.url}>{menu.name}</Link>
                </li>
              ))}
              <button
                className="border border-black border-2 rounded-full py-2 px-4 hover:bg-black hover:text-white transition hover:transition-colors"
                onClick={signOut}
              >
                signout
              </button>
            </>
          ) : (
            <Login />
          )}
        </ul>
      </nav>
    </header>
  );
}
