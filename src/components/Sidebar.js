import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../utils/api";
import "./Sidebar.css";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";

function Sidebar({ onOpenSettings }) {
  const [audioHistory, setAudioHistory] = useState([]);
  const [selectedFileType, setSelectedFileType] = useState("text");
  const [isConverting, setIsConverting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newFilename, setNewFilename] = useState("");

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  const userId = localStorage.getItem("userId");

  const speakText = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    const onStart = () => setIsConverting(true);
    const onEnd = () => setIsConverting(false);

    window.addEventListener("conversionStart", onStart);
    window.addEventListener("conversionEnd", onEnd);

    return () => {
      window.removeEventListener("conversionStart", onStart);
      window.removeEventListener("conversionEnd", onEnd);
    };
  }, []);

  useEffect(() => {
    if (!isLoggedIn || !userId || isConverting) return;

    const fetchAudioHistory = async () => {
      try {
        const response = await api.get(`/audio-history/${userId}`);
        if (Array.isArray(response.data)) {
          const sorted = response.data.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
          setAudioHistory(sorted);
        }
      } catch (err) {
        console.error("Error fetching audio history:", err);
      }
    };

    fetchAudioHistory();
    const intervalId = setInterval(fetchAudioHistory, 5000);
    return () => clearInterval(intervalId);
  }, [isLoggedIn, userId, isConverting]);

  const handleDelete = async (audioId) => {
    if (!window.confirm("Are you sure you want to delete this audio file?")) return;
    try {
      await api.delete("/delete_audio", {
        data: { audio_id: audioId, user_id: userId },
      });
      setAudioHistory((prev) => prev.filter((file) => file.id !== audioId));
    } catch (error) {
      alert("Failed to delete audio. Please try again.");
    }
  };

  const handleRename = async (audioId) => {
    if (!newFilename.trim()) return;
    try {
      await api.post("/rename_audio", {
        audio_id: audioId,
        new_filename: newFilename,
      });
      setAudioHistory((prev) =>
        prev.map((file) =>
          file.id === audioId ? { ...file, filename: newFilename } : file
        )
      );
      setEditingId(null);
      setNewFilename("");
    } catch (error) {
      alert("Rename failed.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const fileTypeLabels = {
    text: "Text to Audio",
    pdf: "PDF to Audio",
    image: "Image to Audio",
  };

  const handleFileTypeChange = (e) => {
    const newType = e.target.value;
    setSelectedFileType(newType);
    speakText(`Selected ${fileTypeLabels[newType]}`);
  };

  const filtered = audioHistory.filter((file) => file.type === selectedFileType);

  if (!isLoggedIn) return null;

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src="/logo1.svg" alt="headphones" className="register-logo2" />
        <h2>LitEcho</h2>
      </div>

      <nav>
        <ul>
          <li>
            <NavLink to="/home" className={({ isActive }) => (isActive ? "active-link" : "")}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/convert" className={({ isActive }) => (isActive ? "active-link" : "")}>
              Audio Converter
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="file-type-filter">
        <select value={selectedFileType} onChange={handleFileTypeChange}>
          <option value="text">Text to Audio</option>
          <option value="pdf">PDF to Audio</option>
          <option value="image">Image to Audio</option>
        </select>
      </div>

      <div className="audio-history">
        <h3>{fileTypeLabels[selectedFileType]} History</h3>
        {filtered.length > 0 ? (
          <ul>
            {filtered.map((file) => (
              <li key={file.id}>
                {editingId === file.id ? (
                  <input
                    type="text"
                    value={newFilename}
                    onChange={(e) => setNewFilename(e.target.value)}
                    onBlur={() => handleRename(file.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleRename(file.id);
                    }}
                    autoFocus
                  />
                ) : (
                  <a
                    href={`https://techtones-flaskapp-1.onrender.com/static/audio/${file.filename}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onDoubleClick={(e) => {
                      e.preventDefault();
                      setEditingId(file.id);
                      setNewFilename(file.filename);
                    }}
                    title="Click to play, double-click to rename"
                    style={{
                      cursor: "pointer",
                      marginRight: "10px",
                      color: "#007bff",
                      textDecoration: "underline",
                    }}
                  >
                    {file.filename}
                  </a>
                )}
                <RiDeleteBin5Line
                  className="delete-button"
                  onClick={() => handleDelete(file.id)}
                  title={`Delete audio file ${file.filename}`}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>No {fileTypeLabels[selectedFileType]} files found.</p>
        )}
      </div>

      <div className="sidebar-footer">
        <button className="logout" onClick={handleLogout} title="Logout">
          Logout
        </button>
        {onOpenSettings && (
          <button className="settings" onClick={onOpenSettings} title="Open Settings">
            <FiSettings size={20} />
          </button>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
