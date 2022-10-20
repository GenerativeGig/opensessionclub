- Node
- Typescript
- PostgreSQL

## PostgreSQL

### Starting

```console
sudo service postgresql start
```

### Stopping

```console
sudo service postgresql stop
```

## Mirko-ORM

Initalize migrations:

```console
npx mikro-orm migration:create --initial
```

## env

Create a `nodemon.json` file like this:

```json
{
  "env": {
    "POSTGRESQL_USERNAME": "<your username>",
    "POSTGRESQL_PASSWORD": "<your password>"
  }
}
```

And a `.env` file:

```.env
POSTGRESQL_USERNAME=<your username>
POSTGRESQL_PASSWORD=<your password>
```
