import { useState } from "react";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div style={{ padding: "20px" }}>
      <div role="tablist" aria-label="Profile Tabs">
        <button
  role="tab"
  aria-selected={activeTab === "profile"}
  onClick={() => setActiveTab("profile")}
  onKeyDown={(e) => {
    if (e.key === "ArrowRight") {
      setActiveTab("skills");
    }
  }}
>
  Profile
</button>

        <button
  role="tab"
  aria-selected={activeTab === "skills"}
  onClick={() => setActiveTab("skills")}
  onKeyDown={(e) => {
    if (e.key === "ArrowRight") {
      setActiveTab("contact");
    }
    if (e.key === "ArrowLeft") {
      setActiveTab("profile");
    }
  }}
>
  Skills
</button>

        <button
  role="tab"
  aria-selected={activeTab === "contact"}
  onClick={() => setActiveTab("contact")}
  onKeyDown={(e) => {
    if (e.key === "ArrowLeft") {
      setActiveTab("skills");
    }
  }}
>
  Contact
</button>
      </div>

      <div
        role="tabpanel"
        style={{ marginTop: "20px" }}
      >
        {activeTab === "profile" && <p>This is the Profile tab.</p>}
        {activeTab === "skills" && <p>This is the Skills tab.</p>}
        {activeTab === "contact" && <p>This is the Contact tab.</p>}
      </div>
    </div>
  );
}