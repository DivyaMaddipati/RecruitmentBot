import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_backend_url}/candidates-data`)
      .then((response) => {
        // Handle success
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });
  }, []);

  return data.length > 0 ? (
    <section className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        Admin Dashboard
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-left">
              <th className="py-3 px-6 font-medium">Rank</th>
              <th className="py-3 px-6 font-medium">Candidate Name</th>
              <th className="py-3 px-6 font-medium">Resume Score</th>
              <th className="py-3 px-6 font-medium">MCQ Score</th>
              <th className="py-3 px-6 font-medium">Programming Score</th>
              <th className="py-3 px-6 font-medium">Total Score</th>
            </tr>
          </thead>
          <tbody>
            {data
              .sort((a, b) => b.total_score - a.total_score)
              .map((candidate, index) => (
                <tr
                  key={candidate.name}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="py-3 px-6">{index + 1}</td>
                  <td className="py-3 px-6">{candidate.name}</td>
                  <td className="py-3 px-6">
                    {candidate.resume_matching_percentage}%
                  </td>
                  <td className="py-3 px-6">{candidate.mcq_score}</td>
                  <td className="py-3 px-6">{candidate.programming_score}</td>
                  <td className="py-3 px-6 font-semibold">
                    {candidate.total_score}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  ) : (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center">
      <p className="text-gray-600">Loading candidate data...</p>
    </section>
  );
}
