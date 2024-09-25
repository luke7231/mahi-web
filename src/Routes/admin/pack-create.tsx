import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuItem, usePackContext } from "./context/pack"; // 경로 수정
import { gql, useMutation } from "@apollo/client";
import Modal from "./modal"; // 모달 컴포넌트 추가

const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      name
      price
      discountPrice
      description
      saleEndTime
    }
  }
`;

const PackCreate: React.FC = () => {
  const navigate = useNavigate();
  const { packs, resetPacks } = usePackContext(); // Context에서 packs 및 resetPacks 불러오기
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({}); // 각 메뉴의 수량 관리

  // useMutation 훅을 사용해 createProduct API와 연결
  const [createProduct] = useMutation(CREATE_PRODUCT);

  const calculateTotalPrice = (pack: MenuItem[]): number => {
    return pack.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
  };

  const calculateDiscountedPrice = (pack: MenuItem[]): number => {
    const discountRate = pack[0]?.discountRate ?? 0; // 동일한 할인율 적용
    const totalPrice = calculateTotalPrice(pack);
    return totalPrice - totalPrice * (discountRate / 100);
  };

  const handleQuantityChange = (menuId: number, quantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [menuId]: quantity,
    }));
  };

  const handleComplete = async () => {
    setIsModalOpen(true); // 완료하기 버튼 클릭 시 모달 열기

    try {
      // 각 팩을 createProduct로 전송
      for (const pack of packs) {
        const menus = pack.map((item) => ({
          menuId: item.id,
          quantity: item.quantity || 1,
          img: item.img,
        }));
        const packName = pack.map((item) => item.name).join(" + ");
        // 서버에 createProduct 요청
        await createProduct({
          variables: {
            input: {
              storeId: 1, // 실제 storeId를 넣어주세요
              name: packName,
              price: calculateTotalPrice(pack),
              discountPrice: calculateDiscountedPrice(pack),
              description: ``,
              saleEndTime: new Date().toISOString(), // 판매 종료 시간 설정 (필요에 따라 수정 가능)
              menus, // 메뉴 ID와 수량 함께 전송
              quantity: 1,
            },
          },
        });
      }

      resetPacks(); // 팩 초기화
      navigate("/admin/home"); // 성공 후 홈으로 이동
    } catch (error) {
      console.error("Error creating product:", error);
    }
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
                      src={item.img}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <div className="text-black text-lg">{item.name}</div>
                      <div className="text-sm text-gray-500">
                        {item.price.toLocaleString()}원
                      </div>
                      {/* 수량 입력 필드 */}
                      <div className="mt-2">
                        <label className="text-sm text-gray-700">
                          수량: {item.quantity}개
                        </label>
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
          }}
          onCancel={() => setIsModalOpen(false)} // 모달 취소
        />
      )}
    </div>
  );
};

export default PackCreate;
