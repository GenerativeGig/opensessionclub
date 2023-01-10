import { AES } from "crypto-js";
import { ENCRYPT_SECRET } from "../constants";

export function encrypt(message: string) {
  if (!ENCRYPT_SECRET) {
    console.error("Missing ENCRYPT_SECRET");
    return;
  }

  return AES.encrypt(message, ENCRYPT_SECRET).toString();
}

export function decrypt(encrypted: string) {
  if (!ENCRYPT_SECRET) {
    console.error("Missing DECRYPT_SECRET");
    return;
  }

  return AES.decrypt(encrypted, ENCRYPT_SECRET).toString();
}
