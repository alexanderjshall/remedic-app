// import head images
import headCough from "../assets/symptoms/head-cough.svg";
import headDizzy from "../assets/symptoms/head-dizzy.svg";
import headHairLoss from "../assets/symptoms/head-hairloss.svg";
import headHeadache from "../assets/symptoms/head-headache.svg";
import headNosebleeding from "../assets/symptoms/head-nosebleeding.svg";
import headRash from "../assets/symptoms/head-rash.svg";
import headRunnyNose from "../assets/symptoms/head-runnynose.svg";
import headSneezing from "../assets/symptoms/head-sneezing.svg";
import headSoreThroat from "../assets/symptoms/head-sorethroat.svg";
import headSoreEye from "../assets/symptoms/head-sore-eye.svg";
import headSweating from "../assets/symptoms/head-sweating.svg";
import headVomiting from "../assets/symptoms/head-vomiting.svg";

// import arms images
import armsElbowPain from "../assets/symptoms/arms-elbow.svg";
import armsHandPain from "../assets/symptoms/arms-handpain.svg";
import armsPain from "../assets/symptoms/arms-pain.svg";
import armsRash from "../assets/symptoms/arms-rash.svg";

// import body images
import bodyBackPain from "../assets/symptoms/body-backpain.svg";
import bodyBreathing from "../assets/symptoms/body-breathing.svg";
import bodyConstipation from "../assets/symptoms/body-constipation.svg";
import bodyCramps from "../assets/symptoms/body-cramps.svg";
import bodyRash from "../assets/symptoms/body-rash.svg";
import bodyShaking from "../assets/symptoms/body-shaking.svg";
import bodyStomachPain from "../assets/symptoms/body-stomach.svg";
import bodyHeartRate from "../assets/symptoms/body-heart.svg";

// import legs images
import legsAnklePain from "../assets/symptoms/legs-anklepain.svg";
import legsCalfPain from "../assets/symptoms/legs-calfpain.svg";
import legsFootPain from "../assets/symptoms/legs-footpain.svg";
import legsKneePain from "../assets/symptoms/legs-kneepain.svg";
import legsRash from "../assets/symptoms/legs-rash.svg";
import legsThighPain from "../assets/symptoms/legs-thighpain.svg";
import { Symptom } from "../types";

export const fullPhysicalSymptoms: Symptom[] = [
  {
    area: "Head",
    symptom: "Cough",
    img: headCough,
    selected: false,
    id: "cough",
    translation: "Cough",
  },
  {
    area: "Head",
    symptom: "Dizzy",
    img: headDizzy,
    selected: false,
    id: "dizzy",
    translation: "Dizzy",
  },
  {
    area: "Head",
    symptom: "Hair Loss",
    img: headHairLoss,
    selected: false,
    id: "hairLoss",
    translation: "Hair Loss",
  },
  {
    area: "Head",
    symptom: "Headache",
    img: headHeadache,
    selected: false,
    id: "headache",
    translation: "Headache",
  },
  {
    area: "Head",
    symptom: "Nose Bleeding",
    img: headNosebleeding,
    selected: false,
    id: "noseBleeding",
    translation: "Nose Bleeding",
  },
  {
    area: "Head",
    symptom: "Rash",
    img: headRash,
    selected: false,
    id: "rash",
    translation: "Rash",
  },
  {
    area: "Head",
    symptom: "Runny Nose",
    img: headRunnyNose,
    selected: false,
    id: "runnyNose",
    translation: "Runny Nose",
  },
  {
    area: "Head",
    symptom: "Sneezing",
    img: headSneezing,
    selected: false,
    id: "sneezing",
    translation: "Sneezing",
  },
  {
    area: "Head",
    symptom: "Sore Throat",
    img: headSoreThroat,
    selected: false,
    id: "soreThroat",
    translation: "Sore Throat",
  },
  {
    area: "Head",
    symptom: "Sore Eye",
    img: headSoreEye,
    selected: false,
    id: "soreEye",
    translation: "Sore Eye",
  },
  {
    area: "Head",
    symptom: "Sweating",
    img: headSweating,
    selected: false,
    id: "sweating",
    translation: "Sweating",
  },
  {
    area: "Head",
    symptom: "Vomiting",
    img: headVomiting,
    selected: false,
    id: "vomiting",
    translation: "Vomiting",
  },

  {
    area: "Arms",
    symptom: "Elbow Pain",
    img: armsElbowPain,
    selected: false,
    id: "elbowPain",
    translation: "Elbow Pain",
  },
  {
    area: "Arms",
    symptom: "Hand Pain",
    img: armsHandPain,
    selected: false,
    id: "handPain",
    translation: "Hand Pain",
  },
  {
    area: "Arms",
    symptom: "Arm Pain",
    img: armsPain,
    selected: false,
    id: "armPain",
    translation: "Arm Pain",
  },
  {
    area: "Arms",
    symptom: "Arm Rash",
    img: armsRash,
    selected: false,
    id: "armRash",
    translation: "Arm Rash",
  },

  {
    area: "Body",
    symptom: "Back Pain",
    img: bodyBackPain,
    selected: false,
    id: "backPain",
    translation: "Back Pain",
  },
  {
    area: "Body",
    symptom: "Short Of Breath",
    img: bodyBreathing,
    selected: false,
    id: "shortBreath",
    translation: "Short Of Breath",
  },
  {
    area: "Body",
    symptom: "Constipation",
    img: bodyConstipation,
    selected: false,
    id: "constipation",
    translation: "Constipation",
  },
  {
    area: "Body",
    symptom: "Stomach Cramps",
    img: bodyCramps,
    selected: false,
    id: "stomachCramps",
    translation: "Stomach Cramps",
  },
  {
    area: "Body",
    symptom: "Body Rash",
    img: bodyRash,
    selected: false,
    id: "bodyRash",
    translation: "Body Rash",
  },
  {
    area: "Body",
    symptom: "Shaking",
    img: bodyShaking,
    selected: false,
    id: "shaking",
    translation: "Shaking",
  },
  {
    area: "Body",
    symptom: "Stomach Pain",
    img: bodyStomachPain,
    selected: false,
    id: "stomachPain",
    translation: "Stomach Pain",
  },
  {
    area: "Body",
    symptom: "Fast Heart Rate",
    img: bodyHeartRate,
    selected: false,
    id: "heartRate",
    translation: "Fast Heart Rate",
  },

  {
    area: "Legs",
    symptom: "Ankle Pain",
    img: legsAnklePain,
    selected: false,
    id: "anklePain",
    translation: "Ankle Pain",
  },
  {
    area: "Legs",
    symptom: "Calf Pain",
    img: legsCalfPain,
    selected: false,
    id: "calfPain",
    translation: "Calf Pain",
  },
  {
    area: "Legs",
    symptom: "Foot Pain",
    img: legsFootPain,
    selected: false,
    id: "footPain",
    translation: "Foot Pain",
  },
  {
    area: "Legs",
    symptom: "Knee Pain",
    img: legsKneePain,
    selected: false,
    id: "kneePain",
    translation: "Knee Pain",
  },
  {
    area: "Legs",
    symptom: "Leg Rash",
    img: legsRash,
    selected: false,
    id: "legRash",
    translation: "Leg Rash",
  },
  {
    area: "Legs",
    symptom: "Thigh Pain",
    img: legsThighPain,
    selected: false,
    id: "thighPain",
    translation: "Thigh Pain",
  },
];

export const fullGeneralSymptoms: Symptom[] = [
  {
    area: "Global",
    symptom: "Sleeping Poorly",
    selected: false,
    question: "Are you sleeping well?",
    id: "sleeping",
    interactedWith: false,
  },
  {
    area: "Global",
    symptom: "Eating Poorly",
    selected: false,
    question: "Are you eating?",
    id: "eating",
    interactedWith: false,
  },
  {
    area: "Global",
    symptom: "High Temperature",
    selected: false,
    question: "Do you have a high temperature?",
    id: "highTemperature",
    interactedWith: false,
  },
  {
    area: "Global",
    symptom: "Taking Medications",
    selected: false,
    question: " Are you taking any medications?",
    id: "medications",
    interactedWith: false,
  },
  {
    area: "Global",
    symptom: "Smoking",
    selected: false,
    question: "Do you smoke?",
    id: "smoke",
    interactedWith: false,
  },
];

export const fullPsychologicalSymptoms: Symptom[] = [
  {
    area: "Psychological",
    symptom: "Feeling Sad/Down",
    selected: false,
    question: "Do you feel sad or down?",
    id: "sad",
    interactedWith: false,
  },
  {
    area: "Psychological",
    symptom: "Anxious",
    selected: false,
    question: "Do you often feel anxious?",
    id: "anxious",
    interactedWith: false,
  },
  {
    area: "Psychological",
    symptom: "Extreme Mood Changes",
    selected: false,
    question: "Do you have extreme mood changes?",
    id: "mood",
    interactedWith: false,
  },
  {
    area: "Psychological",
    symptom: "Feeling Unable To Cope",
    selected: false,
    question: "Do you feel unable to cope with stress?",
    id: "stress",
    interactedWith: false,
  },
  {
    area: "Psychological",
    symptom: "Alcohol/Drug Abuse",
    selected: false,
    question: "Do you have a problem with Alcohol or Drug Abuse?",
    id: "drug",
    interactedWith: false,
  },
  {
    area: "Psychological",
    symptom: "Reduced ability to concentrate",
    selected: false,
    question: "Do you feel less able to concentrate?",
    id: "concentration",
    interactedWith: false,
  },
  {
    area: "Psychological",
    symptom: "Trouble Understanding/Relating To People",
    selected: false,
    question: "Do you have trouble understanding situations or people?",
    id: "understanding",
    interactedWith: false,
  },
  {
    area: "Psychological",
    symptom: "Paranoia",
    selected: false,
    question: "Are you feeling paranoia?",
    id: "paranoia",
    interactedWith: false,
  },
];
