const { NetlifyJwtVerifier } = require("@serverless-jwt/netlify");
const Analytics = require('analytics-node');


// Load the Auth0 issuer and audience from ENV
const verifyJwt = NetlifyJwtVerifier({
    issuer: process.env.AUTH0_ISSUER,
    audience: process.env.AUTH0_AUDIENCE,
});

const writeUserDataToSegment = async (event, context) => {

    const analytics = new Analytics(process.env.SEGMENT_WRITE_KEY, { flushAt: 20 });
    analytics.flushed = true;

    // Get the identity context from the event body
    let payload = JSON.parse(event.body);
    payload.context = context.identityContext
    // Look for the claims param and pull the sub value
    if (payload.context.claims) {
      let userSub = payload.context.claims.sub
      // If we are in a miro iframe
      if (payload.boardInfo && payload.userInfo) { 
        analytics.identify({          
          userId: userSub, 
          traits: {
            miroUserId : payload.userInfo
          }
        });
      }
    }
    
    await analytics.flush(function(err, batch) {
      console.log('Flushing Segment queue'); 
      return {success: true}     
    });    
}


exports.handler = verifyJwt( async function (event, context) {

    const resp = await writeUserDataToSegment(event, context)
    return {
      statusCode: 200, 
      body: JSON.stringify({hello: "world"})
    };
  
  });
  