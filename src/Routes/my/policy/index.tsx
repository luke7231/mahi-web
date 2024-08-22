import { Link, useNavigate } from "react-router-dom";
import BottomTab from "../../../components/bottom-tab";

const Policy = () => {
  return (
    <div>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">약관 및 정책</h1>
        <ul className="space-y-2">
          <li>
            <Link to="/" className="text-blue-500 hover:underline">
              개인정보 처리 방침
            </Link>
          </li>
          <li>
            <Link to="/" className="text-blue-500 hover:underline">
              서비스 이용 약관
            </Link>
          </li>
        </ul>
      </div>
      <BottomTab />
    </div>
  );
};

export default Policy;
