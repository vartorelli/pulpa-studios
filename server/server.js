import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
const port = 3000;
const key = "wgxy ewik kzah euac";

// Middleware
app.use(cors());
app.use(express.json());

// Ruta para manejar el envío de correos
app.post("/send-mail", async (req, res) => {
  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "pulpastudios@gmail.com",
      pass: key,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"${name}"`,
      to: "pulpastudios@gmail.com",
      subject: subject+' / '+`${email}`,
      text: message,
    });
    // const infoGratitude = await

    res.status(200).send({ message: "Correo enviado", messageId: info.messageId });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error al enviar el correo" });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});