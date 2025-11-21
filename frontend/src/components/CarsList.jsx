import { useState } from "react";
import Card from "./Card";
import LayoutSwitcher from "./switchLayout";
import SortMenu from "./SortMenu";

export default function CarsList() {
   const [cols, setCols] = useState(4); 
   const [sortBy, setSortBy] = useState("recommended");
  const cars = [
    {
      id: 1,
      title: "2024 Ford Edge",
      trim: "Lariat SuperCrew 5.5' Box 4WD",
      fuel: "Petrol",
      transmission: "Automatic",
      miles: 20000,
      price: "$18,820",
      location: "Orlando, FL",
      img:
        "https://listings-prod.tcimg.net/listings/484560/87/01/3VV2B7AX7NM100187/001.jpg?auto=format&fit=max&h=315&w=560"
    },
    {
      id: 2,
      title: "2022 Toyota Camry",
      trim: "SE Nightshade Edition",
      fuel: "Hybrid",
      transmission: "Automatic",
      miles: 12140,
      price: "$25,400",
      location: "Miami, FL",
      img:
        "https://listings-prod.tcimg.net/listings/1668/36/02/3C4NJDDB9NT220236/001_2025112007.jpg?auto=format&fit=max&h=315&w=560"
    },
    {
      id: 3,
      title: "2021 Honda Accord",
      trim: "EX-L",
      fuel: "Petrol",
      transmission: "CVT",
      miles: 13065 ,
      price: "$22,900",
      location: "Tampa, FL",
      img:
        "https://listings-prod.tcimg.net/listings/86796/81/64/1C4BJWDG2HL666481/001_2025110605.jpg?auto=format&fit=max&h=315&w=560"
    }, {
      id: 1,
      title: "2024 Ford Edge",
      trim: "Lariat SuperCrew 5.5' Box 4WD",
      fuel: "Petrol",
      transmission: "Automatic",
      miles: 20000,
      price: "$18,820",
      location: "Orlando, FL",
      img:
        "https://listings-prod.tcimg.net/listings/484560/87/01/3VV2B7AX7NM100187/001.jpg?auto=format&fit=max&h=315&w=560"
    },
    {
      id: 2,
      title: "2022 Toyota Camry",
      trim: "SE Nightshade Edition",
      fuel: "Hybrid",
      transmission: "Automatic",
      miles: 12140,
      price: "$25,400",
      location: "Miami, FL",
      img:
        "https://listings-prod.tcimg.net/listings/492422/01/03/1G1ZD5ST7PF190301/001_2025110815.jpg?auto=format&fit=max&h=316&w=560"
    },
    {
      id: 3,
      title: "2021 Honda Accord",
      trim: "EX-L",
      fuel: "Petrol",
      transmission: "CVT",
      miles: 13065 ,
      price: "$22,900",
      location: "Tampa, FL",
      img:
        "https://listings-prod.tcimg.net/listings/150301/69/25/2FMPK4J92RBA92569/001_2025103104.jpg?auto=format&fit=max&h=315&w=560"
    }
  ];
 const sizeMap = {
  2: 1,  // bigger cards
  4: 1,    // normal
  5: 1,  // compact feel
};

  return (
    <div>
      <div className="cars-toolbar">
        <SortMenu value={sortBy} onChange={setSortBy} />
        <LayoutSwitcher current={cols} onChange={setCols} />
      </div>

      <div
        className="cars-container"
        style={{
          "--cols": cols,
          "--scale": sizeMap[cols]
        }}
      >
        {cars.map(car => (
          <Card key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}
