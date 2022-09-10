import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Entry, IEntry } from "../../../models";

type Data = { message: string } | IEntry[] | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  switch (req.method) {
    case "GET":
      return getEntry(req, res);
    case "PUT":
      return updateEntry(req, res);
    case "DELETE":
      return deleteEntry(req, res);
    default:
      return res.status(400).json({ message: "Endpoint no existe" });
  }
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();

  const { id } = req.query;
  const entry = await Entry.findById(id);

  await db.disconnect();
  if (!entry) {
    return res.status(404).json({ message: "Entry not found" });
  }

  return res.status(200).json(entry);
};

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();

  const { id } = req.query;
  const { description, status } = req.body;

  try {
    const entry = await Entry.findByIdAndUpdate(
      id,
      { description, status },
      { runValidators: true, new: true }
    );

    await db.disconnect();
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    return res.status(200).json(entry);
  } catch (error: any) {
    await db.disconnect();

    if (error.errors.status)
      return res.status(400).json({ message: error.errors.status.message });

    console.log(error);
    return res.status(500).json({ message: "Error updating entry" });
  }
};

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();

  const { id } = req.query;

  try {
    await Entry.remove({ _id: id });
    return res.status(204).json({ message: "Eliminado con exito" });
  } catch (error: any) {
    await db.disconnect();

    if (error.errors.status)
      return res.status(400).json({ message: error.errors.status.message });

    console.log(error);
    return res.status(400).json({ message: "Error deleting entry" });
  }
};
