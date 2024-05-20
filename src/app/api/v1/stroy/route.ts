import axios from 'axios';

const apiKey = process.env.UPSTAGE_API_KEY;
const baseUrl = process.env.UPSTAGE_BASE_URL;
const openAiKey = process.env.OPENAI_API_KEY;
const openAiBaseUrl = process.env.OPENAI_BASE_URL;

const createStory = async (name: any, lesson: any, details: any) => {
  const authorList = ["Astrid Lindgren", "Andersen", "Anthony Browne", "Lewis Carroll", "Maurice Sendak"];
  const author = authorList[Math.floor(Math.random() * authorList.length)];

  const response = await axios.post(
    `${openAiBaseUrl}/chat/completions`,
    {
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `Turn that lesson into a fairy tale. Please write in the style of author ${author}. Structure the story so that it has at least 5 scenes. Leave out things like “I wrote it with the style of a certain writer.” Just write down the story content. When dividing scenes, do not enter the scene title to separate them, but just separate them with a single line space without the scene title.`,
        },
        {
          role: 'user',
          content: `lesson: ${lesson}\nstory details: ${details}\nName the main character: ${name}`,
        },
      ],
    },
    {
      headers: {
        'Authorization': `Bearer ${openAiKey}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.choices[0].message.content;
};

const translate = async (text: any) => {
  const response = await axios.post(
    `${baseUrl}/chat/completions`,
    {
      model: 'solar-1-mini-chat',
      messages: [
        {
          role: 'system',
          content: 'Translate English to Korean',
        },
        {
          role: 'user',
          content: text,
        },
      ],
    },
    {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.choices[0].message.content;
};

const slicePage = (text: any) => {
  return text.split(/\n+/);
};

const createImage = async (text: any) => {
  const response = await axios.post(
    `${openAiBaseUrl}/images/generations`,
    {
      model: 'dall-e-3',
      prompt: `STYLE: Create a whimsical illustration in the style of Anthony Browne\nCONTENT: ${text}`,
      n: 1,
      size: '1024x1024',
    },
    {
      headers: {
        'Authorization': `Bearer ${openAiKey}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.data[0].url;
};

const createImages = async (pages: any) => {
  const imgList = [];
  for (const page of pages) {
    const imgUrl = await createImage(page);
    imgList.push(imgUrl);
  }
  return imgList;
};

export async function POST(request: Request) {
  const { name, lesson, details } = await request.json();
  const story = await createStory(name, lesson, details);
  const translatedStory = await translate(story);
  const texts = slicePage(translatedStory);
  const images = await createImages(texts);

  return new Response(
    JSON.stringify({
      success: true,
      message: "성공",
      data: {
        texts: texts,
        images: images
      },
    }),
  )
}
