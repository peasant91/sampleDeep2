export default function uniqid() {
  const n = Math.floor(Math.random() * 11);
  const k = Math.floor(Math.random() * 1000000);
  const m = String.fromCharCode(n) + k;
  return m;
};
