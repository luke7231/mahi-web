import React, { useState, useEffect } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";

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
      order {
        id
        user {
          name
        }
      }
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

const SalesPage: React.FC = () => {
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch products created by the store owner
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS);

  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  const handleDelete = (id: number) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      deleteProduct({ variables: { id } });
      refetch(); // 삭제 후 데이터 새로고침
    }
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>오류: {error.message}</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-semibold mb-6">판매 현황</h1>

      {data?.productsBySeller?.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {data.productsBySeller.map((product: any) => (
            <div
              key={product.id}
              className={`p-4 rounded-lg flex justify-between items-center shadow ${
                product.order ? "bg-green-500" : "bg-blue-100"
              }`}
            >
              <div className="flex items-center">
                {/* Product Image */}
                <img
                  src={product.img || "https://via.placeholder.com/100"}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-lg mr-4"
                />
                <div>
                  <h2 className="text-xl font-semibold">{product.name}</h2>
                  <p className="text-gray-600 text-sm">
                    원가: {product.price.toLocaleString()}원
                  </p>
                  <p className="text-gray-600 text-sm">
                    할인가: {product.discountPrice?.toLocaleString()}원
                  </p>
                  <p className="text-gray-900">
                    소비자가:{" "}
                    {product?.userPriceMath
                      ? Math.floor(product.userPrice).toLocaleString()
                      : Math.floor(
                          product.discountPrice + product.discountPrice * 0.1
                        ).toLocaleString()}
                    원<span className="text-sm text-gray-900">(10%)</span>
                  </p>
                  {product.order?.user && (
                    <p className="text-white text-sm">
                      구매자: {product.order.user.name}
                    </p>
                  )}
                  {/* Payment status based on order existence */}
                  <p
                    className={`text-sm ${
                      product.order ? "text-white" : "text-red-500"
                    }`}
                  >
                    {product.order ? "결제 완료" : "결제 대기 중"}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  onClick={() => handleEdit(product)}
                >
                  편집
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                  onClick={() => handleDelete(product.id)}
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>판매 중인 제품이 없습니다.</p>
      )}

      {/* Product Edit Modal (if necessary) */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">상품 편집</h2>
            <p>상품 수정 작업을 여기에 구현하세요.</p>
            <button onClick={() => setEditingProduct(null)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesPage;
