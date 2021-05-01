export function generateLobbyId() {
  const result = [];
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 6; i++) {
    result.push(chars.charAt(Math.floor(Math.random() * chars.length)));
  }

  return result.join('');
}
