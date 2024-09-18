// import { nanoid } from "nanoid";
// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";

// function OrderForm() {
//   // 상태 선언

//   const [payType, setPayType] = useState("");
//   const [cardVer, setCardVer] = useState("");
//   const navigate = useNavigate();
//   const content = useRef<any>({
//     // Default form set
//     is_direct: "N", // 결제창 방식 (DIRECT: Y | POPUP: N)
//     pay_type: "transfer", // 결제수단
//     work_type: "CERT", // 결제요청방식
//     card_ver: "", // DEFAULT: 01 (01: 정기결제 플렛폼, 02: 일반결제 플렛폼), 카드결제 시 필수
//     payple_payer_id: "", // 결제자 고유ID (본인인증 된 결제회원 고유 KEY)
//     buyer_no: "2335", // 가맹점 회원 고유번호
//     buyer_name: "홍길동", // 결제자 이름
//     buyer_hp: "01012345678", // 결제자 휴대폰 번호
//     buyer_email: "test@payple.kr", // 결제자 Email
//     buy_goods: "휴대폰", // 결제 상품
//     buy_total: "1000", // 결제 금액
//     buy_istax: "Y", // 과세여부 (과세: Y | 비과세(면세): N)
//     buy_taxtotal: "", // 부가세(복합과세인 경우 필수)
//     order_num: nanoid(), // 주문번호
//     pay_year: "", // [정기결제] 결제 구분 년도
//     pay_month: "", // [정기결제] 결제 구분 월
//     is_reguler: "N", // 정기결제 여부 (Y | N)
//     is_taxsave: "N", // 현금영수증 발행여부
//     simple_flag: "N", // 간편결제 여부
//     auth_type: "sms", // [간편결제/정기결제] 본인인증 방식 (sms : 문자인증 | pwd : 패스워드 인증)
//   });

//   const handleChange = (e: any) => {
//     console.log(content);
//     content.current[e.target.name] = e.target.value;
//   };

//   const handleSubmit = (e: any) => {
//     // e.preventDefault();
//     // navigate("/order_confirm", {
//     //   state: { content: content.current },
//     // });
//     // S2_7edb63a062cd4f799d14caa983faab78
//     function serverAuth() {
//       window.AUTHNICE.requestPay({
//         clientId: "S2_7edb63a062cd4f799d14caa983faab78",
//         method: "card",
//         orderId: nanoid(),
//         amount: 1004,
//         appScheme: "mahi://",
//         fnError: () => console.error(),
//         goodsName: "나이스페이-상품",
//         returnUrl: "http://172.25.80.176:4000/nice-auth",
//       });
//     }
//     serverAuth();
//   };
//   // `pay_type`이 변경될 때 상태 업데이트
//   useEffect(() => {
//     if (payType === "card") {
//       setCardVer(""); // 카드 선택 시 초기화
//     }
//   }, [payType]);

//   return (
//     <div>
//       <form id="orderForm" name="orderForm" onChange={handleChange}>
//         <div>
//           <select name="simple_flag">
//             <option value="N">단건결제</option>
//             <option value="Y">간편결제</option>
//           </select>
//         </div>
//         <div>
//           <select name="is_direct">
//             <option value="N">POPUP</option>
//             <option value="Y">DIRECT</option>
//           </select>
//         </div>
//         <div>
//           <span>
//             <select
//               id="pay_type"
//               name="pay_type"
//               value={payType}
//               onChange={(e) => setPayType(e.target.value)}
//             >
//               <option value="transfer">계좌이체결제</option>
//               <option value="card">신용카드</option>
//             </select>
//           </span>
//           {payType === "card" && (
//             <span id="card_ver_view">
//               <select
//                 id="card_ver"
//                 name="card_ver"
//                 value={cardVer}
//                 onChange={(e) => setCardVer(e.target.value)}
//               >
//                 {/* <option value="">=결제창 선택=</option> */}
//                 {/* <option value="01">카드 정기</option> */}
//                 <option value="02">카드 일반</option>
//               </select>
//             </span>
//           )}
//         </div>

//         {/* 나머지 form 요소들 */}

//         {payType !== "card" && (
//           <div id="taxsave_view">
//             <label htmlFor="is_taxsave">현금영수증</label>
//             <select id="is_taxsave" name="is_taxsave">
//               <option value="N">N</option>
//               <option value="Y">Y</option>
//             </select>
//           </div>
//         )}

//         {cardVer === "01" && (
//           <>
//             <div id="is_reguler_view">
//               <label htmlFor="is_reguler">정기결제</label>
//               <select id="is_reguler" name="is_reguler">
//                 <option value="N">N</option>
//                 <option value="Y">Y</option>
//               </select>
//             </div>
//             <div id="pay_year_view">
//               <label htmlFor="pay_year">정기결제 구분년도</label>
//               <select id="pay_year" name="pay_year">
//                 <option value="">===</option>
//                 <option value="2021">2021</option>
//                 <option value="2020">2020</option>
//                 <option value="2019">2019</option>
//               </select>
//             </div>
//             <div id="pay_month_view">
//               <label htmlFor="pay_month">정기결제 구분월</label>
//               <select id="pay_month" name="pay_month">
//                 <option value="">===</option>
//                 <option value="12">12</option>
//                 <option value="11">11</option>
//                 {/* 나머지 월 옵션들 */}
//               </select>
//             </div>
//           </>
//         )}

//         <div>
//           <label htmlFor="work_type">결제요청방식</label>
//           <select id="work_type" name="work_type" disabled={cardVer !== "01"}>
//             <option value="CERT">결제요청-결제확인-{">"}결제완료</option>
//             <option value="PAY">결제요청-{">"}결제완료</option>
//             <option value="AUTH">인증</option>
//           </select>
//         </div>

//         {/* 추가 폼 요소들 */}
//       </form>
//       <button id="orderFormSubmit" onClick={handleSubmit}>
//         상품구매
//       </button>
//     </div>
//   );
// }

// export default OrderForm;

// import React from "react";

// function ImageUploader() {
//   const handleFileChange = (event: any) => {
//     const file = event.target.files[0];
//     if (file) {
//       // 파일이 선택되었을 때 처리하는 로직
//       console.log(file);
//     }
//   };

//   return (
//     <div>
//       <label htmlFor="fileInput">사진 업로드</label>
//       <input
//         id="fileInput"
//         type="file"
//         accept="image/*" // 이미지 파일만 허용
//         onChange={handleFileChange}
//       />
//     </div>
//   );
// }

// export default ImageUploader;

// import React from "react";
// import { useNavigate } from "react-router-dom";

// const AdminHome = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-[#f4f5f7] p-6">
//       <h2 className="text-3xl font-semibold text-center mb-8">사장님 홈</h2>
//       <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
//         {/* Buttons for each section */}
//         <button
//           onClick={() => navigate("/admin/sales")}
//           className="bg-[#1562fc] text-white py-4 rounded-lg shadow-md"
//         >
//           판매현황
//         </button>
//         <button
//           onClick={() => navigate("/admin/pack-create")}
//           className="bg-[#1562fc] text-white py-4 rounded-lg shadow-md"
//         >
//           팩 만들기
//         </button>
//         <button
//           onClick={() => navigate("/admin/menu-management")}
//           className="bg-[#1562fc] text-white py-4 rounded-lg shadow-md"
//         >
//           메뉴관리
//         </button>
//         <button
//           onClick={() => navigate("/admin/store-management")}
//           className="bg-[#1562fc] text-white py-4 rounded-lg shadow-md"
//         >
//           매장관리
//         </button>
//         <button
//           onClick={() => navigate("/admin/profile")}
//           className="bg-[#1562fc] text-white py-4 rounded-lg shadow-md"
//         >
//           내정보
//         </button>
//         <button
//           onClick={() => navigate("/admin/support")}
//           className="bg-[#1562fc] text-white py-4 rounded-lg shadow-md"
//         >
//           고객센터
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminHome;

// import React from "react";
// import { useNavigate } from "react-router-dom";

// const PackCreate = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-white p-6">
//       <h2 className="text-2xl font-semibold mb-6">팩 만들기</h2>
//       <div className="space-y-4">
//         {/* Options for creating a pack */}
//         <button
//           onClick={() => navigate("/admin/pack-create-modal")}
//           className="w-full py-4 bg-[#1562fc] text-white rounded-lg"
//         >
//           팩 만들기 옵션
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PackCreate;

// import React from "react";
// import { useNavigate } from "react-router-dom";

// const PackCreateModal = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded-lg max-w-sm w-full">
//         <h3 className="text-xl font-semibold mb-4">팩 만들기</h3>
//         <button
//           onClick={() => navigate("/admin/select-from-menu")}
//           className="w-full py-3 mb-4 bg-[#1562fc] text-white rounded-md"
//         >
//           기존 메뉴에서 선택
//         </button>
//         <button
//           onClick={() => navigate("/admin/manual-entry")}
//           className="w-full py-3 bg-[#f3f3f3] text-black rounded-md"
//         >
//           직접 정보 입력
//         </button>
//         <button
//           onClick={() => navigate(-1)} // Go back to previous page
//           className="w-full py-3 mt-4 border border-gray-300 text-gray-500 rounded-md"
//         >
//           취소
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PackCreateModal;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface MenuItem {
  id: number;
  name: string;
}

const SelectFromMenu: React.FC = () => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<MenuItem[]>([]);

  const handleSelect = (menu: MenuItem) => {
    setSelectedItems((prev) =>
      prev.some((item) => item.id === menu.id)
        ? prev.filter((item) => item.id !== menu.id)
        : [...prev, menu]
    );
  };

  const menus: MenuItem[] = [
    { id: 1, name: "떡볶이" },
    { id: 2, name: "튀김" },
    { id: 3, name: "순대" },
    // Add more menu items here
  ];

  const handleComplete = () => {
    // Pass selectedItems (full item objects) back to the PackCreate page
    navigate("/admin/pack-create", { state: { selectedItems } });
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <h2 className="text-2xl font-semibold mb-6">기존 메뉴에서 선택</h2>
      <div className="grid grid-cols-3 gap-4">
        {menus.map((menu) => (
          <div
            key={menu.id}
            onClick={() => handleSelect(menu)}
            className={`p-4 border rounded-lg cursor-pointer ${
              selectedItems.some((item) => item.id === menu.id)
                ? "bg-[#1562fc] text-white"
                : "bg-[#f3f3f3]"
            }`}
          >
            {menu.name}
          </div>
        ))}
      </div>

      {selectedItems.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">선택된 메뉴</h3>
          <div className="flex flex-wrap gap-2">
            {selectedItems.map((menu) => (
              <span
                key={menu.id}
                className="px-4 py-2 bg-[#1562fc] text-white rounded-md"
              >
                {menu.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Complete Button */}
      <div className="mt-8">
        <button
          onClick={handleComplete}
          className="w-full py-3 bg-[#1562fc] text-white rounded-md hover:bg-[#124ab7] transition duration-150"
        >
          완료하기
        </button>
      </div>
    </div>
  );
};

export default SelectFromMenu;
