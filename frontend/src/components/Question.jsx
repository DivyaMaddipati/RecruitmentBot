import { useState } from "react";

export default function Question({ question }) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="space-y-4">
      {/* Bold and left-align the question */}
      <p className="font-bold text-gray-800 text-left">{question.question}</p>

      {/* Render options with labels (a, b, c, d) and radio buttons */}
      <ul className="space-y-2">
        {question.options.map((option, index) => (
          <li key={option} className="flex items-center space-x-2 text-left">
            <input
              type="radio"
              id={`option-${option}`}
              name={`question-${question.id}`}
              value={option}
              checked={selectedOption === option}
              onChange={() => handleOptionChange(option)}
              className="form-radio text-blue-600"
            />
            <label htmlFor={`option-${option}`} className="flex items-center">
              <span className="font-bold mr-2">
                {String.fromCharCode(97 + index)}.
              </span>
              <span>{option}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
