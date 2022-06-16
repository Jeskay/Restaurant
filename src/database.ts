import { PrismaClient } from "@prisma/client";
import { CloudStorage } from "./services/cloud";

const db = new PrismaClient();
const cloud = new CloudStorage();

export {db, cloud};