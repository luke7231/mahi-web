const BusinessInfo = () => {
  return (
    <div className="bg-[#F4F5F7] p-6 pb-20">
      <h2 className="text-md font-semibold text-gray-800 mb-4">사업자 정보</h2>
      <div className="text-gray-700 text-xs">
        <p className="mb-2">
          <span className="font-bold">상호명: </span>
          주식회사 마히
        </p>
        <p className="mb-2">
          <span className="font-bold">대표자명: </span>
          원요한
        </p>
        <p className="mb-2">
          <span className="font-bold">사업자등록번호: </span>
          567-81-03232
        </p>
        <p className="mb-2">
          <span className="font-bold">통신판매신고: </span>
          2024-성남수정-1048호
        </p>
        <p className="mb-2">
          <span className="font-bold">사업장 주소: </span>
          경기도 성남시 수정구 성남대로 1342, 6층 617호 (복정동)
        </p>
        <p className="mb-2">
          <span className="font-bold">유선번호: </span>
          010-9073-0701
        </p>
      </div>
    </div>
  );
};
export default BusinessInfo;
