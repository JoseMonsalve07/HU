import { Sequelize } from "sequelize";
import "dotenv/config";

const sequelize = new Sequelize(
    process.env.DB_NAME || "sportsline_db",
    process.env.DB_USER || "postgres",
    process.env.DB_PASS || "2800564x",
    {
        host: process.env.DB_HOST || "localhost",
        dialect: "postgres",
        logging: false,
    }
);

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexión establecida con la base de datos");
    } catch (err) {
        console.error("Error al conectar a la base de datos", err);
    }
})();

export default sequelize;
