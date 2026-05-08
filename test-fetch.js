fetch("http://localhost:3000/api/consultations", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ patientId: "", symptomes: [] })
})
.then(res => {
  console.log("Status:", res.status);
  return res.text();
})
.then(text => console.log("Response:", text))
.catch(err => console.error("Error:", err));
