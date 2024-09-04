import axios from "axios";
import { useEffect, useState } from "react";
import Question from "../components/Question";

export default function MCQs() {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_backend_url}/test-questions`)
      .then((response) => {
        //handle success
        console.log(response.data);
        setQuestions(response.data);
      })
      .catch((response) => {
        //handle error
        console.log(response);
      });
  }, []);
  return questions ? (
    <section>
      {console.log(questions)}
      {questions.map((section) => (
        <section key={section.section}>
          <h2>{section.section}</h2>
          {section.questions.map((question, index) => (
            <Question question={question} />
          ))}
        </section>
      ))}
    </section>
  ) : null;
}
