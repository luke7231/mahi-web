import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Product } from "../../__generated__/graphql";

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
  const { id } = useParams();
  const { data } = useQuery(GET_STORE, {
    variables: {
      storeId: Number(id),
    },
  });
  const store = data.store;
  return (
    <div className="container mx-auto p-4">
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
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                View Details
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Store;
