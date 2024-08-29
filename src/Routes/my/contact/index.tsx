import IMG from "../customer-service.png";
const Contact = () => {
  return (
    <div className="w-full h-[100vh] flex flex-col">
      {/* 헤더 */}
      <div className="flex justify-center py-4 text-lg font-semibold">
        문의하기
      </div>
      <div className="h-[0.0625rem] w-full bg-[#eaeaea]" />
      <div className="w-full max-w-xs h-auto relative flex flex-col items-center p-4">
        <div className="flex flex-col items-center">
          <div className="text-center text-[#464646] text-lg font-semibold font-['Pretendard'] leading-[25.20px]">
            hiyeom7@naver.com
          </div>
          <div className="mt-2 text-center text-[#1562fc] text-xs font-normal font-['Pretendard'] leading-none">
            24시간 문의 가능
          </div>
          <div className="w-full flex flex-col items-center mt-2">
            <div className="text-center text-[#464646] text-lg font-semibold font-['Pretendard'] leading-[25.20px]">
              010-8935-7774
            </div>
            <div className="w-5 h-5 mt-1"></div>
            <div className="w-full border-t border-black mt-2"></div>
          </div>
        </div>
        <img
          className="w-full h-auto mt-4 opacity-50 mix-blend-color-burn"
          src={IMG}
          alt="Placeholder"
        />
      </div>
    </div>
  );
};
export default Contact;
