deployed on render demo: https://review-node-farm.onrender.com/

deployed on render since vercel for some reason is not deploying pure node.js applications. 
now, since it is deployed on render.. loading this site will be painfully slow. so pls bear with me if and when you try to visit it

EDIT (9/8/2024):
finally figured out how to deploy backend on vercel, here's the demo..

deployed on vercel demo: https://review-node-farm.vercel.app/overview


just needed to create a vercel.json file that includes:

```javascript
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ]
}
```
Explanation:
- builds: Tells Vercel to treat server.js as a Node.js server using the @vercel/node runtime.
- routes: Tells Vercel to route all requests (including /about) to server.js, where your Express server will handle them.

reference: https://chatgpt.com/share/5c65c21a-27be-420a-955d-66babc660f58
