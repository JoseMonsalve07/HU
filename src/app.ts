import express from "express";
import sequelize from "./dbconfig/database.ts";
import "dotenv/config";
import "./models/associations.ts";
import { runSeeds } from "./seeders/seed.ts";
import router from "./routes/index.ts";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(router);

sequelize.sync({ alter: true})
    .then(async () => {
        console.log("Tablas creadas/actualizadas");
        await runSeeds();
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error creando/actualizando tablas", err);
    });