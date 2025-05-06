"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted consent
    const consentGiven = localStorage.getItem("groqChatConsent");
    if (!consentGiven) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("groqChatConsent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "80%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "90%",
        maxWidth: "500px",
        backgroundColor: "#1a1a1a",
        color: "#ffffff",
        zIndex: 99999,
        boxShadow: "0 0 0 100vmax rgba(0,0,0,0.7)",
        borderRadius: "8px",
        padding: "20px",
        border: "1px solid #333",
      }}
    >
      <h3
        style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}
      >
        Wichtiger Hinweis
      </h3>
      <p style={{ fontSize: "14px", marginBottom: "16px", color: "#e0e0e0" }}>
        Diese Website verwendet keine Cookies. Wir speichern nur Chats im
        normalen Modus und grundlegende Nutzungsdaten. Siehe unsere{" "}
        <Link
          href="/privacy-policy"
          style={{ color: "#66b3ff", textDecoration: "underline" }}
        >
          Datenschutzrichtlinie
        </Link>{" "}
        und{" "}
        <Link
          href="/terms"
          style={{ color: "#66b3ff", textDecoration: "underline" }}
        >
          Nutzungsbedingungen
        </Link>{" "}
        für weitere Informationen.
      </p>
      <button
        onClick={acceptCookies}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-2.5 px-4 rounded transition-colors duration-200"
        style={{
          border: "none",
          cursor: "pointer",
        }}
      >
        Ich akzeptiere
      </button>
    </div>
  );
}
