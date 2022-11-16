//sectre key //tdod app
//fnAE1dQPYkAAS_fVr2S6Hy-Or_jETlH8RAmVCsXm


//sectrets key below of book mark app
//fnAE1dKtxSAAz68wrRwItTINrGHyKeGpBQWcSPrN

const {
  ApolloServer
} = require('@apollo/server');
const {
  startStandaloneServer
} = require('@apollo/server/standalone');


const typeDefs = `

type Query {
todos: [Todo]
}

type Todo {
id: ID!
title: String
status: Boolean
}

type Mutation {
addTodo (id:ID,title:String,status:Boolean): Todo

updateTodo (id:ID,title:String,status:Boolean):Todo

deleteTodo (id:ID):Todo
}
`

let todos_list = [{
  id: 1,
  title: 'walking By walking',
  status: false,
},
  {
    id: 2,
    title: 'study',
    status: true,
  },
];

const resolvers = {
  Query: {
    todos: () => todos_list,
  },

  Mutation: {
    addTodo: (_, {
      id, title, status
    }) => {

      todos_list.push({
        id, title, status
      })
      return {
        id,
        title,
        status
      }

    },

    updateTodo: (_, {
      id, title, status
    }) => {
      const index = todos_list.findIndex(todo=> todo.id == id)
      if (index !== -1) {
        todos_list.splice(index, 1, {
          id, title, status
        })
      }
      return {
        id,
        title,
        status
      }
    },


    deleteTodo: (_, {
      id
    }) => {
      todos_list = todos_list.filter(todo=> todo.id != id)
    },

  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
});


const startServer = async () => {


  const {
    url
  } = await startStandaloneServer(server, {
      listen: {
        port: 3000
      },
    });
  console.log(`🚀  Server ready at ${url}`);
}
startServer()