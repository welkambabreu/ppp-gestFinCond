// Entry point for the API
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const authMiddleware = require('./middleware/auth');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const summaryRoutes = require('./routes/summaryRoutes');
const fileRoutes = require('./routes/fileRoutes');

const app = express();
app.use(express.json());

// Swagger setup
const swaggerFile = path.join(__dirname, '../resources/swagger.json');
app.use('/api-docs', swaggerUi.serve, (req, res, next) => {
  fs.readFile(swaggerFile, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Swagger file not found');
    req.swaggerDoc = JSON.parse(data);
    swaggerUi.setup(req.swaggerDoc)(req, res, next);
  });
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/despesas', authMiddleware, expenseRoutes);
app.use('/api/receitas', authMiddleware, incomeRoutes);
app.use('/api/resumo', authMiddleware, summaryRoutes);
app.use('/api/files', authMiddleware, fileRoutes);

app.get('/', (req, res) => res.send('API Gestão Financeira Condomínio'));

const PORT = process.env.PORT || 3000;

// Apenas inicia o servidor quando o arquivo for executado diretamente
if (require.main === module) {
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}

module.exports = app;
