'use client';

import Image from "next/image";
import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [step, setStep] = useState<number>(-1);
  const [images, setImages] = useState<string[]>([]);
  const [texts, setTexts] = useState<string[]>([]);

  return (
    <main className="flex w-full h-screen justify-center items-center space-x-4">
      <button>
        <Image 
          src="../images/left.svg" 
          alt="left"
          width={50}
          height={50}
        />
      </button>
      <div className=" w-[620px] h-[690px] bg-white relative flex items-center justify-center">
        <Image
          src={"../images/l.svg"}
          alt="Stroy"
          layout="fill"
          objectFit="cover"
          className="my-auto"
        />
      </div>
      <div className=" w-[620px] h-[690px] bg-white relative flex items-center justify-center">
        <Image
          src={"../images/r.svg"}
          alt="Stroy"
          layout="fill"
          objectFit="cover"
          className="my-auto"
        />
      </div>
      <button>
        <Image 
          src="../images/right.svg" 
          alt="right"
          width={50}
          height={50}
        />
      </button>
    </main>
  );

}