import { useNavigate } from "react-router-dom";

const Onboarding2 = () => {
  const navigate = useNavigate();

  const onClickButton = () => {
    // navigate("/onboarding3");
  };
  return (
    <div>
      {/* <BackButton /> */}
      {/* <FadeInWrapper>
        <Image src={"https://feople-eeho.com/image/onboarding2-img.png"} />
      </FadeInWrapper> */}
      <div>
        <p>onboarding 1 page</p>
        <button
          className="p-3 rounded-md bg-orange-400"
          onClick={onClickButton}
        >
          다음
        </button>
      </div>
      <button onClick={onClickButton}>버어튼</button>
    </div>
  );
};

export default Onboarding2;
