import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [Values, setValues] = useState(initialState);

  const reset = () => {
    setValues(initialState);
  };

  const handleInputChange = (event) => {
    const handleinputchange = {
      ...Values,
      [event.target.name]: event.target.value,
    };
    setValues(handleinputchange);
  };

  return [Values, handleInputChange, setValues, reset];
};
