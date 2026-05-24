import { useState } from "react";
import { FormData, FormErrors } from "./Form";
const PASSWORD_REGEX = /^(?=.*\d).{8,}$/;
const EMAIL_MATCH = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
type Form1 = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  formData: FormData;
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
  errors: FormErrors;
};
const FormStep2 = ({
  setCurrentStep,
  setFormData,
  formData,
  setErrors,
  errors,
}: Form1) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleOnChange = (e) => {
    if (e.target.name === "email") {
      setFormData((prev) => ({ ...prev, email: e.target.value }));
      setErrors((prev) => ({ ...prev, email: "" }));
    }
    if (e.target.name === "password") {
      setFormData((prev) => ({ ...prev, password: e.target.value }));
      setErrors((prev) => ({ ...prev, password: "" }));
    }
    if (e.target.name === "confirm password") {
      setConfirmPassword(e.target.value);
    }
  };

  const handleStep2 = () => {
    const newErrors: FormErrors = {};
    if (!formData.email || !EMAIL_MATCH.test(formData.email)) newErrors.email = "Please enter valid email";
    if (!formData.password || !PASSWORD_REGEX.test(formData.password))
      newErrors.password =
        "Password must be at least 8 characters and contain a number";

   if (formData.password !== confirmPassword) {
  newErrors.password = newErrors.password ?? "Password Mismatch"
}

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;
    setCurrentStep(3);
  };
  return (
    <>
    <button onClick={()=> setCurrentStep(1)}>Back</button>
        <div className="flex flex-col justify-center w-fit bg-mauve-200 p-10 m-5 rounded gap-3">
      <div className="flex flex-col gap-1">
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="p-3 border border-mauve-500 rounded"
          onChange={(e) => handleOnChange(e)}
          value={formData.email}
        />
        {errors.email && <div>{errors.email}</div>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          min={8}
          className="p-3 border border-mauve-500 rounded"
          onChange={(e) => handleOnChange(e)}
          value={formData.password}
        />
        {errors.password && <div>{errors.password}</div>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="confirm password">Confirm Password</label>
        <input
          name="confirm password"
          type="password"
          placeholder="Confirm Password"
          required
          className="p-3 border border-mauve-500 rounded"
          onChange={(e) => handleOnChange(e)}
          value={confirmPassword}
        />
      </div>
      <button
        className="p-3 bg-mauve-500 text-white rounded"
        type="submit"
        onClick={handleStep2}
      >
        Next step
      </button>
    </div></>

  );
};

export default FormStep2;
