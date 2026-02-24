"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [warning, setWarning] = useState("");

  const isValidUrl = (text: string): boolean => {
    try {
      new URL(text);
      return true;
    } catch {
      return false;
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      
      if (text && !isValidUrl(text)) {
        setWarning("Warning: The pasted text does not appear to be a valid URL");
      } else {
        setWarning("");
      }
    } catch (error) {
      console.error("Failed to read clipboard:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);
    
    if (value && !isValidUrl(value)) {
      setWarning("Warning: The text does not appear to be a valid URL");
    } else {
      setWarning("");
    }
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Submission logic will be added later
    console.log("Submitted URL:", url);
  };

  return (
    <div>
      <h1>Image Scraper</h1>
      
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={url}
            onChange={handleInputChange}
            placeholder="Enter URL"
          />
          <button type="button" onClick={handlePaste}>
            Paste
          </button>
        </div>
        
        {warning && <p>{warning}</p>}
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
