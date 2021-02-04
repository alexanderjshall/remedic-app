// import head images
import headCough from '../assets/symptoms/head-cough.svg';
import headDizzy from '../assets/symptoms/head-dizzy.svg';
import headHairLoss from '../assets/symptoms/head-hairloss.svg';
import headHeadache from '../assets/symptoms/head-headache.svg';
import headNosebleeding from '../assets/symptoms/head-nosebleeding.svg';
import headRash from '../assets/symptoms/head-rash.svg';
import headRunnyNose from '../assets/symptoms/head-runnynose.svg';
import headSneezing from '../assets/symptoms/head-sneezing.svg';
import headSoreThroat from '../assets/symptoms/head-sorethroat.svg';
import headSoreEye from '../assets/symptoms/head-sore-eye.svg';
import headSweating from '../assets/symptoms/head-sweating.svg';
import headVomiting from '../assets/symptoms/head-vomiting.svg';

// import arms images
import armsElbowPain from '../assets/symptoms/arms-elbow.svg';
import armsHandPain from '../assets/symptoms/arms-handpain.svg';
import armsPain from '../assets/symptoms/arms-pain.svg';
import armsRash from '../assets/symptoms/arms-rash.svg';

// import body images
import bodyBackPain from '../assets/symptoms/body-backpain.svg';
import bodyBreathing from '../assets/symptoms/body-breathing.svg';
import bodyConstipation from '../assets/symptoms/body-constipation.svg';
import bodyCramps from '../assets/symptoms/body-cramps.svg';
import bodyRash from '../assets/symptoms/body-rash.svg';
import bodyShaking from '../assets/symptoms/body-shaking.svg';
import bodyStomachPain from '../assets/symptoms/body-stomach.svg';
import bodyHeartRate from '../assets/symptoms/body-heart.svg';

// import legs images
import legsAnklePain from '../assets/symptoms/legs-anklepain.svg';
import legsCalfPain from '../assets/symptoms/legs-calfpain.svg';
import legsFootPain from '../assets/symptoms/legs-footpain.svg';
import legsKneePain from '../assets/symptoms/legs-kneepain.svg';
import legsRash from '../assets/symptoms/legs-rash.svg';
import legsThighPain from '../assets/symptoms/legs-thighpain.svg';
import { Symptom } from '../types';

export const fullPhysicalSymptoms: Symptom[] = [
  { area: 'Head', symptom: 'Cough', img: headCough, selected: false },
  { area: 'Head', symptom: 'Dizzy', img: headDizzy, selected: false },
  { area: 'Head', symptom: 'Hair Loss', img: headHairLoss, selected: false },
  { area: 'Head', symptom: 'Headache', img: headHeadache, selected: false },
  { area: 'Head', symptom: 'Nose Bleeding', img: headNosebleeding, selected: false },
  { area: 'Head', symptom: 'Rash', img: headRash, selected: false },
  { area: 'Head', symptom: 'Runny Nose', img: headRunnyNose, selected: false },
  { area: 'Head', symptom: 'Sneezing', img: headSneezing, selected: false },
  { area: 'Head', symptom: 'Sore Throat', img: headSoreThroat, selected: false },
  { area: 'Head', symptom: 'Sore Eye', img: headSoreEye, selected: false },
  { area: 'Head', symptom: 'Sweating', img: headSweating, selected: false },
  { area: 'Head', symptom: 'Vomiting', img: headVomiting, selected: false },
  
  { area: 'Arms', symptom: 'Elbow Pain', img: armsElbowPain, selected: false },
  { area: 'Arms', symptom: 'Hand Pain', img: armsHandPain, selected: false },
  { area: 'Arms', symptom: 'Arm Pain', img: armsPain, selected: false },
  { area: 'Arms', symptom: 'Arm Rash', img: armsRash, selected: false },
  
  { area: 'Body', symptom: 'Back Pain', img: bodyBackPain, selected: false },
  { area: 'Body', symptom: 'Short Of Breath', img: bodyBreathing, selected: false },
  { area: 'Body', symptom: 'Constipation', img: bodyConstipation, selected: false },
  { area: 'Body', symptom: 'Stomach Cramps', img: bodyCramps, selected: false },
  { area: 'Body', symptom: 'Body Rash', img: bodyRash, selected: false },
  { area: 'Body', symptom: 'Shaking', img: bodyShaking, selected: false },
  { area: 'Body', symptom: 'Stomach Pain', img: bodyStomachPain, selected: false },
  { area: 'Body', symptom: 'Heart Rate', img: bodyHeartRate, selected: false },
  
  { area: 'Legs', symptom: 'Ankle Pain', img: legsAnklePain, selected: false },
  { area: 'Legs', symptom: 'Calf Pain', img: legsCalfPain, selected: false },
  { area: 'Legs', symptom: 'Foot Pain', img: legsFootPain, selected: false },
  { area: 'Legs', symptom: 'Knee Pain', img: legsKneePain, selected: false },
  { area: 'Legs', symptom: 'Leg Rash', img: legsRash, selected: false },
  { area: 'Legs', symptom: 'Thigh Pain', img: legsThighPain, selected: false }
];

export const generalSymptoms: Symptom[] = [
  { area: 'Global', symptom: 'Sleeping Poorly', selected: false },
  { area: 'Global', symptom: 'Eating Poorly', selected: false }

];

