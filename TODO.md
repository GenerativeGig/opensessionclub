# TODO

## General

## Server

## Web

### Refactoring

Routes

- be simple
- use components as much as possible

Components

- be simple
- smaller
- reusable

Resturcture code into domains -> inside domain be technical
Right now it looks like -> tech -> domain -> files, this pattern means that adding a domain requires adding the domain folder to several places and it just gets confusing, If I want to look at a certain domain look inside one folder instead of multiple

- Don't pass the whole graphql type instead just pass props needed or make the graphql client side just get the props needed -> then you can use the graphql types
  There is no need to get data I am not using, that's a plus of graphql

- Don't use Formik, just use native forms

- Create hook(s) for handling getting the data from graphql
