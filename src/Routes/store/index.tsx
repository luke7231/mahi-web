import { gql, useQuery } from "@apollo/client";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Product } from "../../__generated__/graphql";
import { useCart } from "../../core/cart";

const GET_STORE = gql`
  query Store($storeId: Int!) {
    store(id: $storeId) {
      id
      lat
      lng
      title
      createdAt
      updatedAt
      likes {
        id
        userId
        storeId
      }
      isLiked
      products {
        id
        name
        discountPrice
        img
      }
    }
  }
`;

const Store = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useQuery(GET_STORE, {
    variables: {
      storeId: Number(id),
    },
  });
  const store = data?.store;

  function onClickProduct(id: number) {
    navigate(`/product/${id}`);
  }
  const { cart } = useCart(); // useCart 훅을 사용하여 cart 가져오기

  // 카트의 총액 계산
  const getTotalAmount = () => {
    return cart.reduce((total, item) => {
      const price = item.product.discountPrice || item.product.price;
      return total + price * item.quantity;
    }, 0);
  };
  return (
    <div className="container mx-auto p-4">
      {store ? (
        <>
          {/* 헤더 */}
          <header className="bg-gray-800 text-white p-4 rounded-lg shadow-md mb-6">
            <h1 className="text-2xl font-bold">{store.title}</h1>
          </header>

          {/* 상품 목록 */}
          <section className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">현재 팩</h2>
            <ul className="space-y-4">
              {store.products.map((product: Product) => (
                <li
                  key={product.id}
                  onClick={() => onClickProduct(product.id)}
                  className="border border-gray-300 rounded-lg p-4 flex justify-between items-center"
                >
                  <div className="flex">
                    {product.img ? (
                      <img
                        src={product.img}
                        alt={product.name}
                        className="w-[72px] h-[72px] object-cover rounded-lg"
                      />
                    ) : null}

                    {/* 상품 정보 섹션 */}
                    <div className="flex flex-col justify-center ml-2">
                      <h2 className="text-xl font-semibold mb-1">
                        {product.name}
                      </h2>
                    </div>
                  </div>
                  {/* <button
                    className="bg-blue-500 text-white px-2 py-2 rounded-lg text-sm"
                    onClick={() => onClickProduct(product.id)}
                  >
                    
                  </button> */}
                  <p className="text-md font-bold text-green-600">
                    {product?.discountPrice?.toLocaleString()}원
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-gray-100 p-4 rounded-lg shadow-md mt-6">
            <h2 className="text-xl font-semibold mb-4">현재 담은 내역</h2>
            <div className="mb-4">
              {cart.length === 0 ? (
                <p className="text-sm text-gray-600">카트가 비어있어요.</p>
              ) : (
                <ul className="space-y-4">
                  {cart.map((item) => (
                    <li
                      key={item.product.id}
                      className="flex justify-between items-center p-2 border border-gray-300 rounded-lg"
                    >
                      <span>{item.product.name}</span>
                      <span>
                        ${item.product.discountPrice || item.product.price} x{" "}
                        {item.quantity}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold">
                총: {getTotalAmount().toFixed(0)}원
              </p>
              <Link to="/checkout">
                <button className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition">
                  계속하기
                </button>
              </Link>
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
};

export default Store;
