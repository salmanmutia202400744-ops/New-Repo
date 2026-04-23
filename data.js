const users = [
  {
    id: 1,
    name: "SkyBook Admin",
    email: "admin@skybook.com",
    password: "admin123",
    role: "admin",
    phone: "",
    createdAt: new Date().toISOString()
  }
];

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
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05",
    status: "scheduled",
    aircraftType: "Airbus A320",
    createdAt: new Date().toISOString()
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
    image: "https://images.unsplash.com/photo-1494412574643-ff4e4f5c9b06",
    status: "scheduled",
    aircraftType: "Boeing 737",
    createdAt: new Date().toISOString()
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
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df",
    status: "scheduled",
    aircraftType: "Boeing 777",
    createdAt: new Date().toISOString()
  }
];

const bookings = [
  {
    id: 1,
    bookingCode: "SB1001",
    userId: 1,
    flightId: 1,
    passengerName: "John Doe",
    status: "Confirmed",
    createdAt: new Date().toISOString()
  }
];

const sessions = [];

module.exports = {
  users,
  flights,
  bookings,
  sessions
};