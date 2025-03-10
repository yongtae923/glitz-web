import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

export async function testFirestore() {
  try {
    const docRef = await addDoc(collection(db, "testCollection"), {
      name: "Tate",
      createdAt: new Date()
    });
    console.log("✅ Firestore에 문서 추가됨! 문서 ID:", docRef.id);
  } catch (error) {
    console.error("❌ Firestore 저장 실패:", error);
  }
}
