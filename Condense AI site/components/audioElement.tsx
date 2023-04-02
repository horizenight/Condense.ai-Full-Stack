

import React,{ useState }  from 'react';

interface AudioProps {
  filebase64:string;
  setFileBase64:any;
  
}

const AudioElement: React.FC<AudioProps> = (props) => {
  // const [filebase64,setFileBase64] = useState<string>("")


  // The Magic all happens here.
  function convertFile(files: FileList|null) {
    if (files) {
      const fileRef = files[0] || ""
      const fileType: string= fileRef.type || ""
      console.log("This file upload is of type:",fileType)
      const reader = new FileReader()
      reader.readAsBinaryString(fileRef)
      reader.onload=(ev: any) => {
        // convert it to base64
        props.setFileBase64(`data:${fileType};base64,${btoa(ev.target.result)}`)
      }
    }
  }


  return (
    <div className="App">
      <header className="App-header">
                
          <input type="file" onChange={(e)=> convertFile(e.target.files)} />
          <hr />
          { props.filebase64 &&
            <>
   
          
            {/* if it's an image */ }
            {/* if it's an image */ }
            {/* if it's an image */ }
            {(props.filebase64.indexOf("image/") > -1) && 
            <img src={props.filebase64} width={300} />
            }
            {/* if it's an image */ }
            {/* if it's an image */ }
            {/* if it's an image */ }


          
            {/* if it's a video */}
            {/* if it's a video */}
            {/* if it's a video */}
            {(props.filebase64.indexOf("video/") > -1)  && 
            <video controls >
              <source src={props.filebase64} />
            </video>
}
            {/* if it's a video */}
            {/* if it's a video */}
            {/* if it's a video */}
 
              
              
 
            {/* if it's a audio (music, sound) */}
            {/* if it's a audio (music, sound) */}
            {/* if it's a audio (music, sound) */}
              {(props.filebase64.indexOf("audio/") > -1)  && 
              <audio controls >
                <source src={props.filebase64} />
              </audio>
             }
            {/* if it's a audio (music, sound) */}
            {/* if it's a audio (music, sound) */}
            {/* if it's a audio (music, sound) */}
 

            {/* if it's a PDF */}
            {/* if it's a PDF */}
            {/* if it's a PDF */}
            {(props.filebase64.indexOf("application/pdf") > -1)  && 
             <embed src={props.filebase64} width="800px" height="2100px" />
             }
            {/* if it's a PDF */}
            {/* if it's a PDF */}
            {/* if it's a PDF */} 


              
              
              
            <hr />
            {/* <button> Submit and check the console</button>
             */}
            </>
          }
     
      </header>
    </div>
  );
}


export default AudioElement;

