import { Editor } from "@monaco-editor/react";
import axios from "axios";
import { useState, useEffect } from "react";

export default function CodingRound() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("// Start coding here...");
  const [problem, setProblem] = useState({
    title: "Two Sum",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]",
      },
    ],
    constraints: [
      "2 <= nums.length <= 104",
      "-109 <= nums[i] <= 109",
      "-109 <= target <= 109",
      "Only one valid answer exists.",
    ],
  });

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
        console.log(response);
      })
      .catch((response) => {
        console.log(response);
      });
  }, [language, code]);

  return (
    <section className="min-h-screen bg-gray-100 flex flex-col p-4">
      <header className="w-full max-w-7xl mb-4 flex justify-between items-center mx-auto">
        <h1 className="text-2xl font-bold text-gray-800">Coding Round</h1>
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

      {/* Main content area */}
      <div className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow-lg flex">
        {/* Left pane: coding problem */}
        <div className="w-1/3 p-4 border-r border-gray-300 text-left">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{problem.title}</h2>
          <p className="mb-4 text-base leading-relaxed text-gray-700 whitespace-pre-wrap">
            {problem.description}
          </p>

          <h3 className="font-semibold text-gray-700 text-lg">Examples:</h3>
          {problem.examples.map((example, index) => (
            <div key={index} className="my-2">
              <p className="text-base text-gray-800">
                <strong>Input:</strong> {example.input}
              </p>
              <p className="text-base text-gray-800">
                <strong>Output:</strong> {example.output}
              </p>
              {example.explanation && (
                <p className="text-base text-gray-600">
                  <strong>Explanation:</strong> {example.explanation}
                </p>
              )}
            </div>
          ))}

          <h3 className="font-semibold text-gray-700 text-lg">Constraints:</h3>
          <ul className="list-disc list-inside text-base text-gray-800">
            {problem.constraints.map((constraint, index) => (
              <li key={index}>{constraint}</li>
            ))}
          </ul>
        </div>

        {/* Resizable divider */}
        <div className="w-1 border-r border-gray-300 resize-x cursor-col-resize"></div>

        {/* Right pane: code editor */}
        <div className="w-2/3 p-4">
          <Editor
            height="75vh"
            language={language}
            value={code}
            onChange={(value) => setCode(value || "")}
            options={{
              fontSize: 16, // Adjusted font size for code editor
            }}
            theme="vs-dark"
          />
        </div>
      </div>
    </section>
  );
}
