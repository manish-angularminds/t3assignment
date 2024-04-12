"use client";
import React, { useRef, useState } from "react";
import Header from "../../Components/Header";
import { useParams, useRouter } from "next/navigation";

const Verify = () => {
  const [values, setValues] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [error, setError] = useState<string>("");

  const router = useRouter();
  const { id } = useParams();

  const inputRefs = Array.from({ length: 8 }, () =>
    useRef<HTMLInputElement>(null),
  );

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const inputValue = e.target.value;
    if (/^\d$/.test(inputValue)) {
      const newValues = [...values];
      newValues[index] = inputValue;
      setValues(newValues);

      if (index < 7 && inputRefs[index + 1]?.current) {
        inputRefs[index + 1]?.current?.focus();
      }
    } else {
      const newValues = [...values];
      newValues[index] = "";
      setValues(newValues);
    }
  };

  const handleVerify = () => {
    if (values.join("") === "12345678") {
      router.push(`/Interests/${id}`);
    } else {
      setError("Incorrect OTP use 12345678");
    }
  };

  return (
    <div>
      <Header />
      <div
          className="w-800 h-691 flex flex-col gap-4 rounded-md border border-gray-400 bg-white p-8"
          style={{ opacity: 1, margin: "0 auto", width: 576, height: 500 }}
        >
          <h2
            className="font-inter mb-4 text-2xl font-semibold"
            style={{
              fontSize: "32px",
              fontWeight: 600,
              lineHeight: "38.73px",
              textAlign: "center",
            }}
          >
            Verify your email
          </h2>
          <h4
            className="font-inter mb-10 text-center"
            style={{
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "19.36px",
              textAlign: "center",
            }}
          >
            Enter the 8-digit code you have received on <br />
            <span className="font-semibold">anu***@gmail.com</span>
          </h4>
          <div className="flex flex-col">
  <label
    style={{
      fontSize: "16px",
      fontWeight: 500,
      lineHeight: "19.34px",
      textAlign: "left",
    }}
  >
    Code
  </label>
  <div className="flex mt-2">
    {values.map((value, index) => (
      <input
        key={index}
        className="mx-1 h-12 w-12 rounded-md border border-solid border-gray-300 p-3 flex-grow"
        type="text"
        maxLength={1}
        value={value}
        onChange={(e) => handleChange(index, e)}
        ref={inputRefs[index]}
      />
    ))}
  </div>
</div>

<button
  className="rounded bg-black px-4 py-2 mt-10 font-bold text-white"
  onClick={handleVerify}
  style={{
    fontSize: "16px",
    fontWeight: 500,
    lineHeight: "19.36px",
    letterSpacing: "0.07em",
    textAlign: "center",
    width: "100%", // Set button width to 100%
  }}
>
  VERIFY
</button>
        </div>
  
    </div>
    
  );
};

export default Verify;














































