const users = [
  {
      id: 1,
      name: "SkyBook Admin",
      email: "admin@skybook.com",
      password: "admin123",
      role: "admin",
      phone: ""
  }
  ];
  
  const flights = [
  {
      id: 1,
      flightNumber: "ELA101",
      airline: "Elite Airways",
      origin: "Cagayan de Oro",
      destination: "Manila",
      departureTime: "2026-05-01T08:00:00",
      arrivalTime: "2026-05-01T09:30:00",
      availableSeats: 120,
      price: 4200,
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05",
      aircraftType: "Airbus A320"
  },
  {
      id: 2,
      flightNumber: "ELA202",
      airline: "Elite Airways",
      origin: "Manila",
      destination: "Cebu",
      departureTime: "2026-05-02T14:00:00",
      arrivalTime: "2026-05-02T15:20:00",
      availableSeats: 95,
      price: 3500,
      image: "https://images.unsplash.com/photo-1494412574643-ff4e4f5c9b06",
      aircraftType: "Boeing 737"
  }
  ];
  
  const bookings = [];
  
  module.exports = { users, flights, bookings };