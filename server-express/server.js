// app.METODO_HTTP(caminho, (req, res) => {
//     // Função de tratamento da rota
// });
// template

// Importa o módulo Express
const express = require("express");

// Cria uma instância do aplicativo Express
const app = express();
    
// Define a porta em que o servidor irá rodar
const PORT = 3000;

// Middleware para verificar autenticação
const checkAuth = (req, res, next) => {
      const autenticado = false; // Altere para `false` para simular um usuário não autenticado
      if (autenticado) {
        next(); // Usuário autenticado, continua para o próximo middleware ou rota
      } else {
        res.status(401).json({ message: "Acesso negado" }); // Usuário não autenticado, responde com erro 401 em JSON
      }
};

// Rota com middleware específico
app.get("/dashboard", checkAuth, (req, res) => {
      res.json({ message: "Bem-vindo ao painel" }); // Responde com JSON
});

// Inicia o servidor e faz com que ele escute na porta definida
app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
});
    
// Rota GET para listar todos os produtos
app.get("/produtos", (req, res) => {
      res.json({ message: "Listando todos os produtos", produtos: ["arroz", 'feijão'] }); // Exemplo com um array vazio de produtos
});

// Rota POST para criar um novo produto
app.post("/produtos", (req, res) => {
      res.json({
        message: "Criando um novo produto",
        produto: { id: Date.now(), nome: "Produto Exemplo" },
      });
});

// Rota PUT para atualizar um produto por ID
app.put("/produtos/:id", (req, res) => {
      const { id } = req.params;
      res.json({
        message: "Atualizando o produto",
        produto: { id: id, nome: "Produto Atualizado" },
      });
});

// Rota DELETE para excluir um produto por ID
app.delete("/produtos/:id", (req, res) => {
      const { id } = req.params;
      res.json({ message: "Excluindo o produto", produtoId: id });
});

// Inicia o servidor e faz com que ele escute na porta definida
app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
});
    