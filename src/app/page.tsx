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
    <div className="text-center mt-12">
      <h1 className="text-3xl font-bold mb-6">블리츠</h1>

      {user ? (
        <>
          <p className="mb-4">로그인한 사용자: {user.email}</p>
          <button 
            onClick={logout}
            className="mx-2 my-2 px-4 py-2 bg-red-500 text-white rounded"
          >
            로그아웃
          </button>
          <button 
            onClick={() => router.push("/create-room")}
            className="mx-2 my-2 px-4 py-2 bg-green-500 text-white rounded"
          >
            글방 만들기
          </button>
          
          <h2 className="mt-8 mb-4 text-2xl font-semibold">참여 가능한 글방</h2>

          {/* 🔹 로딩 중이면 "불러오는 중..." 표시 */}
          {loading ? (
            <p>불러오는 중...</p>
          ) : rooms.length > 0 ? (
            <ul className="list-none p-0">
              {rooms.map(room => (
                <li key={room.id} className="my-2">
                  <button
                    onClick={() => router.push(`/room/${room.id}`)}
                    className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
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
          className="mx-2 my-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          로그인
        </button>
      )}
    </div>
  );
}