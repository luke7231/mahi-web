import React from "react";
import { Link } from "react-router-dom";
import BottomTab from "../../components/bottom-tab";

const My = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Page</h1>
      <ul className="space-y-2">
        <li>
          <Link
            to="/purchase-history"
            className="text-blue-500 hover:underline"
          >
            Purchase History
          </Link>
        </li>
        <li>
          <Link
            to="/customer-service"
            className="text-blue-500 hover:underline"
          >
            Customer Service
          </Link>
        </li>
        <li>
          <Link to="/notice" className="text-blue-500 hover:underline">
            Notice
          </Link>
        </li>
        <li>
          <Link to="/profile-edit" className="text-blue-500 hover:underline">
            Profile Edit
          </Link>
        </li>
      </ul>
      <BottomTab />
    </div>
  );
};

export default My;
