import express,{Request,Response} from 'express';
import { InventoryItem } from '../models/inventory';
import db from '../db';
const router = express.Router();


router.get('/', (req: Request, res: Response) => {
    db.query("USE inventorymanagement");
    const sql = 'SELECT * FROM inventory';
  
    db.query(sql, (err, results: any[]) => {
      if (err) return res.status(500).send(err);
  
      const inventories: InventoryItem[] = results.map((row: any) => ({
        ...row,
        suppliedItems: row.suppliedItems,
      }));
      console.log(inventories);
    });
  });

  router.post('/', (req: Request, res: Response) => {
    const { name, category,quantity,description,supplierId, supplierName } = req.body;
    db.query("USE inventorymanagement");
    console.log(name);
    console.log(category);
    console.log(quantity);
    console.log(description);
    console.log(supplierId);
    console.log(supplierName);
    const sql = 'INSERT INTO inventory (name,category,quantity,supplier_id,address) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [name,category,quantity, description,supplierId, supplierName], (err) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ message: 'Supplier created' });
    });
  });

export default router;