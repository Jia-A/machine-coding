import { FormData } from "./Form";

type Props = {
  formData: FormData;
  setCurrentStep : React.Dispatch<React.SetStateAction<number>>
};

const FormStep3 = ({ formData, setCurrentStep }: Props) => {
  const handleSubmit = () => {
    alert(JSON.stringify(formData, null, 2));
  };

  return (
    <>
    <button onClick={()=> setCurrentStep(2)}>Back</button>
    <div className="flex flex-col w-fit bg-mauve-200 p-10 m-5 rounded gap-3">
      <h2 className="text-lg font-semibold">Review your details</h2>
      <div className="flex flex-col gap-2">
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} className="flex gap-2">
            <span className="font-medium capitalize">{key}:</span>
            <span>{value || "-"}</span>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        className="p-3 bg-mauve-500 text-white rounded"
      >
        Submit
      </button>
    </div>
    </>
  );
};

export default FormStep3;
