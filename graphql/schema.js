
const {GraphQLObjectType , GraphQLString , GraphQLSchema, GraphQLFloat, GraphQLList, GraphQLInt, GraphQLID} = require('graphql')
const {Products , Categories} = require('../simpleData')



const CategoryType = new GraphQLObjectType({
    name : "CategoryType",
    fields : {
        id : {type : GraphQLID},
        name : {type : GraphQLString}
    }
})

const ProductType = new GraphQLObjectType({
    name : "ProductType",
    fields : {
        id : {type : GraphQLID},
        name : {type : GraphQLString},
        price : {type : GraphQLFloat},
        description : {type : GraphQLString},
        image : {type : GraphQLString},
        quantity : {type : GraphQLInt},
        categoryId : {
            type : CategoryType,
            resolve : (parent,args) => {
                return Categories.find((elm) => elm.id === parent.categoryId) 
            }
        } 
    }
})

const UserType = new GraphQLObjectType({
    name : "UserType",
    fields : {
        name : {type : GraphQLString},
        email : {type : GraphQLString},
        age : {type : GraphQLInt}
    }
})

const QueryRoot = new GraphQLObjectType({
    name : 'QueryRoot',
    fields : {
        myArr : {
            type : new  GraphQLList(GraphQLInt) ,
            resolve : (parent,args) => {
                return [1,2,3]
            },
        },
        myObj : {
            type : UserType,
            resolve : (parent , args) => {
                return {
                    name : "Ahmed",
                    email : "ahmed@gmail.com",
                    age : 21
                }
            }
        },
        myArrOfObj : {
            type : new GraphQLList(UserType),
            resolve : (parent,args) => {
                return [
                    {
                        name : "Mohamed",
                        email : "Mohamed@gmail.com",
                        age : 21
                    },
                    {
                        name : "Ahmed",
                        email : "ahmed@gmail.com",
                        age : 21
                    },
                    {
                        name : "Ali",
                        email : "Ali@gmail.com",
                        age : 21
                    }
                ]
            }
        },
        products : {
            type : new GraphQLList(ProductType),
            resolve : (parent,args) => {
                // return Products
            }
        },
        productsID : {
            type : ProductType,
            args : {id : {type : GraphQLID}},
            resolve : (parent,args) => {
                return Products.find((elm) => elm.id === args.id)
            }
        },
        categories : {
            type : new GraphQLList(CategoryType),
            resolve : (parent,args) => {
                return Categories
            }
        },
    }
})

// const QueryRoot = new GraphQLObjectType({
//     name : 'QueryRoot',
//     fields : {
//         hello : {
//             type : GraphQLString,
//             resolve : () => 'Hello World'
//         },
//         welcome : {
//             type : GraphQLString,
//             args : {name : {type : GraphQLString}},
//             resolve : (parent,args) => {
//                 return `Welcome mr ${args.name}`
//             }
//         },
//         calc : {
//             type : GraphQLFloat,
//             args : {num : {type : GraphQLFloat}},
//             resolve : (parent,args) => {
//                 return args.num * 2
//             }
//         }
//     }
// })

module.exports = new GraphQLSchema({
    query : QueryRoot
})