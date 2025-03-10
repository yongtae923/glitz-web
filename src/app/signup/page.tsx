"use client";

import { useState } from "react";
import { auth } from "../../../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("✅ 회원가입 성공!");
      router.push("/"); // 회원가입 후 홈으로 이동
    } catch (error) {
      console.error("❌ 회원가입 실패:", (error as any).message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>회원가입</h1>
      <input
        type="email"
        placeholder="이메일 입력"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "10px" }}
      />
      <input
        type="password"
        placeholder="비밀번호 입력"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "10px" }}
      />
      <button onClick={handleSignUp} 
        style={{ margin: "10px", padding: "10px 20px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px" }}
      >
        회원가입
      </button>
    </div>
  );
}
