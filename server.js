const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Conexão com o banco de dados MongoDB
mongoose.connect('mongodb+srv://admin:admin@cluster0.d5omcyp.mongodb.net/taxas?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// Definindo o schema e o modelo do produto
const produtoSchema = new mongoose.Schema({
  nome: String,
  quantidade: Number,
  custo: Number,
  outrosCustos: Number,
  taxa: String
});
const Produto = mongoose.model('Produto', produtoSchema);

// Configurando o middleware para permitir solicitações POST com JSON
app.use(express.json());

// Rota para obter a lista de produtos
app.get('/api/produtos', async (req, res) => {
    try {
      const produtos = await Produto.find();
      res.status(200).json(produtos);
    } catch (error) {
      res.status(500).json({ error: 'Ocorreu um erro ao obter os produtos.' });
    }
  });


// Rota para cadastrar um produto
app.post('/api/produtos', async (req, res) => {
  const produto = new Produto(req.body);

  try {
    await produto.save();
    res.status(201).json(produto);
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao cadastrar o produto.' });
  }
});

// Rota para atualizar um produto
app.put('/api/produtos/:id', async (req, res) => {
    try {
      const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(produto);
    } catch (error) {
      res.status(500).json({ error: 'Ocorreu um erro ao atualizar o produto.' });
    }
  });
  
  // Rota para excluir um produto
  app.delete('/api/produtos/:id', async (req, res) => {
    try {
      await Produto.findByIdAndRemove(req.params.id);
      res.status(200).json({ message: 'Produto excluído com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Ocorreu um erro ao excluir o produto.' });
    }
  });
  

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
