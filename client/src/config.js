export const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://react-image-upload.herokuapp.com'
  // : 'http://localhost:8080'
  : 'http://localhost:8000'