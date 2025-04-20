import express, { Request, Response } from 'express';
import { Supplier } from '../models/supplier';
import db from '../db';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  db.query("USE inventorymanagement");
  const sql = 'SELECT * FROM suppliers';

  db.query(sql, (err, results: any[]) => {
    if (err) return res.status(500).send(err);

    const suppliers: Supplier[] = results.map((row: any) => ({
      ...row,
      suppliedItems: row.suppliedItems,
    }));
    console.log(suppliers);
  });
});

router.post('/', (req: Request, res: Response) => {
    const { name, contactName,email,phone,address, suppliedItems } = req.body;
    db.query("USE inventorymanagement");
    const sql = 'INSERT INTO suppliers (name,contact,email,phone,address,suppliedItems) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [name,contactName,email, phone,address, JSON.stringify(suppliedItems)], (err) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ message: 'Supplier created' });
    });
  });

  router.get('/:id', (req: Request, res: Response) => {
    const supplierId = req.params.id;
    db.query("USE inventorymanagement");
    
    const sql = 'SELECT * FROM suppliers WHERE id = ?';
    db.query(sql, [supplierId], (err, results: any[]) => {
      if (err) return res.status(500).send(err);
      if (results.length === 0) return res.status(404).json({ message: 'Supplier not found' });

      console.log(results);
      const supplier: Supplier = {
        ...results[0]
      };
      console.log(results);
      res.json(supplier);
    });
  });

  router.put('/:id', (req: Request, res: Response) => {
    const supplierId = req.params.id;
    console.log(supplierId);
    const { name, contact, email, phone, address, suppliedItems } = req.body;
    console.log(name);
    console.log(contact);
    console.log(email);
    console.log(phone);
    console.log(address);
    console.log(suppliedItems);
    db.query("USE inventorymanagement");
  
    const sql = `
      UPDATE suppliers 
      SET name = ?, contact = ?, email = ?, phone = ?, address = ?, suppliedItems = ? 
      WHERE id = ?`;
  
    db.query(
      sql,
      [name, contact, email, phone, address, JSON.stringify(suppliedItems), supplierId],
      (err, result: any) => {
        if (err) return res.status(500).send(err);
  
        // Check affectedRows without deprecated OkPacket
        if (result && typeof result.affectedRows === 'number' && result.affectedRows === 0) {
          return res.status(404).json({ message: 'Supplier not found' });
        }
  
        res.json({ message: 'Supplier updated successfully' });
      }
    );
  });
  
export default router;