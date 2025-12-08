export const BACKEND_URL = "http://localhost:8000/api";

// Common car specifications
export const getCarSpecs = (car) => ({
  make: car.title?.split(" ")[0] || "Unknown",
  model: car.title?.split(" ").slice(1, -1).join(" ") || "Unknown",
  exterior_color: "Shimmering Silver Pearl",
  interior_color: "Black Cloth",
  drivetrain: car.title?.includes("FWD")
    ? "FWD"
    : car.title?.includes("AWD")
    ? "AWD"
    : "FWD",
  engine: car.title?.includes("2.4L") ? "2.4L 4-Cylinder" : "2.5L 4-Cylinder",
  fuel_type: car.fuel_type || "Gasoline",
  mpg: "22 city / 29 highway",
  horsepower: 185,
  torque: "178 lb-ft",
  doors: 4,
  seats: 5,
  body_style: "SUV",
  vin: "5NMS23AD8LH123456",
  stock: `STK${car.id}${car.year}`,
  carfax_score: 4.2,
  owners: 1,
  accidents: 0,
  service_records: 12,
  warranty:
    car.condition === "new"
      ? "5yr/60,000 mi Powertrain"
      : "Extended Warranty Available",
});
