'use strict';

const fs = require('fs/promises');
const path = require('path');

process.on('unhandledRejection', err => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

const EXTRACT_DIR = path.resolve(__dirname, '../data/extracted');
const GRAPH_DIR = path.resolve(__dirname, '../data/graph');

async function ensureGraphDir() {
  console.debug('Ensuring graph directory exists:', GRAPH_DIR);
  // Troubleshoot: if mkdir fails, check permissions and path correctness
  try {
    await fs.mkdir(GRAPH_DIR, { recursive: true });
  } catch (err) {
    console.error('Failed to create graph directory', GRAPH_DIR, err);
    throw err;
  }
}

async function loadRecords() {
  try {
    const files = await fs.readdir(EXTRACT_DIR);
    const jsonFiles = files.filter(f => f.endsWith('_data.json'));

    const concurrency = 5;
    const allRecords = [];
    const categoryCount = {};

    for (let i = 0; i < jsonFiles.length; i += concurrency) {
      const slice = jsonFiles.slice(i, i + concurrency);
      const results = await Promise.all(
        slice.map(async file => {
          const filePath = path.join(EXTRACT_DIR, file);
          const text = await fs.readFile(filePath, 'utf8');
          const records = JSON.parse(text);
          records.forEach(r => {
            categoryCount[r.category] = (categoryCount[r.category] || 0) + 1;
          });
          return records;
        })
      );
      results.forEach(arr => allRecords.push(...arr));
    }

    Object.entries(categoryCount).forEach(([cat, count]) => {
      console.debug(`Loaded ${count} records for category: ${cat}`);
    });

    return allRecords;
  } catch (err) {
    console.error('Error loading records', err);
    throw err;
  }
}

function buildNodes(records) {
  const nodesMap = new Map();
  for (const rec of records) {
    if (!nodesMap.has(rec.id)) {
      nodesMap.set(rec.id, {
        id: rec.id,
        label: rec.title,
        category: rec.category,
        source: rec.source,
        page: rec.page
      });
    }
  }
  const nodes = Array.from(nodesMap.values());
  console.debug('Total unique nodes:', nodes.length);
  // If nodes are missing, verify record IDs are unique across files
  return nodes;
}

function buildLinks(records) {
  const summaries = new Map();
  const titleMap = new Map();

  for (const rec of records) {
    summaries.set(rec.id, rec.summary || '');
    titleMap.set(rec.id, rec.title.toLowerCase());
  }

  const ids = Array.from(summaries.keys());
  const links = [];
  const linkSet = new Set();

  for (const sourceId of ids) {
    const summary = (summaries.get(sourceId) || '').toLowerCase();
    for (const targetId of ids) {
      if (sourceId === targetId) continue; // avoid self-links
      const targetLabel = titleMap.get(targetId);
      if (summary.includes(targetLabel)) {
        const key = `${sourceId}->${targetId}`;
        if (!linkSet.has(key)) {
          linkSet.add(key);
          links.push({ source: sourceId, target: targetId });
        }
      }
    }
  }

  console.debug('Total links created:', links.length);
  // If too many links appear, refine matching logic or filter stopwords
  return links;
}

async function writeGraph(nodes, links) {
  try {
    const nodesPath = path.join(GRAPH_DIR, 'nodes.json');
    const linksPath = path.join(GRAPH_DIR, 'links.json');
    await fs.writeFile(nodesPath, JSON.stringify(nodes, null, 2));
    await fs.writeFile(linksPath, JSON.stringify(links, null, 2));
    console.debug(
      'Wrote',
      nodes.length,
      'nodes and',
      links.length,
      'links to graph directory'
    );
    // Troubleshoot: if write fails, ensure GRAPH_DIR exists and disk space is sufficient
  } catch (err) {
    console.error('Error writing graph files', err);
    throw err;
  }
}

async function main() {
  try {
    await ensureGraphDir();
    const records = await loadRecords();
    const nodes = buildNodes(records);
    const links = buildLinks(records);
    await writeGraph(nodes, links);
    console.debug('Graph build complete');
    // For very large datasets, consider streaming JSON or batching record loads
    process.exit(0);
  } catch (err) {
    console.error('Failed to build graph', err);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
