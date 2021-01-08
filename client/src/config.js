export const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://react-image-upload.herokuapp.com'
  : 'http://localhost:8000'
  // : 'http://b27bd8606e7e.ngrok.io'