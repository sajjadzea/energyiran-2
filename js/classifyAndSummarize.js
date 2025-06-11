// COMMON ERRORS:
// 1. ENOENT when reading chunks: verify CHUNK_DIR path and file naming.
// 2. Summary stub not returning text: implement summarization logic or check API integration.
// 3. JSON write errors: ensure EXTRACT_DIR exists and disk space is sufficient.

const fs = require('fs/promises');
const path = require('path');

const CHUNK_DIR = path.resolve(__dirname, '../data/chunks');
const EXTRACT_DIR = path.resolve(__dirname, '../data/extracted');

async function ensureDir(dirPath) {
  console.debug('Ensuring directory:', dirPath);
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (err) {
    console.error('Failed to create directory', dirPath, err);
    // If directory creation fails, check permissions and paths
    throw err;
  }
}

const CATEGORIES = {
  economic: ['بودجه', 'اعتبارات', 'cost', 'investment'],
  environmental: ['آب زیرزمینی', 'ecosystem'],
  social: ['اشتغال', 'community'],
  drinking_water: ['شرب', 'مصرف آب'],
  conflict_of_interest: ['ذی‌نفع', 'conflict']
};

function classify(text, id) {
  const counts = {};
  for (const [cat, keywords] of Object.entries(CATEGORIES)) {
    counts[cat] = keywords.reduce((acc, word) => {
      const regex = new RegExp(word, 'gi');
      const matches = text.match(regex);
      return acc + (matches ? matches.length : 0);
    }, 0);
  }
  const category = Object.entries(counts).reduce((a, b) => (b[1] > a[1] ? b : a))[0];
  console.debug('Classified chunk', id, 'as', category);
  // If classification seems wrong, review keyword lists
  return category;
}

function summarize(text, id) {
  try {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    const summary = sentences.slice(0, 2).join(' ').trim();
    console.debug('Generated summary for', id);
    return summary;
  } catch (err) {
    console.error('Error summarizing chunk', id, err);
    throw err;
  }
}

async function processFile(fileName, categoryBuckets) {
  const filePath = path.join(CHUNK_DIR, fileName);
  const content = await fs.readFile(filePath, 'utf8');
  const chunks = JSON.parse(content);
  for (const chunk of chunks) {
    const category = classify(chunk.text, chunk.id);
    const summary = summarize(chunk.text, chunk.id);
    const record = {
      id: chunk.id,
      title: chunk.text.slice(0, 40),
      summary,
      source: fileName,
      page: null,
      category
    };
    if (!categoryBuckets[category]) categoryBuckets[category] = [];
    categoryBuckets[category].push(record);
  }
}

async function writeOutputs(categoryBuckets) {
  for (const [category, records] of Object.entries(CATEGORIES)) {
    const data = categoryBuckets[category] || [];
    const outFile = path.join(EXTRACT_DIR, `${category}_data.json`);
    await fs.writeFile(outFile, JSON.stringify(data, null, 2));
    console.debug('Wrote', data.length, 'records to', outFile);
  }
}

async function main() {
  try {
    await ensureDir(CHUNK_DIR);
    await ensureDir(EXTRACT_DIR);

    const files = await fs.readdir(CHUNK_DIR);
    const jsonFiles = files.filter(f => f.endsWith('.json'));

    const categoryBuckets = {};
    const concurrencyThrottle = 3; // For large datasets, adjust concurrencyThrottle to balance speed and memory
    for (let i = 0; i < jsonFiles.length; i += concurrencyThrottle) {
      const slice = jsonFiles.slice(i, i + concurrencyThrottle);
      await Promise.all(slice.map(f => processFile(f, categoryBuckets)));
    }

    await writeOutputs(categoryBuckets);
  } catch (err) {
    console.error('Fatal error in main()', err);
    process.exit(1);
  }
}

process.on('unhandledRejection', err => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

if (require.main === module) {
  main();
}

