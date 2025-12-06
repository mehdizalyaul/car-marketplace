import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Car,
  LogIn,
  AlertCircle,
  Shield,
  Zap,
  Heart,
} from "lucide-react";
import "../styles/Login.css";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await login({
        email: formData.email,
        password: formData.password,
      });
      navigate("/cars");
    } catch (error) {
      setErrors({ submit: error.message || "Registration failed." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Left Side - Benefits */}
        <div className="login-benefits-section">
          <div className="benefits-content">
            <div className="benefits-logo">
              <Car size={40} />
            </div>
            <h2 className="benefits-title">Welcome Back!</h2>
            <p className="benefits-subtitle">
              Sign in to continue your car shopping journey
            </p>

            <div className="benefits-list">
              <div className="benefit-item">
                <div className="benefit-icon">
                  <Heart size={24} />
                </div>
                <div className="benefit-text">
                  <h3>Saved Favorites</h3>
                  <p>Access your wishlist and saved searches</p>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon">
                  <Zap size={24} />
                </div>
                <div className="benefit-text">
                  <h3>Quick Actions</h3>
                  <p>Contact dealers and schedule test drives</p>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon">
                  <Shield size={24} />
                </div>
                <div className="benefit-text">
                  <h3>Secure Platform</h3>
                  <p>Your data is protected with encryption</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="login-form-section">
          <div className="login-header">
            <h1 className="login-title">Sign In</h1>
            <p className="login-subtitle">
              Enter your credentials to access your account
            </p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? "error" : ""}`}
                  placeholder="john.doe@example.com"
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <span className="error-message">
                  <AlertCircle size={14} /> {errors.email}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`form-input ${errors.password ? "error" : ""}`}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <span className="error-message">
                  <AlertCircle size={14} /> {errors.password}
                </span>
              )}
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="submit-error">
                <AlertCircle size={18} />
                <span>{errors.submit}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="loading-spinner"></span>
              ) : (
                <>
                  <LogIn size={18} /> Sign In
                </>
              )}
            </button>

            {/* Divider */}
            <div className="divider">
              <span>or</span>
            </div>

            {/* Social Login Buttons */}
            <div className="social-login">
              <button type="button" className="social-btn google-btn">
                Continue with Google
              </button>

              <button type="button" className="social-btn apple-btn">
                Continue with Apple
              </button>
            </div>

            {/* Register Link */}
            <p className="form-footer">
              Don't have an account?{" "}
              <Link to="/register" className="link">
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
