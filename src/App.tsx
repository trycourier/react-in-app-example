import { useCallback } from "react";
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

const initialValues = {
  title: "",
  message: "",
  cta: "",
};

type Values = typeof initialValues;

interface AppProps {
  courierUserId: string;
}

const App = ({ courierUserId }: AppProps) => {
  const submitHandler = useCallback(
    async (values: Values, helpers: FormikHelpers<Values>) => {
      try {
        const response = await fetch("/api/submit_form", {
          method: "POST",
          body: JSON.stringify({ userId: courierUserId, ...values }),
          headers: { "content-type": "application/json" },
        });

        if (!response.ok) throw new Error("Request failed");

        helpers.resetForm();
        helpers.setStatus("success");
      } catch {
        helpers.setStatus("error");
      }
    },
    [courierUserId]
  );

  return (
    <Container my={8}>
      <Toast />

      <Box textAlign="right" pos="relative" zIndex={1}>
        <Inbox placement="left" openLinksInNewTab />
      </Box>

      <Heading as="h4" size="md" textAlign="center">
        Experience Courier's Inbox
      </Heading>
      <Text textAlign="center" mt={2} mb={12} fontSize="lg">
        Enter a message to see a toast message appear, the bell in the top right light up, and a new message in your inbox.
      </Text>

      <Formik initialValues={initialValues} onSubmit={submitHandler}>
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
                  <Input type="url" {...field} placeholder="http://www.example.com" />
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

      <Flex mt={12} justify="center">
        <Link mx={4} href="https://github.com/trycourier/react-in-app-example">
          Checkout on Github
        </Link>
        <Link mx={4} href="https://courier.com/docs/inbox">
          Powered by Courier
        </Link>
      </Flex>
    </Container>
  );
};

export default App;
