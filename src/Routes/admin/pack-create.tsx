import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuItem, usePackContext } from "./context/pack"; // 경로 수정
import Modal from "./modal"; // 모달 컴포넌트 추가

const PackCreate: React.FC = () => {
  const navigate = useNavigate();
  const { packs } = usePackContext(); // Context에서 packs 불러오기
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calculateTotalPrice = (pack: MenuItem[]): number => {
    return pack.reduce((total, item) => total + item.price, 0);
  };

  const calculateDiscountedPrice = (pack: MenuItem[]): number => {
    const discountRate = pack[0]?.discountRate ?? 0; // 동일한 할인율 적용
    const totalPrice = calculateTotalPrice(pack);
    return totalPrice - totalPrice * (discountRate / 100);
  };

  const handleComplete = () => {
    setIsModalOpen(true); // 완료하기 버튼 클릭 시 모달 열기
  };

  return (
    <div className="min-h-screen bg-white p-6 pb-24">
      {" "}
      {/* pb-24로 하단 공간 확보 */}
      <h2 className="text-2xl font-semibold mb-6">팩 만들기</h2>
      {packs.length > 0 ? (
        <div>
          <h3 className="text-lg font-semibold mb-2">선택된 팩들</h3>
          {packs.map((pack, index) => (
            <div
              key={index}
              className="mb-6 p-4 rounded-lg border border-gray-300 shadow-md bg-[#f9f9f9]"
            >
              <h4 className="font-medium mb-4 text-lg text-center">
                팩 {index + 1}
              </h4>
              <ul className="space-y-2">
                {pack.map((item) => (
                  <li key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <div className="text-black text-lg">{item.name}</div>
                      <div className="text-sm text-gray-500">
                        {item.price.toLocaleString()}원
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              {/* 팩 총 가격 및 할인된 가격 표시 */}
              <div className="mt-4">
                <div className="text-md">
                  총 가격: {calculateTotalPrice(pack).toLocaleString()}원
                </div>
                <div className="text-md text-[#1562fc] font-bold">
                  할인된 가격: {calculateDiscountedPrice(pack).toLocaleString()}
                  원
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>팩을 추가해보세요!</p>
      )}
      {/* 새로운 팩 만들기 버튼 */}
      <div className="mt-8">
        <button
          onClick={() => navigate("/admin/pack-create-modal")} // 팩 만들기 모달로 이동
          className="w-full py-3 bg-gray-100 text-black rounded-md hover:bg-gray-300 transition duration-150 mb-4 border border-[#1562fc]"
        >
          + 새로운 팩 추가하기
        </button>
      </div>
      {/* 완료하기 버튼 - 화면 하단에 고정 */}
      <div className="fixed bottom-0 w-full left-0 p-4 bg-white shadow-md">
        <button
          onClick={handleComplete}
          className="w-full py-3 bg-[#1562fc] text-white rounded-md hover:bg-[#124ab7] transition duration-150"
        >
          완료하기
        </button>
      </div>
      {/* 모달 */}
      {isModalOpen && (
        <Modal
          title="게시 확인"
          message="정말로 게시하시겠어요? 소비자에게 노출됩니다."
          onConfirm={() => {
            setIsModalOpen(false); // 모달 닫기
            // 여기서 게시 작업 처리
            navigate("/admin/home");
          }}
          onCancel={() => setIsModalOpen(false)} // 모달 취소
        />
      )}
    </div>
  );
};

export default PackCreate;
