import React from "react";
import Lottie, { Options } from "react-lottie";
import successTickAnimation from "./33337-tick-pop.json";

interface PropsSuccessTick {
  size: number; // constricted ratio -> size is both width and height
}

const SuccessTick = (props: PropsSuccessTick) => {
  // required Lottie Options for animation
  const successTickOptions: Options = {
    loop: false,
    autoplay: true,
    animationData: successTickAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie
        options={successTickOptions}
        height={props.size}
        width={props.size}
      ></Lottie>
    </div>
  );
};

export default SuccessTick;
