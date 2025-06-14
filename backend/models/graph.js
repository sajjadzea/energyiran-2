const mongoose = require('mongoose');

const graphNodeSchema = new mongoose.Schema({
  label: String,
  props: mongoose.Schema.Types.Mixed,
});

const graphEdgeSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'GraphNode' },
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'GraphNode' },
  props: mongoose.Schema.Types.Mixed,
});

const GraphNode = mongoose.model('GraphNode', graphNodeSchema);
const GraphEdge = mongoose.model('GraphEdge', graphEdgeSchema);

async function insertNode(data) {
  const node = new GraphNode(data);
  return node.save();
}

async function insertEdge(data) {
  const edge = new GraphEdge(data);
  return edge.save();
}

async function traverse(startId) {
  const node = await GraphNode.findById(startId).lean();
  const edges = await GraphEdge.find({ $or: [{ from: startId }, { to: startId }] }).lean();
  return { node, edges };
}

module.exports = { insertNode, insertEdge, traverse, GraphNode, GraphEdge };
