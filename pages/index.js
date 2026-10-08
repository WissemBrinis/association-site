import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import localize from "../localization";

export default function Home() {
  const router = useRouter();
  const [locale, setLocale] = React.useState("en"); // Default to 'en'

  // Initialize locale from localStorage on component mount
  React.useEffect(() => {
    const savedLocale = localStorage.getItem("locale") || "en";
    setLocale(savedLocale);
    document.querySelector("body").dir = savedLocale === "ar" ? "rtl" : "ltr";
  }, []);

  const changeLocale = (newLocale) => {
    // Save to localStorage
    localStorage.setItem("locale", newLocale);
    
    // Update state
    setLocale(newLocale);
    
    // Update document direction
    document.querySelector("body").dir = newLocale === "ar" ? "rtl" : "ltr";
    
    // Remove locale from URL completely by pushing just the pathname
    router.push(router.pathname, router.pathname, { locale: false });
  };

  const LanguageButton = ({ newLocale, title }) => {
    return (
      <button
        className="mr-3"
        onClick={() => changeLocale(newLocale)}
      >
        {title}
      </button>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <div className="mb-3 text-blue-600">
          <LanguageButton newLocale="en" title="English" />
          <LanguageButton newLocale="ar" title="العربية" />
        </div>

        <h1 className="text-6xl font-bold">
          {localize(locale, "title")}{" "}
          <a className="text-blue-600" href="https://nextjs.org">
            Next.js!
          </a>
        </h1>

        <p className="mt-3 text-2xl">
          {localize(locale, "subtitle")}{" "}
          <code className="p-3 font-mono text-lg bg-gray-100 rounded-md">
            pages/index.js
          </code>
        </p>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          {localize(locale, "poweredby")}{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ms-2" />
        </a>
      </footer>
    </div>
  );
}