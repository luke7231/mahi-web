import React from "react";
import Menu from "../../components/my/menu";
import BottomTab from "../../components/bottom-tab";

const CustomerService = () => {
  return (
    <div className="w-full h-[100vh] flex flex-col">
      {/* 헤더 */}
      <div className="flex justify-center py-4 text-lg font-semibold">
        약관 및 정책
      </div>
      <div className="h-[0.0625rem] w-full bg-[#eaeaea]" />

      {/* 메뉴   */}
      <Menu
        title="개인정보 처리방침"
        to="https://quirky-moss-44e.notion.site/4fae5a1a1faa4f6fb569e5ec4f07e9c5?pvs=4"
      />
      <Menu title="서비스 이용 약관" to="" />

      <BottomTab />
    </div>
  );
};

export default CustomerService;
