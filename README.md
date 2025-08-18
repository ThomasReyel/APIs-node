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

