import React, { useEffect, useState } from "react";

import { gql } from "../../__generated__";
import { useLocation } from "../../core/location-provider";
import BottomTab from "../../components/bottom-tab";
import { useNavigate } from "react-router-dom";
import NoOrders from "../../components/order/no-orders";

const Order = () => {
  const navigate = useNavigate();
  const { hasLastLo, getLocationFromStorage } = useLocation();
  const data = { likedStores: [] };
  const loading = false;

  return (
    <div className="w-full h-[100vh] flex flex-col">
      <div className="flex justify-center py-4 text-lg font-semibold">
        주문내역
      </div>
      <div className="h-[0.0625rem] w-full bg-[#eaeaea]" />
      {data?.likedStores?.length === 0 ? <NoOrders /> : null}
      <div className="mt-8 pl-4 pr-4">
        {loading ? <div>loading...</div> : null}

        {data?.likedStores?.map((store) => {
          return <div></div>;
        })}
      </div>
      <BottomTab />
    </div>
  );
};

export default Order;
