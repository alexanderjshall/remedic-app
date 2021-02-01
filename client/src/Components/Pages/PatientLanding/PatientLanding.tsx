import React from 'react'
import PatientLandingCard from './PatientLandingCard'
import bgHumanOne from '../../../assets/background-images/humans-sitting.png';
import bgHumanTwo from '../../../assets/background-images/humans-standing.png';

interface LandingCards {
  route?: string;
  title: string;
  bgColorClass: string;
  textColor: string;
}

//TODO add routes 
const PatientLanding = () => {

  // put landingCards in here
  const landingCards: LandingCards[] = [
    { 
      title: 'Start Consultation',
      bgColorClass: 'bg-green',
      textColor: 'white'
    },
    { 
      title: 'Profile',
      bgColorClass: 'bg-blue',
      textColor: 'white'
    },
    
  ];

  return (
    <div className="h-full w-full relative p-3">
      <div className="h-full flex flex-col justify-around items-center py-16">
          {
            landingCards.map((card, i) => (
              <PatientLandingCard 
                title={card.title}
                bgColorClass={card.bgColorClass}
                textColor={card.textColor}
              />
            ))
          }
      </div>
      <img src={bgHumanOne} 
        alt="background human" 
        className="absolute top-1/4 -right-12 opacity-10 w-72">
      </img>
      <img src={bgHumanTwo} 
        alt="background human" 
        className="absolute top-16 -left-12 opacity-10 w-72">
      </img>
    </div>
  )
}

export default PatientLanding;
