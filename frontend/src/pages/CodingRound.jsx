import { Editor } from "@monaco-editor/react";
import axios from "axios";
import { useEffect } from "react";
export default function CodingRound() {
  useEffect(() => {
    axios({
      method: "post",
      url: "https://emkc.org/api/v2/piston/execute",
      data: {
        language: "javascript",
        version: "1.32.3",
        files: [
          {
            content: 'console.log("it works")',
          },
        ],
      },
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        //handle success
        console.log(response);
      })
      .catch((response) => {
        //handle error
        console.log(response);
      });
  }, []);
  return (
    <Editor
      height="90vh"
      defaultLanguage="javascript"
      defaultValue="// some comment"
    />
  );
}
