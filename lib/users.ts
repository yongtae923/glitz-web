import { db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

// 🔹 사용자 ID로 이메일 가져오기
export async function getUserEmail(userId: string) {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().email;
    } else {
      return "알 수 없음"; // 사용자 정보가 없을 경우
    }
  } catch (error: any) {
    console.error("❌ 사용자 이메일 가져오기 실패:", (error as any).message);
    return "에러";
  }
}
