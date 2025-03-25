// Node.js script to generate .env-public.js from .env
// This should be run before deployment
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env
const envResult = dotenv.config();

if (envResult.error) {
  console.error('Error loading .env file:', envResult.error);
  process.exit(1);
}

// List of variables that are safe to include in public JS
// IMPORTANT: Do NOT add sensitive info like passwords or API keys here
const SAFE_VARIABLES = [
  'PUBLIC_PATH'
  // Add other non-sensitive variables here
];

// Create public environment file
let publicEnvContent = `// Public environment variables
// This file is generated from .env but contains only safe values
// NEVER put sensitive information in this file!

window.ENV = window.ENV || {};
`;

// Add safe variables from .env
SAFE_VARIABLES.forEach(varName => {
  if (process.env[varName]) {
    publicEnvContent += `window.ENV.${varName} = "${process.env[varName]}";\n`;
  }
});

// Add a comment mentioning sensitive variables are excluded
publicEnvContent += `
// The admin password is intentionally not included here
// Other API keys are also not included`;

// Write to .env-public.js
fs.writeFileSync(
  path.join(__dirname, '.env-public.js'),
  publicEnvContent,
  'utf8'
);

console.log('✅ Generated .env-public.js successfully');
