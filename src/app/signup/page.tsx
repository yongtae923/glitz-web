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
    <div className="text-center mt-12">
      <h1 className="text-3xl font-bold mb-6">회원가입</h1>
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
        onClick={handleSignUp}
        className="mx-2 my-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        회원가입
      </button>
    </div>
  );
}