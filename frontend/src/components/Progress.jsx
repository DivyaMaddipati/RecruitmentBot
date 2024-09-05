import { useState, useId } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import profileImage from "../pages/profile.jpg";
import { useUserProgress } from "../contexts/userProgressContext";

export default function Progress() {
  const navigate = useNavigate();

  // Step tracking state (1: MCQ, 2: Coding, 3: Interview, 4: Result & Feedback)
  const { userProgress, changeUserProgress } = useUserProgress();
  const location = useLocation();
  const steps = [
    { id: 0, name: "Resume Round", location: "/u" },
    { id: 1, name: "MCQ Round", location: "/u/test" },
    { id: 2, name: "Coding Round", location: "/u/code" },
    { id: 3, name: "Interview Round", location: "/u/voice" },
    { id: 4, name: "Result & Feedback", location: "/u/results" },
  ];

  return (
    <div className=" bg-gray-100 flex">
      {/* Left Pane: Tracking Steps */}
      <div className="w-1/4 bg-white shadow-lg p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold mb-4">Hiring Process</h1>
          {/* Profile Logo */}
          <div className="flex-shrink-0">
            <img
              src={profileImage}
              alt="Profile"
              className="h-12 w-12 rounded-full object-cover"
            />
          </div>
        </div>
        <ul className="space-y-4">
          {steps.map((step) => (
            <li key={step.id}>
              <div
                className={`rounded-lg cursor-pointer ${
                  step.id <= userProgress
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-500"
                }`}
                onClick={() => {
                  if (step.id <= userProgress) navigate(step.location);
                }}
              >
                {step.name}
                {/* {step.id < currentStep && (
                  <span className="ml-2 text-sm">(Completed)</span>
                )} */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
