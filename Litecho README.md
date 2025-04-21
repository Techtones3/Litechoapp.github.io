
# LitEcho - Text & File to Audio Converter

LitEcho is an inclusive full-stack web application that converts text, PDFs, and images into audio. It helps users, especially those with visual impairments, to easily transform written content into spoken words.

---

## 🌟 Features

- 🎤 Convert **Text / PDF / Image** to audio
- 🖼️ OCR support for scanned documents
- 🌐 Translate text to different languages before conversion
- 🗣️ Voice customization with regional options
- 🌓 Dark Mode & Color-Blind Mode for accessibility
- 📁 Audio download and categorized playback history

---

## 🚀 Live Demo

👉 Try it here: [https://litecho-1.vercel.app](https://litecho-1.vercel.app)

---

## 🖼️ Screenshots

### ✅ Home Page  
![Home](./screenshots/home.png)

### 🎧 Audio Converter Modes  
![Audio Converter](./screenshots/audio-converter.png)

### 🔊 Voice & Language Options  
![Voice Selection](./screenshots/voice-language.png)  
![Language Selection](./screenshots/language-select.png)

### ⏩ Playback Speed Control  
![Playback Speed](./screenshots/playback-speed.png)

### 📄 PDF & 🖼️ Image to Audio  
![PDF Conversion](./screenshots/pdf-conversion.png)  
![Image Conversion](./screenshots/image-conversion.png)

### 📂 Audio History  
![Text History](./screenshots/history-text.png)  
![PDF History](./screenshots/history-pdf.png)  
![Image History](./screenshots/history-image.png)

### ℹ️ About, Help & Settings  
![About](./screenshots/about.png)  
![Help](./screenshots/help.png)  
![Settings](./screenshots/settings.png)

### 🌙 Dark & Color-Blind Modes  
![Dark Mode](./screenshots/dark-mode.png)  
![Color Blind Mode](./screenshots/color-blind.png)

### 🌐 Google Translate Integration  
![Translate](./screenshots/translate.png)

---

## 🧱 Tech Stack

- **Frontend**: React + Tailwind CSS
- **Backend**: Flask + SQLAlchemy
- **OCR**: Tesseract via `pytesseract`
- **TTS**: edge-tts
- **Deployment**: Vercel (frontend), Render (backend)

---

## 📦 Setup Instructions

### Backend (Flask)
```bash
cd flask-backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

---

## 🐳 Docker (Optional)

```bash
cd flask-backend
docker build -t litecho-backend .
docker run -p 5000:5000 litecho-backend
```

---

## 🧭 Navigation

- `/home` – Welcome Page  
- `/convert` – Audio Converter  
- `/about` – About the App  
- `/help` – User Guide & FAQs  
- `/settings` – Accessibility Settings

---


## 🙋‍♀️ Developed By

**Ragasri Lakshmi Kakarla**
**Mohammed Momin Khizar Uddin**
**Mounika Narra**
**Deepthi Tanubuddi**
