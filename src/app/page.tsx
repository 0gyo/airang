'use client';

import Image from "next/image";;
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [lesson, setLesson] = useState<string>("");
  const [detail, setDetail] = useState<string>("");

  const createStory = async () => {
    const response = await fetch("/api/v1/story/creation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        name: name, 
        lesson: lesson, 
        detail: lesson 
      }),
    });

    const result = await response.json();
    console.log("result: " + result.data.texts[0]);
    console.log("result: " + result.data.texts[1]);
    console.log("result: " + result.data.images[0]);
    console.log("result: " + result.data.images[1]);
    return result;
  }

  return (
    <main className="flex w-full h-screen justify-center items-center space-x-4">
      <div className="my-auto w-[620px] h-[690px] bg-white pl-[52px] pr-[52px]">
        <Image 
          src="../images/logo.svg" 
          alt="Logo"
          width={119}
          height={33}
          className="pt-[82px]"
        />
        <p className="font-pretendard-bold text-[#FF6007] pt-[12px]" style={{ fontSize: "28px", lineHeight: "140%" }}>
          아이 맞춤 교훈을 담아 아이만을 위한 <br />
          하나뿐인 동화를 만들어보세요!
        </p>
        <div className="flex flex-col pt-[24px] justify-start items-base">
          <div className="flex">
            <label className="font-pretendard-semibold text-[#171717]" style={{ fontSize: "24px", lineHeight: "140%" }}>
              주인공 이름
            </label>
            <p className="text-[18px] text-[#ff3939]">*</p>
            <p className="pl-[16px] font-pretendard-medium text-[#666666]" style={{ fontSize: "14px", lineHeight: "140%" }}>
              아이 이름을 넣으면 아이가 더욱 몰입해서 읽어요!
            </p>
          </div>
          <input 
            type="text" 
            id="name"
            required
            placeholder="홍길동"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-neutral-200 rounded-xl p-3 text-[#000000] font-pretendard-regular bg-[#f0f0f0]"
          />
        </div>
        <div className="flex flex-col pt-[24px] justify-start items-base">
          <div className="flex">
            <label className="font-pretendard-semibold text-[#171717]" style={{ fontSize: "24px", lineHeight: "140%" }}>
              교훈
            </label>
            <p className="text-[18px] text-[#ff3939]">*</p>
            <p className="pl-[16px] font-pretendard-medium text-[#666666]" style={{ fontSize: "14px", lineHeight: "140%" }}>
              내 아이에게 현재 가장 필요한 역량은?
            </p>
          </div>
          <input 
            type="text" 
            id="lesson"
            required
            placeholder="ex. 저축을 하면 원하는 것을 살 수 있어요"
            value={lesson}
            onChange={(e) => setLesson(e.target.value)}
            className="border border-neutral-200 rounded-xl p-3 text-[#000000] font-pretendard-regular bg-[#f0f0f0]"
          />
        </div>
        <div className="flex flex-col pt-[24px] justify-start items-base">
          <div className="flex">
            <label className="font-pretendard-semibold text-[#171717]" style={{ fontSize: "24px", lineHeight: "140%" }}>
              세부적 디테일
            </label>
          </div>
          <div>
            <p className="border border-neutral-200 rounded-xl p-3 font-pretendard-regular text-[#FF6007] bg-[#FFE0CE]" style={{ fontSize: "12px", lineHeight: "140%" }}>
              잠깐! 아이가 좋아하는 장르, 시대/공간적 배경 등을 작성하면 더욱 풍부한 스토리를 만들 수 있어요!
            </p>
            <input
              type="text" 
              id="detail"
              placeholder="ex. 중세 시대에 주인공이 공주인 설정"
              value={detail}
              onChange={(e) =>setDetail(e.target.value)}
              className="w-full border border-neutral-200 rounded-xl mt-2 p-3 pb-20 text-[#000000] font-pretendard-regular bg-[#f0f0f0]"
            />
          </div>
        </div>
      </div>
      <div className="w-[620px] h-[690px] bg-white flex items-end justify-end p-10">
        <button
          className="w-[220px] h-[60px] bg-[#FF6007] text-white font-pretendard-regular rounded" style={{ fontSize: "24px", lineHeight: "140%" }}
          onClick={() => createStory()}
        >
          동화 만들기
        </button>
      </div>
    </main>
  );
}
