export default function generateId(idLength: number = 6): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const result = [];

  for (let i = 0; i < idLength; i++) {
    result.push(chars.charAt(Math.floor(Math.random() * chars.length)));
  }

  return result.join('');
}
