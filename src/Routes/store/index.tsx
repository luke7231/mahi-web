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
            <p className="text-sm">
              {new Date(store.createdAt).toLocaleDateString()}
            </p>
          </header>

          {/* 스토어 정보 */}
          <section className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="flex items-center mb-4">
              <div className="flex-1">
                <p className="text-lg font-semibold">Location</p>
                <p>{`Latitude: ${store.lat}, Longitude: ${store.lng}`}</p>
              </div>
              <button
                className={`p-2 rounded-lg ${
                  store.isLiked
                    ? "bg-red-500 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {store.isLiked ? "Unlike" : "Like"}
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Updated on {new Date(store.updatedAt).toLocaleDateString()}
            </p>

            <div className="flex items-center space-x-4">
              <p className="text-sm">Likes: {store.likes.length}</p>
            </div>
          </section>

          {/* 상품 목록 */}
          <section className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Products</h2>
            <ul className="space-y-4">
              {store.products.map((product: Product) => (
                <li
                  key={product.id}
                  className="border border-gray-300 rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="text-lg font-semibold">{product.name}</p>
                    <p className="text-gray-600">
                      Discount Price: ${product.discountPrice}
                    </p>
                  </div>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => onClickProduct(product.id)}
                  >
                    View Details
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-gray-100 p-4 rounded-lg shadow-md mt-6">
            <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
            <div className="mb-4">
              {cart.length === 0 ? (
                <p className="text-gray-600">Your cart is empty.</p>
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
                Total: ${getTotalAmount().toFixed(2)}
              </p>
              <Link to="/checkout">
                <button className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition">
                  Proceed to Checkout
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
