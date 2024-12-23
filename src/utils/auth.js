export const isAuthenticated = () => {
  const cookies = document.cookie;  // Get all cookies
  console.log("Cookies:", cookies);  // Log the entire cookie string
  
  // Try to find the token cookie
  const tokenCookie = cookies.split(';').find(cookie => cookie.trim().startsWith('token='));
  
  // If token cookie is found, extract its value
  if (tokenCookie) {
    const tokenValue = tokenCookie.split('=')[1];
    console.log("Token found:", tokenValue);  // Log the token value
    return !!tokenValue;  // Return true if token exists
  }
  
  console.log("Token not found");
  return false;  // Return false if no token is found
};
