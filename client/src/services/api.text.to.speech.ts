const key = process.env.REACT_APP_GOOGLE_SPEECH_KEY as string;
export default async function convertTextToSpeech (language: string, text:string) {
  try {
    if (language === 'en') language = 'en-UK';
    const response = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?&key=${key}`, {
      method: "POST",
      body: JSON.stringify({
        "audioConfig": {
          "audioEncoding": "MP3"
        },
        "voice": {
          "languageCode": `${language}`
        },
        "input": {
          "text": `${text}`
        }
      })
    });
    if (response.status < 400) {
      const data = await response.json();
      return data.audioContent;
    } else {
      Promise.reject(response);
    }
  } catch(e) {
    console.log(e);
  }
};