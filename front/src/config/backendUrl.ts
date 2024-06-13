const backendUrl = process.env.NEXT_PUBLIC_BACKEND_ROOT_URL;

if (!backendUrl) {
  throw new Error('NEXT_PUBLIC_BACKEND_URL is not defined');
}

export default backendUrl;
