import app from './app';

const PORT = 3000;

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
  console.log(` Notes API available at http://localhost:${PORT}/notes`);
});
