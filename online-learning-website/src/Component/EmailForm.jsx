import React, { useState } from "react";
import axios from "axios";

function EmailForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call your backend API to send the email
    try {
      const response = await axios.post(
        "http://localhost:8080/api/send-email",
        { email }
      );
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
