"use client";

import { useState } from "react";
import { auth, googleProvider } from "../../../lib/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ 로그인 성공!");
      router.push("/");
    } catch (error) {
      console.error("❌ 로그인 실패:", (error as any).message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("✅ Google 로그인 성공!");
      router.push("/");
    } catch (error) {
      console.error("❌ Google 로그인 실패:", (error as any).message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>로그인</h1>
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
      <button onClick={handleEmailLogin} 
        style={{ margin: "10px", padding: "10px 20px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px" }}
      >
        이메일 로그인
      </button>
      <button onClick={handleGoogleLogin} 
        style={{ margin: "10px", padding: "10px 20px", backgroundColor: "#ea4335", color: "white", border: "none", borderRadius: "5px" }}
      >
        Google 로그인
      </button>
      <p>
        계정이 없나요?{" "}
        <a 
          href="/signup" 
          style={{ color: "#007bff", cursor: "pointer" }}
        >
          회원가입
        </a>
      </p>
    </div>
  );
}
