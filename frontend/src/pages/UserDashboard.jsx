import { useId } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import profileImage from "./profile.jpg";

export default function UserDashboard() {
  const { handleSubmit, register } = useForm();
  const id = useId();
  const navigate = useNavigate();

  const submit = async (data) => {
    console.log(data.resume);
    const bodyFormData = new FormData();
    bodyFormData.append("resume", data.resume[0]);

    axios({
      method: "post",
      url: `${import.meta.env.VITE_backend_url}/upload-resume`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        //handle success
        navigate("/u/round1");
        console.log(response);
      })
      .catch((response) => {
        //handle error
        console.log(response);
      });
  };

  return (
    <section className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Header */}
      <header className="bg-gray-800 text-white p-6 w-full">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-left">
            Welcome to Your Dashboard
          </h1>
          {/* Profile Logo */}
          <div className="flex-shrink-0">
            <img
              src={profileImage}
              alt="Profile"
              className="h-12 w-12 rounded-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-grow container mx-auto p-8">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Upload Your Resume
          </h2>
          <form onSubmit={handleSubmit(submit)} className="space-y-4">
            <div>
              <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700"
              >
                Select a PDF file
              </label>
              <input
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300"
                type="file"
                id={id}
                {...register("resume", { required: true })}
                accept=".pdf"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
