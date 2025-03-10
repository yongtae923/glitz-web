import { auth } from "../lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useEffect, useState } from "react";

// 현재 로그인한 사용자 가져오기 (리액트 훅)
export function useAuth() {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("🔥 로그인 상태 변경:", currentUser);
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return user;
}

// 로그아웃 함수
export async function logout() {
  try {
    await signOut(auth);
    console.log("✅ 로그아웃 성공!");
  } catch (error: any) {
    console.error("❌ 로그아웃 실패:", (error as any).message);
  }
}
