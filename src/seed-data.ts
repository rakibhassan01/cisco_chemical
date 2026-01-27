import * as dotenv from "dotenv";

// Load .env before anything else
dotenv.config();

import { getPayload } from "payload";
import config from "./payload.config";

const seed = async () => {
  try {
    if (!process.env.DATABASE_URI || !process.env.PAYLOAD_SECRET) {
      console.error(
        "Missing environment variables (DATABASE_URI or PAYLOAD_SECRET). Please check your .env file.",
      );
      process.exit(1);
    }

    const payload = await getPayload({ config });

    console.log("Seeding data into database...");

    // 1. Create Categories
    const categoriesData = [
      { name: "Polymers" },
      { name: "Pigments" },
      { name: "Battery Materials" },
      { name: "Disinfectants" },
      { name: "Green Chemistry" },
      { name: "Specialty Chemicals" },
    ];

    const categories = [];
    for (const cat of categoriesData) {
      try {
        const created = await payload.create({
          collection: "categories",
          data: cat,
        });
        categories.push(created);
        console.log(`Created category: ${cat.name}`);
      } catch {
        console.error(`Error creating category ${cat.name}`);
      }
    }

    const productsData = [
      {
        name: "Polyethylene Glycol (PEG)",
        categoryName: "Polymers",
        description:
          "High-purity PEG for pharmaceutical and cosmetic applications with excellent solubility properties.",
        specs: [
          "Molecular Weight: 200-8000",
          "Purity: >99%",
          "Viscosity: Variable",
        ],
        applications: ["Pharmaceuticals", "Cosmetics", "Food Industry"],
      },
      {
        name: "Titanium Dioxide",
        categoryName: "Pigments",
        description:
          "Premium grade titanium dioxide with superior opacity and brightness for industrial applications.",
        specs: [
          "TiO2 Content: >98%",
          "Particle Size: 0.2-0.3μm",
          "Oil Absorption: 15-25",
        ],
        applications: ["Paints & Coatings", "Plastics", "Paper"],
      },
      {
        name: "Lithium Carbonate",
        categoryName: "Battery Materials",
        description:
          "Battery-grade lithium carbonate for next-generation energy storage solutions.",
        specs: [
          "Li2CO3: >99.5%",
          "Moisture: <0.5%",
          "Magnetic Substances: <50ppm",
        ],
        applications: ["Lithium Batteries", "Ceramics", "Glass"],
      },
    ];

    for (const product of productsData) {
      const category = (categories as { id: string; name: string }[]).find(
        (c) => c.name === product.categoryName,
      );
      if (!category) continue;

      try {
        await payload.create({
          collection: "products",
          data: {
            name: product.name,
            category: category.id,
            description: product.description,
            specs: product.specs.map((s) => ({ spec: s })),
            applications: product.applications.map((a) => ({ application: a })),
          },
        });
        console.log(`Created product: ${product.name}`);
      } catch {
        console.error(`Error creating product ${product.name}`);
      }
    }

    console.log("Seeding process finished successfully.");
    process.exit(0);
  } catch (_err) {
    console.error("Global Seeding Error:", _err);
    process.exit(1);
  }
};

seed();
