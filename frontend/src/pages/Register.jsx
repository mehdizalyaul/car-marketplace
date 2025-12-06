import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Phone,
  MapPin,
  Car,
  Check,
  AlertCircle,
} from "lucide-react";
import "../styles/Register.css";
import { useAuth } from "../hooks/useAuth";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    password_confirmation: "",
  });
  const { register } = useAuth();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Username is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.password_confirmation) {
      newErrors.password_confirmation = "Please confirm your password";
    } else if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = "Passwords do not match";
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
      await register(formData);
      navigate("/cars");
    } catch (error) {
      setErrors({ submit: error.message || "Registration failed." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-wrapper">
        {/* Left Side - Form */}
        <div className="register-form-section">
          <div className="register-header">
            <div className="register-logo">
              <Car size={32} />
            </div>
            <h1 className="register-title">Create Account</h1>
            <p className="register-subtitle">
              Join us to find your dream car today
            </p>
          </div>

          <form className="register-form" onSubmit={handleSubmit}>
            {/* Name Fields */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <div className="input-wrapper">
                  <User size={18} className="input-icon" />
                  <input
                    type="text"
                    id="username"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-input ${errors.name ? "error" : ""}`}
                    placeholder="Doe"
                  />
                </div>
                {errors.name && (
                  <span className="error-message">
                    <AlertCircle size={14} /> {errors.name}
                  </span>
                )}
              </div>
            </div>

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
                />
              </div>
              {errors.email && (
                <span className="error-message">
                  <AlertCircle size={14} /> {errors.email}
                </span>
              )}
            </div>

            {/* Phone */}
            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <div className="input-wrapper">
                <Phone size={18} className="input-icon" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`form-input ${errors.phone ? "error" : ""}`}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              {errors.phone && (
                <span className="error-message">
                  <AlertCircle size={14} /> {errors.phone}
                </span>
              )}
            </div>

            {/* Location */}
            <div className="form-group">
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <div className="input-wrapper">
                <MapPin size={18} className="input-icon" />
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`form-input ${errors.location ? "error" : ""}`}
                  placeholder="City, State"
                />
              </div>
              {errors.location && (
                <span className="error-message">
                  <AlertCircle size={14} /> {errors.location}
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

            {/* Confirm Password */}
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  className={`form-input ${
                    errors.password_confirmation ? "error" : ""
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {errors.password_confirmation && (
                <span className="error-message">
                  <AlertCircle size={14} /> {errors.password_confirmation}
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
                  <Check size={18} /> Create Account
                </>
              )}
            </button>

            {/* Login Link */}
            <p className="form-footer">
              Already have an account?{" "}
              <Link to="/login" className="link">
                Sign In
              </Link>
            </p>
          </form>
        </div>

        {/* Right Side - Benefits */}
        <div className="register-benefits-section">
          <div className="benefits-content">
            <h2 className="benefits-title">Why Join Us?</h2>
            <p className="benefits-subtitle">
              Discover the best deals on quality vehicles
            </p>

            <div className="benefits-list">
              <div className="benefit-item">
                <div className="benefit-icon">
                  <Car size={24} />
                </div>
                <div className="benefit-text">
                  <h3>Wide Selection</h3>
                  <p>Browse thousands of verified vehicles</p>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon">
                  <Check size={24} />
                </div>
                <div className="benefit-text">
                  <h3>Verified Sellers</h3>
                  <p>All dealers are verified and trusted</p>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon">
                  <AlertCircle size={24} />
                </div>
                <div className="benefit-text">
                  <h3>Price Alerts</h3>
                  <p>Get notified when prices drop</p>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon">
                  <User size={24} />
                </div>
                <div className="benefit-text">
                  <h3>Personalized Experience</h3>
                  <p>Save favorites and track your searches</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
