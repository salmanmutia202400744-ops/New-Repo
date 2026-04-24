try {
  const res = await fetch(`${API_BASE}/bookings`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          userId: user.id,
          flightId: selectedFlight.id,
          passengerName: fullName,
          passengerEmail: email,
          phone,
          seatNumber,
          passengerClass
      })
  });

  const data = await res.json();

  if (!res.ok) {
      alert(data.message || "Booking failed.");
      return;
  }

  showSuccess(data);

} catch (error) {
  console.error(error);
  alert("Booking failed.");
}