# Insurance Recommendation Chat - README

## Overview
This is a React-based chatbot application designed to assist users in selecting suitable insurance plans. The chatbot initiates a consultation process and engages in interactive communication.

## Features
- **Start Consultation:** Begins an interactive chat session.
- **User Input Handling:** Allows users to type and send messages.
- **API Integration:** Connects with a backend to process user messages.
- **Dynamic Message Display:** Supports formatted responses, including highlighted questions.
- **Error Handling:** Displays error messages if API requests fail.

## Technologies Used
- **Frontend:** React.js
- **Styling:** CSS
- **Backend API:** Express.js (or another backend service handling chat logic)
- **HTTP Requests:** Axios

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- npm (comes with Node.js)

### Steps
1. **Clone the Repository:**
   ```sh
   git clone https://github.com/your-repo/chatbot-app.git
   cd chatbot-app
   ```
2. **Install Dependencies:**
   ```sh
   npm install
   ```
3. **Run the Application:**
   ```sh
   npm start
   ```
4. **Backend Setup:**
   Ensure the backend is running at `http://localhost:5000/`.

## API Endpoints
- **Start Consultation:** `POST /api/start-consultation`
- **Send Message:** `POST /api/chat`

## Usage
1. Click the **Start Consultation** button to begin.
2. Type messages into the input box and press **Enter** or click **Send**.
3. The chatbot will respond dynamically.

## File Structure
```
/chatbot-app
├── src
│   ├── components
│   │   ├── ChatBox.js  # Main chat component
│   │   ├── chatBox.css # Styling
│   ├── App.js
│   ├── index.js
├── public
├── package.json
├── README.md
```

## Future Improvements
- Improve chatbot response logic.
- Implement authentication for personalized recommendations.
- Deploy frontend and backend to cloud services.

## License
This project is licensed under the MIT License.

---
Feel free to contribute by submitting issues and pull requests!

