import { FormData, FormErrors } from "./Form";

type Form1 = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  formData: FormData;
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
  errors: FormErrors;
};
const FormStep1 = ({
  setCurrentStep,
  setFormData,
  formData,
  setErrors,
  errors,
}: Form1) => {
  const handleOnChange = (e) => {
    if (e.target.name === "firstname") {
      setFormData((prev) => ({ ...prev, firstname: e.target.value }));
      setErrors((prev)=> ({...prev, firstname : ""}))
    }
    if (e.target.name === "lastname") {
      setFormData((prev) => ({ ...prev, lastname: e.target.value }));
      setErrors((prev)=> ({...prev, lastname : ""}))
    }
    if (e.target.name === "dob") {
      setFormData((prev) => ({ ...prev, dob: e.target.value }));
      setErrors((prev)=> ({...prev, dob : ""}))
    }
  };

const handleStep1 = () => {
  const newErrors : FormErrors = {}
  if (!formData.firstname) newErrors.firstname = 'Required'
  if (!formData.lastname) newErrors.lastname = 'Required'
  if (!formData.dob) newErrors.dob = 'Required'

  setErrors(newErrors)

  if (Object.keys(newErrors).length > 0) return

  setCurrentStep(2)
}
  return (
    <div className="flex flex-col justify-center w-fit bg-mauve-200 p-10 m-5 rounded gap-3">
      <div className="flex flex-col gap-1">
        <label htmlFor="firstname">First Name</label>
        <input
          name="firstname"
          type="text"
          placeholder="First Name"
          required
          className="p-3 border border-mauve-500 rounded"
          onChange={(e) => handleOnChange(e)}
          value={formData.firstname}
        />
        {errors.firstname && <div>Required field is empty.</div>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="lastname">Last Name</label>
        <input
          name="lastname"
          type="text"
          placeholder="Last Name"
          required
          className="p-3 border border-mauve-500 rounded"
          onChange={(e) => handleOnChange(e)}
          value={formData.lastname}
        />
        {errors.lastname && <div>Required field is empty.</div>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="dob">Date of birth</label>
        <input
          name="dob"
          type="date"
          required
          className="p-3 border border-mauve-500 rounded"
          onChange={(e) => handleOnChange(e)}
          value={formData.dob}
        />
        {errors.dob && <div>Required field is empty.</div>}
      </div>
      <button  className="p-3 bg-mauve-500 text-white rounded" type="submit" onClick={handleStep1}>
        Next step
      </button>
    </div>
  );
};

export default FormStep1;
