import React, { useContext, useState } from "react";
import { LanguageService } from "typescript";
import { useAuth } from "../../../../Contexts/Auth.context";
import supportedLanguages from "../../../../utils/supported-languages.json";
import FormInput from "../../../Globals/FormInput/FormInput";
import OKButton from "../../../Globals/OKButton/OKButton";
import RightArrow from "../../../../assets/utils/right-arrow-black.svg";
import { getNHSTermInformation } from "../../../../services/api.nhs";
import { getTranslatedText as getNHSTranslatedText} from "../../../../services/api.translate";
import Spinner from "../../../Globals/Spinner/Spinner";
import DownArrow from "../../../../assets/utils/down-arrow-black.svg";
import SearchIcon from "../../../../assets/background-images/loupe.svg";
import { PatientContext } from "../../../../Contexts/Patient.context";

interface TranslateOptions {
  inputLangName: string;
  inputLangCode: string;
  outputLangName: string;
  outputLangCode: string;
  selected: boolean;
}

interface SupportedLanguage {
  englishName: string;
  nativeName: string;
  langCode: string;
}

interface DisplayTranslation {
  name?: string;
  searchName: string;
  translatedName: string;
  description: string;
  url: string;
}

const TranslateTerms = () => {
  const { user } = useAuth(); // user from AuthContext
  const { getTranslatedText } = useContext(PatientContext)!;
  const localText = getTranslatedText().servicesPage.translatePage;

  const patientLanguage: SupportedLanguage = supportedLanguages.languages.find(
    (sL) => sL.langCode === user?.language
  )!; // finds patient language names and code for translation buttons

  // STATES
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [translations, setTranslations] = useState<TranslateOptions[]>([
    {
      inputLangName: "English",
      inputLangCode: "en",
      outputLangName: patientLanguage.nativeName,
      outputLangCode: patientLanguage.langCode,
      selected: true,
    },
    {
      inputLangName: patientLanguage.nativeName,
      inputLangCode: patientLanguage.langCode,
      outputLangName: "English",
      outputLangCode: "en",
      selected: false,
    },
  ]);

  const [displayTerm, setDisplayTerm] = useState<DisplayTranslation | null>(
    null
  );
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [queryError, setQueryError] = useState<boolean>(false);

  //EVENT HANDLERS
  const handleSelectTranslation = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    selectedTranslation: TranslateOptions
  ) => {
    const changedTranslations = translations.map((t) => {
      selectedTranslation.inputLangCode === t.inputLangCode
        ? (t.selected = true)
        : (t.selected = false);
      return t;
    });
    setTranslations(changedTranslations);
  };

  const handleSubmitSearchTerm = async (): Promise<void> => {
    if (searchTerm.length < 1) {
      setQueryError(true);
      return;
    }
    setQueryError(false);
    setDisplayTerm(null);
    setIsFetching(true);
    // init info to be displayed before shenanigans
    const newDisplayTerm: DisplayTranslation = {
      searchName: "",
      translatedName: "",
      description: "",
      url: "",
    };
    // get translationParams where selected is true
    const translationParams = translations.find((t) => t.selected === true);

    //organise translation of query for NHS Api
    let queryInEnglish: string;
    let queryTranslated: string;

    // translate the user query
    try {
      if (translationParams?.inputLangCode === "en") {
        queryInEnglish = searchTerm;
        queryTranslated = await getNHSTranslatedText(
          searchTerm,
          translationParams!.inputLangCode,
          translationParams!.outputLangCode
        );
      } else {
        queryTranslated = searchTerm;
        queryInEnglish = await getNHSTranslatedText(
          searchTerm,
          translationParams!.inputLangCode,
          translationParams!.outputLangCode
        );
      }
    } catch (e) {
      // fallback in case translation fails
      queryInEnglish = searchTerm;
      queryTranslated = searchTerm;
    }

    // Get nhs data
    let nhsData: DisplayTranslation;
    try {
      nhsData = await getNHSTermInformation(queryInEnglish);
    } catch (e) {
      // show query error
      setIsFetching(false);
      setQueryError(true);
      return;
    }

    // translate description
    let translatedDescription: string;
    try {
      translatedDescription = await getNHSTranslatedText(
        nhsData.description,
        "en",
        user!.language
      );
    } catch (e) {
      setIsFetching(false);
      setQueryError(true);
      return;
    }

    // set terms to display from previous queries
    newDisplayTerm.searchName = searchTerm;
    newDisplayTerm.translatedName =
      translationParams?.inputLangCode === "en"
        ? queryTranslated
        : queryInEnglish;
    newDisplayTerm.description = translatedDescription;
    newDisplayTerm.url = `https://www.nhs.uk/conditions/${nhsData
      .name!.toLocaleLowerCase()
      .split(" ")
      .join("-")}`;

    setIsFetching(false); // remove spinner
    setDisplayTerm(newDisplayTerm); // render fetched data
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmitSearchTerm();
  };

  const handleUpdateInput = (inputName: string, value: string) => {
    setSearchTerm(value);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <form
        className="h-72 w-full max-w-xl flex flex-col items-center justify-around px-2 py-3"
        onSubmit={handleFormSubmit}
      >
        <h1 className="text-center font-extrabold text-blue border border-solid border-blue w-full py-2 px-1">
          {localText.translateTerm}
        </h1>
        <div className="font-bold w-full grid min-h-24 grid-cols-2">
          {translations.map((t, idx) => (
            <div
              key={idx}
              className={`${
                t.selected && "bg-gray-200"
              } flex justify-center items-center font-medium h-16 rounded-3xl target:bg-gray-600 target:text-white cursor-pointer`}
              onClick={(e) => handleSelectTranslation(e, t)}
            >
              <h1>{t.inputLangName}</h1>
              <img src={RightArrow} alt="to" className="w-10 px-2" />
              <h1>{t.outputLangName}</h1>
            </div>
          ))}
        </div>
        <div className="w-5/6">
          <FormInput
            type="text"
            placeholder={localText.enterTerm}
            id="enter-med-term"
            name="searchTerm"
            updateInput={handleUpdateInput}
            onSubmit={() => {}}
          />
        </div>

        <OKButton
          name="get information"
          type="submit"
          value={localText.getInfo}
          text={localText.getInfo}
          onClick={handleSubmitSearchTerm}
        />
      </form>
      <div className="relative flex-grow w-full flex justify-center items-center p-6">
        {isFetching && <Spinner size={16} />}
        {displayTerm && displayTerm.searchName.length > 0 && (
          <div className="bg-map-blue-50 shadow-xl rounded-2xl w-full max-w-2xl h-full p-4 flex flex-col items-center justify-between overflow-y-scroll overflow-x-hidden">
            <h1 className="font-bold text-green-dark text-center z-10">
              {displayTerm.searchName}
            </h1>
            <img src={DownArrow} alt="to" className="w-6"></img>
            <h1 className="w-content bg-green-dark text-white font-bold py-1 px-4 text-xl z-10">
              {displayTerm.translatedName.length > 0 &&
                displayTerm.translatedName}
            </h1>
            <p className="text-center z-10 font-semibold text-gray-800">
              {displayTerm.description}
            </p>
            <a className="text-blue-dark text-center z-10 break-all" href={displayTerm.url}>
              {displayTerm.url}
            </a>
            <img
              src={SearchIcon}
              className="absolute top-1/2 left-1/2 -mt-32 -ml-32 w-48 opacity-5"
            ></img>
          </div>
        )}
        {queryError && (
          <h1 className="bg-map-red-200 w-content px-3 py-2 text-map-red-800 rounded-full">
            Phrase Not Found
          </h1>
        )}
        {!queryError && !displayTerm && !isFetching && (
          <img
            src={SearchIcon}
            className="absolute top-1/2 left-1/2 -mt-16 -ml-16 w-32 opacity-20"
          ></img>
        )}
      </div>
    </div>
  );
};

export default TranslateTerms;
