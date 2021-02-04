import React, { useContext, useState } from 'react'
import Human from './Human/Human'
import PhysicalSymptomsList from './PhysicalList/PhysicalSymptomsList';
import logoReduced from '../../../assets/logos/logo-reduced.svg'
import finishTick from '../../../assets/utils/tick.svg';
import { ConsultationContext } from '../../../Contexts/Consultation.context';
import { useHistory } from 'react-router-dom';

interface Props {
  area?: string;
}


const PatientSymptoms = (props: Props) => {
  const history = useHistory();
  const [view, setView] = useState<string>('Main');
  const {confirmConsultation } = useContext(ConsultationContext)!;

  const handleBodyPartClick = (newView: string): void => setView(newView);
  

  const handleBackArrowClick = (): void => setView('Main');
  

  const handleNextClick = (): void => {
    confirmConsultation().then(() => {
      history.push('/consultation_chat');
    }).catch(() => {
      window.alert('Please Try Again');
    })
  };


  return (
    <div className="h-screen relative flex justify-center w-screen overflow-hidden">
      {
        view === 'Main'
        ?
          <div className="h-5/6 m-0 py-4 z-10">
            <h1 className="text-center font-extrabold">Where Do You Have Symptoms?</h1>
            <Human
              onHeadClick={() => handleBodyPartClick('Head')}
              onArmsClick={() => handleBodyPartClick('Arms')}
              onBodyClick={() => handleBodyPartClick('Body')}
              onLegsClick={() => handleBodyPartClick('Legs')}
            />
            <div 
              className="bg-blue h-16 w-screen absolute bottom-0 left-0 
                flex items-center justify-center
              "
            >
              <button 
                onClick={handleNextClick}
                className="flex flex-col justify-around items-center border-2 border-solid border-white text-white rounded-2xl w-36 py-1 target:border-black target:bg-white target:">
                <img src={finishTick} alt="tick" className="text-white w-6"/>
                <h2 className="text-sm font-extrabold">Next</h2>
              </button>
            </div>
          </div>
        :
          <PhysicalSymptomsList
            area={view}
            onBackArrowClick={() => handleBackArrowClick()}
          />
      }x
      
      <img src={logoReduced} alt="background logo"  className="absolute top-1/4 opacity-10 animate-spin-slow"/>
    </div>
  );
}

export default PatientSymptoms
