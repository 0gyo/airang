'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [step, setStep] = useState<number>(-1);
  const [images, setImages] = useState<string[]>([]);
  const [texts, setTexts] = useState<string[]>([]);

  useEffect(() => {
    const getData = () => {
      const texts = JSON.parse(localStorage.getItem("texts") || "[]");
      const images = JSON.parse(localStorage.getItem("images") || "[]");
      setTexts(texts);
      setImages(images);
    }

    if (step === -1) {
      getData();
      setStep(0);
    }
  }, []);

  return (
    <main className="flex w-full h-screen justify-center items-center space-x-4">
      <button onClick={() => step > 0 ? setStep(step - 1) : null}>
        <Image 
          src="../images/left.svg" 
          alt="left"
          width={50}
          height={50}
        />
      </button>
      <div className="w-[620px] h-[690px] bg-white relative flex items-center justify-center rounded-xl">
        <Image
          src={images[step]}
          alt="Stroy"
          layout="fill"
          objectFit="cover"
          className="my-auto rounded-xl"
        />
      </div>
      <div className="flex flex-col w-[620px] h-[690px] bg-white justify-end px-10 rounded-xl">
        <Image
          src={"../images/quotation.svg"}
          alt="quotation"
          width={30}
          height={30}
        />
        <p className="font-pretendard-medium text-[#171717] pt-4 pb-10" style={{ fontSize: "24px", lineHeight: "150%"}}>{texts[step]}</p>
        <p className="font-pretendard-medium text-[#171717] self-end pb-4">{step+1}</p>
      </div>
      <button onClick={() => step+1 !== texts.length ? setStep(step + 1) : router.push("/end")}>
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
