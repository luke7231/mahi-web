import React, { useState, useEffect } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import CancelModal from "../cancel-modal";
import Header from "../../../components/common/header";
import { useNavigate } from "react-router-dom";
import { GET_SELLER_STORE } from "../store-management";

const GET_PRODUCTS = gql`
  query GetProducts {
    productsBySeller {
      id
      name
      price
      discountPrice
      userPrice
      img
      menus {
        id
        img
        quantity
      }
      order {
        id
        user {
          name
        }
        isCanceled
        isApproved
      }
      createdAt
      isToday
      isDeleted
    }
  }
`;

const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: Int!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

const CANCEL_PAYMENT = gql`
  mutation CancelOrder($id: Int!, $reason: String) {
    cancelOrder(id: $id, reason: $reason) {
      ok
      error
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

const SalesPage: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cancelingProduct, setCancelingProduct] = useState<any>();
  const [reason, setReason] = useState("");
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    onCompleted: () => window.location.reload(),
  });
  const [cancelPayment] = useMutation(CANCEL_PAYMENT);

  const [store, setStore] = useState<Store | null>(null);
  const { data: storeData } = useQuery(GET_SELLER_STORE, {
    onCompleted: (data) => {
      setStore(data.getSellerStore);
    },
  });
  const handleDelete = (id: number) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      deleteProduct({ variables: { id } });
    }
  };

  const handleCancel = (product: any) => {
    setCancelingProduct(product);
    setIsModalOpen(true);
  };

  const onConfirm = () => {
    cancelPayment({
      variables: {
        id: cancelingProduct.order.id,
        reason,
      },
    });
  };

  const handleReason = (reason: string) => {
    setReason(reason);
  };

  const handleRefresh = () => {
    window.location.reload(); // 페이지 새로고침
  };

  const formatDateToKST = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      month: "numeric", // 월을 숫자로
      day: "numeric", // 일을 숫자로
      weekday: "short", // 요일을 짧은 형태로 (월, 화, 수 등)
      timeZone: "Asia/Seoul", // KST (UTC+9)
    };
    return new Intl.DateTimeFormat("ko-KR", options).format(date);
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
  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>오류: {error.message}</p>;

  // 1. Group products by createdAt date
  const groupedProducts = data.productsBySeller.reduce(
    (groups: any, product: any) => {
      const date = formatDateToKST(product.createdAt); // Format date as string
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(product);
      return groups;
    },
    {}
  );

  return (
    <div className="min-h-screen bg-white">
      <Header title="판매 현황" showBackButton />
      <div className="pt-4">
        <div className="sticky top-4 z-10 flex flex-col px-4 items-center mb-4 justify-center space-x-4">
          <button
            onClick={handleRefresh}
            className="flex text-md items-center justify-center  py-4 w-full bg-blue-500 text-white rounded-xl hover:bg-blue-600"
          >
            새로고침
          </button>
        </div>

        {data?.productsBySeller?.length > 0 ? (
          Object.keys(groupedProducts).map((date) => (
            <div key={date} className="mb-8">
              {/* 날짜 섹션 헤더 */}
              <h3 className="text-2xl font-bold text-gray-900 rounded-md pl-4">
                {date}
              </h3>
              <div className="bg-black h-[2px] w-full rounded-xl" />

              <div className="px-4 overflow-scroll">
                {/* 해당 날짜에 속하는 제품들 렌더링 */}
                {/* TODO: any 쓰지말자 */}
                {groupedProducts[date]
                  ?.filter(
                    (product: any) =>
                      product.isDeleted === false || product.isDeleted === null
                  )
                  .map((product: any) => (
                    <div
                      key={product.id}
                      className={`flex overflow-scroll flex-col bg-white mt-6`}
                    >
                      <div className="flex overflow-x-scroll">
                        <div className="flex gap-1">
                          {[...product?.menus]
                            .reverse()
                            .map((menu: any, index: number) => {
                              return (
                                <div className="relative w-32 h-32">
                                  <img
                                    src={menu.img}
                                    className="w-32 h-32 rounded-md object-cover"
                                  />
                                  <div className="absolute bottom-1 right-1.5 rounded-md opacity-80 bg-black text-white p-0.5 px-1.5">
                                    <p className="text-md font-semibold">
                                      x{menu.quantity}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>

                      <div className="flex w-full flex-col">
                        {/* 제품 이미지 */}
                        <div className="flex">
                          <div className="text-xl break-keep font-semibold mt-2 max-w-48">
                            {product.name}
                          </div>
                        </div>
                        <div className="mt-1">
                          <div className="flex justify-between items-center">
                            <div className="flex">
                              <p className="text-gray-400 text-base">
                                원가: {product.price.toLocaleString()}
                              </p>
                              <p className="text-gray-400 text-base ml-1">
                                할인가:{" "}
                                {product.discountPrice?.toLocaleString()}
                              </p>
                            </div>
                            <div className="flex justify-end">
                              <p className="text-xl text-gray-900 font-bold">
                                {product?.userPrice
                                  ? Math.floor(
                                      product.userPrice
                                    ).toLocaleString()
                                  : Math.floor(
                                      ((product.discountPrice +
                                        product.discountPrice * 0.1) /
                                        10) *
                                        10
                                    ).toLocaleString()}
                                원
                                <span className="text-sm text-gray-900"></span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-2 flex items-end w-full h-full justify-between">
                        <div
                          className={`rounded ${
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
                            product.order?.isApproved ? (
                              <div className="pt-1">{"결제 완료"}</div>
                            ) : product.isToday ? (
                              <div className="p-2">{"소비자 노출중"}</div>
                            ) : (
                              ""
                            )}
                          </p>
                          {product.order?.user && product.order?.isApproved && (
                            <p className="text-md px-2 pb-1">
                              구매자:{" "}
                              <span className="text-black font-bold">
                                {product.order.user.name}
                              </span>
                            </p>
                          )}
                        </div>
                        {/* 버튼 */}
                        {!product.order?.isCanceled &&
                          product.order &&
                          product.order?.isApproved && (
                            <div className="flex gap-2">
                              <button
                                className="px-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                                onClick={() => handleCancel(product)}
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
                                onClick={() => handleDelete(product.id)}
                              >
                                삭제
                              </button>
                            </div>
                          )}
                        {product.order?.isCanceled && (
                          <div className="flex gap-2">
                            <div
                              className="px-2 py-2 text-red-500 font-bold rounded hover:bg-blue-600 text-lg"
                              onClick={() => handleCancel(product)}
                            >
                              취소 완료
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="w-full bg-gray-200 h-[1px] mt-4" />
                    </div>
                  ))}
              </div>
            </div>
          ))
        ) : (
          <p>판매 중인 제품이 없습니다.</p>
        )}

        {isModalOpen && (
          <CancelModal
            title="취소환불 처리"
            message="정말로 취소하시겠어요? 사유를 적어주세요!"
            onConfirm={() => {
              onConfirm(); // 모달 닫기
              setIsModalOpen(false);
            }}
            onCancel={() => setIsModalOpen(false)} // 모달 취소
            reason={reason}
            handleReason={handleReason}
          />
        )}
      </div>
    </div>
  );
};

export default SalesPage;
