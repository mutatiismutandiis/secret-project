import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

// For defecto el usuario no tiene el acceso permitido
var userCanAccess = false;

// Para obtener la información del formulario
app.use(bodyParser.urlencoded({ extended: true }));

// Customize middleware to access the secrets
function passwordCheck(req, res, next) {
  const password = req.body["password"];
  if (password === "1234") {
    userCanAccess = true;
  }
  next();
}
app.use(passwordCheck);

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(__dirname + "/public"));

// Handler para la home page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Handler para la página de los secretos
app.post("/check", (req, res) => {
  if (userCanAccess) {
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
