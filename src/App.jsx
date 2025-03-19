import React, { useState } from "react";
import axios from "axios";

function App() {
  const [jobTitle, setJobTitle] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to start the interview
  const startInterview = async () => {
    if (!jobTitle) {
      alert("Please select a job title.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/start-interview", {
        jobTitle,
      });

      setCurrentQuestion(response.data.question);
      setInterviewStarted(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error starting interview:", error);
    }
  };

  // Function to handle user response and get next question
  const handleResponse = async () => {
    if (!userMessage) return;

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/interview", {
        userMessage,
        jobTitle,
        questionIndex,
      });

      const aiResponse = response.data.response;
      const nextQuestion = response.data.nextQuestion;

      // Store user response
      setResponses([
        ...responses,
        { question: currentQuestion, answer: userMessage },
      ]);

      // Update state with AI response and next question
      setCurrentQuestion(nextQuestion);
      setQuestionIndex(questionIndex + 1);
      setUserMessage("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error in interview:", error);
    }
  };

  // Function to get feedback
  const getFeedback = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/feedback", {
        userResponses: responses,
        jobTitle,
      });

      setFeedback(response.data.feedback);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching feedback:", error);
    }
  };

  return (
    <div className="App" style={{ textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif", backgroundColor: "#f3f4f6", minHeight: "100vh" }}>
  <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#4F46E5", marginBottom: "20px" }}>AI Interview Assistant</h1>

  {!interviewStarted ? (
    <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", width: "50%", margin: "auto" }}>
      <label htmlFor="jobTitle" style={{ fontSize: "16px", fontWeight: "bold", color: "#333" }}>Select Job Title:</label>
      <select
        id="jobTitle"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
        style={{ display: "block", width: "100%", padding: "10px", marginTop: "10px", borderRadius: "5px", border: "1px solid #ddd", backgroundColor: "#f9fafb" }}
      >
        <option value="">Select Job Title</option>
        <option value="Junior Developer">Junior Developer</option>
        <option value="Customer Service Representative">Customer Service Representative</option>
        <option value="Salesperson">Salesperson</option>
      </select>

      <button
        onClick={startInterview}
        disabled={loading}
        style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "#4F46E5", color: "#fff", fontSize: "16px", fontWeight: "bold", borderRadius: "5px", cursor: "pointer", transition: "background 0.3s" }}
        onMouseOver={(e) => e.target.style.backgroundColor = "#4338CA"}
        onMouseOut={(e) => e.target.style.backgroundColor = "#4F46E5"}
      >
        Start Interview
      </button>
    </div>
  ) : (
    <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", width: "60%", margin: "auto", animation: "fadeIn 0.5s ease-in-out" }}>
      <h2 style={{ fontSize: "22px", fontWeight: "bold", color: "#1F2937" }}>Interview: {jobTitle}</h2>
      <p style={{ fontSize: "18px", color: "#374151", marginBottom: "10px" }}>
        <strong>Question:</strong> {currentQuestion}
      </p>

      <textarea
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        placeholder="Your answer here"
        style={{ width: "100%", height: "150px", padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ddd", backgroundColor: "#f9fafb", marginTop: "10px" }}
      />

      <button
        onClick={handleResponse}
        disabled={loading}
        style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "#10B981", color: "#fff", fontSize: "16px", fontWeight: "bold", borderRadius: "5px", cursor: "pointer", transition: "background 0.3s" }}
        onMouseOver={(e) => e.target.style.backgroundColor = "#059669"}
        onMouseOut={(e) => e.target.style.backgroundColor = "#10B981"}
      >
        Submit Answer
      </button>

      {loading && <p style={{ fontSize: "16px", color: "#6B7280", marginTop: "10px", animation: "fadeIn 0.5s ease-in-out" }}>Loading...</p>}

      {questionIndex >= 6 && (
        <div>
          <button
            onClick={getFeedback}
            disabled={loading}
            style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "#8B5CF6", color: "#fff", fontSize: "16px", fontWeight: "bold", borderRadius: "5px", cursor: "pointer", transition: "background 0.3s" }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#7C3AED"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#8B5CF6"}
          >
            Get Feedback
          </button>
        </div>
      )}
    </div>
  )}

  {feedback && (
    <div style={{ backgroundColor: "#F3F4F6", padding: "15px", borderRadius: "10px", marginTop: "20px", width: "50%", margin: "auto", textAlign: "left", animation: "fadeIn 0.5s ease-in-out" }}>
      <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#1F2937" }}>AI Feedback:</h3>
      <p style={{ fontSize: "16px", color: "#374151" }}>{feedback}</p>
    </div>
  )}

  {/* Animation for fade-in effect */}
  <style>
    {`
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `}
  </style>
</div>
  )
}

export default App;
