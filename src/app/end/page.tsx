'use client';

import Image from "next/image";;
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex w-full h-screen justify-center items-center space-x-4">
       <div className="w-[620px] h-[690px] relative flex items-center justify-center rounded-xl">
        <Image
          src="../images/l.svg"
          alt="l"
          layout="fill"
          objectFit="cover"
          className="my-auto rounded-xl"
        />
      </div>
      <div className="w-[620px] h-[690px] relative flex items-center justify-center rounded-xl">
        <Image
          src="../images/r.svg"
          alt="l"
          layout="fill"
          objectFit="cover"
          className="my-auto rounded-xl"
        />
        <button onClick={() => router.push("/")}>
          <Image
            src="../images/end.svg"
            alt="end"
            width={200}
            height={50}
            className="absolute bottom-10 right-10"
          />
        </button>
      </div>
    </main>
  );
}
