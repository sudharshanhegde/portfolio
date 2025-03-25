// This file loads environment variables from the .env file
// and makes them available to the application

// Create a global object to store environment variables
window.ENV = {};

// Function to load environment variables
async function loadEnvVariables() {
    try {
        const response = await fetch('/.env-public.js');
        if (!response.ok) {
            console.error('Failed to load environment variables');
            return;
        }
        
        const envText = await response.text();
        
        // Parse the environment variables and add them to the global object
        // This expects the format: window.ENV.VARIABLE_NAME = "value";
        eval(envText);
        
        console.log('Environment variables loaded successfully');
    } catch (error) {
        console.error('Error loading environment variables:', error);
    }
}

// Load environment variables when the script is loaded
loadEnvVariables();
