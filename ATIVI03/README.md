# IBGE Localidades App

Este é um aplicativo React TS que lista regiões, estados e mesorregiões do Brasil utilizando a API de localidades do IBGE. O objetivo deste projeto é demonstrar o uso de React com TypeScript, requisições HTTP, Context e Hooks, além de estilização com CSS e Styled-components.

## Objetivos

- Utilizar React TS para a criação do aplicativo.
- Fazer requisições HTTP para a API do IBGE.
- Implementar Context e Hooks para gerenciar o estado da aplicação.
- Estilizar a aplicação utilizando CSS e Styled-components.

## Requisitos Funcionais

1. **Carregamento das Regiões ao Iniciar**: 
   - As regiões devem ser carregadas automaticamente ao iniciar a aplicação.
   - URL do serviço: `https://servicodados.ibge.gov.br/api/v1/localidades/regioes?orderBy=nome`
   - Os painéis de estados e mesorregiões devem iniciar vazios.
     
     ![image](https://github.com/abnercosta97/DWIII/assets/127696147/c38960e9-15b2-4130-911b-8cb529428ea2)


2. **Carregamento dos Estados**:
   - Ao clicar no nome de uma região, os estados correspondentes devem ser carregados no segundo painel.
   - URL do serviço: `https://servicodados.ibge.gov.br/api/v1/localidades/regioes/{id}/estados?orderBy=nome`
   - O segundo painel deve exibir "Carregando..." enquanto a requisição é processada.

     ![image](https://github.com/abnercosta97/DWIII/assets/127696147/fadf773e-1c8d-4628-a1cd-e203adcbaaaa)


3. **Carregamento das Mesorregiões**:
   - Ao clicar no nome de um estado, as mesorregiões correspondentes devem ser carregadas no terceiro painel.
   - URL do serviço: `https://servicodados.ibge.gov.br/api/v1/localidades/estados/{sigla}/mesorregioes?orderBy=nome`
   - O terceiro painel deve exibir "Carregando..." enquanto a requisição é processada.

     ![image](https://github.com/abnercosta97/DWIII/assets/127696147/10ebbdc6-ebf7-4d5d-b380-29163115596d)


## Requisitos Não Funcionais

1. **Estrutura da Interface**:
   - A aplicação deve ter três painéis com os títulos: Regiões, Estados e Mesorregiões.
   - Os painéis devem estar centralizados horizontalmente na página e seguir a aparência especificada.

2. **Organização do Projeto**:
   - O projeto deve estar organizado nas seguintes pastas:
     - `components`: Componentes definidos usando Styled-components.
     - `contexts`: Definição de Context API.
     - `hooks`: Custom Hooks.
     - `pages`: Deverá ter apenas uma página principal.
     - `services`: Funções de serviço para fazer as requisições à API.
     - `types`: Definição de tipos TypeScript.

3. **Comunicação Entre Componentes**:
   - A comunicação entre os componentes deve utilizar Context e Hooks.

4. **Simulação de Demora nas Requisições**:
   - Utilize os módulos `api` e `Ibge` para fazer a conexão com a API do IBGE.
   - A função `sleep` deve ser utilizada para simular um tempo maior de resposta nas requisições.

## Estrutura do Projeto

```plaintext
/src
|-- /components
|   |-- RegionPanel.tsx
|   |-- StatePanel.tsx
|   |-- MesoregionPanel.tsx
|   |-- Loading.tsx
|
|-- /contexts
|   |-- AppContext.tsx
|
|-- /hooks
|   |-- useRegions.ts
|   |-- useStates.ts
|   |-- useMesoregions.ts
|
|-- /pages
|   |-- HomePage.tsx
|
|-- /services
|   |-- api.ts
|   |-- Ibge.ts
|
|-- /types
|   |-- index.ts
|
|-- App.tsx
|-- index.tsx
```

## Como Executar o Projeto

1. Clone o repositório:
   ```sh
   git clone https://github.com/abnercosta97/ibge-localidades-app.git
   cd ibge-localidades-app
   ```

2. Instale as dependências:
   ```sh
   npm install
   ```

3. Inicie a aplicação:
   ```sh
   npm start
   ```

A aplicação estará disponível em `http://localhost:3000`.

## Considerações Finais

Este projeto visa fornecer uma visão prática do uso de React com TypeScript, gerenciamento de estado com Context e Hooks, além de estilização com Styled-components. As requisições à API do IBGE permitem a interação com dados reais, tornando o aprendizado mais significativo e aplicável.
