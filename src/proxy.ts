
export const proxy = (request: Request) => {
  // Example middleware logic
  console.log(`Request Method: ${request.method}, Request URL: ${request.url}`);
    // Call the next middleware or route handler
  
}