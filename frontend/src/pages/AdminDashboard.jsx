import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [data, setData] = useState([]);
  useEffect(() => {
    try {
      axios
        .get(`${import.meta.env.VITE_backend_url}/candidates-data`)
        .then((response) => {
          //handle success
          console.log(response.data);
          setData(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return data ? (
    <section>
      <h1>AdminDashboard</h1>
      {data.map((candidate) => (
        <div key={candidate.name}>
          <p>{candidate.name}</p>
          <p>resume score: {candidate.resume_matching_percentage}</p>
          <p>quiz score: {candidate.mcq_score}</p>
          <p>programming score: {candidate.programming_score}</p>
        </div>
      ))}
    </section>
  ) : null;
}
