const HeartIcon = ({
  isLiked,
  onClick,
}: {
  isLiked?: boolean | undefined | null;
  onClick?: (e: React.MouseEvent) => void;
}) => {
  return (
    <div onClick={onClick}>
      {isLiked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="34"
          height="32"
          viewBox="0 0 34 32"
          fill="none"
          className="absolute top-2 right-2"
        >
          <g filter="url(#filter0_d_2311_1347)">
            <path
              d="M9.31804 9.31804C8.90017 9.7359 8.5687 10.232 8.34255 10.778C8.1164 11.3239 8 11.9091 8 12.5C8 13.091 8.1164 13.6762 8.34255 14.2221C8.5687 14.7681 8.90017 15.2642 9.31804 15.682L17 23.364L24.682 15.682C25.526 14.8381 26.0001 13.6935 26.0001 12.5C26.0001 11.3066 25.526 10.162 24.682 9.31804C23.8381 8.47412 22.6935 8.00001 21.5 8.00001C20.3066 8.00001 19.162 8.47412 18.318 9.31804L17 10.636L15.682 9.31804C15.2642 8.90017 14.7681 8.5687 14.2221 8.34255C13.6762 8.1164 13.091 8 12.5 8C11.9091 8 11.3239 8.1164 10.778 8.34255C10.232 8.5687 9.7359 8.90017 9.31804 9.31804Z"
              fill="#FD4242"
            />
            <path
              d="M9.31804 9.31804C8.90017 9.7359 8.5687 10.232 8.34255 10.778C8.1164 11.3239 8 11.9091 8 12.5C8 13.091 8.1164 13.6762 8.34255 14.2221C8.5687 14.7681 8.90017 15.2642 9.31804 15.682L17 23.364L24.682 15.682C25.526 14.8381 26.0001 13.6935 26.0001 12.5C26.0001 11.3066 25.526 10.162 24.682 9.31804C23.8381 8.47412 22.6935 8.00001 21.5 8.00001C20.3066 8.00001 19.162 8.47412 18.318 9.31804L17 10.636L15.682 9.31804C15.2642 8.90017 14.7681 8.5687 14.2221 8.34255C13.6762 8.1164 13.091 8 12.5 8C11.9091 8 11.3239 8.1164 10.778 8.34255C10.232 8.5687 9.7359 8.90017 9.31804 9.31804Z"
              stroke="#FD4242"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_2311_1347"
              x="0"
              y="0"
              width="34"
              height="31.364"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="3.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_2311_1347"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_2311_1347"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="34"
          height="32"
          viewBox="0 0 34 32"
          fill="none"
          className="absolute top-2 right-2"
        >
          <g filter="url(#filter0_d_2311_1219)">
            <path
              d="M9.31804 9.31804C8.90017 9.7359 8.5687 10.232 8.34255 10.778C8.1164 11.3239 8 11.9091 8 12.5C8 13.091 8.1164 13.6762 8.34255 14.2221C8.5687 14.7681 8.90017 15.2642 9.31804 15.682L17 23.364L24.682 15.682C25.526 14.8381 26.0001 13.6935 26.0001 12.5C26.0001 11.3066 25.526 10.162 24.682 9.31804C23.8381 8.47412 22.6935 8.00001 21.5 8.00001C20.3066 8.00001 19.162 8.47412 18.318 9.31804L17 10.636L15.682 9.31804C15.2642 8.90017 14.7681 8.5687 14.2221 8.34255C13.6762 8.1164 13.091 8 12.5 8C11.9091 8 11.3239 8.1164 10.778 8.34255C10.232 8.5687 9.7359 8.90017 9.31804 9.31804Z"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              shape-rendering="crispEdges"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_2311_1219"
              x="0"
              y="0"
              width="34"
              height="31.364"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="3.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_2311_1219"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_2311_1219"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      )}
    </div>
  );
};
export default HeartIcon;
