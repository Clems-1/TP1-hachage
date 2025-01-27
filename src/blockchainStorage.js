import { readFile, writeFile } from "node:fs/promises";
import { getDate, monSecret } from "./divers.js";
import { NotFoundError } from "./errors.js";
import { createHash } from "node:crypto";

/* Chemin de stockage des blocks */
const path = "./data/blockchain.json";
/**
 * Mes définitions
 * @typedef { id: string, nom: string, don: number, date: string, hash: string} Block
 * @property {string} id
 * @property {string} nom
 * @property {number} don
 * @property {string} date
 * @property {string} hash
 */

/**
 * Renvoie un tableau json de tous les blocks
 * @return {Promise<any>}
 */
export async function findBlocks() {
  try {
    const data = await readFile(path, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

/**
 * Trouve un block à partir de son id
 * @param {string} id
 * @return {Promise<Block[]>}
 */
export async function findBlockById(id) {
  const blocks = await findBlocks();
  return blocks.filter((block) => block.id === id);
}

/**
 * Trouve des blocks en fonction des critères partiels
 * @param {object} partialBlock
 * @return {Promise<Block[]>}
 */
export async function findBlocksByCriteria(partialBlock) {
  const blocks = await findBlocks();
  return blocks.filter((block) => {
    return Object.keys(partialBlock).every(
      (key) => block[key] === partialBlock[key]
    );
  });
}

/**
 * Trouve le dernier block de la chaine
 * @return {Promise<Block|null>}
 */
export async function findLastBlock() {
  const blocks = await findBlocks();
  return blocks.length > 0 ? blocks[blocks.length - 1] : null;
}

/**
 * Création d'un block depuis le contenu json
 * @param {object} contenu
 * @return {Promise<Block[]>}
 */
export async function createBlock(contenu) {
  const blocks = await findBlocks();
  const lastBlock = await findLastBlock();
  const newBlock = {
    id: generateUUID(),
    nom: contenu.nom,
    don: contenu.somme,
    date: getDate(),
    hash: generateHash(lastBlock),
  };
  blocks.push(newBlock);
  await writeFile(path, JSON.stringify(blocks, null, 2));
  return blocks;
}

function generateUUID() {
  // Génère un UUID v4
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function generateHash(lastBlock) {
  const crypto = createHash("sha256");
  const data = lastBlock ? lastBlock.hash : monSecret;
  crypto.update(data);
  return crypto.digest("hex");
}
