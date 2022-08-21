interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

interface SeedData {
  entries: SeedEntry[];
}

export const seedData: SeedData = {
  entries: [
    {
      description: "Pendiente: lorem ipsum",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description: "En progreso: lorem ipsum",
      status: "in-progress",
      createdAt: Date.now() - 1000000,
    },
    {
      description: "Finalizado: lorem ipsum",
      status: "finished",
      createdAt: Date.now() - 2000000,
    },
  ],
};
