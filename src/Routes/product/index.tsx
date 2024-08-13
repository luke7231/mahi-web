import { gql, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";

const GET_PRODUCT = gql`
  query Product($productId: Int!) {
    product(id: $productId) {
      id
      store {
        id
      }
      name
      price
      discountPrice
      quantity
      description
      saleEndTime
      createdAt
      updatedAt
    }
  }
`;

const Product = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useQuery(GET_PRODUCT, {
    variables: {
      productId: Number(id),
    },
  });
  const product = data?.product;
  return (
    <div className="container mx-auto p-4">
      {product ? (
        <>
          {/* 헤더 */}
          <header className="bg-gray-200 p-4 rounded-lg shadow-md mb-6">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-sm text-gray-600">Product ID: {product.id}</p>
          </header>

          {/* 상품 정보 */}
          <section className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="flex items-center mb-4">
              <div className="flex-1">
                <p className="text-xl font-semibold">Price: ${product.price}</p>
                {product.discountPrice < product.price && (
                  <p className="text-lg text-red-500 font-semibold">
                    Discount Price: ${product.discountPrice}
                  </p>
                )}
                <p className="text-gray-600">
                  Quantity Available: {product.quantity}
                </p>
                <p className="text-gray-500 text-sm">
                  Created on {new Date(product.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-500 text-sm">
                  Updated on {new Date(product.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex-shrink-0">
                {/* Placeholder for product image */}
                <div className="w-32 h-32 bg-gray-300 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 text-xl">Image</span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-600">
                Sale ends on:{" "}
                {new Date(product.saleEndTime).toLocaleDateString()}
              </p>
            </div>
          </section>

          {/* 상품 설명 */}
          <section className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </section>

          {/* 구매 버튼 */}
          <div className="flex justify-center mt-6">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition">
              카트에 담기
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Product;
