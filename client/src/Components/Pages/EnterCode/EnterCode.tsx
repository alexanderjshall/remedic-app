import React, { useState } from 'react'
import FormInput from '../../Globals/FormInput/FormInput'
import humanSitting from '../../../assets/background-images/humans-sitting2.png'


const EnterCode = () => {
  const [code, setCode] = useState<string>('');

  const changeCode = (name: string, value: string) => {
    setCode(value);
  }

  const submitCode = () => {
    
  }

  return (
    <div className="h-full w-full relative px-3 py-12 overflow-hidden flex justify-center">
      <form 
        className="h-48 w-5/6 flex flex-col justify-center items-center z-10"
        onSubmit={submitCode}
      >
        <label className="text-extrabold text-2xl font-extrabold">Enter Code To Start:</label>
        <div className="mt-8">
          <FormInput 
            type="text" 
            placeholder=""
            id="constultation-code"
            name="code"
            updateInput={changeCode}
            onSubmit={submitCode}
          />
        </div>
      </form>
      <div className="bg-blue h-16 w-screen fixed bottom-0 left-0 flex items-center justify-center">
        <h2 className="text-white font-extrabold opacity-80">No Code? Ask At Reception</h2>
      </div>
      <img src={humanSitting} alt="background human" className="absolute opacity-10 top-1/4"></img>
    </div>
  )
}

export default EnterCode
