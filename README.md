# Custom Resources Admin

An app to display the functionality of Custom Resources in Zendesk. It allows you to create resource types, and resources. The app automatically generates relationship types between custom resource types and tickets, users, and organizations.

## Getting started

This app was built with `create-react-app`. To get the app compiling and running in dev whilst developing on Zendesk, run the following commands, each in their own shell.

```
$ yarn start
$ zat server --path dist
```

## Deploying to Zendesk

```
$ yarn compile
```