import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuItem, usePackContext } from "./context/pack"; // 경로 수정
import { gql, useMutation, useQuery } from "@apollo/client";
import Modal from "./modal"; // 모달 컴포넌트 추가
import Header from "../../components/common/header";
import { GET_SELLER_STORE } from "./store-management";
import { track } from "@amplitude/analytics-browser";

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

type Store = {
  id: number;
  img?: string;
  title: string;
  address: string;
  contactNumber: string;
  closingHours: string;
  lat: number;
  lng: number;
};

const PackCreate: React.FC = () => {
  const navigate = useNavigate();
  const { packs, resetPacks, deletePack } = usePackContext(); // Context에서 packs, resetPacks 및 deletePack 불러오기
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({}); // 각 메뉴의 수량 관리

  const [store, setStore] = useState<Store | null>(null);
  const { data: storeData } = useQuery(GET_SELLER_STORE, {
    onCompleted: (data) => {
      setStore(data.getSellerStore);
    },
  });

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
        let menus;
        let img;
        if (pack[0].id !== 0) {
          // 메뉴선택이란뜻임,
          menus = pack.map((item) => ({
            menuId: item.id,
            quantity: item.quantity || 1,
            img: item.img,
          }));
        } else {
          // 직접선택
          img = pack[0].img;
        }
        const packName = pack.map((item) => item.name).join(" + ");
        // 서버에 createProduct 요청
        await createProduct({
          variables: {
            input: {
              name: packName,
              price: calculateTotalPrice(pack),
              discountPrice: calculateDiscountedPrice(pack),
              description: ``,
              saleEndTime: new Date().toISOString(), // 판매 종료 시간 설정 (필요에 따라 수정 가능)
              menus, // 메뉴에서 선택했을 때에만 이걸 전송, 직접 입력 시 빈배열 전달.
              quantity: 1,
              img, // 이미지가 없어도 서버에서 알아서 처리함.
            },
          },
        });
        track("제품 생성", {
          방식: pack[0].id !== 0 ? "메뉴 선택" : "직접 입력",
          할인가격: calculateDiscountedPrice(pack),
          할인율: Math.floor(
            ((calculateTotalPrice(pack) - calculateDiscountedPrice(pack)) /
              calculateTotalPrice(pack)) *
              100
          ),
          매장명: store?.title,
        });
      }

      resetPacks(); // 팩 초기화
      navigate("/admin/home"); // 성공 후 홈으로 이동
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };
  if (!store)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <p className="text-lg mb-6 text-gray-700">
          매장이 아직 등록되지 않았습니다.
        </p>
        <button
          onClick={() => navigate("/admin/store-management")}
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          매장 추가하러 가기
        </button>
      </div>
    );
  return (
    <div className="min-h-screen bg-white pt-0">
      <Header title="서프라이즈 팩 만들기" showBackButton />
      {/* pb-24로 하단 공간 확보 */}
      <div className="px-4 pt-6">
        <h2 className="text-2xl font-semibold mb-6">팩 만들기</h2>
        {packs.length > 0 ? (
          <div>
            <h3 className="text-lg font-semibold mb-2">선택된 팩들</h3>
            {packs.map((pack, index) => (
              <div
                key={index}
                className="mb-6 p-4 rounded-lg border border-gray-300 shadow-md bg-[#f9f9f9] relative"
              >
                <h4 className="font-medium mb-4 text-lg text-center">
                  팩 {index + 1}
                </h4>
                <button
                  className="absolute top-2 right-2 text-red-500 text-xl"
                  onClick={() => deletePack(index)} // 해당 팩을 삭제하는 함수 호출
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
                <ul className="space-y-2">
                  {pack.map((item) => (
                    <li key={item.id} className="flex items-center space-x-4">
                      <img
                        src={
                          item.img instanceof File
                            ? URL.createObjectURL(item.img)
                            : item.img
                        }
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
                    할인된 가격:{" "}
                    {calculateDiscountedPrice(pack).toLocaleString()}원
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-md text-gray-800">
            이곳은 남은 재고를 올리는 페이지입니다! <br /> 아래 버튼을 클릭하여
            오늘의 제품을 올려보세요~!
          </p>
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
    </div>
  );
};

export default PackCreate;
