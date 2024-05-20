import axios from 'axios';

const apiKey = 'up_odTqvsiO0tEikiRl66ytjqBV4ZTCF';
const baseUrl = 'https://api.upstage.ai/v1/solar';
const openAiKey = 'YOUR_OPENAI_API_KEY';
const openAiBaseUrl = 'https://api.openai.com/v1';

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

const main = async (name: any, lesson: any, details: any) => {
  const story = await createStory(name, lesson, details);
  const translatedStory = await translate(story);
  const texts = slicePage(translatedStory);
  const images = await createImages(texts);
  return { texts, images };
};

export default main;