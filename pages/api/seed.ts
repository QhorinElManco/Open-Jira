import type { NextApiRequest, NextApiResponse } from "next";
import { db, seedData } from "../../database";
import { Entry } from "../../models";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === "production") {
    return res.status(401).json({ message: "Not authorized" });
  }

  await db.connect();

  // Si no hay argumentos en deleteMany eliminar todas las entradas del documento
  await Entry.deleteMany();
  await Entry.insertMany(seedData.entries);
  
  await db.disconnect();

  res.status(200).json({ message: "Proceso realizado correctamente" });
}
