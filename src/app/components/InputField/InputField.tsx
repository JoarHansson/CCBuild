"use client";

import { useState } from "react";

type InputFieldProps = {
  type: string;
  name: string;
  placeholder: string;
  label: string;
  onChange: (formData: Record<string, string>) => void;
};

//TODO: style field after DD delivers design
//give parent element a state to recieve data from input and save for submit.
//edit this component to recieve state from parent

export const InputField = ({
  type,
  name,
  placeholder,
  label,
  onChange,
}: InputFieldProps) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setValue(input);
    onChange({ ...{ [name]: input } });
  };

  return (
    <>
      <div>
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        ></input>
      </div>
    </>
  );
};
