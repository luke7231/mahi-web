import React, { useEffect, useState } from "react";
import OpenAI from "openai";
import useSpeech from "./use-speech";
import { Sheet } from "react-modal-sheet";
import { FiMic } from "react-icons/fi";
import Header from "../../components/common/header";
const openai = new OpenAI({
  organization: "org-WF89iqFViNqbfVHpXFzsOtkR",
  apiKey: process.env.REACT_APP_OPENAI_KEY,
  dangerouslyAllowBrowser: true,
});

const menus = [
  {
    name: "동그랑땡",
    price: 7000,
    img: "https://mahi-img.s3.ap-northeast-2.amazonaws.com/1728470204163-IMG_7615.jpeg",
  },
  {
    name: "콩나물",
    price: 2500,
    img: "https://mahi-img.s3.ap-northeast-2.amazonaws.com/1728470230008-IMG_7617.jpeg",
  },
  {
    name: "무말랭이",
    price: 4000,
    img: "https://mahi-img.s3.ap-northeast-2.amazonaws.com/1728470252573-IMG_7619.jpeg",
  },
  {
    name: "미역줄기볶음",
    price: 3500,
    img: "https://mahi-img.s3.ap-northeast-2.amazonaws.com/1728470283800-IMG_7621.jpeg",
  },
  {
    name: "간장깻잎",
    price: 4500,
    img: "https://mahi-img.s3.ap-northeast-2.amazonaws.com/1728470317005-IMG_7623.jpeg",
  },
  {
    name: "마늘쫑 새우조림",
    price: 5000,
    img: "https://mahi-img.s3.ap-northeast-2.amazonaws.com/1728470353771-IMG_7629.jpeg",
  },
  {
    name: "오뎅볶음",
    price: 3000,
    img: "https://mahi-img.s3.ap-northeast-2.amazonaws.com/1728470385886-IMG_7631.jpeg",
  },
  {
    name: "가지볶음",
    price: 4500,
    img: "https://mahi-img.s3.ap-northeast-2.amazonaws.com/1728470406681-IMG_7633.jpeg",
  },
  {
    name: "애호박새우젓",
    price: 4500,
    img: "https://mahi-img.s3.ap-northeast-2.amazonaws.com/1728470458711-IMG_7635.jpeg",
  },
  {
    name: "숙주나물",
    price: 3500,
    img: "https://mahi-img.s3.ap-northeast-2.amazonaws.com/1728470505970-IMG_7637.jpeg",
  },
  {
    name: "시래기나물",
    price: 4500,
    img: "https://mahi-img.s3.ap-northeast-2.amazonaws.com/1728470633293-IMG_7639.jpeg",
  },
  {
    name: "비빔밥세트",
    price: 7500,
    img: "https://mahi-img.s3.ap-northeast-2.amazonaws.com/1728470662707-IMG_7641.jpeg",
  },
  {
    name: "무나물",
    price: 3000,
    img: "https://mahi-img.s3.ap-northeast-2.amazonaws.com/1728470685804-IMG_7643.jpeg",
  },
  {
    name: "고사리",
    price: 4500,
    img: "https://mahi-img.s3.ap-northeast-2.amazonaws.com/1728470753028-IMG_7645.jpeg",
  },
  {
    name: "취나물무침",
    price: 5000,
    img: "https://mahi-img.s3.ap-northeast-2.amazonaws.com/1728470787931-IMG_7647.jpeg",
  },
  {
    name: "생고구마줄기",
    price: 5000,
    img: "https://mahi-img.s3.ap-northeast-2.amazonaws.com/1728470814024-IMG_7649.jpeg",
  },
  {
    name: "참치김밥",
    price: 7000,
    img: "https://mahi-img.s3.ap-northeast-2.amazonaws.com/1728470877722-Resized_20240926_185011_1727344293167.jpeg",
  },
  {
    name: "야채 김밥",
    price: 7000,
    img: "https://mahi-img.s3.ap-northeast-2.amazonaws.com/1728470970141-Resized_20241003_190439_1727949925864.jpeg",
  },
  {
    name: "진미채 김밥",
    price: 7000,
    img: "https://mahi-img.s3.ap-northeast-2.amazonaws.com/1728471037032-Resized_20241001_191212_1727777580399.jpeg",
  },
  {
    name: "쇠고기 김밥",
    price: 7000,
    img: "https://mahi-img.s3.ap-northeast-2.amazonaws.com/1728471084570-Resized_20241001_191212_1727777580399.jpeg",
  },
  {
    name: "돼지고기 볶음",
    price: 15000,
    img: "https://mahi-img.s3.ap-northeast-2.amazonaws.com/1728722938022-image-8477955977719268600.jpg",
  },
  {
    name: "아삭고추",
    price: 5000,
    img: "https://mahi-img.s3.ap-northeast-2.amazonaws.com/1728722997175-image-6722930572023819737.jpg",
  },
  {
    name: "버섯잡채",
    price: 10000,
    img: "https://mahi-img.s3.ap-northeast-2.amazonaws.com/1728723017574-image-6251296929853493177.jpg",
  },
];

const menuNames = `"동그랑땡"
"콩나물",
  "무말랭이",
  "미역줄기볶음",
  "간장깻잎",
  "마늘쫑 새우조림",
  "오뎅볶음",
  "가지볶음",
  "애호박새우젓",
  "숙주나물",
  "시래기나물",
  "비빔밥세트",
  "무나물",
  "고사리",
  "취나물무침",
  "생고구마줄기",
  "참치김밥",
  "야채 김밥",
  "진미채 김밥",
  "쇠고기 김밥",
  "돼지고기 볶음",
  "아삭고추",
  "버섯잡채"`;

const systemMsg = `
  ${menuNames} 위 메뉴에서 원하는 항목과 개수를 말하면 json 배열을 만들어서 대답해줘. 예시:
  { "items": [{ "name": "쇠고기 김밥", "quantity": 2 }, { "name": "야채 김밥", "quantity": 2 }] }
`;

const SelectFromMenu: React.FC = () => {
  const [sheetItems, setSheetItems] = useState([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isConfirmScreen, setIsConfirmScreen] = useState(false);
  const { text, startListening, isListening, hasRecognitionSupport } =
    useSpeech();

  useEffect(() => {
    if (!text) return;

    const handleComplete = async (text: string) => {
      try {
        const stream = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemMsg },
            { role: "user", content: text },
          ],
        });

        const word = stream.choices[0].message.content;
        const words = JSON.parse(word as string);

        const items = words.items
          ?.map((item: { name: string; quantity: number }) => {
            const menu = menus.find((menu) => menu.name === item.name);
            return menu ? { ...menu, quantity: item.quantity } : null;
          })
          .filter(Boolean);

        setSheetItems(items);
        setIsSheetOpen(true); // 바텀시트 열기
      } catch (error) {
        console.error("Error:", error);
      }
    };

    setSheetItems([]); // 새로운 음성 입력마다 초기화
    setIsSheetOpen(false); // 바텀시트 숨김
    setIsConfirmScreen(false); // 확인 화면 초기화
    handleComplete(text);
  }, [text]);

  // '예' 버튼 클릭 시 확인 화면으로 전환
  const handleConfirm = () => {
    setIsSheetOpen(false);
    setIsConfirmScreen(true); // 확인 화면으로 전환
  };

  if (isConfirmScreen) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header title="판매 현황" showBackButton />
        <div className="p-6 pt-4">
          {sheetItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {sheetItems.map((product: any, index: number) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg flex justify-between items-center shadow ${
                    product.order &&
                    !product.order?.isCanceled &&
                    product.order?.isApproved
                      ? "bg-blue-300"
                      : "bg-gray-200"
                  }`}
                >
                  <div className="flex w-full flex-col">
                    <div className="flex">
                      <img
                        src={product.img || "https://via.placeholder.com/100"}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-lg mr-4"
                      />
                      <h2 className="text-lg font-semibold w-[120px]">
                        {product.name}
                      </h2>
                    </div>
                    <div className="mt-4">
                      <p className="text-gray-700 font-semibold text-lg">
                        원가:{" "}
                        {(product.price * product.quantity).toLocaleString()}원
                      </p>
                      <p className="text-gray-700 font-semibold text-lg">
                        할인가:{" "}
                        {(
                          Math.floor(product.price * 0.6) * product.quantity
                        ).toLocaleString()}
                        원
                      </p>
                      <p className="text-gray-900 font-bold">
                        수량: {product.quantity}개
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end w-full h-full justify-between">
                    <div
                      className={`rounded p-1 ${
                        product.order &&
                        !product.order?.isCanceled &&
                        product.order?.isApproved
                          ? "bg-green-500"
                          : "bg-gray-200"
                      }`}
                    >
                      <p
                        className={`text-center text-sm ${
                          product.order && product.order?.isApproved
                            ? "text-black"
                            : "font-bold text-green-500"
                        }`}
                      >
                        {product.order &&
                        !product.order?.isCanceled &&
                        product.order?.isApproved
                          ? "결제 완료"
                          : product.isToday
                          ? "소비자 노출중"
                          : ""}
                      </p>
                      {product.order?.user && product.order?.isApproved && (
                        <p className="text-md">
                          구매자:{" "}
                          <span className="text-black font-bold">
                            {product.order.user.name}
                          </span>
                        </p>
                      )}
                    </div>
                    {!product.order?.isCanceled &&
                      product.order &&
                      product.order?.isApproved && (
                        <div className="flex gap-2">
                          <button
                            className="px-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                            // onClick={() => handleCancel(product)}
                          >
                            결제 취소
                          </button>
                        </div>
                      )}
                    {!product.order?.isCanceled &&
                      !product.order?.isApproved &&
                      product.isToday && (
                        <div className="flex gap-2">
                          <button
                            className="px-2 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                            // onClick={() => handleDelete(product.id)}
                          >
                            삭제
                          </button>
                        </div>
                      )}
                    {product.order?.isCanceled && (
                      <div className="flex gap-2">
                        <div
                          className="px-2 py-2 text-red-500 font-bold rounded hover:bg-blue-600 text-lg"
                          // onClick={() => handleCancel(product)}
                        >
                          취소 완료
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>판매 중인 제품이 없습니다.</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto flex justify-center items-center h-full bg-white p-6 shadow-md">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">팩 추가하기</h2>

        {hasRecognitionSupport ? (
          <div className="flex flex-col justify-center items-center">
            <button
              onClick={startListening}
              className="w-24 h-24 flex items-center justify-center bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-200"
            >
              <FiMic size={28} />
            </button>
            {isListening ? <div className="mt-4">듣는 중이에요</div> : null}
            <p className="text-black text-xl p-6 bg-gray-100 rounded-xl text-center mt-8">
              {text}
            </p>
          </div>
        ) : (
          <h1>음성 인식 지원되지 않음</h1>
        )}

        <Sheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)}>
          <Sheet.Container>
            <Sheet.Header />
            <Sheet.Content>
              <div className="p-4">
                <h3 className="font-semibold text-center text-gray-700 mb-4 text-2xl">
                  선택한 메뉴가 맞습니까?
                </h3>

                <div className="space-y-4">
                  {sheetItems.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center bg-gray-50 rounded p-3 border"
                    >
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-32 h-32 rounded object-cover"
                      />
                      <div className="flex flex-col">
                        <div className="ml-4 font-bold text-3xl">
                          {item.name}
                        </div>
                        <div className="ml-4 font-semibold text-2xl">
                          {item.quantity}개
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 버튼 컨테이너 */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-300">
                <div className="flex space-x-4">
                  <button
                    onClick={handleConfirm} // '예' 버튼 클릭 시 확인 화면으로 전환
                    className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                  >
                    예
                  </button>
                  <button
                    onClick={() => setIsSheetOpen(false)} // '아니오' 버튼
                    className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                  >
                    아니오
                  </button>
                </div>
              </div>
            </Sheet.Content>
          </Sheet.Container>
        </Sheet>

        {/* 확인 화면 */}
        {isConfirmScreen && (
          <div className="text-center mt-8">
            <p className="text-xl font-semibold text-green-600">
              해당 메뉴들이 노출 중입니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectFromMenu;
