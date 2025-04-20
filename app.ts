import express from 'express';
import cors from 'cors';
import supplierRoutes from './routes/SupplierRoutes';
import inventoryRoutes from './routes/InventoryRoutes';
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());


app.use('/api/suppliers',supplierRoutes);
app.use('/api/inventory',inventoryRoutes);
export default app;