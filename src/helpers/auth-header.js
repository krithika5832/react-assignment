export function authHeader() {
  const token = localStorage.getItem("token");
  return { 'Content-Type' : 'application/json','Authorization' : token};
}
