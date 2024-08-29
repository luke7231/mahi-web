import React, { useState } from "react";

const PasswordResetPage = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePasswordReset = () => {
    setIsSubmitting(true);
    // Add your password reset logic here
    // After successful password reset, provide appropriate feedback
    setIsSubmitting(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fff] p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        {/* Header */}
        <h2 className="text-2xl font-semibold text-center text-black mb-6">
          비밀번호 찾기
        </h2>

        {/* Password Reset Form */}
        <form onSubmit={handlePasswordReset} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black mb-2"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#1562fc]"
              placeholder="이메일을 입력하세요."
            />
          </div>

          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-black mb-2"
            >
              비밀번호 재설정
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#1562fc]"
              placeholder="새로운 비밀번호를 입력하세요."
            />
          </div>

          <div>
            <label
              htmlFor="passwordConfirm"
              className="block text-sm font-medium text-black mb-2"
            >
              비밀번호 재설정 확인
            </label>
            <input
              type="password"
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#1562fc]"
              placeholder="비밀번호를 다시 입력하세요."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 rounded-md text-white font-semibold ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#1562fc] hover:bg-[#124ab7] transition duration-150"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "처리 중..." : "비밀번호 재설정"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordResetPage;
