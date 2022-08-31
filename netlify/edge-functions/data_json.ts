import type { Context } from 'https://edge.netlify.com'

export default async function handler(req: Request, context: Context) {
  const json = JSON.stringify({
    req: req,
    context: context
  })
  return new Response(json, {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
      'access-control-allow-origin': '*'
    }
  })
}