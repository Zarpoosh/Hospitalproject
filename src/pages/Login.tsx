import React, { useState } from "react";
// import { LogIn } from "lucide-react";
import type{ UserRole } from "../types";
import { useAuth } from "../hooks/useAuth";
import { ROLE_CONFIG, MOCK_USERS } from "../constants/auth";
import RoleCard from "../components/Auth/RoleCard";
import TextInput from "../components/Auth/TextInput";
import PasswordInput from "../components/Auth/PasswordInput";
import DemoLoginButtons from "../components/Auth//DemoLoginButtons";
import LoginHeader from "../components/Auth/LoginHeader";
import ErrorAlert from "../components/Auth/ErrorAlert";

interface LoginCredentials {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>("patient");
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);

  const { error, loading, login, redirectByRole, setError } = useAuth();
  const selectedRoleConfig = ROLE_CONFIG.find(
    (role) => role.id === selectedRole
  );

  const handleCredentialChange = (
    field: keyof LoginCredentials,
    value: string
  ) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await login(credentials, selectedRole);
    if (success) {
      redirectByRole(selectedRole);
    }
  };

  const handleDemoLogin = (role: UserRole) => {
    const user = MOCK_USERS[role];
    setSelectedRole(role);
    setCredentials({
      username: user.username,
      password: user.password,
    });
    setError("");
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl overflow-hidden">
        <div className="md:flex">
          {/* Left Panel - Role Selection */}
          <div className="md:w-2/5 bg-gradient-to-b from-blue-600 to-blue-800 p-8 text-white">
            <LoginHeader />

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">انتخاب نقش:</h2>
              <div className="space-y-3">
                {ROLE_CONFIG.map((role) => (
                  <RoleCard
                    key={role.id}
                    role={role.id}
                    name={role.name}
                    icon={role.icon}
                    color={role.color}
                    isSelected={selectedRole === role.id}
                    onClick={handleRoleSelect}
                  />
                ))}
              </div>
            </div>

            <DemoLoginButtons onDemoLogin={handleDemoLogin} />
          </div>

          {/* Right Panel - Login Form */}
          <div className="md:w-3/5 p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                ورود به عنوان {selectedRoleConfig?.name}
              </h2>
              <p className="text-gray-600">لطفاً اطلاعات خود را وارد کنید</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <TextInput
                label="نام کاربری"
                value={credentials.username}
                onChange={(value) => handleCredentialChange("username", value)}
                placeholder="نام کاربری خود را وارد کنید"
                error={error}
              />

              <PasswordInput
                label="رمز عبور"
                value={credentials.password}
                onChange={(value) => handleCredentialChange("password", value)}
              />

              {error && <ErrorAlert message={error} />}

              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-blue-600 ml-2 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-gray-600">مرا به خاطر بسپار</span>
                </label>

                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  onClick={() => {
                    /* Add forgot password logic */
                  }}
                >
                  رمز عبور را فراموش کرده‌اید؟
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:from-blue-700 hover:to-blue-800"
                }`}
              >
                {loading ? "در حال ورود..." : "ورود به سیستم"}
              </button>

              <LoginFooter />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoginFooter: React.FC = () => (
  <div className="text-center pt-4 border-t">
    <p className="text-gray-600">
      حساب کاربری ندارید؟{" "}
      <button
        type="button"
        className="text-blue-600 font-medium hover:text-blue-800"
        onClick={() => {
          /* Add register logic */
        }}
      >
        ثبت نام کنید
      </button>
    </p>
    <p className="text-sm text-gray-500 mt-2">
      اطلاعات دمو: patient123 / 123456
    </p>
  </div>
);

export default Login;
