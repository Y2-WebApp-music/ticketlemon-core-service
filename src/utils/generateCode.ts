import { randomInt } from "node:crypto";
import { prisma } from "../lib/db";

const generateCode = (length: number): string => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(randomInt(0, characters.length));
  }
  return result;
};

export const generateStaffCode = async (length: number, maxRetries: number = 10) => {
  let code = generateCode(length);
  let existingCode = await prisma.event.findUnique({ where: { staff_code: code } });
  let retries = 0;
  
  while (existingCode && retries < maxRetries) {
    code = generateCode(length);
    existingCode = await prisma.event.findUnique({ where: { staff_code: code } });
    retries++;
  }
  
  if (existingCode) {
    throw new Error("Failed to generate unique staff code after multiple attempts");
  }
  
  return code;
};