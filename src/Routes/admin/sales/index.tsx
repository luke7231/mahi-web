import React, { useState, useEffect } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import CancelModal from "../cancel-modal";
import Header from "../../../components/common/header";
import { useNavigate } from "react-router-dom";
import { GET_SELLER_STORE } from "../store-management";

// Sample GraphQL queries and mutations
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
  const [countdown, setCountdown] = useState(60);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cancelingProduct, setCancelingProduct] = useState<any>();
  const [reason, setReason] = useState("");
  // Fetch products created by the store owner
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS);

  const [deleteProduct] = useMutation(DELETE_PRODUCT);
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
      refetch(); // 삭제 후 데이터 새로고침
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
  useEffect(() => {
    const intervalId = setInterval(() => {
      handleRefresh();
    }, 60000); // 60000ms = 1분

    const countdownId = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 60));
    }, 1000); // 1초마다 카운트다운

    return () => {
      clearInterval(intervalId);
      clearInterval(countdownId); // 컴포넌트가 언마운트될 때 interval 정리
    };
  }, []);

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
    <div className="min-h-screen bg-gray-100">
      <Header title="판매 현황" showBackButton />
      <div className="p-6 pt-4">
        <div className="flex flex-col items-end mb-4 justify-center space-x-4">
          <button
            onClick={handleRefresh}
            className="flex text-md items-center px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            새로고침
          </button>
          <p className="text-gray-700 text-md">{countdown}초 후 새로고침</p>
        </div>
        {data?.productsBySeller?.length > 0 ? (
          Object.keys(groupedProducts).map((date) => (
            <div key={date} className="mb-8">
              {/* 날짜 섹션 헤더 */}
              <h3 className="text-lg font-bold text-gray-900 mb-4">{date}</h3>
              <div className="grid grid-cols-1 gap-6">
                {/* 해당 날짜에 속하는 제품들 렌더링 */}
                {groupedProducts[date].map((product: any) => (
                  <div
                    key={product.id}
                    className={`p-4 rounded-lg flex justify-between items-center shadow ${
                      product.order &&
                      !product.order?.isCanceled &&
                      product.order?.isApproved
                        ? "bg-blue-300"
                        : "bg-gray-200"
                    }`}
                  >
                    <div className="flex w-full flex-col">
                      {/* 제품 이미지 */}
                      <div className="flex">
                        <img
                          src={
                            product.img ||
                            product?.menus[0].img ||
                            "https://via.placeholder.com/100"
                          }
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded-lg mr-4"
                        />
                        <h2 className="text-lg break-keep font-semibold">
                          {product.name}
                        </h2>
                      </div>
                      <div className="mt-4">
                        <p className="text-gray-700 font-semibold text-sm">
                          원가: {product.price.toLocaleString()}원
                        </p>
                        <p className="text-gray-700 font-semibold text-sm">
                          할인가: {product.discountPrice?.toLocaleString()}원
                        </p>
                        <p className="text-gray-900 font-bold">
                          소비자가:{" "}
                          {product?.userPrice
                            ? Math.floor(product.userPrice).toLocaleString()
                            : Math.floor(
                                ((product.discountPrice +
                                  product.discountPrice * 0.1) /
                                  10) *
                                  10
                              ).toLocaleString()}
                          원<span className="text-sm text-gray-900">(10%)</span>
                        </p>
                        {/* CreatedAt */}
                        <p className="text-gray-600 text-sm">
                          {formatDateToKST(product.createdAt)}
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
