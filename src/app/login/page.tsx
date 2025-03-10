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
    <div className="text-center mt-12">
      <h1 className="text-3xl font-bold mb-6">로그인</h1>
      <input
        type="email"
        placeholder="이메일 입력"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="block mx-auto mb-4 p-2 border border-gray-300 rounded"
      />
      <input
        type="password"
        placeholder="비밀번호 입력"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="block mx-auto mb-4 p-2 border border-gray-300 rounded"
      />
      <button
        onClick={handleEmailLogin}
        className="mx-2 my-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        이메일 로그인
      </button>
      <button
        onClick={handleGoogleLogin}
        className="mx-2 my-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Google 로그인
      </button>
      <p className="mt-4">
        계정이 없나요?{" "}
        <a href="/signup" className="text-blue-500 hover:underline">
          회원가입
        </a>
      </p>
    </div>
  );
}