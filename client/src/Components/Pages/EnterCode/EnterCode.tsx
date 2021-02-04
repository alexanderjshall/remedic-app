
import React, { useState, useEffect } from 'react'
import FormInput from '../../Globals/FormInput/FormInput'
import humanSitting from '../../../assets/background-images/humans-sitting2.png'
import { getTranslatedText } from '../../../services/api.translate';
import { useMutation, useQuery } from 'react-query';
import queries from '../../../services/graphqlService/queries';
import client from '../../../services/graphqlService/index';
import { Redirect } from 'react-router-dom';


const EnterCode = () => {
  const [code, setCode] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [wrongCodeFormat, setFormatWarning] = useState<boolean>(false);
  const [noDocFound, setNoDocFoundWarning] = useState<boolean>(false);
  const [consultationStart, setStart] = useState<boolean>(false);

  useEffect(() => {
    setSubmitted(false);
    setFormatWarning(false);
    setNoDocFoundWarning(false);
  }, [code])

  const changeCode = (name: string, value: string) => {
    setCode(value);
  }

  // Get doctor info if exists (triggers when submitted = true)
  const {data} = useQuery('get doctor', async () => await client.request(queries.getDoctor, {code}), {enabled: submitted});

  const submitCode = () => {
    // Validate format of doctor code (5 digits)
    const regex = /^[0-9]{5}$/
    if(!regex.test(code)) {
      setFormatWarning(true);
      return 1;
    }
    setSubmitted(true);
    if (!data) {
      setNoDocFoundWarning(true);
      return 1;
    } else {
      // TODO: save doc ID to context
      console.log(data.id);
      setStart(true);
    }
    return 0;
  }


  if(consultationStart) return <Redirect to="/consultation/symptoms"/>

  return (
    <div className="h-full w-full relative px-3 py-12 overflow-hidden flex justify-center">
      <form
        className="h-48 w-5/6 flex flex-col justify-center items-center z-10"
        onSubmit={submitCode}
      >
        <label className="text-extrabold text-2xl font-extrabold">
          Enter Code To Start:
        </label>
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
        {wrongCodeFormat? <p className="text-red-400 italic">Expected: 12345</p> :null}
        {noDocFound? <p className="text-red-400 italic">?? No doctor found</p> :null}
      </form>
      <div className="bg-blue h-16 w-screen fixed bottom-0 left-0 flex items-center justify-center">
        <h2 className="text-white font-extrabold opacity-80">
          No Code? Ask At Reception
        </h2>
      </div>
      <img
        src={humanSitting}
        alt="background human"
        className="absolute opacity-5 top-1/4"
      ></img>
    </div>
  );
};

export default EnterCode;
