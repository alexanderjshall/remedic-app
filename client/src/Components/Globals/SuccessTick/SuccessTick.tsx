import React from "react";
import Lottie from "react-lottie-player";
import SuccessTickAnimation from "./33337-tick-pop.json";

interface PropsSuccessTick {
  size: number; // constricted ratio -> size is both width and height
}

const SuccessTick = (props: PropsSuccessTick) => {
  // required Lottie Options for animation

  return (
    <div>
      <Lottie
        animationData={SuccessTickAnimation}
        loop={false}
        play={true}
        style={{ width: props.size, height: props.size }}
      ></Lottie>
    </div>
  );
};

export default SuccessTick;
