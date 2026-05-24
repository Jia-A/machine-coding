"use client";
import { useState } from "react";
import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import FormStep3 from "./FormStep3";

const initialState = {
    firstname : "",
    lastname : "",
    dob : "",
    email : "", 
    password : ""
}

export type FormData = typeof initialState
export type FormErrors = Partial<Record<keyof FormData, string>>


const Form = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>(initialState);
const [errors, setErrors] = useState<FormErrors>({})
  return (
    <div>
      {currentStep === 1 && (
        <FormStep1 setCurrentStep={setCurrentStep} setFormData={setFormData} setErrors={setErrors} errors={errors} formData={formData} />
      )}
      {currentStep === 2 && (
        <FormStep2 setCurrentStep={setCurrentStep} setFormData={setFormData} setErrors={setErrors} errors={errors} formData={formData} />
      )}
      {currentStep === 3 && <FormStep3 formData={formData} setCurrentStep={setCurrentStep}/>}
    </div>
  );
};

export default Form;
