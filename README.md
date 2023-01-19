<p align="center">
  <a href="https://opensession.club">
    <img width="150" src="./media/open-session-club-logo-white.png" alt="Open Session Club logo" />
  </a>
</p>
<div align="center">
  <a href="https://discord.gg/Ms3HUBSKXv">
    <img alt="Discord" src="https://img.shields.io/discord/1045945194752782356?color=5865F2&logo=discord&logoColor=ffffff" />
  </a>
</div>

# Open Session Club

## Project Status

The MVP is being built.

Main Features of the MVP:

- Actor (user) Authentication, Authorization & Settings
- Session CRUD & Sorting
- Session Comments CRUD
- Discord integration

After the MVP is built and in production some code refactoring and restructuring will take place to make it more maintainable and improve extensibility.

Other TODOs before production ready:

- Logo
- UI Design
- Welcome page
- Legality

## Development

### Server `(cd server)`

#### 1. Databases

&emsp;Make sure to have the databases PostgreSQL and Redis installed and running.

#### 2. Discord bot

&emsp;Create a discord server and bot.

#### 3. Environment variables

&emsp;See [constants.ts](./server/src/constants.ts) for variables that you need to define in a `.env` file in the `server` directory.

#### 4. Run `yarn watch`

&emsp;Starts the TypeScript compiler in watch mode.

#### 5. Run `yarn dev` or `yarn dev-linux`

- `yarn dev` starts a development server using nodemon.

- `yarn dev-linux` also starts the PostgreSQL and Redis databases.

> **_NOTE:_** Only works in Linux! Well at least in Ubuntu 20.04.5.

### Web `(cd web)`

#### 1. Run `yarn dev`

&emsp;Starts a development server using Vite
