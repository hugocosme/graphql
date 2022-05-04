//import lib
const { gql, ApolloServer } = require( "apollo-server" );

const produtos = [
    {
        id: 1,
        nome: 'Notebook',
        valor: 12000.33      
},
    {
        id: 2,
        nome: 'Tablet',
        valor: 33000.33      
    }
]


const usuarios = [
    {
        id: 1,
        nome: 'Hugo',
        salario: 123.123,
        ativo: true,
        idade:34
    },
    {
        id: 2,
        nome: 'Ygor',
        salario: 223.123,
        ativo: true,
        idade:38
    }
]


const typeDefs = gql` #define os tipos que estarao disponiveis no graphql
    type Produto {
        id: ID
        nome: String
        valor: Float
    },
    
    type Usuario {
        nome: String
        idade: Int
        salario: Float
        pid: Int
        ativo: Boolean
        id: ID
    },
    
    type Query {
        usuarios: [Usuario]
        produto(id: ID, valor: Float): Produto
        usuario(id: Int, nome: String): Usuario #habilitando busca com argumentos, que devem ser declarados dentro do ()
        #tecnologias: [String!]! #caso não encontre um resolver, ira devolver null ( validação: passando o operador ! fora do tipo estou obrigando que um array, passando o operado ! junto ao tipo, estou obrigando que todos os campos do array sejam do tipo determinado)
    } 
`;
//nodemon --watch . --exec node --ignore '*.test.ts' --delay 3 ./index.js
const resolvers = { //resolvers devem pertencer ao contexto dos tipos que foram definidos
    Query: {
        usuarios () {
           return usuarios;
        },
        usuario(_, args){
            //console.log(args)
            const { id, nome } = args; //desestruturação
            if (id) return usuarios.find((usuario) => usuario.id === id) || {} ; //passando '|| {};' no final a api não vai quebrar, caso a consulta seja invalida ira retorar null
            return usuarios.find((usuario) => usuario.nome === nome);                
        },
        produto(_, args) {
            const { id, valor } = args;
             if (id) return produtos.find((produto) => produto.id === id);
             return produtos.find((produto) => produto.valor === valor);
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen()