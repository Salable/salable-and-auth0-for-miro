const { NetlifyJwtVerifier } = require("@serverless-jwt/netlify");
const faunadb = require('faunadb');
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNDADB_SECRET
})

// Load the Auth0 issuer and audience from ENV
const verifyJwt = NetlifyJwtVerifier({
    issuer: process.env.AUTH0_ISSUER,
    audience: process.env.AUTH0_AUDIENCE,
});

exports.handler = verifyJwt( async function (event, context, callback) {
    const origin = event.headers.origin
    const user_sub = context.clientContext.user.sub
    await client.query(   
        q.Delete(
          q.Select(["ref"], 
          q.Get(q.Match(q.Index("timers-hash-search"), `web|${origin}|${user_sub}`)))
        )    
    )
    .then((response) => {
      console.log("success", response)
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(response)
      })
    }).catch((error) => {
      console.log("error", error)
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error)
      })    
  })
});