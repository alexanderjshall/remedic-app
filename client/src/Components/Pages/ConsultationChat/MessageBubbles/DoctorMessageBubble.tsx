import React, { useRef, useState, useEffect } from "react";
import { Message } from "../../../../types";
import play from "../../../../assets/utils/play-button.svg";

interface Props {
  message: Message;
}

const DoctorMessageBubble = (props: Props) => {
  const { name, isAuthor, content, audio } = props.message;
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const audioPlayer = useRef(new Audio(`data:audio/mp3;base64,${audio}`));
  const playAnimation = isPlaying ? "animate-ping-slow" : "";

  const startPlaying = () => {
    audioPlayer.current.play();
    setIsPlaying(true);
  };

  useEffect(() => {
    audioPlayer.current.addEventListener("ended", () => setIsPlaying(false));
  }, []);

  return (
    <>
      <div
        className={`${
          isAuthor ? "justify-end" : "justify-start"
        } flex  my-5 mr-3 `}
      >
        <div
          className={`break-words min-w-1/3 p-3 min-h-4 rounded-xl bg-blue shadow-xl flex text-white
      ${isAuthor ? "rounded-br-none" : "rounded-tl-none"} tablet:max-w-1/2`}
        >
          {!isAuthor ? (
            <div className="mr-4">
              <img
                src={play}
                onClick={() => startPlaying()}
                alt="Play audio"
                className={`min-w-12 w-12 ${playAnimation}`}
              />
            </div>
          ) : null}

          <div className="flex flex-col justify-around w-full">
            <h3 className="text-opacity-80 text-sm font-light">{name}</h3>
            <p className="text-m font-bold whitespace-normal w-full break-all	">
              {content}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorMessageBubble;
