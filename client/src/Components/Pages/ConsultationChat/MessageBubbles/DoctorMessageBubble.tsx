import React, {useRef, useState, useEffect} from "react";
import { Message } from "../../../../types";
import play from '../../../../assets/utils/play-button.svg';

interface Props {
  message: Message;
}

const DoctorMessageBubble = (props: Props) => {
  const { name, isAuthor, content, audio } = props.message;
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const audioPlayer = useRef(new Audio(`data:audio/mp3;base64,${audio}`));
  const playAnimation = isPlaying ? 'animate-ping-slow' : '';

  const startPlaying = () => {
    audioPlayer.current.play();
    setIsPlaying(true);
  }

  useEffect (() => {
    audioPlayer.current.addEventListener('ended', () => setIsPlaying(false));
  }, [])

  return (
    <>
    <div
      className={`${
        isAuthor ? "justify-end" : "justify-start"
      } flex  my-5 mr-3`}
    >
      <div className="min-w-1/2 p-5 min-h-4 rounded-lg bg-blue shadow-md flex text-white">
      {!isAuthor ?
        <div className="mr-4">
          <img src={play} onClick={() => startPlaying()} alt="Play audio" className={`min-w-12 w-12 ${playAnimation}`} />
        </div> : null}
        <div className="flex flex-col justify-around">
          <h3 className="text-opacity-80 text-sm font-light">{name}</h3>
          <p className="text-m font-bold">{content}</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default DoctorMessageBubble;
