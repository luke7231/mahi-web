import { useParams } from "react-router-dom";

const Store = () => {
  const { id } = useParams();
  console.log(id);
  return <div>Store page</div>;
};

export default Store;
