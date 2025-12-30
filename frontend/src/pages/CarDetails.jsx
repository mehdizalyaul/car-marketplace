import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    Droplet,
    User,
    Clock,
    Cpu,
    Gauge,
    Fuel,
    MapPin,
    Check,
    Phone,
    Mail,
    ShieldCheck,
    Car,
    Settings,
    Zap,
    Users,
    Package,
    FileText,
    AlertCircle,
    Award,
    Calendar,
    BarChart3,
    Info,
} from "lucide-react";
import { features, highlights } from "../db";
import { YoutubeApi } from "../services";

import "../styles/CarDetails.css";
import { getCarSpecs } from "../utils";

export default function CarDetails() {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [currentImg, setCurrentImg] = useState(0);
    const [activeTab, setActiveTab] = useState("overview");

    useEffect(() => {
        fetch(`http://localhost:8000/api/cars/${id}`)
            .then((res) => res.json())
            .then((data) => setCar(data.data));
    }, [id]);

    const [videos, setVideos] = useState([]);
    const [loadingVideos, setLoadingVideos] = useState(false);
    const [videoError, setVideoError] = useState(null);

    useEffect(() => {
        if (!car?.title) return;

        const loadVideos = async () => {
            setLoadingVideos(true);
            setVideoError(null);

            try {
                const results = await YoutubeApi.fetchReviews(car.title);
                setVideos(results);
            } catch (err) {
                setVideoError(err.message);
            } finally {
                setLoadingVideos(false);
            }
        };

        loadVideos();
    }, [car?.title]);

    if (!car) return <div className="loading">Loading...</div>;

    const specs = getCarSpecs(car);
    const images = car.images && car.images.length > 0 ? car.images : [car.image];

    const nextImage = () => setCurrentImg((prev) => (prev + 1) % images.length);
    const prevImage = () =>
        setCurrentImg((prev) => (prev - 1 + images.length) % images.length);

    return (
        <div className="car-details-container">
            <div className="car-details-left">
                {/* Enhanced Carousel */}
                <div className="carousel-section">
                    <div className="carousel">
                        <img
                            className="carousel-image"
                            src={`http://localhost:8000/${images[currentImg]}`}
                            alt={car.title}
                        />

                        {images.length > 1 && (
                            <>
                                <button className="carousel-btn prev" onClick={prevImage}>
                                    <ChevronLeft size={24} />
                                </button>

                                <button className="carousel-btn next" onClick={nextImage}>
                                    <ChevronRight size={24} />
                                </button>

                                <div className="image-counter">
                                    {currentImg + 1} / {images.length}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Title Card */}
                <div className="title-card">
                    <div className="title-card-info">
                        <h1 className="car-title">{car.title}</h1>
                        <div className="quick-stats">
              <span className="quick-stat">
                <Calendar size={16} /> {car.year}
              </span>
                            <span className="quick-stat">
                <Clock size={16} /> {car.miles.toLocaleString()} mi
              </span>
                            <span className="quick-stat">
                <MapPin size={16} /> {car.location}
              </span>
                            <span className={`status-badge ${car.status}`}>
                {car.status === "available" ? "Available" : "Sold"}
              </span>
                        </div>
                    </div>
                    {/* Thumbnail Strip */}
                    {images.length > 1 && (
                        <div className="thumbnail-strip">
                            {images.map((img, idx) => (
                                <div
                                    key={idx}
                                    className={`thumbnail ${idx === currentImg ? "active" : ""}`}
                                    onClick={() => setCurrentImg(idx)}
                                >
                                    <img
                                        src={`http://localhost:8000/${img}`}
                                        alt={`View ${idx + 1}`}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Tabs & Content */}
                <div className="car-overview-card">
                    <div className="tabs-container">
                        <div className="tabs">
                            <button
                                className={activeTab === "overview" ? "active" : ""}
                                onClick={() => setActiveTab("overview")}
                            >
                                Overview
                            </button>
                            <button
                                className={activeTab === "features" ? "active" : ""}
                                onClick={() => setActiveTab("features")}
                            >
                                Features
                            </button>
                            <button
                                className={activeTab === "specs" ? "active" : ""}
                                onClick={() => setActiveTab("specs")}
                            >
                                Specs
                            </button>
                            <button
                                className={activeTab === "history" ? "active" : ""}
                                onClick={() => setActiveTab("history")}
                            >
                                History
                            </button>
                        </div>
                    </div>

                    {/* Overview Tab */}
                    {activeTab === "overview" && (
                        <div className="tab-content">
                            <h2 className="overview-title">Vehicle Overview</h2>

                            {car.description && (
                                <div className="car-description">
                                    <Info size={18} />
                                    <p>{car.description}</p>
                                </div>
                            )}

                            <div className="vehicle-specs">
                                <div className="spec-row">
                                    <Car size={20} /> <span>Make</span>
                                    <strong>{specs.make}</strong>
                                </div>

                                <div className="spec-row">
                                    <Car size={20} /> <span>Model</span>
                                    <strong>{specs.model}</strong>
                                </div>

                                <div className="spec-row">
                                    <Calendar size={20} /> <span>Year</span>
                                    <strong>{car.year}</strong>
                                </div>

                                <div className="spec-row">
                                    <Info size={20} /> <span>Condition</span>
                                    <strong className="condition-badge">{car.condition}</strong>
                                </div>

                                <div className="spec-row">
                                    <Droplet size={20} /> <span>Exterior Color</span>
                                    <strong>{specs.exterior_color}</strong>
                                </div>

                                <div className="spec-row">
                                    <User size={20} /> <span>Interior Color</span>
                                    <strong>{specs.interior_color}</strong>
                                </div>

                                <div className="spec-row">
                                    <Clock size={20} /> <span>Mileage</span>
                                    <strong>{car.miles.toLocaleString()} mi</strong>
                                </div>

                                <div className="spec-row">
                                    <Gauge size={20} /> <span>MPG</span>
                                    <strong>{specs.mpg}</strong>
                                </div>

                                <div className="spec-row">
                                    <Settings size={20} /> <span>Transmission</span>
                                    <strong>{car.transmission}</strong>
                                </div>

                                <div className="spec-row">
                                    <Zap size={20} /> <span>Drivetrain</span>
                                    <strong>{specs.drivetrain}</strong>
                                </div>

                                <div className="spec-row">
                                    <Cpu size={20} /> <span>Engine</span>
                                    <strong>{specs.engine}</strong>
                                </div>

                                <div className="spec-row">
                                    <Fuel size={20} /> <span>Fuel Type</span>
                                    <strong>{specs.fuel_type}</strong>
                                </div>

                                <div className="spec-row">
                                    <Car size={20} /> <span>Body Style</span>
                                    <strong>{specs.body_style}</strong>
                                </div>

                                <div className="spec-row">
                                    <Users size={20} /> <span>Seating</span>
                                    <strong>{specs.seats} passengers</strong>
                                </div>

                                <div className="spec-row">
                                    <Package size={20} /> <span>Doors</span>
                                    <strong>{specs.doors} doors</strong>
                                </div>

                                <div className="spec-row">
                                    <MapPin size={20} /> <span>Location</span>
                                    <strong>{car.location}</strong>
                                </div>
                            </div>

                            <h3 className="overview-title">Key Highlights</h3>
                            <div className="highlights">
                                {highlights.map((h, i) => (
                                    <div className="highlight-item" key={i}>
                                        <Check className="check-icon" size={18} /> {h}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Features Tab */}
                    {activeTab === "features" && (
                        <div className="tab-content">
                            <h2 className="overview-title">Features & Equipment</h2>
                            {Object.entries(features).map(([category, items]) => (
                                <div key={category} className="feature-category">
                                    <h3 className="category-title">{category}</h3>
                                    <div className="feature-list">
                                        {items.map((item, idx) => (
                                            <div className="feature-item" key={idx}>
                                                <Check size={16} className="check-icon" />
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Specs Tab */}
                    {activeTab === "specs" && (
                        <div className="tab-content">
                            <h2 className="overview-title">Technical Specifications</h2>
                            <div className="specs-table">
                                <div className="spec-table-row">
                                    <span className="spec-table-label">Engine Power</span>
                                    <span className="spec-table-value">
                    {specs.horsepower} HP
                  </span>
                                </div>
                                <div className="spec-table-row">
                                    <span className="spec-table-label">Torque</span>
                                    <span className="spec-table-value">{specs.torque}</span>
                                </div>
                                <div className="spec-table-row">
                                    <span className="spec-table-label">Transmission Type</span>
                                    <span className="spec-table-value">{car.transmission}</span>
                                </div>
                                <div className="spec-table-row">
                                    <span className="spec-table-label">Drive Type</span>
                                    <span className="spec-table-value">{specs.drivetrain}</span>
                                </div>
                                <div className="spec-table-row">
                                    <span className="spec-table-label">Fuel Economy (City)</span>
                                    <span className="spec-table-value">22 MPG</span>
                                </div>
                                <div className="spec-table-row">
                  <span className="spec-table-label">
                    Fuel Economy (Highway)
                  </span>
                                    <span className="spec-table-value">29 MPG</span>
                                </div>
                                <div className="spec-table-row">
                                    <span className="spec-table-label">Fuel Tank Capacity</span>
                                    <span className="spec-table-value">18.8 gallons</span>
                                </div>
                                <div className="spec-table-row">
                                    <span className="spec-table-label">Warranty</span>
                                    <span className="spec-table-value">{specs.warranty}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* History Tab */}
                    {activeTab === "history" && (
                        <div className="tab-content">
                            <h2 className="overview-title">Vehicle History</h2>
                            <div className="history-grid">
                                <div className="history-item">
                                    <BarChart3 size={24} className="history-icon" />
                                    <div>
                                        <div className="history-label">CARFAX Score</div>
                                        <div className="history-value">
                                            {specs.carfax_score}/5.0
                                        </div>
                                    </div>
                                </div>
                                <div className="history-item">
                                    <Users size={24} className="history-icon" />
                                    <div>
                                        <div className="history-label">Previous Owners</div>
                                        <div className="history-value">{specs.owners}</div>
                                    </div>
                                </div>
                                <div className="history-item">
                                    <AlertCircle size={24} className="history-icon" />
                                    <div>
                                        <div className="history-label">Accidents Reported</div>
                                        <div className="history-value">{specs.accidents}</div>
                                    </div>
                                </div>
                                <div className="history-item">
                                    <FileText size={24} className="history-icon" />
                                    <div>
                                        <div className="history-label">Service Records</div>
                                        <div className="history-value">{specs.service_records}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="car-meta">
                        <span>VIN: {specs.vin}</span> | <span>Stock: {specs.stock}</span> |{" "}
                        <span>Condition: {car.condition}</span>
                    </div>
                </div>
                {/* YouTube Reviews Section */}
                <section className="youtube-reviews">
                    <h2 className="youtube-title">YouTube Reviews</h2>

                    {loadingVideos && (
                        <p className="loading-videos">Loading reviews...</p>
                    )}

                    {videoError && <p className="video-error">{videoError}</p>}

                    <div className="videos-grid">
                        {videos.map((video) => (
                            <div key={video.id.videoId} className="video-card">
                                <div className="video-wrapper">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={`https://www.youtube.com/embed/${video.id.videoId}`}
                                        title={video.snippet.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                                <p className="video-title">{video.snippet.title}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Right Column */}
            <div className="car-details-right">
                <div className="car-list-price">
                    {/* Rating */}
                    <div className="list-price-header">
                        <div className="rating-wrapper">
              <span className="rating-label">
                {car.condition === "new" ? "Great Value" : "Excellent Deal"}
              </span>
                            <div className="rating-badge">
                                <Award size={32} className="rating-icon" />
                                <span className="rating-score">
                  {car.condition === "new" ? "8.5" : "8.8"}
                </span>
                                <span className="rating-outof">out of 10</span>
                            </div>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="price-section">
                        <h2 className="main-price">${car.price.toLocaleString()}</h2>
                        <p className="price-note">
                            Market Value: ${(car.price + 1500).toLocaleString()}
                        </p>
                        <span className="deal-tag">$1,500 Below Market</span>
                    </div>

                    {/* Contact Card */}
                    <div className="contact-card">
                        <div className="seller-info">
                            <div className="seller-logo">🚗</div>
                            <div>
                                <h3 className="seller-name">Premium Auto Sales</h3>
                                <p className="seller-location">
                                    <MapPin size={15} /> {car.location}
                                </p>
                            </div>
                        </div>

                        <div className="contact-actions">
                            <button className="contact-btn phone-btn">
                                <Phone size={18} /> Call Dealer
                            </button>

                            <button className="contact-btn msg-btn">
                                <Mail size={18} /> Send Message
                            </button>
                        </div>

                        <div className="trust-badges">
                            <div className="trust-badge">
                                <ShieldCheck size={16} /> Verified Dealer
                            </div>
                            <div className="trust-badge">
                                <Car size={16} /> Test Drive Available
                            </div>
                            <div className="trust-badge">
                                <Award size={16} />{" "}
                                {car.condition === "new"
                                    ? "Factory Certified"
                                    : "Quality Inspected"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
