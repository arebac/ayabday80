import { useState } from "react";
import { motion } from "framer-motion";
import "../components/InvitationPage.css";

export default function InvitationPage() {
  const [name, setName] = useState("");
  const [count, setCount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      name.trim() === "" ||
      count.trim() === "" ||
      isNaN(count) ||
      parseInt(count) <= 0
    ) {
      alert("Please enter a valid name and number of attendees.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("count", count);

    try {
      const response = await fetch("https://formspree.io/f/xpwqvydb", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        alert("Attendance confirmed!");
        setName("");
        setCount("");
      } else {
        alert("There was an error submitting the form. Please try again.");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="entireScreen">
      <div className="containerANDheader">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="header"
          >
            <h1>Cumpleaños de Tata</h1>
            <div className="centerp">
              <p>Sábado, 26 de abril de 2025</p>
              <p>10:00 am</p>
              <a style={{textDecorationColor:"black"}}
                href="https://maps.app.goo.gl/axbVA3H98sq2Xevu6"
              >
                <p>📍 Bo. Ortiga, <br />Orocovis</p>
              </a>{" "}
              <p>No regalos</p>
              <p>Lleguen temprano</p>
              <p>Confirmen asistencia con total de personas</p>
            </div>
          </motion.div>
        </div>
      </div>

      <form className="card" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre Completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
          required
        />
        <input
          type="number"
          name="count"
          placeholder="Número de personas"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          className="input"
          min="1"
          required
        />
        <button type="submit" className="button">
          Confirmar Asistencia
        </button>
      </form>
    </div>
  );
}
