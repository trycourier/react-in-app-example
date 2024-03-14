# Courier React In-App Toast Example

This repository is an example React app bootstrapped with Create React App with Typescript to demo the functionality of the [@trycourier/react-toast](https://www.npmjs.com/package/@trycourier/react-toast) and [@trycourier/react-inbox](https://www.npmjs.com/package/@trycourier/react-inbox).

[@trycourier/react-provider](https://github.com/trycourier/courier-react/tree/main/packages/react-provider) is a dependency that handles all the authentication and integration with the Courier backend.

## Online Demo

[Check it out here](https://reactinappnotification.com/)

You can quickly configure and trigger a simple Toast notification on this page. To run this locally, you will need a Courier account and enable the [Courier Push integration](https://app.courier.com/integrations/courier).

## Running Locally

#### Prerequisites to run the app:

- Node.js (v18)
- yarn

Clone the repository and install the dependencies:

```bash
$ yarn install
```

Fill in your Courier Client Key and Courier Test or Production Key in .env file. Find them in [API Keys](https://app.courier.com/integrations/api-keys)

```bash
cp .env.example .env
```

Start the dev server:

```bash
$ yarn develop
```
