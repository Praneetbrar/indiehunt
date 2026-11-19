# indiehunt-sdk

Official JavaScript client for the [IndieHunt](https://indiehunt.io) public API.

```js
import { IndieHunt } from "indiehunt-sdk";

const client = new IndieHunt();
const { data } = await client.listProjects({ status: "ongoing" });
```

Public reads need no token. `createAnonymousClient()` calls `POST /api/agent/register` when you want a bearer token for the sandbox.

Homepage: https://indiehunt.io
Repository: https://github.com/Praneetbrar/indiehunt
