import { useCallback, useState } from "react";
import {
  Container,
  Box,
  Heading,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Link,
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";
import { Inbox } from "@trycourier/react-inbox";
import { Toast } from "@trycourier/react-toast";
import { Formik, Field, FieldProps, FormikHelpers } from "formik";
import { CourierProvider } from "@trycourier/react-provider";
import { ChakraProvider } from "@chakra-ui/react";

type Values = any;

const Footer = () => {
  return (
    <Flex mt={12} justify="center">
      <Link mx={4} href="https://github.com/trycourier/react-in-app-example">
        Checkout on Github
      </Link>
      <Link mx={4} href="https://courier.com/docs/inbox">
        Powered by Courier
      </Link>
    </Flex>
  );
};

const Form = ({ config }: { config: typeof initialConfig }) => {
  const submitHandler = async (
    values: Values,
    helpers: FormikHelpers<Values>
  ) => {
    try {
      const response = await fetch("/api/submit_form", {
        method: "POST",
        body: JSON.stringify({
          backendApiUrl: config.backendApiUrl,
          apiKey: config.apiKey,
          userId: config.userId,
          ...values,
        }),
        headers: { "content-type": "application/json" },
      });

      if (!response.ok) throw new Error("Request failed");

      helpers.resetForm();
      helpers.setStatus("success");
    } catch {
      helpers.setStatus("error");
    }
  };

  return (
    <>
      <Heading as="h4" size="md" textAlign="center">
        Experience Courier's Inbox
      </Heading>
      <Text textAlign="center" mt={2} mb={12} fontSize="lg">
        Enter a message to see a toast message appear, the bell in the top right
        light up, and a new message in your inbox.
      </Text>

      <Formik
        initialValues={{
          title: "",
          message: "",
          cta: "",
        }}
        onSubmit={submitHandler}
      >
        {({ handleSubmit, isSubmitting, status }) => (
          <form onSubmit={handleSubmit}>
            {status === "error" && (
              <Alert status={status} mb={8}>
                <AlertIcon />
                <AlertDescription>Error submitting the form</AlertDescription>
              </Alert>
            )}

            <Field name="title">
              {({ field }: FieldProps) => (
                <FormControl mb={8}>
                  <FormLabel>Notification title</FormLabel>
                  <Input {...field} placeholder="Title" />
                </FormControl>
              )}
            </Field>

            <Field name="message">
              {({ field }: FieldProps) => (
                <FormControl mb={8}>
                  <FormLabel>Notification message</FormLabel>
                  <Input {...field} placeholder="Message" />
                </FormControl>
              )}
            </Field>

            <Field name="cta">
              {({ field }: FieldProps) => (
                <FormControl mb={8}>
                  <FormLabel>Call to action URL</FormLabel>
                  <Input
                    type="url"
                    {...field}
                    placeholder="http://www.example.com"
                  />
                </FormControl>
              )}
            </Field>

            <Button
              type="submit"
              colorScheme="purple"
              isLoading={isSubmitting}
              isFullWidth
            >
              Send notification
            </Button>
          </form>
        )}
      </Formik>
      <Footer />
    </>
  );
};

const localConfig = localStorage.getItem("COURIER_CONFIG");
const initialConfig = localConfig
  ? JSON.parse(localConfig)
  : {
      apiKey: "",
      backendApiUrl: "https://api.courier.com",
      clientKey: process.env.REACT_APP_COURIER_CLIENT_KEY,
      inboxApiUrl: "https://inbox.courier.com/q",
      jwtToken: "",
      userId: Math.round(Math.random() * 10e16).toString(36),
      websocketUrl: "wss://realtime.courier.com",
    };
    
const Config = ({
  config,
  setConfig,
  setShowConfig,
}: {
  config: typeof initialConfig;
  setConfig: (config: typeof initialConfig) => void;
  setShowConfig: (visible: boolean) => void;
}) => {
  const submitHandler = async (values: Values) => {
    setConfig(values);
    localStorage.setItem("COURIER_CONFIG", JSON.stringify(values));
    setShowConfig(false);
  };

  return (
    <>
      <Heading as="h4" size="md" textAlign="center">
        Configuration
      </Heading>
      <Text textAlign="center" mt={2} mb={12} fontSize="lg">
        Enter the configuration values to see the changes in the inbox.
      </Text>

      <Formik initialValues={config} onSubmit={submitHandler}>
        {({ handleSubmit, isSubmitting, status }) => (
          <form onSubmit={handleSubmit}>
            {status === "error" && (
              <Alert status={status} mb={8}>
                <AlertIcon />
                <AlertDescription>Error submitting the form</AlertDescription>
              </Alert>
            )}

            <Field name="userId">
              {({ field }: FieldProps) => (
                <FormControl mb={8}>
                  <FormLabel>User Id</FormLabel>
                  <Input {...field} placeholder="User Id" />
                </FormControl>
              )}
            </Field>

            <Field name="apiKey">
              {({ field }: FieldProps) => (
                <FormControl mb={8}>
                  <FormLabel>Api Key</FormLabel>
                  <Input {...field} placeholder="Api Key" />
                </FormControl>
              )}
            </Field>

            <Field name="clientKey">
              {({ field }: FieldProps) => (
                <FormControl mb={8}>
                  <FormLabel>Client Key</FormLabel>
                  <Input {...field} placeholder="Client Key" />
                </FormControl>
              )}
            </Field>

            <Field name="inboxApiUrl">
              {({ field }: FieldProps) => (
                <FormControl mb={8}>
                  <FormLabel>Inbox Api Url</FormLabel>
                  <Input {...field} placeholder={initialConfig.inboxApiUrl} />
                </FormControl>
              )}
            </Field>

            <Field name="backendApiUrl">
              {({ field }: FieldProps) => (
                <FormControl mb={8}>
                  <FormLabel>Backend Api Url</FormLabel>
                  <Input {...field} placeholder={initialConfig.backendApiUrl} />
                </FormControl>
              )}
            </Field>

            <Field name="websocketUrl">
              {({ field }: FieldProps) => (
                <FormControl mb={8}>
                  <FormLabel>Websocket Api Url</FormLabel>
                  <Input {...field} placeholder={initialConfig.websocketUrl} />
                </FormControl>
              )}
            </Field>

            <Button
              type="submit"
              colorScheme="purple"
              isLoading={isSubmitting}
              isFullWidth
            >
              Save
            </Button>
          </form>
        )}
      </Formik>
      <Footer />
    </>
  );
};

const App = () => {
  const [showConfig, setShowConfig] = useState(false);
  const [config, setConfig] = useState(initialConfig);

  return (
    <ChakraProvider>
      <Container my={8}>
        <Flex justify={"space-between"}>
          <Box textAlign="left" pos="relative" zIndex={1}>
            <button onClick={() => setShowConfig(!showConfig)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  fill={showConfig ? "#9121c2" : "#C1B6DD"}
                  d="m20.744 15.72-.64-.391zm-.955 1.56.64.391zm-16.533-9-.64-.392zm.955-1.56.64.392zm2.608-.658.358-.659zm-2.864 4.676-.359.659zm13.227 7.2-.36.659zm2.863-4.676-.358.658zM4.211 17.279l-.64.392zm-.955-1.558.64-.392zm16.533-9 .64-.392zm.955 1.558-.64.392zm-.699 2.46.359.658zm-2.864-4.677.36.658zm-13.226 7.2.358.659zm2.864 4.676-.36-.659zM17.08 6.117l-.359-.659zm-10.16 0-.359.659zm10.16 11.766.359-.659zm-10.16 0 .359.659zM11.046 3.75h1.909v-1.5h-1.91zm1.909 16.5h-1.91v1.5h1.91zm-1.91 0c-.682 0-1.159-.511-1.159-1.05h-1.5c0 1.45 1.233 2.55 2.66 2.55zm3.069-1.05c0 .539-.477 1.05-1.16 1.05v1.5c1.427 0 2.66-1.1 2.66-2.55zm-1.16-15.45c.683 0 1.16.511 1.16 1.05h1.5c0-1.45-1.233-2.55-2.66-2.55zm-1.908-1.5c-1.427 0-2.66 1.1-2.66 2.55h1.5c0-.539.477-1.05 1.16-1.05zm9.058 13.079-.954 1.559 1.279.783.955-1.559zM3.896 8.67l.954-1.559-1.279-.783-.955 1.559zm.954-1.559c.309-.504 1.03-.707 1.61-.392l.717-1.317c-1.247-.679-2.86-.292-3.606.926zm-.537 2.967c-.556-.302-.709-.932-.417-1.408l-1.28-.783c-.762 1.246-.29 2.818.98 3.509zm14.837 6.809c-.309.504-1.03.707-1.61.391l-.717 1.318c1.247.679 2.86.292 3.606-.926zm2.234-.776c.762-1.246.29-2.817-.98-3.509l-.717 1.318c.555.302.709.932.417 1.408zm-16.534.776-.954-1.56-1.28.784.955 1.56zm14.3-9.776.954 1.56 1.28-.784-.955-1.56zm.954 1.56c.292.475.139 1.105-.417 1.407l.717 1.318c1.27-.691 1.742-2.263.98-3.51zM17.54 6.72c.58-.315 1.301-.112 1.61.392l1.279-.783c-.746-1.218-2.36-1.605-3.606-.926zM3.896 15.33c-.292-.476-.139-1.106.417-1.408l-.717-1.318c-1.27.691-1.742 2.263-.98 3.51zM3.57 17.67c.746 1.218 2.36 1.605 3.606.926l-.717-1.318c-.58.316-1.301.113-1.61-.391zM17.439 6.776l.101-.056-.717-1.317-.102.055zM6.459 6.72l.102.056.718-1.318-.102-.055zM17.54 17.28l-.101-.056-.718 1.318.102.055zm-10.979-.056-.101.055.717 1.318.102-.055zm-2.965-5.827a.687.687 0 0 1 0 1.206l.717 1.318c1.522-.829 1.522-3.013 0-3.841zm3.683 7.145a.75.75 0 0 1 1.107.658h1.5c0-1.707-1.826-2.792-3.325-1.976zm8.335.658a.75.75 0 0 1 1.107-.658l.718-1.318c-1.5-.816-3.325.27-3.325 1.976zm4.79-6.597a.687.687 0 0 1 0-1.206l-.717-1.318c-1.522.829-1.522 3.013 0 3.841zM6.56 6.776c1.5.816 3.325-.27 3.325-1.976h-1.5a.75.75 0 0 1-1.107.658zm10.16-1.318a.75.75 0 0 1-1.107-.658h-1.5c0 1.707 1.826 2.792 3.325 1.976zM14.25 12A2.25 2.25 0 0 1 12 14.25v1.5A3.75 3.75 0 0 0 15.75 12zM12 14.25A2.25 2.25 0 0 1 9.75 12h-1.5A3.75 3.75 0 0 0 12 15.75zM9.75 12A2.25 2.25 0 0 1 12 9.75v-1.5A3.75 3.75 0 0 0 8.25 12zM12 9.75A2.25 2.25 0 0 1 14.25 12h1.5A3.75 3.75 0 0 0 12 8.25z"
                ></path>
              </svg>
            </button>
          </Box>
          {!showConfig && (
            <Box textAlign="right" pos="relative" zIndex={1}>
              <CourierProvider
                clientKey={config.clientKey}
                userId={config.userId}
                inboxApiUrl={config.inboxApiUrl}
                apiUrl={`${config.backendApiUrl}/client/q`}
                wsOptions={{
                  url: config.websocketUrl,
                }}
              >
                <Toast />
                <Inbox placement="left" openLinksInNewTab />
              </CourierProvider>
            </Box>
          )}
        </Flex>

        {showConfig ? (
          <Config
            config={config}
            setConfig={setConfig}
            setShowConfig={setShowConfig}
          />
        ) : (
          <Form config={config} />
        )}
      </Container>
    </ChakraProvider>
  );
};

export default App;
