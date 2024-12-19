# zxcvbn-ts-service

The [zxcvbn-ts](https://github.com/zxcvbn-ts/zxcvbn) library, over HTTP, built as a docker image.

## endpoints

### `POST /password-strength`

> [!note]
> returns the strength of a password.
> The request body should be a JSON object with a `password` key & a string value.
> The response body is a JSON representation of a [ZxcvbnResult](https://github.com/zxcvbn-ts/zxcvbn/blob/29f1ff1cc036445492855bdd3dea0626834427a9/packages/libraries/main/src/types.ts#L292-L301).

### `GET /health`

> [!note]
> returns a 200 status code if the service is up.

### `GET /ready`

> [!note]
> returns a 200 status code if the service is ready to accept requests.

## try it locally:

Install dependencies

```bash
npm ci
```

Run in dev mode:

```bash
npm run dev
```

or run the production build:

```bash
npm run build && npm start
```

try a request

`httpie`

```bash
http POST http://localhost:3000/password-strength password=password
```

`cURL`

```bash
curl -X POST http://localhost:3000/password-strength -H "Content-Type: application/json" -d '{"password": "password"}'
```

## development

### format code

```bash
npm run format
```

### build

```bash
npm run build
```

### test

```bash
npm test
```

### build docker image (done by CI, but if you want to:)

```
docker build --build-arg NODE_VERSION=$(cat .node-version) -t ghcr.io/zxcvbn-ts-service/zxcvbn-ts-service:latest
```
