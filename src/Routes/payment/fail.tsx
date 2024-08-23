import { useNavigate, useSearchParams } from "react-router-dom";

export function FailPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const message = searchParams.get("message") as string;
  // 고객에게 실패 사유 알려주고 다른 페이지로 이동

  // 서버로 승인 요청
  const onClick = () => {
    // TODO: 원래 진행하고 있던 결제 상세페이지로 !
    navigate("/");
  };
  return (
    <div>
      <h1>결제 실패</h1>
      <div>{`사유: ${searchParams.get("message")}`}</div>
      <div className="p-8" onClick={() => onClick()}>
        처음부터 다시 진행하기
      </div>
    </div>
  );
}
