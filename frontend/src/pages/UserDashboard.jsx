import { useId } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    <section>
      <form onSubmit={handleSubmit(submit)}>
        <label htmlFor={id}>Upload your resume</label>
        <input
          className="block"
          type="file"
          id={id}
          {...register("resume", { required: true })}
          accept=".pdf"
        />
        <button type="submit">submit</button>
      </form>
    </section>
  );
}
