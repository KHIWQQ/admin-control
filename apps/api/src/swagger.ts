import swaggerJsdoc from "swagger-jsdoc";

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Shadcn Admin API",
      version: "1.0.0"
    },
    components: {
      schemas: {
        Credential: {
          type: "object",
          properties: {
            email: {
              type: "string",
              example: "foo@mail.com"
            },
            password: {
              type: "string",
              example: "secret123"
            }
          },
          required: ["email", "password"]
        }
      }
    }
  },
  apis: ["./src/routes/**/*.ts"]
});

export default swaggerSpec;
