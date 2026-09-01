import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import loginLock from "../../assets/icon.gif";
import "./authlogin.css";
import { useLoginAdminMutation } from "../../api/authapi";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [loginAdmin, { isLoding }] = useLoginAdminMutation();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onLogin = async (data) => {
    try {
      const res = await loginAdmin(data).unwrap();
      localStorage.setItem("accessToken", res.accessToken);
      if (res?.status) {
        toast.success("Login successfully");
        navigate("/admin/dashboard");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Logo */}
        <div className="login-logo-wrap">
          <div className="logo">
            <img src={loginLock} alt="Login Lock" className="login-lock" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="login-title">Master Admin</h1>
        <p className="login-subtitle">Please enter your details</p>

        <form onSubmit={handleSubmit(onLogin)} className="login-form">
          {/* Email */}
          {/* 👇 was "form-group" -> "login-form-group" */}
          <div className="login-form-group">
            {/* 👇 was "form-label" -> "login-form-label" */}
            <label htmlFor="email" className="login-form-label">
              Email Address
            </label>
            {/* 👇 was "input-wrapper" -> "login-input-wrapper" */}
            <div className="login-input-wrapper">
              {/* 👇 was "input-icon" -> "login-input-icon" */}
              <Mail className="login-input-icon" />
              <input
                id="email"
                type="email"
                {...register("email")}
                placeholder="Enter your Email"
                // 👇 was "form-input" -> "login-form-input"
                className="login-form-input"
              />
            </div>
          </div>

          {/* Password */}
          <div className="login-form-group">
            <label htmlFor="password" className="login-form-label">
              Password
            </label>
            <div className="login-input-wrapper">
              <Lock className="login-input-icon" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="Enter your password"
                // 👇 was "form-input password-input" -> "login-form-input login-password-input"
                className="login-form-input login-password-input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                // 👇 was "toggle-visibility" -> "login-toggle-visibility"
                className="login-toggle-visibility"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className="login-button" disabled={isLoding}>
            {isLoding ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}