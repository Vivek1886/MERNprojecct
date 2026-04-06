# 🤖 AI Resume Analyzer

> An AI-powered web application that analyzes resumes and provides intelligent feedback using external AI APIs. The system helps job seekers improve their resumes by identifying missing skills, evaluating content quality, and suggesting improvements.

---

## ✨ Features

- 📄 Upload resumes (PDF / Text)
- 🔍 Extract and process resume content
- 🤖 AI-based analysis using external API
- 🛠️ Skill and keyword evaluation
- 📊 Resume scoring & feedback
- 💡 Suggestions for improvement
- 🎨 Clean and interactive UI

---

## 🧰 Tech Stack

### Frontend
- Vite
- HTML, CSS, JavaScript

### Backend
- Node.js
- Express.js

### Other
- AI API (for resume analysis)
- File handling (resume uploads)

---

## 📁 Project Structure

```
AI-Resume-Analyzer/
│
├── Backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
└── Frontend/
    ├── src/
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## ⚙️ How It Works

1. **User uploads a resume**
2. **Backend extracts text** from the file
3. **Resume data is sent** to an AI API
4. **AI analyzes:**
   - Skills
   - Keywords
   - Content quality
5. **System returns:**
   - Score
   - Feedback
   - Suggestions

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file:

```env
API_KEY=your_api_key_here
PORT=5000
```

Run the backend:

```bash
npm start
```

### 3. Frontend Setup

```bash
cd ../Frontend
npm install
npm run dev
```

---

## 🌐 Deployment

| Service    | Platform           |
|------------|--------------------|
| Backend    | Render             |
| Frontend   | Vercel / Netlify   |

---

## ⚠️ Limitations

- Depends on external AI API
- Accuracy varies based on input resume
- Requires internet connection

---

## 🔮 Future Improvements

- [ ] Add job description matching
- [ ] Improve scoring algorithm
- [ ] Add user authentication
- [ ] Resume history tracking

---

## 👨‍💻 Author

**Vivek Singh Rawat**

---

## 📄 License

This project is open source. Feel free to use and contribute!
