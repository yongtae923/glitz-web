"use client";

import { useAuth, logout } from "../../lib/auth";
import { useRouter } from "next/navigation";
import { db } from "../../lib/firebase";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

export default function Home() {
  const user = useAuth();
  const router = useRouter();
  const [rooms, setRooms] = useState<{ id: string; title: string }[]>([]);
  const [loading, setLoading] = useState(true); // 🔹 로딩 상태 추가

  // Firestore에서 방 목록 불러오기
  useEffect(() => {
    const fetchRooms = async () => {
      const querySnapshot = await getDocs(collection(db, "rooms"));
      const roomsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title,
      }));
      setRooms(roomsList);
      setLoading(false); // 🔹 데이터 불러오면 로딩 상태 해제
    };

    fetchRooms();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>블리츠</h1>

      {user ? (
        <>
          <p>로그인한 사용자: {user.email}</p>
          <button 
            onClick={logout}
            style={{ margin: "10px", padding: "10px 20px", backgroundColor: "red", color: "white", border: "none", borderRadius: "5px" }}
          >
            로그아웃
          </button>
          <button 
            onClick={() => router.push("/create-room")}
            style={{ margin: "10px", padding: "10px 20px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px" }}
          >
            글방 만들기
          </button>
          
          <h2 style={{ marginTop: "20px" }}>참여 가능한 글방</h2>

          {/* 🔹 로딩 중이면 "불러오는 중..." 표시 */}
          {loading ? (
            <p>불러오는 중...</p>
          ) : rooms.length > 0 ? (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {rooms.map(room => (
                <li key={room.id} style={{ margin: "10px 0" }}>
                  <button
                    onClick={() => router.push(`/room/${room.id}`)}
                    style={{
                      padding: "10px",
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    {room.title}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>참여 가능한 글방이 없습니다.</p>
          )}
        </>
      ) : (
        <button 
          onClick={() => router.push("/login")}
          style={{ margin: "10px", padding: "10px 20px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px" }}
        >
          로그인
        </button>
      )}
    </div>
  );
}
