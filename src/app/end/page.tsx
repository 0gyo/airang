'use client';

import Image from "next/image";;
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  return (
    <main className="flex w-full h-screen justify-center items-center space-x-4">
      <div className="my-auto w-[620px] h-[690px] bg-white pl-[52px] pr-[52px]">
      </div>
      <div className="w-[620px] h-[690px] bg-white flex items-end justify-end p-10">

      </div>
    </main>
  );
}
