import React from "react";
import Form from "./form";
import Results from "./results";
import Image from "next/image";
import logo1 from "../public/real.png";

const CopyKitt: React.FC = () => {
  const [prompt, setPrompt] = React.useState("");
  const [snippet, setSnippet] = React.useState("");
  const [keywords, setKeywords] = React.useState([]);
  const [hasResuls, setHasResults] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const CHARACTER_LIMIT: number = 72;

  const [value, setValue] = React.useState("ytUrl");
  const [filebase64, setFileBase64] = React.useState<string>("");

  const onSubmit = () => {
    if (value == "ytUrl") {
      console.log(value);

      const ENDPOINT: string = "http://localhost:8080/youtubeURL";

      console.log("Submitting: " + prompt);
      setIsLoading(true);
      fetch(`${ENDPOINT}?valid=${prompt}`)
        .then((res) => res.json())
        .then(onResult);
    } else if (value == "audio") {
      // on submit form

      // Submit your form with the filebase64 as
      // one of your fields
      console.log(filebase64);

      // helper function: generate a new file from base64 String
      const dataURLtoFile = (dataurl: any, filename: string) => {
        const arr = dataurl.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n) {
          u8arr[n - 1] = bstr.charCodeAt(n - 1);
          n -= 1; // to make eslint happy
        }
        return new File([u8arr], filename, { type: mime });
      };

      // generate file from base64 string
      const file = dataURLtoFile(filebase64, "audio");
      // put file into form data
      const data = new FormData();
      data.append("audio", file, file.name);

      const ENDPOINT: string = "http://localhost:8080/audio";

      console.log("Submitting: " + ":audio");
      setIsLoading(true);
      fetch(`${ENDPOINT}`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then(onResult);

      console.log(value);
    } else if (value == "pdf") {

      console.log(filebase64);

      // helper function: generate a new file from base64 String
      const dataURLtoFile = (dataurl: any, filename: string) => {
        const arr = dataurl.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n) {
          u8arr[n - 1] = bstr.charCodeAt(n - 1);
          n -= 1; // to make eslint happy
        }
        return new File([u8arr], filename, { type: mime });
      };

      // generate file from base64 string
      const file = dataURLtoFile(filebase64, "pdf");
      // put file into form data
      const data = new FormData();
      data.append("pdf", file, file.name);

      const ENDPOINT: string = "http://localhost:8080/pdf";

      console.log("Submitting: " + ":pdf");
      setIsLoading(true);
      fetch(`${ENDPOINT}`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then(onResult);

      

    }
  };

  const onResult = (data: any) => {
    setSnippet(data.Summary);
    setKeywords(data.message);
    setHasResults(true);
    setIsLoading(false);
  };
  // console.log(snippet)
  // console.log(keywords)

  const onReset = () => {
    setPrompt("");
    setHasResults(false);
    setIsLoading(false);
  };

  let displayedElement = null;

  if (hasResuls) {
    displayedElement = (
      <Results
        prompt={prompt}
        snippet={snippet}
        keywords={keywords}
        onBack={onReset}
      />
    );
  } else {
    displayedElement = (
      <Form
        filebase64={filebase64}
        setFileBase64={setFileBase64}
        hasResult={hasResuls}
        setHasResults={setHasResults}
        value={value}
        setValue={setValue}
        prompt={prompt}
        setPrompt={setPrompt}
        onSubmit={onSubmit}
        characterLimit={CHARACTER_LIMIT}
        isLoading={isLoading}
      />
    );
  }

  const gradientTextStyle =
    "text-white text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 font-light w-fit mx-auto ";

  return (
    <div className="h-screen flex">
      <div className="max-w-md m-auto p-2">
        <div className="bg-slate-900 p-6 rounded-md text-white">
          <div className="text-center my-6 content-center">
            <Image
              src={logo1}
              className="rounded-md  mx-auto mb-6"
              width={72}
              height={72}
              alt="BrandGenerator"
            />
            <h1 className={gradientTextStyle + " text-3xl font-medium "}>
              Condense.Ai
            </h1>
            <div className={gradientTextStyle + "  font-thin"}>
              Your Ai Summerizer
            </div>
          </div>

          {displayedElement}
        </div>
      </div>
    </div>
  );
};

export default CopyKitt;
