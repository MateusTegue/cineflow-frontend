
export const middleware = (req: Request, res: Response) => {
  // Example middleware logic
  console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
    // Call the next middleware or route handler
  
}