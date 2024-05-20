import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY as string,
  baseURL: process.env.OPEN_AI_BASE_URL as string
});

const createStory = async (name: any, lesson: any, detail: any) => {
  const authorList = ["Astrid Lindgren", "Andersen", "Anthony Browne", "Lewis Carroll", "Maurice Sendak"];
  const author = authorList[Math.floor(Math.random() * authorList.length)];

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `Turn that lesson into a fairy tale. Please write in the style of author ${author}. Structure the story so that it has at least 5 scenes. Leave out things like “I wrote it with the style of a certain writer.” Just write down the story content. When dividing scenes, do not enter the scene title to separate them, but just separate them with a single line space without the scene title. Answer in Korean only`,
        },
        {
          role: 'user',
          content: `lesson: ${lesson}\nstory details: ${detail}\nName the main character: ${name}`,
        },
      ],
    });
    return chatCompletion.choices[0].message.content;
  } catch (error: any) {
    console.error(error);
    return "error";
  }
};

const slicePage = (text: any) => {
  const pages = text.split(/\n+/);
  return pages;
};

const createImageUrl = async (text: any) => {
  try {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: `STYLE: Create a whimsical illustration in the style of Anthony Browne
      CONTENT:${text}`,
      n: 1,
      size: '1024x1024',
    });

    return response.data[0].url;
  }
  catch (error: any) {
    return "createImageUrl error";
  }
}

const createImageArray = async (pages: any) => {
  const imgList = [];
  try {
    for (const page of pages) {
      const imgUrl = await createImageUrl(page);
      imgList.push(imgUrl);
    }
    return imgList;
  } catch (error: any) {
    return "createImageArray error";
  }
}

export async function POST(request: Request) {
  try {
    const { name, lesson, detail } = await request.json();
    const story = await createStory(name, lesson, detail);
    const texts = slicePage(story);
    const images = await createImageArray(texts);
    return new Response(
      JSON.stringify({
        success: true,
        message: "성공",
        data: {
          texts: texts,
          images: images
        },
      }
    ));
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "실패",
        error: error
      }
    ));
  }
}
