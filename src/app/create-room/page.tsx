"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../../lib/auth";
import { createRoom } from "../../../lib/rooms";
import { useRouter } from "next/navigation";

export default function CreateRoomPage() {
  const user = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");

  // 🔹 로그인되지 않은 경우 useEffect에서 리디렉션 처리
  useEffect(() => {
    if (user === null) {
      router.replace("/login"); // 🔹 push 대신 replace 사용
    }
  }, [user, router]);

  // 🔹 useAuth()가 아직 데이터를 못 가져온 경우 (초기 로딩)
  if (user === undefined) {
    return <p>로딩 중...</p>;
  }

  // 🔹 로그인된 상태에서만 글방 생성 가능
  const handleCreateRoom = async () => {
    if (!title) return;
    const roomId = await createRoom(title, (user as any).uid);
    if (roomId) {
      router.push(`/room/${roomId}`); // 생성된 글방 페이지로 이동
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>글방 만들기</h1>
      <input
        type="text"
        placeholder="방 이름 입력"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "10px" }}
      />
      <button onClick={handleCreateRoom} 
        style={{ margin: "10px", padding: "10px 20px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px" }}
      >
        글방 생성
      </button>
    </div>
  );
}
