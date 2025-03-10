"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../../../lib/auth";
import { getRoom, joinRoom, RoomData } from "../../../../lib/rooms";
import { getUserEmail } from "../../../../lib/users";
import { useRouter, useParams } from "next/navigation";

export default function RoomPage() {
  const user = useAuth();
  const router = useRouter();
  const { id } = useParams<{ id: string }>(); // 🔹 id의 타입을 명확히 지정
  const [room, setRoom] = useState<RoomData | null>(null);
  const [hostEmail, setHostEmail] = useState<string>("로딩 중...");
  const [memberEmails, setMemberEmails] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !id) return; // 🔹 id가 없으면 실행 안 함

    const fetchRoomData = async () => {
      const roomData = await getRoom(id);
      if (!roomData) {
        alert("방을 찾을 수 없습니다.");
        router.replace("/");
        return;
      }
      setRoom(roomData);

      // 🔹 방장 이메일 가져오기
      const hostEmail = await getUserEmail(roomData.hostId);
      setHostEmail(hostEmail);

      // 🔹 방 참가 (memberIds에 사용자 추가)
      if (!roomData.memberIds.includes(user.uid)) {
        await joinRoom(id, user.uid);
        setRoom(prevRoom =>
          prevRoom ? { ...prevRoom, memberIds: [...prevRoom.memberIds, user.uid] } : prevRoom
        );
      }

      // 🔹 방 멤버 이메일 리스트 가져오기 (방장 제외)
      const emails = await Promise.all(
        roomData.memberIds
          .filter(memberId => memberId !== roomData.hostId) // 방장 제외
          .map(getUserEmail) // ID → 이메일 변환
      );
      setMemberEmails(emails);

      setLoading(false);
    };

    fetchRoomData();
  }, [user, id, router]);

  if (!user) {
    return <p>로그인 페이지로 이동 중...</p>;
  }

  if (loading) {
    return <p>불러오는 중...</p>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{room?.title} 방</h1>

      <h2>참여 멤버</h2>
      {memberEmails.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {memberEmails.map((email, index) => (
            <li key={index} style={{ marginBottom: "5px" }}>{email}</li>
          ))}
        </ul>
      ) : (
        <p>아직 참여한 멤버가 없습니다.</p>
      )}

      <button 
        onClick={() => router.push("/")}
        style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: "5px" }}
      >
        뒤로 가기
      </button>
    </div>
  );
}
