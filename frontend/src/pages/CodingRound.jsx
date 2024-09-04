import { Editor } from "@monaco-editor/react";
import axios from "axios";
import { useState, useEffect } from "react";

export default function CodingRound() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("// Start coding here...");

  useEffect(() => {
    axios({
      method: "post",
      url: "https://emkc.org/api/v2/piston/execute",
      data: {
        language: language,
        version: "1.32.3",
        files: [
          {
            content: code,
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
  }, [language, code]);

  return (
    <section className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <header className="w-full max-w-7xl mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Coding Round
        </h1>
        {/* Language Dropdown */}
        <div className="relative">
          <label htmlFor="language" className="mr-2 font-semibold text-gray-700">
            Language:
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border border-gray-300 rounded-md p-2 text-gray-800"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="csharp">C#</option>
          </select>
        </div>
      </header>
      <div className="w-full max-w-7xl bg-white rounded-lg shadow-lg p-4">
        <Editor
          height="75vh"
          language={language}
          value={code}
          onChange={(value) => setCode(value || "")}
          options={{
            fontSize: 16, // Increased font size
          }}
          theme="vs-dark"
        />
      </div>
    </section>
  );
}
