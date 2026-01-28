import * as dotenv from "dotenv";
import { getPayload } from "payload";
import config from "../payload.config";
import path from "path";
import { fileURLToPath } from "url";

// Load .env
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seed = async () => {
  try {
    const payload = await getPayload({ config });

    console.log("Starting Seeding Process...");

    // 1. Create a Default Admin if none exists
    const users = await payload.find({ collection: "users", limit: 1 });
    if (users.totalDocs === 0) {
      console.log("Creating default admin user...");
      await payload.create({
        collection: "users",
        data: {
          name: "Admin",
          email: "admin@cisco.com",
          password: "adminpassword123",
          role: "admin",
        },
      });
    }

    // 2. Clear existing data (Optional, but helps for a clean seed)
    // console.log("Clearing existing products and categories...");
    // await payload.delete({ collection: 'products', where: { id: { exists: true } } });
    // await payload.delete({ collection: 'categories', where: { id: { exists: true } } });

    // 3. Create Media Items for Products
    console.log("Creating media items...");
    const mediaFiles = [
      { name: "Chem 1", filename: "hero-industrial.png" },
      { name: "Chem 2", filename: "hero-lab.png" },
      { name: "Chem 3", filename: "hero-molecular.png" },
    ];

    const mediaItems = [];
    for (const file of mediaFiles) {
      const filePath = path.resolve(
        __dirname,
        "../../public/images",
        file.filename,
      );
      try {
        const media = await payload.create({
          collection: "media",
          data: {
            alt: file.name,
          },
          filePath,
        });
        mediaItems.push(media);
        console.log(`Created media: ${file.name}`);
      } catch (err) {
        console.warn(`Could not create media ${file.name}, skipping image...`);
      }
    }

    const defaultImageId = mediaItems[0]?.id || 1;

    // 4. Create Categories
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
      const created = await payload.create({
        collection: "categories",
        data: cat,
      });
      categories.push(created);
      console.log(`Created category: ${cat.name}`);
    }

    // 5. Create Products
    const productsData = [
      {
        name: "Polyethylene Glycol (PEG)",
        categoryName: "Polymers",
        price: 250,
        stock: 120,
        description:
          "High-purity PEG for pharmaceutical and cosmetic applications with excellent solubility.",
      },
      {
        name: "Titanium Dioxide",
        categoryName: "Pigments",
        price: 450,
        stock: 85,
        description:
          "Premium grade titanium dioxide with superior opacity and brightness.",
      },
      {
        name: "Lithium Carbonate",
        categoryName: "Battery Materials",
        price: 1200,
        stock: 45,
        description:
          "Battery-grade lithium carbonate for next-generation energy storage.",
      },
      {
        name: "Sodium Hypochlorite",
        categoryName: "Disinfectants",
        price: 120,
        stock: 300,
        description:
          "Industrial strength disinfectant for water treatment and surface sanitization.",
      },
      {
        name: "Bio-based Solvent",
        categoryName: "Green Chemistry",
        price: 320,
        stock: 150,
        description:
          "Eco-friendly solvent derived from renewable resources, low VOC.",
      },
      {
        name: "Custom Polymer Blend",
        categoryName: "Specialty Chemicals",
        price: 890,
        stock: 20,
        description:
          "Bespoke polymer formulation designed for high-impact industrial use.",
      },
    ];

    for (const [index, product] of productsData.entries()) {
      const category = categories.find((c) => c.name === product.categoryName);
      if (!category) continue;

      const imageId =
        mediaItems[index % mediaItems.length]?.id || defaultImageId;

      await payload.create({
        collection: "products",
        data: {
          name: product.name,
          category: category.id,
          price: product.price,
          stock: product.stock,
          mainImage: imageId,
          description: product.description as any,
          slug: product.name
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, ""),
        },
      });
      console.log(`Created product: ${product.name}`);
    }

    console.log("Seeding Finished Successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seed();
