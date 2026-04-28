import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import sequelize from "./src/config/db.js";
import userRoutes from "./src/routes/users.js";
import authRoutes from "./src/routes/auth.js";
import productRoutes from "./src/routes/product.js";
import orderRoutes from "./src/routes/order.js";
import shopRoutes from "./src/routes/shop.js";
import notificationRoutes from "./src/routes/notification.js";
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger-output.json' with { type: 'json' };

const app=express();
const PORT=process.env.PORT||5000;

app.use(cors());
app.use(express.json());
app.use(express.static('../frontend'));
app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use('/api',productRoutes);
app.use('/api',orderRoutes);
app.use('/api',shopRoutes);
app.use('/api',notificationRoutes);
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, {
    swaggerOptions: {
      authAction: {
        bearerAuth: {
          name: "bearerAuth",
          schema: {
            type: "apiKey",
            in: "header",
            name: "Authorization"
          },
          value: "Bearer YOUR_TOKEN_HERE"
        }
      }
    }
  })
);

sequelize.authenticate().then(()=>sequelize.sync())
.then(()=>{
    // Fallback routes for SPA - serve index.html for frontend routes
    // These must be AFTER all API routes are defined
    app.get('/', (req, res) => {
      res.sendFile('index.html', { root: '../frontend' });
    });
    
    app.get('/pages/:page', (req, res) => {
      res.sendFile(`${req.params.page}.html`, { root: '../frontend/pages' });
    });

    app.listen(PORT,()=>{
        console.log("Database connect successfully 🔥🔥" );
        console.log(`Our server is running on http://localhost:${PORT} `);
        console.log(`swagger docs:http://localhost:${PORT}/api-docs`);
    });
})
.catch((err)=>{
    console.log("Server failed to start",err)
    process.exit(1);
}
);

// Export for Vercel serverless deployment
export default app;

