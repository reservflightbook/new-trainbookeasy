// TrainBookEasy - Master Dataset & Simulation Configuration

const TRAIN_DATA = {
  stations: [
    { code: "NYP", name: "New York Penn Station", city: "New York", state: "NY", popular: true },
    { code: "BOS", name: "Boston South Station", city: "Boston", state: "MA", popular: true },
    { code: "WAS", name: "Washington Union Station", city: "Washington", state: "DC", popular: true },
    { code: "CHI", name: "Chicago Union Station", city: "Chicago", state: "IL", popular: true },
    { code: "PHL", name: "Philadelphia 30th St", city: "Philadelphia", state: "PA", popular: true },
    { code: "LAX", name: "Los Angeles Union", city: "Los Angeles", state: "CA", popular: true },
    { code: "SFO", name: "San Francisco Transbay", city: "San Francisco", state: "CA", popular: true },
    { code: "SEA", name: "Seattle King Street", city: "Seattle", state: "WA", popular: false },
    { code: "LON", name: "London King's Cross", city: "London", state: "UK", popular: true },
    { code: "EDI", name: "Edinburgh Waverley", city: "Edinburgh", state: "UK", popular: true },
    { code: "PAR", name: "Paris Gare de Lyon", city: "Paris", state: "FR", popular: true },
    { code: "ZUR", name: "Zurich Hauptbahnhof", city: "Zurich", state: "CH", popular: true },
    { code: "TYO", name: "Tokyo Central", city: "Tokyo", state: "JP", popular: true },
    { code: "KYO", name: "Kyoto Station", city: "Kyoto", state: "JP", popular: true },
    { code: "NDLS", name: "New Delhi Central", city: "New Delhi", state: "IN", popular: true },
    { code: "BCT", name: "Mumbai Central", city: "Mumbai", state: "IN", popular: true }
  ],

  trains: [
    {
      id: "TR-101",
      number: "1204",
      name: "Apex Bullet Express",
      type: "High-Speed Maglev",
      badge: "Fastest Choice",
      speed: "320 km/h",
      rating: 4.9,
      reviewsCount: 1420,
      amenities: ["Free 5G Wi-Fi", "Panoramic Windows", "Gourmet Dining", "Power Outlets", "Silent Coach"],
      classes: {
        "EC": { name: "Executive Class (1A)", price: 165, available: 14, quota: "Available", features: "Leather Recliner 180°, Meal Included, Priority Boarding" },
        "1A": { name: "First Class AC", price: 110, available: 26, quota: "Available", features: "Extra Legroom, Refreshments, Silent Zone" },
        "2A": { name: "Business AC (2-Tier)", price: 78, available: 42, quota: "Available", features: "Ergonomic Seats, USB-C Charging" },
        "CC": { name: "Economy Chair Car", price: 42, available: 88, quota: "Available", features: "Comfortable Seating, Reading Light" }
      },
      schedule: {
        depTime: "06:15",
        arrTime: "09:30",
        duration: "3h 15m",
        departureStation: "BOS",
        arrivalStation: "NYP",
        runsOn: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        stops: [
          { station: "Boston South (BOS)", arr: "Origin", dep: "06:15", platform: "04", dist: "0 km", status: "Departed" },
          { station: "Providence (PVD)", arr: "06:55", dep: "06:58", platform: "02", dist: "70 km", status: "Departed" },
          { station: "New Haven Union (NHV)", arr: "08:12", dep: "08:16", platform: "01", dist: "250 km", status: "Departed" },
          { station: "Stamford (STM)", arr: "08:52", dep: "08:55", platform: "03", dist: "330 km", status: "On Time" },
          { station: "New York Penn (NYP)", arr: "09:30", dep: "Terminus", platform: "07", dist: "370 km", status: "Expected On-Time" }
        ],
        currentStopIndex: 3,
        currentProgress: 75,
        liveStatusText: "Running on time, approaching Stamford."
      }
    },
    {
      id: "TR-102",
      number: "2088",
      name: "Pacific Horizon Superfast",
      type: "Superfast Express",
      badge: "Popular Value",
      speed: "240 km/h",
      rating: 4.8,
      reviewsCount: 980,
      amenities: ["Wi-Fi", "Snack Bar", "Power Sockets", "Luggage Racks"],
      classes: {
        "EC": { name: "Executive Class (1A)", price: 140, available: 6, quota: "Few Left", features: "Luxury Seats, Complimentary Beverage" },
        "1A": { name: "First Class AC", price: 95, available: 19, quota: "Available", features: "Wide Legroom, AC Climate Control" },
        "2A": { name: "Business AC (2-Tier)", price: 65, available: 31, quota: "Available", features: "Comfort Recline, Tray Tables" },
        "CC": { name: "Economy Chair Car", price: 35, available: 74, quota: "Available", features: "Standard Cushion, Shared Outlets" }
      },
      schedule: {
        depTime: "08:30",
        arrTime: "12:10",
        duration: "3h 40m",
        departureStation: "BOS",
        arrivalStation: "NYP",
        runsOn: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        stops: [
          { station: "Boston South (BOS)", arr: "Origin", dep: "08:30", platform: "02", dist: "0 km", status: "Departed" },
          { station: "Back Bay (BBY)", arr: "08:37", dep: "08:40", platform: "01", dist: "3 km", status: "Departed" },
          { station: "Route 128 (RTE)", arr: "08:52", dep: "08:54", platform: "02", dist: "18 km", status: "Departed" },
          { station: "Providence (PVD)", arr: "09:20", dep: "09:23", platform: "03", dist: "70 km", status: "Departed" },
          { station: "New London (NLC)", arr: "10:15", dep: "10:18", platform: "01", dist: "170 km", status: "On Time" },
          { station: "New Haven (NHV)", arr: "11:05", dep: "11:10", platform: "04", dist: "250 km", status: "Expected On-Time" },
          { station: "New York Penn (NYP)", arr: "12:10", dep: "Terminus", platform: "09", dist: "370 km", status: "Expected On-Time" }
        ],
        currentStopIndex: 4,
        currentProgress: 60,
        liveStatusText: "Departed New London, running strictly on schedule."
      }
    },
    {
      id: "TR-103",
      number: "3310",
      name: "Metrolink Coastliner",
      type: "Intercity Express",
      badge: "Budget Friendly",
      speed: "190 km/h",
      rating: 4.6,
      reviewsCount: 620,
      amenities: ["Wi-Fi", "Vending Lounge", "Air Conditioned", "Clean Restrooms"],
      classes: {
        "1A": { name: "First Class AC", price: 82, available: 12, quota: "Available", features: "Comfort Seats, Window View" },
        "2A": { name: "Business AC (2-Tier)", price: 54, available: 38, quota: "Available", features: "Modern Interior, Charging Hubs" },
        "CC": { name: "Economy Chair Car", price: 28, available: 110, quota: "Available", features: "High Capacity, Budget Friendly" }
      },
      schedule: {
        depTime: "11:45",
        arrTime: "15:40",
        duration: "3h 55m",
        departureStation: "BOS",
        arrivalStation: "NYP",
        runsOn: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        stops: [
          { station: "Boston South (BOS)", arr: "Origin", dep: "11:45", platform: "05", dist: "0 km", status: "Departed" },
          { station: "Providence (PVD)", arr: "12:35", dep: "12:39", platform: "02", dist: "70 km", status: "Departed" },
          { station: "Hartford (HFD)", arr: "13:45", dep: "13:50", platform: "01", dist: "185 km", status: "Delayed 6m" },
          { station: "Bridgeport (BPT)", arr: "14:48", dep: "14:52", platform: "03", dist: "290 km", status: "Expected +5m" },
          { station: "New York Penn (NYP)", arr: "15:45", dep: "Terminus", platform: "11", dist: "370 km", status: "Expected +5m" }
        ],
        currentStopIndex: 2,
        currentProgress: 45,
        liveStatusText: "6 minutes delay due to track maintenance near Hartford."
      }
    },
    {
      id: "TR-104",
      number: "4420",
      name: "Acela Titanium Express",
      type: "High-Speed Maglev",
      badge: "Premium Business",
      speed: "310 km/h",
      rating: 4.9,
      reviewsCount: 2150,
      amenities: ["Ultra 5G Wi-Fi", "Hot Chef Meals", "Conference Tables", "Power & USB-C", "Lounge Access"],
      classes: {
        "EC": { name: "Executive Class (1A)", price: 185, available: 8, quota: "Few Left", features: "Single Seat Row, Gourmet Meal, Champagne" },
        "1A": { name: "First Class AC", price: 125, available: 22, quota: "Available", features: "Spacious Armchairs, Hot Towel Service" },
        "2A": { name: "Business AC (2-Tier)", price: 85, available: 45, quota: "Available", features: "Quiet Zone, Desk Trays" }
      },
      schedule: {
        depTime: "15:10",
        arrTime: "18:20",
        duration: "3h 10m",
        departureStation: "BOS",
        arrivalStation: "NYP",
        runsOn: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        stops: [
          { station: "Boston South (BOS)", arr: "Origin", dep: "15:10", platform: "01", dist: "0 km", status: "Scheduled" },
          { station: "Providence (PVD)", arr: "15:48", dep: "15:51", platform: "02", dist: "70 km", status: "Scheduled" },
          { station: "New Haven (NHV)", arr: "17:02", dep: "17:05", platform: "01", dist: "250 km", status: "Scheduled" },
          { station: "New York Penn (NYP)", arr: "18:20", dep: "Terminus", platform: "05", dist: "370 km", status: "Scheduled" }
        ],
        currentStopIndex: 0,
        currentProgress: 0,
        liveStatusText: "Train ready at Platform 01. Boarding opens in 15 minutes."
      }
    },
    {
      id: "TR-105",
      number: "5502",
      name: "Starlight Twilight Sleeper",
      type: "Luxury Sleeper",
      badge: "Scenic Night Ride",
      speed: "200 km/h",
      rating: 4.7,
      reviewsCount: 810,
      amenities: ["Private Berths", "Full Dinner", "Stargazing Dome", "Hot Showers", "Welcome Kit"],
      classes: {
        "EC": { name: "Executive Suite (1A)", price: 210, available: 5, quota: "Few Left", features: "Private En-Suite Bed, Gourmet Dinner, Shower" },
        "1A": { name: "First Class Sleeper", price: 145, available: 16, quota: "Available", features: "Double Berth, Premium Linen, Breakfast" },
        "2A": { name: "AC 2-Tier Sleeper", price: 92, available: 34, quota: "Available", features: "Curtained Privacy, Bedding Included" },
        "CC": { name: "Night Seater AC", price: 39, available: 52, quota: "Available", features: "Deep Recline Seat, Night Lighting" }
      },
      schedule: {
        depTime: "21:30",
        arrTime: "01:05",
        duration: "3h 35m",
        departureStation: "BOS",
        arrivalStation: "NYP",
        runsOn: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        stops: [
          { station: "Boston South (BOS)", arr: "Origin", dep: "21:30", platform: "03", dist: "0 km", status: "Scheduled" },
          { station: "Providence (PVD)", arr: "22:15", dep: "22:18", platform: "01", dist: "70 km", status: "Scheduled" },
          { station: "New Haven (NHV)", arr: "23:40", dep: "23:45", platform: "02", dist: "250 km", status: "Scheduled" },
          { station: "New York Penn (NYP)", arr: "01:05", dep: "Terminus", platform: "08", dist: "370 km", status: "Scheduled" }
        ],
        currentStopIndex: 0,
        currentProgress: 0,
        liveStatusText: "Scheduled departure at 21:30. On track."
      }
    }
  ],

  meals: [
    { id: "M1", name: "Artisan Royal Breakfast", type: "Breakfast", icon: "🍳", price: 12.99, tag: "Chef Special", desc: "Farm eggs, grilled sausages, buttered croissants, and fresh berries." },
    { id: "M2", name: "Green Goddess Vegan Bento", type: "Vegan", icon: "🥗", price: 11.50, tag: "Healthy Choice", desc: "Organic quinoa bowl, avocado crunch, citrus dressing, and chia pudding." },
    { id: "M3", name: "Gourmet Italian Truffle Pasta", type: "Dinner", icon: "🍝", price: 14.50, tag: "Top Rated", desc: "Fettuccine in cream truffle sauce, roasted mushrooms, garlic baguette." },
    { id: "M4", name: "Tandoori Delicacy Thali", type: "Indian", icon: "🍛", price: 13.50, tag: "Spicy & Rich", desc: "Paneer butter masala/chicken tikka, dal makhani, jeera rice, butter naan." },
    { id: "M5", name: "Barista Coffee & Pastry Combo", type: "Snack", icon: "☕", price: 6.99, tag: "Quick Bite", desc: "Hand-poured cappuccino with fresh pain au chocolat." }
  ],

  promoCodes: {
    "RAILFIRST": { discountPercent: 15, maxDiscount: 40, desc: "15% OFF for first booking" },
    "SPEEDPASS": { discountAmount: 20, minFare: 80, desc: "$20 OFF on bookings over $80" },
    "WEEKEND25": { discountPercent: 25, maxDiscount: 50, desc: "25% OFF Weekend Rail Getaway" }
  },

  defaultBookings: [
    {
      pnr: "TRN-9028143",
      trainNumber: "1204",
      trainName: "Apex Bullet Express",
      tripType: "One Way",
      classCode: "EC",
      className: "Executive Class (1A)",
      from: { code: "BOS", name: "Boston South", time: "06:15" },
      to: { code: "NYP", name: "New York Penn", time: "09:30" },
      date: "Tomorrow",
      passengers: [
        { name: "Alexander Wright", age: 34, gender: "Male", seat: "Coach A1 - 12A (Window)" },
        { name: "Sophia Wright", age: 31, gender: "Female", seat: "Coach A1 - 12B (Aisle)" }
      ],
      coach: "A1",
      seats: ["12A", "12B"],
      totalFare: 342.98,
      status: "Confirmed",
      bookedAt: "Yesterday, 14:22",
      platform: "04",
      qrCodeData: "TICKET-BOS-NYP-TRN9028143"
    }
  ]
};
