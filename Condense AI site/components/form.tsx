import Dropdown from "./dropdown";
import  YtElement from "./ytElement";
import  PdfElement from "./pdfElement";
import  AudioElement from "./audioElement";
import { prependOnceListener } from "process";

interface FormProps {
    filebase64:string;
    setFileBase64:any;
    hasResult : boolean;
    setHasResults: any;
    value : string;
    setValue: any;
    prompt: string;
    setPrompt: any;
    onSubmit: any;
    isLoading: boolean;
    characterLimit: number;
  }
  




  const Form: React.FC<FormProps> = (props) => {
    const isPromptValid = props.prompt.length < props.characterLimit;

  
    let statusColor = "text-slate-500";
    let statusText = null;
    if (!isPromptValid) {
      statusColor = "text-red-400";
      statusText = `Input must be less than ${props.characterLimit} characters.`;
    }


    let inuputElement = null;



if(props.value === "ytUrl"){

inuputElement = (<YtElement  prompt={props.prompt} characterLimit={props.characterLimit} value={props.value} setPrompt={props.setPrompt}/>)
}
else if (props.value === "audio"){
inuputElement = (<AudioElement filebase64 = {props.filebase64}  setFileBase64 = {props.setFileBase64}/>)
}
else if (props.value === "pdf"){

inuputElement = (<AudioElement filebase64 = {props.filebase64}  setFileBase64 = {props.setFileBase64}/>)
}






  
    return (
      <>
        <div className="mb-6 text-slate-400">
          <p>
           Choose input for what you want to Summerize
          </p>
        </div>
        {/* Dropdown Component */}

        <Dropdown value={props.value} setValue={props.setValue}/>


        {/* Input Component */}

        {inuputElement}

        <div className={statusColor + " flex justify-between my-2 mb-6 text-sm"}>
          <div>{statusText}</div>
          <div>
            {props.prompt.length}/{props.characterLimit}
          </div>
        </div>
       
        <button
          className="bg-gradient-to-r from-teal-400 
          to-blue-500 disabled:opacity-50 w-full p-2 rounded-md text-lg"
          onClick={props.onSubmit}
          disabled={props.isLoading || !isPromptValid}
        >
          Submit
        </button>
      </>
    );
  };
  
  export default Form;