import { Link } from "react-router-dom";

const Menu = ({
  title,
  to,
  onClick,
}: {
  title: string;
  to?: string;
  onClick?: () => void;
}) => {
  return (
    <>
      {to ? (
        <Link
          to={to}
          className="p-4 w-full h-auto flex items-center justify-between border-b border-[#eaeaea]"
        >
          {/* Text Section */}
          <div className="text-black text-base font-normal">{title}</div>

          {/* Icon Section */}
          <div className="w-4 h-4">
            {/* Replace this div with an actual icon element, e.g., an SVG or image */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-full h-full text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </Link>
      ) : (
        <div
          onClick={onClick}
          className="p-4 w-full h-auto flex items-center justify-between border-b border-[#eaeaea]"
        >
          {/* Text Section */}
          <div className="text-black text-base font-normal">{title}</div>

          {/* Icon Section */}
          <div className="w-4 h-4">
            {/* Replace this div with an actual icon element, e.g., an SVG or image */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-full h-full text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;
