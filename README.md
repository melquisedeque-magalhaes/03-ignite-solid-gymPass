# App

## GymPass Style App

### RF - (Requisitos Funcionais)

- [x] Deve ser possivel se cadastrar
- [x] Deve ser possivel se autenticar
- [x] Deve ser possivel obter o perfil do usuario logado
- [x] Deve ser possivel Obter o numero de check-ins realizados pelo usuario logado
- [x] Deve ser possivel o usuario obter seu historico de check-ins
- [x] Deve ser possivel o usuario buscar academias proximas (ate 10km)
- [x] Deve ser possivel o usuario buscar academias pelo nome
- [x] Deve ser possivel o usuario realizar check-in em uma academia
- [x] Deve ser possivel o validar o check-in de um usuario
- [x] Deve ser possivel cadastrar uma academia 

### RN - (Regras de Negocio)

- [x] O usuario nao pode se cadastar com um e-mail duplicado
- [x] O usuario nao pode fazer 2 check-ins no mesmo dia
- [x] O usuario nao pode fazer check-in se nao estiver perto (100m) da academia
- [x] O check-in so pode ser validado ate 20 minutos apos criado
- [ ] O check-in so pode ser validado por administradores
- [ ] A academia so pode ser cadastrada por administradores

### RNF - (Requisitos não Funcionais)

- [x] A senha do usuario precisar estar criptografada
- [x] Os dados da aplicacao precisam estar persistidos em um banco de dados PostgreSQL
- [x] Todas as listas de dados precisam estar paginadas com 20 itens por pagina
- [ ] O usuario deve ser identificado por um JWT (JSON Web Token)