import React from "react";
import Link from "next/link";
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
  <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-10">
    <ul className="flex space-x-4 p-4">
      <li>
        <Link href="/" className="text-blue-500 hover:underline">
          Home
        </Link>
      </li>
      <li>
        <Link href="/App" className="text-blue-500 hover:underline">
          TanStack
        </Link>
      </li>
      <li>
        <Link href="/List" className="text-blue-500 hover:underline">
          List
        </Link>
      </li>
    </ul>
  </nav>
  <div className="flex-grow pt-16 flex items-center justify-center">
    <h1 className="text-4xl text-center text-gray-800">Home Page</h1>
  </div>
</div>

  );
}
