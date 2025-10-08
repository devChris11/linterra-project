/**
 * Custom webpack loader to import files as raw strings.
 * This bypasses all Next.js transformations by reading directly from the filesystem.
 */

const fs = require('fs');
const path = require('path');

module.exports = function(source) {
  // Get the actual file path (remove the ?raw query)
  const filePath = this.resourcePath;
  
  // Read the file directly from the filesystem
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  
  // Return the content as a module export
  return `export default ${JSON.stringify(rawContent)}`;
};

