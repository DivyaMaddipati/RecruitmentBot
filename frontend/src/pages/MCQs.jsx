import axios from "axios";
import { useEffect, useState } from "react";
import Question from "../components/Question";

export default function MCQs() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_backend_url}/test-questions`)
      .then((response) => {
        // handle success
        setQuestions(response.data);
      })
      .catch((response) => {
        // handle error
        console.log(response);
      });
  }, []);

  return questions.length > 0 ? (
    <section className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        {questions.map((section, sectionIndex) => (
          <section key={section.section} className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {section.section}
            </h2>
            <div className="space-y-6">
              {section.questions.map((question, questionIndex) => (
                <div
                  key={questionIndex}
                  className="bg-white shadow-lg rounded-lg p-6"
                >
                  <div className="flex items-start">
                    <span className="mr-4 text-lg font-bold text-gray-700">
                      {sectionIndex + 1}.{questionIndex + 1}
                    </span>
                    <div className="flex-grow">
                      <Question question={question} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  ) : (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center">
      <p className="text-xl font-semibold text-gray-700">
        Loading questions...
      </p>
    </section>
  );
}
