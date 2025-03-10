import { db } from "../lib/firebase";
import { collection, addDoc, Timestamp, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

export async function createRoom(title: string, userId: string) {
  try {
    const docRef = await addDoc(collection(db, "rooms"), {
      title,
      hostId: userId,
      createdAt: Timestamp.now(),
      memberIds: [userId], // 방장 자동 추가
    });
    console.log("✅ 글방 생성 완료! ID:", docRef.id);
    return docRef.id;
  } catch (error: any) {
    console.error("❌ 글방 생성 실패:", (error as any).message);
    return null;
  }
}

export async function getRoom(roomId: string): Promise<RoomData | null> {
    try {
      const docRef = doc(db, "rooms", roomId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data() as RoomData;
        return { id: docSnap.id, title: data.title, hostId: data.hostId, memberIds: data.memberIds };
      } else {
        return null; // 방이 존재하지 않음
      }
    } catch (error: any) {
      console.error("❌ 방 정보 가져오기 실패:", (error as any).message);
      return null;
    }
  }

// 🔹 방에 참가 (memberIds에 사용자 추가)
export async function joinRoom(roomId: string, userId: string) {
  try {
    const docRef = doc(db, "rooms", roomId);
    await updateDoc(docRef, {
      memberIds: arrayUnion(userId),
    });
    console.log("✅ 방 참가 완료!");
  } catch (error: any) {
    console.error("❌ 방 참가 실패:", (error as any).message);
  }
}

export interface RoomData {
    id: string;
    title: string;
    hostId: string;
    memberIds: string[];
  }
  