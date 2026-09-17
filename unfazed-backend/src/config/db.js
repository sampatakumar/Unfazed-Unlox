import mongoose from "mongoose";
import dns from "dns";

// Force IPv4 DNS resolution for localhost
try {
  dns.setDefaultResultOrder("ipv4first");
} catch (e) {
  // Ignore if not supported in environment
}

let mongoMemoryInstance = null;

export const connectDB = async () => {
  try {
    const connStr = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/unfazed";
    
    // First try connecting to local/env MongoDB instance
    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 2000, // Fast 2s check
      family: 4,
    });

    console.log(`[MongoDB] Successfully connected to native database: ${conn.connection.host}`);
  } catch (primaryErr) {
    console.log(`[MongoDB Service Check] Native MongoDB daemon not running on 127.0.0.1:27017.`);
    console.log(`[MongoDB Auto-Repair] Launching Embedded MongoDB Server (MongoMemoryServer)...`);

    try {
      // Dynamically import MongoMemoryServer for instant zero-config database
      const { MongoMemoryServer } = await import("mongodb-memory-server");
      mongoMemoryInstance = await MongoMemoryServer.create();
      const memoryUri = mongoMemoryInstance.getUri();

      const conn = await mongoose.connect(memoryUri);
      console.log(`[MongoDB] ✅ CONNECTED SUCCESSFULLY to Embedded MongoDB Engine!`);
      console.log(`[MongoDB Connection URI] ${memoryUri}`);
    } catch (memErr) {
      console.error(`[MongoDB Error] Could not start embedded database: ${memErr.message}`);
    }
  }
};

export default connectDB;