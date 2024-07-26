import { useNavigate } from "react-router-dom";

const Onboarding1 = () => {
  const navigate = useNavigate();

  const onClickButton = () => {
    navigate("/onboarding2");
  };
  return (
    <div>
      <p>onboarding 1 page</p>
      <button className="p-3 rounded-md bg-orange-400" onClick={onClickButton}>
        다음
      </button>
    </div>
  );
};

export default Onboarding1;
