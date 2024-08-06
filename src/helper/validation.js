export const  isBase64 = (str) => {
    // Regular expression for validating Base64 string
    const base64Regex = /^data:image\/[a-zA-Z]+;base64,[A-Za-z0-9+/=]+$/;
  
    // Validate format and check if Base64 can be decoded
    if (!base64Regex.test(str)) return false;
  
    const base64Content = str.split(',')[1];
    try {
      // Decode Base64 and check if it re-encodes correctly
      const decoded = atob(base64Content);
      const encoded = btoa(decoded);
      return base64Content === encoded;
    } catch (e) {
      return false;
    }
  };

  
  export const isValidImageUrl = async (url) => {
    try {
      // Check if the URL is valid
      // const response = await fetch(url, { method: 'HEAD' });
      // const contentType = response.headers.get('Content-Type');
      // return response.ok && contentType && contentType.startsWith('image/');
        const img = new Image();
        img.src = url;
        return new Promise((resolve) => {
          img.onerror = () => resolve(false);
          img.onload = () => resolve(true);
        });
    } catch {
      return false;
    }
  };