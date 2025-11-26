<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class CarSetupSeeder extends Seeder
{
    public function run(): void
    {
        // --- Brands ---
        $brands = [
            'Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen',
            'Nissan', 'Kia', 'Hyundai', 'Dodge', 'Jeep', 'Chevrolet', 'INFINITI', 'Mazda'
        ];

        foreach ($brands as $brand) {
            DB::table('brands')->updateOrInsert(['name' => $brand]);
        }

        // --- Fuel Types ---
        $fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'];
        foreach ($fuelTypes as $fuel) {
            DB::table('fuel_types')->updateOrInsert(['name' => $fuel]);
        }

        // --- Transmissions ---
        $transmissions = ['Automatic', 'Manual', 'CVT', 'Semi-Automatic'];
        foreach ($transmissions as $transmission) {
            DB::table('transmissions')->updateOrInsert(['name' => $transmission]);
        }

        // --- Locations ---
        $locations = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami'];
        foreach ($locations as $location) {
            DB::table('locations')->updateOrInsert(['city' => $location]);
        }

        // Fetch IDs for mapping
        $brandIds = DB::table('brands')->pluck('id', 'name')->toArray();
        $fuelTypeIds = DB::table('fuel_types')->pluck('id', 'name')->toArray();
        $transmissionIds = DB::table('transmissions')->pluck('id', 'name')->toArray();
        $locationsIds = DB::table('locations')->pluck('id')->toArray();

        // --- REAL CARS DATA ---
        $cars = [
            [
                "title" => "Nissan Sentra SV CVT",
                "brand" => "Nissan",
                "fuel_type" => "Petrol",
                "transmission" => "CVT",
                "year" => 2021,
                "miles" => 32000,
                "price" => 17800,
                "condition" => "used",
                "status" => "available",
                "description" => "Reliable compact sedan with Nissan Safety Shield 360."
            ],
            [
                "title" => "Volkswagen e-Golf SE",
                "brand" => "Volkswagen",
                "fuel_type" => "Electric",
                "transmission" => "Automatic",
                "year" => 2019,
                "miles" => 28000,
                "price" => 16500,
                "condition" => "used",
                "status" => "available",
                "description" => "Fully electric hatchback with smooth driving and excellent city range."
            ],
            [
                "title" => "Kia Soul LX IVT",
                "brand" => "Kia",
                "fuel_type" => "Petrol",
                "transmission" => "CVT",
                "year" => 2023,
                "miles" => 9000,
                "price" => 19500,
                "condition" => "used",
                "status" => "available",
                "description" => "Spacious subcompact SUV with excellent value and tech features."
            ],
            [
                "title" => "Hyundai Veloster 2.0 Premium Auto",
                "brand" => "Hyundai",
                "fuel_type" => "Petrol",
                "transmission" => "Automatic",
                "year" => 2019,
                "miles" => 35000,
                "price" => 17500,
                "condition" => "used",
                "status" => "available",
                "description" => "Sporty 3-door hatchback with sharp handling and premium comforts."
            ],
            [
                "title" => "Dodge Journey SE FWD",
                "brand" => "Dodge",
                "fuel_type" => "Petrol",
                "transmission" => "Automatic",
                "year" => 2019,
                "miles" => 52000,
                "price" => 14900,
                "condition" => "used",
                "status" => "available",
                "description" => "Family-friendly SUV with spacious interior and comfortable ride."
            ],
            [
                "title" => "Ford Escape SE Hybrid FWD",
                "brand" => "Ford",
                "fuel_type" => "Hybrid",
                "transmission" => "CVT",
                "year" => 2021,
                "miles" => 26000,
                "price" => 24900,
                "condition" => "used",
                "status" => "available",
                "description" => "Fuel-efficient hybrid crossover with modern tech."
            ],
            [
                "title" => "Volkswagen Jetta S Automatic",
                "brand" => "Volkswagen",
                "fuel_type" => "Petrol",
                "transmission" => "Automatic",
                "year" => 2021,
                "miles" => 30000,
                "price" => 17900,
                "condition" => "used",
                "status" => "available",
                "description" => "Smooth and efficient German-engineered sedan."
            ],
            [
                "title" => "Jeep Cherokee Latitude FWD",
                "brand" => "Jeep",
                "fuel_type" => "Petrol",
                "transmission" => "Automatic",
                "year" => 2019,
                "miles" => 48000,
                "price" => 18900,
                "condition" => "used",
                "status" => "available",
                "description" => "Versatile SUV with capable performance and comfort."
            ],
            [
                "title" => "Kia Forte GT-Line IVT",
                "brand" => "Kia",
                "fuel_type" => "Petrol",
                "transmission" => "CVT",
                "year" => 2023,
                "miles" => 12000,
                "price" => 21500,
                "condition" => "used",
                "status" => "available",
                "description" => "Sporty sedan with advanced safety and style."
            ],
            [
                "title" => "Volkswagen Taos S FWD",
                "brand" => "Volkswagen",
                "fuel_type" => "Petrol",
                "transmission" => "Automatic",
                "year" => 2024,
                "miles" => 5000,
                "price" => 24900,
                "condition" => "new",
                "status" => "available",
                "description" => "Compact turbo SUV with impressive interior space."
            ],
            [
                "title" => "Ford Escape Active FWD",
                "brand" => "Ford",
                "fuel_type" => "Petrol",
                "transmission" => "Automatic",
                "year" => 2024,
                "miles" => 4000,
                "price" => 27900,
                "condition" => "new",
                "status" => "available",
                "description" => "Comfortable compact SUV with driver-assist tech."
            ],
            [
                "title" => "Chevrolet Equinox LS with 1LS AWD",
                "brand" => "Chevrolet",
                "fuel_type" => "Petrol",
                "transmission" => "Automatic",
                "year" => 2022,
                "miles" => 22000,
                "price" => 23900,
                "condition" => "used",
                "status" => "available",
                "description" => "Reliable AWD SUV with smooth ride quality."
            ],
            [
                "title" => "Hyundai Santa Fe SEL 2.4L FWD (SULEV)",
                "brand" => "Hyundai",
                "fuel_type" => "Petrol",
                "transmission" => "Automatic",
                "year" => 2020,
                "miles" => 36000,
                "price" => 23900,
                "condition" => "used",
                "status" => "available",
                "description" => "Comfortable midsize SUV with high safety ratings."
            ],
            [
                "title" => "Nissan Rogue 2023.5 SV FWD",
                "brand" => "Nissan",
                "fuel_type" => "Petrol",
                "transmission" => "CVT",
                "year" => 2023,
                "miles" => 11000,
                "price" => 28900,
                "condition" => "used",
                "status" => "available",
                "description" => "Best-selling SUV with premium interior feel."
            ],
            [
                "title" => "Hyundai Elantra SE IVT",
                "brand" => "Hyundai",
                "fuel_type" => "Petrol",
                "transmission" => "CVT",
                "year" => 2024,
                "miles" => 3000,
                "price" => 20500,
                "condition" => "new",
                "status" => "available",
                "description" => "Modern compact sedan with top efficiency."
            ],
            [
                "title" => "Hyundai Tucson SEL FWD Limited",
                "brand" => "Hyundai",
                "fuel_type" => "Petrol",
                "transmission" => "Automatic",
                "year" => 2024,
                "miles" => 4000,
                "price" => 28900,
                "condition" => "new",
                "status" => "available",
                "description" => "Premium compact SUV with advanced tech."
            ],
            [
                "title" => "INFINITI QX50 ESSENTIAL AWD",
                "brand" => "INFINITI",
                "fuel_type" => "Petrol",
                "transmission" => "Automatic",
                "year" => 2020,
                "miles" => 31000,
                "price" => 32900,
                "condition" => "used",
                "status" => "available",
                "description" => "Luxury SUV with turbo engine and leather interior."
            ],
            [
                "title" => "Mazda CX-30 Select",
                "brand" => "Mazda",
                "fuel_type" => "Petrol",
                "transmission" => "Automatic",
                "year" => 2023,
                "miles" => 8000,
                "price" => 22900,
                "condition" => "used",
                "status" => "available",
                "description" => "Sporty premium-feel subcompact SUV."
            ],
            [
                "title" => "Mercedes-Benz GLA 250",
                "brand" => "Mercedes-Benz",
                "fuel_type" => "Petrol",
                "transmission" => "Automatic",
                "year" => 2021,
                "miles" => 27000,
                "price" => 32900,
                "condition" => "used",
                "status" => "available",
                "description" => "Luxury crossover with modern tech and turbo performance."
            ]
        ];

        $carImageBase = public_path('assets/cars');

$carIndex = 1;

foreach ($cars as $carData) {

    // Insert the car and get its ID
    $carId = DB::table('cars')->insertGetId([
        'title'          => $carData['title'],
        'brand_id'       => $brandIds[$carData['brand']],
        'fuel_type_id'   => $fuelTypeIds[$carData['fuel_type']],
        'transmission_id'=> $transmissionIds[$carData['transmission']],
        'location_id'    => $locationsIds[array_rand($locationsIds)],
        'description'    => $carData['description'],
        'miles'          => $carData['miles'],
        'price'          => $carData['price'],
        'year'           => $carData['year'],
        'condition'      => $carData['condition'],
        'status'         => $carData['status'],
        'created_at'     => now(),
        'updated_at'     => now(),
    ]);

    // Match folder car-1, car-2, car-3...
    $folderName = "car-$carIndex";
    $folder = $carImageBase . '/' . $folderName;

    if (!is_dir($folder)) {
        echo "❌ Missing folder: $folderName\n";
        $carIndex++;
        continue;
    }

    // Insert images
    $images = scandir($folder);
    foreach ($images as $img) {
        if (in_array(pathinfo($img, PATHINFO_EXTENSION), ['jpg','jpeg','png','webp','avif'])) {
            DB::table('car_images')->insert([
                'car_id'     => $carId,
                'url'        => "assets/cars/$folderName/$img",
                'is_primary' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    $carIndex++;
}


    }


}