# TODO

## General

### Bugs

- When first creating a non remote session and later editing to be remote, then there is still no voiceChannelUrl

## Server

- use Nest.js

### Refactoring

Split code into smaller files, have the controller call other functions instead everything in once place.

## Web

### Refactoring

Routes

- be simple
- use components as much as possible

Components

- be simple
- smaller
- reusable

- Don't pass the whole graphql type instead just pass props needed or make the graphql client side just get the props needed -> then you can use the graphql types
  There is no need to get data I am not using, that's a plus of graphql

- Don't use Formik, just use native forms
