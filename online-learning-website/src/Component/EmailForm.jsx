import React, { useState } from "react";
import axios from "axios";

const base_url = "https://lms-backend-1-je3i.onrender.com";
// const base_url = "http://localhost:8080";

function EmailForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call your backend API to send the email
    try {
      const response = await axios.post(`${base_url}/api/send-email`, {
        email,
      });
      if (response.status === 200) {
        alert("Email sent successfully!");
      } else {
        alert("Failed to send email.");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <button type="submit">Send Email</button>
    </form>
  );
}

export default EmailForm;
