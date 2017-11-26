const {
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLNonNull
} = require('graphql')
const resolvers = require('./resolvers')
const rt = require('./returnTypes')

const UserType = new GraphQLObjectType({
    name: 'user',
    fields: {
        userId: {
            description: 'ID for entity',
            type: new GraphQLNonNull(GraphQLInt),
            resolve: data => data.userId,
        },
        email: {
            description: 'Email of the user',
            type: new GraphQLNonNull(GraphQLString),
            resolve: data => data.email,
        },
        country: {
            description: 'Country Code of the user',
            type: GraphQLString,
            resolve: data => data.country,
        }
    },
})

const RecordType = new GraphQLObjectType({
    name: 'record',
    fields: {
        recordId: {
            description: 'ID for entity',
            type: new GraphQLNonNull(GraphQLInt),
            resolve: data => data.recordId,
        },
        userId: {
            description: 'ID of the user owning the record',
            type: GraphQLInt,
            resolve: data => data.userId,
        },
        user: {
            description: 'Whoever owns the record',
            type: UserType,
            resolve: data => data.userId ? (resolvers.Users)(rt.SINGLE, data.userId) : null
        },
        level: {
            description: 'Level of the game',
            type: new GraphQLNonNull(GraphQLInt),
            resolve: data => data.level,
        },
        seconds: {
            description: 'Record time in seconds',
            type: GraphQLInt,
            resolve: data => data.seconds,
        }
    },
})

const QueryRootType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        users: {
            description: 'List of users',
            type: new GraphQLList(UserType),
            args: {
                userId: { type: GraphQLInt },
                prop: { type: GraphQLString },
                value: { type: GraphQLString }
            },
            resolve: (root, args) =>
                (resolvers.Users)(rt.LIST, args.userId, args.prop, args.value)
        },
        records: {
            description: 'List of records',
            type: new GraphQLList(RecordType),
            args: {
                recordId: { type: GraphQLInt },
                prop: { type: GraphQLString },
                value: { type: GraphQLString }
            },
            resolve: (root, args) =>
                (resolvers.Records)(rt.LIST, args.recordId, args.prop, args.value)
        },
    })
})

module.exports = new GraphQLSchema({
    query: QueryRootType
})