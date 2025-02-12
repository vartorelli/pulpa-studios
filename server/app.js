import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 10000;

// Middleware para CORS y JSON
app.use(cors());
app.use(express.json());

// Servir archivos estáticos correctamente
app.use(express.static(path.join(__dirname, "..")));

// Ruta para servir el index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

// Ruta para manejar el envío de correos
app.post("/send-mail", async (req, res) => {
  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, // Usa variables de entorno
      pass: process.env.EMAIL_PASS, // Usa variables de entorno
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: "pulpastudios@gmail.com",
      subject: `${subject} / ${email}`,
      text: message,
    });

    res.status(200).send({ message: "Correo enviado", messageId: info.messageId });
  } catch (error) {
    console.error("Error al enviar correo:", error);
    res.status(500).send({ error: "Error al enviar el correo" });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor funcionando en http://0.0.0.0:${port}`);
});
