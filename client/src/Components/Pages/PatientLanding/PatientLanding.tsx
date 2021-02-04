import React from 'react'
import PatientLandingCard from './PatientLandingCard/PatientLandingCard'
import bgHumanOne from '../../../assets/background-images/humans-sitting.png';
import bgHumanTwo from '../../../assets/background-images/humans-standing.png';
import logoReduced from '../../../assets/logos/logo-reduced.svg';
interface LandingCards {
  route?: string;
  title: string;
  bgColorClass: string;
  textColor: string;
  path: string;
}

//TODO add routes
const PatientLanding = () => {

  // put landingCards in here
  const landingCards: LandingCards[] = [
    {
      title: 'Start Consultation',
      bgColorClass: 'bg-green',
      textColor: 'white',
      path:'/start'
    },
    {
      title: 'Profile',
      bgColorClass: 'bg-blue',
      textColor: 'white',
      path:'/'
    },

  ];

  return (
    <div className="h-full w-full relative p-3 overflow-hidden">
      <div className="flex items-center justify-center h-28 absolute w-full">
        <img src={logoReduced} alt="logo" className="w-24 top-8 animate-pulse" ></img>
      </div>
      <div className="h-full flex flex-col justify-around items-center py-16 animate-pulsing">

        {
          landingCards.map((card, i) => (
              <PatientLandingCard
                key={i}
                title={card.title}
                bgColorClass={card.bgColorClass}
                textColor={card.textColor}
                path={card.path}
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
      <div className="bg-blue h-16 w-screen fixed bottom-0 left-0 flex items-center justify-center"></div>
    </div>
  )
}

export default PatientLanding;
