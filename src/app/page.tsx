"use client";

import { useState, useEffect } from "react";

export default function ExamPage() {
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Prevent right-click globally on the page just in case
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+A, F12, Ctrl+Shift+I, etc.
      if (
        (e.ctrlKey || e.metaKey) &&
        ["c", "v", "x", "a"].includes(e.key.toLowerCase())
      ) {
        e.preventDefault();
      }
      if (e.key === "F12") {
        e.preventDefault();
      }
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") {
        e.preventDefault();
      }
    };

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId,
          studentName,
          q1,
          q2,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit exam");
      }

      setSubmitSuccess(true);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">ส่งข้อสอบสำเร็จ</h2>
          <p>ระบบได้บันทึกคำตอบของคุณเรียบร้อยแล้ว</p>
        </div>
      </div>
    );
  }

  return (
    <main
      className="min-h-screen p-8 max-w-3xl mx-auto"
      onCopy={(e) => e.preventDefault()}
      onPaste={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
    >
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">ข้อสอบปลายภาค</h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">รหัสนักเรียน</label>
              <input
                type="text"
                required
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full border rounded p-2"
                placeholder="เช่น 12345"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">ชื่อ-นามสกุล</label>
              <input
                type="text"
                required
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full border rounded p-2"
                placeholder="ชื่อ นามสกุล"
              />
            </div>
          </div>

          <hr className="my-6" />

          <div className="space-y-4">
            <div>
              <p className="font-medium mb-2">1. จงอธิบายความหมายของระบบสารสนเทศ (Information System)?</p>
              <textarea
                required
                value={q1}
                onChange={(e) => setQ1(e.target.value)}
                className="w-full border rounded p-3 h-32"
                placeholder="พิมพ์คำตอบที่นี่ (ไม่สามารถ Copy/Paste ได้)"
                onPaste={(e) => e.preventDefault()}
              ></textarea>
            </div>

            <div>
              <p className="font-medium mb-2">2. ข้อดีของการใช้คลาวด์คอมพิวติ้ง (Cloud Computing) มีอะไรบ้าง?</p>
              <textarea
                required
                value={q2}
                onChange={(e) => setQ2(e.target.value)}
                className="w-full border rounded p-3 h-32"
                placeholder="พิมพ์คำตอบที่นี่ (ไม่สามารถ Copy/Paste ได้)"
                onPaste={(e) => e.preventDefault()}
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "กำลังส่งข้อมูล..." : "ส่งข้อสอบ"}
          </button>
        </form>
      </div>
    </main>
  );
}
