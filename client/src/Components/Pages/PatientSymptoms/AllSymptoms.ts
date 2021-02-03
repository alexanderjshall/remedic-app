// import head images
import headCough from '../../../assets/symptoms/head-cough.svg';
import headDizzy from '../../../assets/symptoms/head-dizzy.svg';
import headHairLoss from '../../../assets/symptoms/head-hairloss.svg';
import headHeadache from '../../../assets/symptoms/head-headache.svg';
import headNosebleeding from '../../../assets/symptoms/head-nosebleeding.svg';
import headRash from '../../../assets/symptoms/head-rash.svg';
import headRunnyNose from '../../../assets/symptoms/head-runnynose.svg';
import headSneezing from '../../../assets/symptoms/head-sneezing.svg';
import headSoreThroat from '../../../assets/symptoms/head-sorethroat.svg';
import headSoreEye from '../../../assets/symptoms/head-sore-eye.svg';
import headSweating from '../../../assets/symptoms/head-sweating.svg';
import headVomiting from '../../../assets/symptoms/head-vomiting.svg';

// import arms images
import armsElbowPain from '../../../assets/symptoms/arms-elbow.svg';
import armsHandPain from '../../../assets/symptoms/arms-handpain.svg';
import armsPain from '../../../assets/symptoms/arms-pain.svg';
import armsRash from '../../../assets/symptoms/arms-rash.svg';

// import body images
import bodyBackPain from '../../../assets/symptoms/body-backpain.svg';
import bodyBreathing from '../../../assets/symptoms/body-breathing.svg';
import bodyConstipation from '../../../assets/symptoms/body-constipation.svg';
import bodyCramps from '../../../assets/symptoms/body-cramps.svg';
import bodyRash from '../../../assets/symptoms/body-rash.svg';
import bodyShaking from '../../../assets/symptoms/body-shaking.svg';
import bodyStomachPain from '../../../assets/symptoms/body-stomach.svg';
import bodyHeartRate from '../../../assets/symptoms/body-heart.svg';

// import legs images
import legsAnklePain from '../../../assets/symptoms/legs-anklepain.svg';
import legsCalfPain from '../../../assets/symptoms/legs-calfpain.svg';
import legsFootPain from '../../../assets/symptoms/legs-footpain.svg';
import legsKneePain from '../../../assets/symptoms/legs-kneepain.svg';
import legsRash from '../../../assets/symptoms/legs-rash.svg';
import legsThighPain from '../../../assets/symptoms/legs-thighpain.svg';

interface Symptom {
  area: string;
  symptom: string;
  img: string;
}

export const symptoms: Symptom[] = [
  { area: 'Head', symptom: 'Cough', img: headCough },
  { area: 'Head', symptom: 'Dizzy', img: headDizzy },
  { area: 'Head', symptom: 'Hair Loss', img: headHairLoss },
  { area: 'Head', symptom: 'Headache', img: headHeadache },
  { area: 'Head', symptom: 'Nose Bleeding', img: headNosebleeding },
  { area: 'Head', symptom: 'Rash', img: headRash },
  { area: 'Head', symptom: 'Runny Nose', img: headRunnyNose },
  { area: 'Head', symptom: 'Sneezing', img: headSneezing },
  { area: 'Head', symptom: 'Sore Throat', img: headSoreThroat },
  { area: 'Head', symptom: 'Sore Eye', img: headSoreEye },
  { area: 'Head', symptom: 'Sweating', img: headSweating },
  { area: 'Head', symptom: 'Vomiting', img: headVomiting },
  
  { area: 'Arms', symptom: 'Elbow Pain', img: armsElbowPain },
  { area: 'Arms', symptom: 'Hand Pain', img: armsHandPain },
  { area: 'Arms', symptom: 'Arm Pain', img: armsPain },
  { area: 'Arms', symptom: 'Arm Rash', img: armsRash },
  
  { area: 'Body', symptom: 'Back Pain', img: bodyBackPain },
  { area: 'Body', symptom: 'Short Of Breath', img: bodyBreathing },
  { area: 'Body', symptom: 'Constipation', img: bodyConstipation },
  { area: 'Body', symptom: 'Stomach Cramps', img: bodyCramps },
  { area: 'Body', symptom: 'Body Rash', img: bodyRash },
  { area: 'Body', symptom: 'Shaking', img: bodyShaking },
  { area: 'Body', symptom: 'Stomach Pain', img: bodyStomachPain },
  { area: 'Body', symptom: 'Heart Rate', img: bodyHeartRate },
  
  { area: 'Legs', symptom: 'Ankle Pain', img: legsAnklePain },
  { area: 'Legs', symptom: 'Calf Pain', img: legsCalfPain },
  { area: 'Legs', symptom: 'Foot Pain', img: legsFootPain },
  { area: 'Legs', symptom: 'Knee Pain', img: legsKneePain },
  { area: 'Legs', symptom: 'Leg Rash', img: legsRash },
  { area: 'Legs', symptom: 'Thigh Pain', img: legsThighPain }
];