export default function Question({ question }) {
  return (
    <div>
      <p>{question.question}</p>
      {question.options.map((option, index) => (
        <div key={index}>
          <input
            type="radio"
            id={option}
            value={option}
            // checked={selectedValue === "option1"}
            // onChange={() => handleRadioChange("option1")}
          />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
    </div>
  );
}
