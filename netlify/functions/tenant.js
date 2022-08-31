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
    const tenantData = {
        origin: origin, 
        user_sub, user_sub,
        hash: `web|${origin}|${user_sub}`
      }
    await client.query(
      q.Let({
          match: q.Match(q.Index('tenant-hash-search'), `web|${origin}|${user_sub}`),
          data: { data: tenantData }
        },
        q.If(
          q.Exists(q.Var('match')),
          q.Update(q.Select('ref', q.Get(q.Var('match'))), q.Var('data')),
          q.Create(q.Collection("tenant"), {
              data: tenantData
          })
        )
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
        statusCode: 200,
        body: JSON.stringify(error)
      })    
  })
});