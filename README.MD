
<h3 align="center">
  Desafio  Softplan
</h3>

<blockquote align="center">“Não espere resultados brilhantes se suas metas não forem claras”!</blockquote>

<p align="center">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">
</p>

<p align="center">
  <a href="#rocket-sobre-o-desafio">Sobre o desafio</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

## :rocket: Sobre o desafio

-   Desenvolver uma aplicação web responsável por gerenciar processos.
-   _Soluções parcias serão aceitas._
-   Visão de administrador
    -   Incluir, excluir, atualizar e visualizar usuários,
-   Visão de usuário-triador
    -   Incluir e visualizar processos,
    -   Atribuir um ou mais usuários a realizar um parecer sobre um processo,
-   Visão de usuário-finalizador
    -   Visualizar processos pendentes de parecer.
    -   Incluir o parecer sobre o processo.

# :hammer:  Backend

- Java 1.8
- SpringBoot
- Spring Data
- Spring Security
- Spring Security - OAuth
- Spring Security - JWT
- Banco de dados H2 (in-memory)
- FlywayDB

## :hammer: Tecnologias (Frontend)
- Angular 11
- PrimeNG (Biblioteca de componentes angular)
- auth0/angular-jwt (Biblioteca para uso do JSON Web Token)
 


### :game_die: Layout da aplicação


## :key: Como rodar esse projeto.

Para executar este sistema, você precisará de  Java 1.8, Angular11 e Node.js  instalados em seu computador;

### :sheep: Clonando o repositório.
```
# Clone este repositório
$ git clone git@github.com:LuizSerra/softplan-desafio-fullstack-Luiz-Serra.git
```
### :computer: Rodando a aplicação - Backend


Opção 1
 No terminal:
$ Execute o comando "mvn package" na raiz do projeto.
$ Vá até a pasta target e execute o comando Java -jar 

Opção 2
$ Importe o projeto Softplan na IDE
$ Rode a Aplicação

 O servidor será executado em http://localhost:8080
 O banco de dados utilizado é o **H2**, com persistência em memória. Para acessar o gerenciador, via browser, acesse a url http://localhost:8080/console
Estão configuradas no arquivo aplication.properties as credencias utilizadas no banco que serão solicitadas pelo gerenciador:
	
	spring.datasource.url=jdbc:h2:mem:testdb
	spring.datasource.driverClassName=org.h2.Driver
	spring.datasource.username=sa
	spring.datasource.password=
	spring.datasource.platform=h2

Devido a uma falha na compatibilidade entre o banco H2 e o flywayDB, 
as migrations estão sendo executadas apenas em seus comandos DDL e não os DML, portanto, faz-se necessário que uma vez que a aplicação esteja rodando, que se execute o conteúdo do arquivo [softplan script.sql](https://github.com/LuizSerra/softplan-desafio-fullstack-Luiz-Serra/blob/master/softplan%20script.sql "softplan script.sql")  seja executado na base de dados para que as tabelas sejam populadas com os dados iniciais, sobretudo a criação dos usuários e papéis.
 O mapeamento objeto-relacional foi feito utilizando Spring Data JPA e a implementação é Hibernate.

### Funcionalidades da aplicação

O Backend fornece uma API REST com os seguintes recursos:
 
- **`Usuario`**: Os endpoints estão mapeados na classe UsuarioController

- **`Processo`**: Os endpoints estão mapeados na classe Processo Controller

- **`Parecer`**: Os endpoints estão mapeados na classe ParecerController

- **`Permissao`**: Os endpoints estão mapeados na classe PermissaoController

Para maiores detalhes e utilização via Postman há, na raiz do projeto neste Git, a seguinte collection: [SoftPlanCollection](https://github.com/LuizSerra/softplan-desafio-fullstack-Luiz-Serra/blob/master/SOFTPLAN%20Security.postman_collection.json) 

#### Segurança

A Segurança da API REST é feita utilizando Spring Security.
OAUTH e JWT -> Para se autenticar na Aplicação é preciso realizar um request na rota localhost:8080/oauth/token
que retornará um token e um refresh_token. Esse ultimo está sendo adicionado a um cookie e é utilizado para renovação do token. 
Consulte a Colletion já mencionada, no requests para token e refresh_token, para obter mais detalhes sobre cabeçalho, parâmetros e body necessários nessas requests.
Para acessara cada uma das demais rotas da aplicação é necessário informar um access_token válido, que pode ser obtido como resposta da requisição para refresh_token; Esse token deve ser enviado em cada requisição em um Header Authorization.

### :computer: Rodando a aplicação - Frontend

No terminal
$ Entre na pasta sftpln-ui e excute o comando npm install, para baixar as dependências do projeto;
$Execute o comando ng serve. Isso fará com que a aplicção suba no servidor no seguinte endereço http://localhost:4200

### Funcionalidades da aplicação
A tela de login pode ser acessada através da seguinte rota http://localhost:4200/login
Em geral a usabilidade é muito simples. Existem duas entidades principais, usuários e processos com respectivas telas CRUD, compostas por uma listagem em uma datatable com cada item contando com os respectivos botões de edição e exclusão. Além de um botão que leva à tela de criação da correspondente entidade
A navegação pode ser feita através de um menu hambúrguer acionado através de um botão no canto esquerdo superior (visto na área logada);

O funcionamento da aplicação irá ter algumas pequenas variações dependendo do papel do usuário logado.
Papel ADM:
 - É o único papel que tem acesso pelo menu lateral à página de gerenciamento de usuários. O único com permissão para criar , alterar ou excluir usuários.

Papel Triador:
- A diferença notada pelo usuário que acessa a aplicação utilizando este papel é principalmente a tela de listagem e criação/edição de processos. 
Para o usuário triador, todos os prcessos criados são listados.
Nas telas de criação/edição, um usuário triador verá os campos de nome e descrição, mas além deles, verá também um componente TreePanel através do qual será possível selecionar os usuários que deverão dar um parecer sobre aquele processo.

Papel Finalizador:
- Assim como o usuário triador, a diferença se dá na relação com o fluxo relacionado à entidade Processo.
Na listagem, esse usuário enxerga apenas os processos para os quais ele deve dar um parecer. Após ele cumprir essa tarefa, o processo em questão não será mais exibido para esse usuário.
Além disso, na tela de edição, um usuário finalizador, diferente do usuário triador, terá disponível, ao invés do treePanel, um componente textarea, através do qual poderá emitir um parecer.
 
## Principais dificuldades pendências, e bugs

A configuração do banco H2 em conjunto com o flywaydb tornou-se um empecilho a tal ponto que em dado momento a opção foi desistir das migrations e executar um script direto no banco para não comprometer mais o prazo.
Além dissso, a versão mais atualizada do spring boot conversa com uma versão do spring securiy que não dá suporte direto ao OAuth2 como fazia antes. A solução temporária foi realizar downgrade. A solução *a posteriori* é estudar a documentação e verificar uma nova forma de realizar a tarefa.
Ainda quanto à autenticação, mas dessa vez no frontend, a biblioteca angular2-jwt passou a se chamar  auth0/angular-jwt  para dar suporte ao angular 11, Porém isso foi feito modificando a forma como lida com o fluxo de armazenamento de token JWT. Foi necessário estudar a documentação para utilizá-la no projeto.

O projeto ainda apresenta alguns débitos técnicos ou bugs, sobretudo no frontend.
- No Backend
	 - Tornar mais completa a captura e retorno de erros na API.
	 - tentar achar uma solução para o problema apresentado pelo FlywayDB. (Pode ser algo específico na relação com o banco de dados H2 ou alguma configuração);
 - No frontend:
	 - Há um problema com a a comunicação da api tornando necessário por vezes um refresh na página da área logada, pois, em um primeiro momento pode ser erroneamente apresente um comportamento falso quanto à autorização (negar acesso a um recurso que na realidade o usuário tem acesso)
	 - A edição do processo feito por um triador pode apresentar algum comportamento inesperado quanto ao treepanel, pois está pendente a lógica para popular o componente com a mesma configuração de como as entidades de processo e parecer foram salvas.
	 - Por fim,  é necessário realizar algumas intervenções na usabilidade, escondendo alguns botões ou componentes de acordo com a regra de cada papel, ainda que alguns dos mesmos terão sua funcionalidade barrada no backend ( Acesso ao endpoint);


## :computer: Quer contribuir com o Projeto? Saiba como:

-   Faça um  **fork**  do projeto;
-   Crie uma nova branch com as suas alterações:  `git checkout -b my-feature`
-   Salve as alterações e crie uma mensagem de commit contando o que você fez:`git commit -m "feature: My new feature"`
-   Envie as suas alterações:  `git push origin my-feature`

> Caso tenha alguma dúvida confira este [guia de como contribuir no GitHub](https://github.com/firstcontributions/first-contributions)


## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

Feito com dedicação por Luiz Serra 👋🏽 [Entre em contato](https://www.linkedin.com/in/luizserra)!
