# Courier React In-App Toast Example

This is an example React app bootstrapped with Create React App with Typescript to demo the functionality of the [@trycourier/react-toast](https://github.com/trycourier/courier-react/tree/main/packages/react-toast) package.

[@trycourier/react-provider](https://github.com/trycourier/courier-react/tree/main/packages/react-provider) is a dependency that handles all the authentication and integration with the Courier backend.

The only other additional dependencies are [chakra-ui](https://chakra-ui.com) and [Formik](https://chakra-ui.com) which are used to quickly build the demo form that will let you quickly configure and trigger a standalone local notification.

## Online Demo

Check out the [React Demo App](https://reactinappnotification.com/)

![toast-notification](https://user-images.githubusercontent.com/28051494/132584772-5fa7d15d-c89f-4f1d-9de5-44ad52e2ee35.gif)

To test it with your own [Courier Push integration](https://app.courier.com/integrations/courier) you need to quickly clone the repository and run it locally.

## Running Locally

#### Prerequisites to run the app:

- Node.js
- yarn

Clone the repository and install the dependencies:

```bash
$ yarn install
```

Start the dev server:

```bash
$ yarn start
```

The app URL will open automatically in your browser.

## Configuring Courier Provider

You need to pass the client key you get when installing [Courier Push integration](https://app.courier.com/integrations/courier) and the user id to the Courier Provider component as props to start listening for notifications and to automatically style the toast according to your Courier branding.

You can pass the client key and user id in [index.tsx](https://github.com/trycourier/react-in-app-example/blob/master/src/index.tsx#L9-L10).

## Documentation

The `useToast` hook is used to show local standalone Toast notifications while the `<Toast />` component displays notifications coming from the Courier servers that the Courier Provider is subscribing to.

You can find the full documentation on the component API and usage, as well as, the Courier Push integration testing if you [follow this link](https://stupefied-mclean-b58cde.netlify.app).
