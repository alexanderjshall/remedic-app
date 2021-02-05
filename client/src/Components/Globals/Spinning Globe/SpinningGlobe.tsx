import React from "react";
import Lottie, { Options } from "react-lottie";
import GlobeAnimation from "./45757-earth-globe-looped-icon.json";

interface PropsSpinningGlobe {
  size: number; // constricted ratio -> size is both width and height
  classes: string;
}

const SpinningGlobe = (props: PropsSpinningGlobe) => {
  // required Lottie Options for animation
  const successTickOptions: Options = {
    loop: true,
    autoplay: true,
    animationData: GlobeAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className={props.classes}>
      <Lottie
        options={successTickOptions}
        height={props.size}
        width={props.size}
      ></Lottie>
    </div>
  );
};

export default SpinningGlobe;
