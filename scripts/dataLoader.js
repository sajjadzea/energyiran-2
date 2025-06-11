/*
 * Data Loader Script
 *
 * Common Errors & Fixes:
 * 1. PDF parse error due to password-protected file
 *    - Fix: Remove password protection or skip the file.
 * 2. ENOSPC when writing chunks
 *    - Fix: Ensure sufficient disk space and permissions.
 * 3. Unexpected token in JSON when reading chunk files
 *    - Fix: Verify chunk files are complete and not corrupted.
 */

const fs = require('fs/promises');
const path = require('path');
const pdfParse = require('pdf-parse');
require('dotenv').config();

const PDF_DIR = path.resolve(__dirname, '../resources/pdfs');
const RAW_DIR = path.resolve(__dirname, '../data/raw_text');
const CHUNK_DIR = path.resolve(__dirname, '../data/chunks');

async function ensureDir(dirPath) {
  console.debug('Ensuring directory:', dirPath);
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (err) {
    console.error('Failed to create directory', dirPath, err);
    // If dir creation fails, check file system permissions
    throw err;
  }
}

async function extractText(filePath) {
  try {
    const buffer = await fs.readFile(filePath);
    const data = await pdfParse(buffer);
    return data.text;
  } catch (err) {
    console.error('Error parsing PDF', filePath, err);
    throw err;
  }
}

async function writeRawText(fileName, text) {
  try {
    const outPath = path.join(RAW_DIR, `${fileName}.txt`);
    await fs.writeFile(outPath, text);
    console.debug('Wrote raw text for', fileName);
  } catch (err) {
    console.error('Failed to write raw text for', fileName, err);
    // If write fails, verify RAW_DIR exists
    throw err;
  }
}

function splitIntoChunks(text, fileName, minWords = 200, maxWords = 300) {
  const words = text.split(/\s+/).filter(Boolean);
  const chunks = [];
  let index = 0;
  while (index < words.length) {
    const size = Math.min(
      maxWords,
      Math.max(minWords, words.length - index)
    );
    const chunkWords = words.slice(index, index + size);
    const chunkText = chunkWords.join(' ');
    chunks.push({ id: `${fileName}_chunk_${chunks.length}`, text: chunkText });
    index += size;
  }
  return chunks;
}

async function writeChunks(fileName, chunks) {
  try {
    const outPath = path.join(CHUNK_DIR, `${fileName}_chunks.json`);
    await fs.writeFile(outPath, JSON.stringify(chunks, null, 2));
    console.debug('Wrote', chunks.length, 'chunks for', fileName);
  } catch (err) {
    console.error('Failed to write chunks for', fileName, err);
    throw err;
  }
}

async function processFile(filePath) {
  const fileName = path.basename(filePath, path.extname(filePath));
  try {
    const text = await extractText(filePath);
    await writeRawText(fileName, text);
    const chunks = splitIntoChunks(text, fileName);
    await writeChunks(fileName, chunks);
  } catch (err) {
    console.error('Processing failed for', filePath, err);
  }
}

async function main() {
  try {
    await ensureDir(RAW_DIR);
    await ensureDir(CHUNK_DIR);

    const files = await fs.readdir(PDF_DIR);
    const pdfFiles = files.filter(f => f.toLowerCase().endsWith('.pdf'));

    const concurrency = 3;
    for (let i = 0; i < pdfFiles.length; i += concurrency) {
      const slice = pdfFiles.slice(i, i + concurrency);
      await Promise.all(
        slice.map(name => processFile(path.join(PDF_DIR, name)))
      );
    }

    console.debug('All files processed');
  } catch (err) {
    console.error('Fatal error in main()', err);
  }
}

// For very large PDFs, consider streaming pages instead of full-buffer
if (require.main === module) {
  main();
}
