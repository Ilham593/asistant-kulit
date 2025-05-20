import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Deteksi Penyakit Kulit",
    version: "1.0.0",
    description: "Dokumentasi API untuk backend aplikasi deteksi penyakit kulit.",
  },
  servers: [
    {
      url: "asistant-kulit-production.up.railway.app",
      description: "Production server (Railway)",
    },
    {
      url: "http://localhost:5000",
      description: "Local",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
