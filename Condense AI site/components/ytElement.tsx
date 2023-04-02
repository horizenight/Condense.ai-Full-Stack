interface YtProps {
    value:string

    prompt: string;
    setPrompt: any;
    characterLimit: number;
    
}






  
  const YtElement: React.FC<YtProps> = (props) =>{

    const updatePromptValue = (text: string) => {
        if (text.length <= props.characterLimit) {
          props.setPrompt(text);
        }
      };
      
    return (
     <>
     <input
          className="p-2 w-full rounded-md focus:outline-teal-400 focus:outline text-slate-700"
          type="text"
          placeholder="Youtube Video Url"
          value={props.prompt}
          onChange={(e) => updatePromptValue(e.currentTarget.value)}
        ></input>
       
        </>
    )
      }
export default YtElement