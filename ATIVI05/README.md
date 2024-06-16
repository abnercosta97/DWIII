# Atividade - JWT (JSON Web Token)
O aplicativo possui as operações para fazer o CRUD nas tabelas representadas no modelo a seguir. Essas operações estão disponíveis através de rotas que possuem controle de acesso para usuários logados com o perfil adm, perfil user e sem a necessidade de estar logado. Ao efetuar o login, os dados do usuário são empacotados em um token e retornados para o cliente, que por sua vez, terá de enviar esse token em todas as requisições que requerem o controle de acesso. O token é gerado usando o pacote JWT (JSON Web Token). O código disponível no pacote middlewares é chamado antes da função objetivo da rota para decodificar o token e validar o perfil de acesso do usuário. Se o usuário não tiver permissão, a função middleware impede o acesso ao recurso mapeado pela rota.

![image](https://github.com/abnercosta97/DWIII/assets/127696147/d685c0c9-364f-4eef-a912-eed7aa20c958)

O front end está disponível em https://github.com/arleysouza/jwt-frontend.
## Restrições de acesso
A aplicação possui os níveis de acesso para os perfis adm e user.

Rotas sem restrição de acesso:

- HTTP POST /login: efetuar login;
- HTTP POST /usuario: o usuário efetua o seu próprio cadastro.

Rotas para usuário logados:

- HTTP GET `/categoria`: listar as categorias;
- HTTP GET `/produto`: listar os produtos;
- HTTP GET `/gasto`: usuário lista somente os seus gastos;
- HTTP POST `/gasto`: usuário cria um gasto;
- HTTP PUT `/gasto`: usuário altera um gasto dele;
- HTTP DELETE `/gasto`: usuário exclui um gasto dele;
- HTTP DELETE `/usuario`: usuário exclui o próprio cadastro;
- HTTP PUT `/usuario/mail`: usuário altera o próprio e-mail;
- HTTP PUT `/usuario/senha`: usuário altera a própria senha.

Rotas para usuário logados com o perfil adm:

- HTTP POST `/categoria`: cria uma categoria;
- HTTP PUT `/categoria`: altera uma categoria;
- HTTP DELETE `/categoria`: exclui uma categoria;
- HTTP POST `/produto`: cria um produto;
- HTTP PUT `/produto`: altera um produto;
- HTTP DELETE `/produto`: exclui um produto;
- HTTP GET `/usuario`: listar os usuários;
- HTTP PUT `/usuario/perfil`: altera o perfil de algum usuário.
