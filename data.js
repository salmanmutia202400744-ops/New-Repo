// data.js

const now = () => new Date().toISOString();

/* =========================
   USERS
========================= */
const users = [
  {
    id: 1,
    name: "SkyBook Admin",
    email: "admin@eliteairways.com",
    password: "admin123",
    role: "admin",
    phone: "",
    image: "", // ✅ PROFILE IMAGE SUPPORT
    createdAt: now(),
    updatedAt: now()
  },
];

/* =========================
   FLIGHTS
========================= */
const flights = [
  {
    id: 1,
    flightNumber: "ELA101",
    airline: "Elite Airways",
    origin: "Cagayan de Oro (CGY)",
    destination: "Manila (MNL)",
    departureTime: "2026-05-01T08:00:00",
    arrivalTime: "2026-05-01T09:30:00",
    availableSeats: 120,
    price: 4200,
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05",
    status: "scheduled",
    aircraftType: "Airbus A320",
    createdAt: now(),
  },
  {
    id: 2,
    flightNumber: "ELA202",
    airline: "Elite Airways",
    origin: "Manila (MNL)",
    destination: "Cebu (CEB)",
    departureTime: "2026-05-02T14:00:00",
    arrivalTime: "2026-05-02T15:20:00",
    availableSeats: 95,
    price: 3500,
    image:
      "https://images.unsplash.com/photo-1494412574643-ff4e4f5c9b06",
    status: "scheduled",
    aircraftType: "Boeing 737",
    createdAt: now(),
  },
  {
    id: 3,
    flightNumber: "ELA303",
    airline: "Elite Airways",
    origin: "Manila (MNL)",
    destination: "Singapore (SIN)",
    departureTime: "2026-05-03T10:00:00",
    arrivalTime: "2026-05-03T13:45:00",
    availableSeats: 180,
    price: 8500,
    image:
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df",
    status: "scheduled",
    aircraftType: "Boeing 777",
    createdAt: now(),
  },
];

/* =========================
   BOOKINGS
========================= */
const bookings = [
  {
    id: 1,
    bookingCode: "SBK-2026-001",
    userId: 1,
    flightId: 1,
    seatNumber: "12A",
    passengerName: "SkyBook Admin",
    passengerEmail: "admin@skybook.com",
    phone: "",
    passengerClass: "economy",
    passengerCount: 1,
    subtotal: 4200,
    taxes: 504,
    totalAmount: 4704,
    bookedAt: now(),
    status: "Booked",
    flightSnapshot: {
      flightNumber: "ELA101",
      airline: "Elite Airways",
      origin: "Cagayan de Oro (CGY)",
      destination: "Manila (MNL)",
      departureTime: "2026-05-01T08:00:00",
      arrivalTime: "2026-05-01T09:30:00",
      aircraftType: "Airbus A320",
      image:
        "https://images.unsplash.com/photo-1436491865332-7a61a109cc05",
      price: 4200,
    },
  },
  {
    id: 2,
    bookingCode: "SBK-2026-002",
    userId: 1,
    flightId: 2,
    seatNumber: "3C",
    passengerName: "SkyBook Admin",
    passengerEmail: "admin@skybook.com",
    phone: "",
    passengerClass: "business",
    passengerCount: 2,
    subtotal: 11200,
    taxes: 1344,
    totalAmount: 12544,
    bookedAt: now(),
    status: "Booked",
    flightSnapshot: {
      flightNumber: "ELA202",
      airline: "Elite Airways",
      origin: "Manila (MNL)",
      destination: "Cebu (CEB)",
      departureTime: "2026-05-02T14:00:00",
      arrivalTime: "2026-05-02T15:20:00",
      aircraftType: "Boeing 737",
      image:
        "https://images.unsplash.com/photo-1494412574643-ff4e4f5c9b06",
      price: 3500,
    },
  },
];

module.exports = { users, flights,bookings};