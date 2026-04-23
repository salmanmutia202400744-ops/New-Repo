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
  
  const flights = [];
  const bookings = [];
  const sessions = [];
  
  module.exports = {
    users,
    flights,
    bookings,
    sessions
  };
  