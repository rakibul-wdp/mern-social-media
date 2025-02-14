import { useState } from "react";

const GuestCredentials = () => {
  const [copied, setCopied] = useState("");

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopied(field);

    setTimeout(() => setCopied(""), 1500);
  };

  return (
    <div className="absolute bottom-4 right-4 bg-white p-4 rounded-md shadow-md text-sm">
      <h3 className="font-semibold mb-2">Guest User Credentials</h3>
      <p className="mb-1 text-base">
        Username: <span className="font-semibold">atg</span>{" "}
        <span
          className="text-blue-500 cursor-pointer hover:underline"
          onClick={() => handleCopy("atg", "username")}
        >
          copy
        </span>
        {copied === "username" && (
          <span className="text-green-500 ml-2">Copied!</span>
        )}
      </p>
      <p className="text-base">
        Password: <span className="font-semibold">atg&123</span>{" "}
        <span
          className="text-blue-500 cursor-pointer hover:underline"
          onClick={() => handleCopy("atg&123", "password")}
        >
          copy
        </span>
        {copied === "password" && (
          <span className="text-green-500 ml-2">Copied!</span>
        )}
      </p>
    </div>
  );
};

export default GuestCredentials;
