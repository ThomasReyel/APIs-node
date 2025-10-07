# Estudos de API

## Node
Node é uma ferramenta que permite utilizar o Javascript para o backend, com arquitetura orientada em eventos baseada em um modelo assíncrono, o que o torna extremamente eficiente para aplicações em tempo real e manipulação de grandes volumes de dados.
### Principais Características
1. Como você pode usar a mesma linguagem para o back e o front, tudo se torna mais coeso e simples de se fazer
2. O node não espera que uma ação seja realizada para executar outra, enquanto uma requisição está sendo feita, o resultado de outra está terminando. Esse modelo é baseado em eventos, onde uma função (callback) é chamada assim que uma tarefa é concluída. Esse funcionamento permite que o Node.js gerencie um grande volume de requisições simultâneas de forma eficiente e rápida, o que é especialmente útil para aplicações em tempo real, como chats e games multiplayer.
3. Node é compatível com Json o que facilita a criação de APIs RESTful

### Arquitetura do Node
1. Call Stack: Node é baseado no compilador V8 do JavaScript, não cabe aqui explicar tudo, mas o Call Stack é uma parte desse compilador, toda vez que você chama uma função, ele “empilha” ela no topo de um “pilha de funções” e quando ela termina de executar, ele a retira. Se a uma função chama outras funções, elas são colocadas no topo e assim segue.
2. Event Loop: O node funciona de forma assíncrona, ou seja enquanto uma ação está sendo calculada outra é executada na hora. Isso ocorre graças ao Event Loop, que enquanto uma ação demorada ocorre, ela calculando em segundo plano na Thread Pool., então quando a ação termina ela é direcionada para Task Queue (Fila de Tarefas), até  o momento em que o Call Stack estiver livre.

## O que são APIs? 
São conjunto de regras e protocolos que permitem a comunicação entre softwares ou sistemas. As APIs permitem que os desenvolvedores usem funcionalidades de outros serviços ou softwares sem precisar saber como eles são implementados internamente. Por exemplo, quando você usa um aplicativo de clima no seu celular, ele provavelmente está consumindo dados de uma API para mostrar as previsões meteorológicas. O aplicativo envia uma requisição para uma API que fornece informações sobre o clima e recebe de volta os dados necessários para exibir ao usuário.
| Abordagem  | Características | Vantagens | Casos de Uso|
| ------------- | ------------- | ------------- | ------------- |
| REST   | Usa métodos HTTP e URLs para acessar recursos.   | Simples, escalável e amplamente adotado. | Web, mobile apps, APIs abertas. |
| GraphQL | Consulta precisa de dados com uma única requisição.  | Evita sobrecarga de dados e é flexível. | Interfaces dinâmicas, aplicações com muitos dados.  |
| SOAP  | Protocolo baseado em XML com regras estritas.  | Segurança robusta e confiável.  | Serviços financeiros, telecomunicações. |
| gRPC  | Comunicação binária com alta performance  | Rápido, eficiente e suporta streaming.  | Microsserviços, sistemas distribuídos.  |
| WebSockets  | Conexão contínua para comunicação em tempo real.  | Reduz latência e é ideal para dados em tempo real.  | Chats, jogos online, sistemas de notificação.   |

  ## APIs RESTful
### Características:
1. Arquitetura Cliente Servidor: O rest é projetado par funcionar os dois lados de formas “independentes”, então o cliente (react talvez) manda uma requisição e o servidor a recebe e responde
2. Stateless (sem estado): O servidor não mantém um estado atual para as requisições, então cada requisição deve conter nela mesma todas as informações necessárias para funcionar.
3. Recursos Identificados por URLs: Em REST, os dados devem ser referenciados na url, por exemplo, se eu estiver buscando informações sobre um usuário específico, a URL pode ser algo como https://api.exemplo.com/usuarios/123, onde 123 é o identificador do recurso.
4. Uso de Métodos HTTP: O REST utiliza métodos HTTP padrão para realizar operações sobre os recursos: 
        ◦ GET: Recupera informações de um recurso (por exemplo, obter detalhes de um produto). 
        ◦ POST: Cria um novo recurso (por exemplo, adicionar um novo usuário). 
        ◦ PUT: Atualiza um recurso existente (por exemplo, editar as informações de um produto). 
        ◦ DELETE: Remove um recurso (por exemplo, excluir um item do carrinho de compras).
5. Representação de dados: Rest geralmente retorna o dados ou em json ou xml, porém jsom é mais popular por ser mais compatível com Node

### Estrutura de uma resposta HTTP:

## Introdução a express.js
Express.js é um framework de node que facilita a criação de servidores em aplicações web e APIs
### Fundamentos do Express.js
1. Gerenciar múltiplos métodos HTTP em diferentes rotas: O Express facilita a definição de rotas específicas para cada método HTTP, organizando os pontos de entrada da aplicação para diferentes tipos de requisição. 
2. Integrar view engines para gerar páginas dinâmicas: Embora o Express seja mais frequentemente usado para APIs RESTful (que geralmente retornam JSON), ele também suporta view engines (motores de renderização de templates) para gerar HTML dinâmico. 
3. Configurações globais da aplicação: No Express, você pode definir configurações como a porta de conexão e o diretório onde os templates HTML (caso use) estão localizados, padronizando a estrutura da aplicação. 
4. Uso de Middlewares: Middlewares são funções que processam requisições antes que a resposta final seja enviada ao cliente. Eles são úteis para tarefas como autenticação, validação de dados, tratamento de erros e logging. 
### Características do Express.js
1. Minimalista: O Express fornece apenas o necessário para o desenvolvedor, permitindo que a aplicação seja mais flexível e consuma menos dados
2. Modularidade com Middlewares: Middlewares permitem adicionar lógica no processo das requisições como um (meio do caminho) ele pode ser usado no tratamento de erros ou em autenticação de informações.
   ```
   app.use((req, res, next) => {
	  const now = new Date().toISOString();
	  console.log(`[${now}] Requisição recebida: ${req.method} ${req.url}`);
	  next();
   });
   ```
3. Flexibilidade de Roteamento:  Express fornece um sistema de roteamento poderoso e flexível, que permite associar URLs específicas a funções de tratamento. É possível definir rotas para diferentes métodos HTTP (como GET, POST, PUT e DELETE) e para URLs dinâmicas que aceitam parâmetros.
4. Não opinativo: permite que você organize as pastas da forma que você preferir, sem ter uma estrutura rígida

### Middleware
Middleware são funções que interceptam uma requisição ou uma resposta podendo realizar operações com a mesma. Os middlewares são as principais funções do express.js, podendo adicionar várias camádas de lógica as requisções/respostas. Exemplo:
```
// Middleware para verificar autenticação
const checkAuth = (req, res, next) => {
        const autenticado = true; // Altere para `false` para simular um usuário não autenticado
      
      
        if (autenticado) {
          next(); // Usuário autenticado, continua para o próximo middleware ou rota
        } else {
          res.status(401).send("Acesso negado"); // Usuário não autenticado, responde com erro 401
        }
};
```
A função next() do middleware redereciona para um outro middleware ou para o manipulador da rota. Os middlewares sempre acontecem antes do manipulador, exemplo:
```
// Rota com middleware específico
app.get("/dashboard", checkAuth, (req, res) => {
        res.send("Bem-vindo ao painel");
});
```
__Tipos de Middlewares__
1.	Middleware de Aplicação: Aplica-se globalmente a todas as rotas da aplicação.
```
// Middleware de log para todas as requisições
app.use((req, res, next) => {
      console.log(`${req.method} - ${req.url}`);
      next(); // Passa para o próximo middleware ou rota
});
```
2.	Middleware de Rota: Aplica-se a rotas específicas.
```
// Middleware para verificar acesso ao perfil
const checkAccess = (req, res, next) => {
        const authorized = true; // Altere para `false` para simular um usuário não autorizado
        if (authorized) {
          next(); // Usuário autorizado, passa para o próximo manipulador
        } else {
          res.status(403).json({ message: "Acesso ao perfil negado" }); // Resposta em JSON para não autorizado
        }
};

// Rota /perfil com middleware específico
app.get("/perfil", checkAccess, (req, res) => {
        res.json({ message: "Bem-vindo ao seu perfil!" }); // Resposta em JSON para autorizado
});
      
```
3.	Middleware Incorporado e de Terceiros: São middlewares que vêm com o Express ou de bibliotecas externas, como express.json() para processar JSON.
### Parâmetros
Os parâmetros de rota fazem parte da URL e são definidos com o uso de : seguido do nome do parâmetro. Eles são usados quando queremos capturar partes da URL para processar no servidor, como o ID de um recurso. Exemplo:
```
// Rota com parâmetro de rota :id
app.get("/usuarios/:id", (req, res) => {
      const { id } = req.params; // Extrai o parâmetro 'id' da URL
      res.json({ message: `Buscando o usuário com ID: ${id}` });
});
```
Se o cliente fizer uma requisição para http://localhost:3000/usuarios/123, a resposta será:
```
{
  "message": "Buscando o usuário com ID: 123"
}
```
### Query Strings
Query Strings são um conjunto de palavras chaves que vão na URL (logo após o "?"). Elas são utilizadas para enviar dados adicionais, geralmente para filtrar um conjunto de informações
```
app.get("/produtos", (req, res) => {
const { categoria, precoMaximo } = req.query; // Extrai os valores da query string

res.json({
      message: "Listando produtos",
      filtros: {
        categoria: categoria || "Todas",
        precoMaximo: precoMaximo || "Sem limite"
      }
    });
});
  
```
Então se o cliente enviar uma requisição dessa forma: http://localhost:3000/produtos?categoria=eletronicos&precoMaximo=1000, a resposta será: 
```
{
    "message": "Listando produtos",
    "filtros": {
      "categoria": "eletronicos",
      "precoMaximo": "1000"
    }
}
```
## Manipulação e Banco de Dados

A manipulação de dados no servidor refere-se à capacidade de um servidor de processar, transformar, armazenar e enviar dados em resposta às solicitações dos clientes. Por conta de sua característica assíncrona e orientada a eventos, o node é muito eficiente em manipular grandes volumes de dados

### JSON como padrão de troca de dados
JSON (JavaScript Object Notation) é um formato de troca de dados, leve, de fácil compreensão e escrita. Graças a essas característcas, e ao fato de ser de alta compatibilidade com JavaScript, JSON se tornou-se padrão quando se trata de troca de dados no contexto WEB. Em Node.js a manipulação de dados com JSON é uma tarefa comum, o que facilita isso é a facilidade que o node possui para converter objetos JavaScript para JSONs. Exemplo:
```
const dados = {
    nome: "Maria",
    idade: 30,
    profissao: "Engenheira"
};
  
// Converter objeto JavaScript para JSON
const jsonString = JSON.stringify(dados);
console.log('String JSON:', jsonString);
  
// Converter string JSON para objeto JavaScript
const jsonObject = JSON.parse(jsonString);
console.log('Objeto JavaScript:', jsonObject);
```
## Integração com Bancos de Dados Relacionais (SQL)
_MySQL_
MySQL é um banco de dados relacional de condigo aberto e extremamente popular que é muito utilizada em aplicações de médio e grande porte, ele utiliza a linguagem SQL (Structured Query Language – Linguagem de Consulta Estruturada), que é a linguagem mais popular para inserção, consulta e manipulação de dados em um banco.
```
const mysql = require("mysql2");

const connection = mysql.createConnection({
        host: "localhost",
        user: "usuário",
        password: "senha",
        database: "exemplo_db",
      });
      
      connection.connect((err) => {
        if (err) {
          console.error("Erro ao conectar ao banco de dados:", err);
          return;
        }
        console.log("Conectado ao banco de dados MySQL com sucesso!");
});
      
module.exports = connection;
```
Exemplo de conexão em MySQL.

_MongoDG (NoSQL)_
MongoDB é um banco de dados NoSQL orientado a docuemntos. Ao contrário do MySQL, o Mongo não guarda as inforamações em linhas de uma tabela, e sim em JSONs, o que garante uma maior flexibilidade e eficiência na movimentação desses dados, sendo muito útil para sistemas que necessitem de uma alta performance.

### BD NoSQL
NoSQL é uma sigla para (not only SQL), esse tipo de banco de dados foi criado para permitir a criação de maneiras mais flexíveis em relação a estrutura relacional. Ele possui algumas diferenças com bancos SQL padrões (como o mySQL),
1. _Document-oriented:_ Cada registro é armazenado como um documento JSON, permitindo que os documentos em uma coleção tenham diferentes estruturas.
2. _Schema-less:_ A estrutura dos documentos não é rigidamente definida, permitindo mais flexibilidade.
3. _Alta escalabilidade:_ Suporta particionamento horizontal (sharding) para distribuir dados em vários servidores.

- Propriedade BASE
Transação em banco de dados relacionais, geralmente segue o modelo ACID (Atomicidade, Consistência, Isolamento e Durabilidade), garantindo segurança em confiabilidade, porém ao custo de desempenho. Os NoSQL, por outro lado, utilizam o sistema BASE (Basic Availability, Soft-state, Eventual consistency)
1. _Basic Availability:_  O banco de dados está disponível na maior parte do tempo.
2. _Soft-state:_ O estado dos dados pode mudar sem uma gravação explícita.
3. _Eventual consistency:_ Os dados serão consistentes em algum momento, mesmo que não imediatamente.

- Quando é utilizado?
Os noSQL são usados geralmente quando se o sistema possui um grande volume de dados, mas necessita de velocidade de busca e resposta. Quanto maior a quantidade de dados em uma banco relaciona padrão, maior é o tempo de resposta, por isso empresas em grande porte frequentemente adotam essa abordagem.

| Banco de Dados Relacional (MySQL) | Banco de Dados NoSQL (MongoDB) | Descrição |
| ------------- | ------------- | ------------- | 
| Tabela | Coleção | Conjunto de registros/dados. Em NoSQL, uma coleção armazena documentos JSON/BSON. | 
| Linha | Documento | Um único registro dentro de uma tabela/coleção. Em MongoDB, cada documento pode ter uma estrutura diferente. | 
| Coluna | Campo | Representa um atributo/valor de um registro. Em MongoDB, os campos podem variar de documento para documento. |
| Chave Primária | _id | Identificador único de um registro/documento. Em MongoDB, o campo _id é gerado automaticamente. | 
| Banco de Dados | Banco de Dados | Agrupamento de tabelas em SQL e de coleções em MongoDB. | 

```
const mongoose = require("mongoose");

// Função assíncrona para conectar ao MongoDB
const conectarMongoDB = async () => {
      try {
        await mongoose.connect("mongodb://localhost:27017/exemplo_db");
        console.log("Conectado ao MongoDB com sucesso!");
      } catch (err) {
        console.error("Erro ao conectar ao MongoDB:", err);
        process.exit(1); // Encerra o processo em caso de falha
      }
};
    
// Inicia a conexão
conectarMongoDB();
```
Exemplo de conexão de MongoDB com mongoose

```
const Usuario = require("../models/Usuario");

// Criar um novo usuário
exports.criarUsuario = async (req, res) => {
      try {
        const usuario = new Usuario(req.body);
        await usuario.save();
        res.status(201).json(usuario);
      } catch (error) {
        res.status(400).json({ message: "Erro ao criar usuário", error });
      }
};

// Obter todos os usuários
exports.obterUsuarios = async (req, res) => {
      try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
      } catch (error) {
        res.status(500).json({ message: "Erro ao buscar usuários", error });
      }
};

// Atualizar um usuário
exports.atualizarUsuario = async (req, res) => {
      try {
        const { id } = req.params;
        const usuarioAtualizado = await Usuario.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        if (!usuarioAtualizado) {
          return res.status(404).json({ message: "Usuário não encontrado" });
        }
        res.status(200).json(usuarioAtualizado);
      } catch (error) {
        res.status(400).json({ message: "Erro ao atualizar usuário", error });
      }
};
    
// Deletar um usuário
exports.deletarUsuario = async (req, res) => {
      try {
        const { id } = req.params;
        const usuarioDeletado = await Usuario.findByIdAndDelete(id);
        if (!usuarioDeletado) {
          return res.status(404).json({ message: "Usuário não encontrado" });
        }
        res.status(200).json({ message: "Usuário deletado com sucesso" });
      } catch (error) {
        res.status(500).json({ message: "Erro ao deletar usuário", error });
      }
};
    
```
Exemplo de Operações de CRUD

## APIs

### Autoriazação e Autenticação

- __Autenticação:__ Processo de verificar a identidade de um usuário para confirmar se a requisição não é fraudada. Existe 4 tipos:
 1. Autenticação simples: É o tipo de verificação que exigi apenas um fator de verificação. Por exemplo: email e senha
 2. Autenticação Multifatorial (MFA): chamado comumente de autenticação de 2 fatores, como o nome já diz, utiliza 2 fatores independentes para realizar a verificação. Por 		exemplo: senha + código SMS ou senha + impressão digital.
 3. Autenticação com OAuth: É o protocolo que permite aos usuários se autenticarem em uma API apartir de uma API terceira com uma conta já existente. Por exemplo: Google.
 4. Autenticação baseada em Token: é um método de autenticação em que o servidor gera um token de acesso para um cliente autenticado. Esse token é então usado para autorizar 	acessos subsequentes.

- __Autorização:__ Processo que define se um usuário autenticado possui permissão para acessar determinados recursos ou realizar ações específicas. Existe 4 tipos:
 1. Autorização Baseada em Papéis (RBAC - Role-Based Access Control): A API é configurada para verificar o papel do usuário e a partir disso negar ou conceder a autorização.   Os papéis podem incluir administrador, usuário padrão, editor, entre outros.
 2. Autorização Baseada em Atributos (ABAC - Attribute-Based Access Control): As autorizações são concedidas com base em atributos do usuário. Por exemplo: epartamento e       status.
 3. Controle de Acesso Baseado em Regra: As permissões são definidas a partir de regras (não necessáriamante que seja relacionado com o usuário). Por exemplo: Horário ou IP.
 4. Autorização Baseada em Contexto: As decisões de autorização são baseadas no contexto da requisição, como localização geográfica, dispositivo ou horário.





