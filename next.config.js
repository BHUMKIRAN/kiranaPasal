/**
 * Top-level Next.js config to ensure Turbopack uses the correct project root
 * when multiple lockfiles exist in the workspace.
 */
module.exports = {
  turbopack: {
    // Point to the actual Next.js app folder containing package.json and node_modules
    root: './kirana-pasal',
  },
};
