import React, { useState } from "react";
import { FiX } from "../../Icons";

export const EmailComponent = ({ isOpen, onClose, exportref }) => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSendEmail = () => {
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <span>Email this widget</span>
              <button className="close-icon" onClick={onClose}>
                <FiX size={24} />
              </button>
            </div>
            <div className="modal-body">
              <div className="input-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
              <div className="input-group">
                <label>Subject:</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Subject"
                />
              </div>
              <div className="input-group">
                <label>Message:</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type any Message"
                  rows="3"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={onClose}>Cancel</button>
              <button onClick={handleSendEmail}>Send Email</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmailComponent;
