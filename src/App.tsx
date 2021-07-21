import { useCallback } from "react";
import {
  Container,
  Heading,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Link,
} from "@chakra-ui/react";
import { useToast } from "@trycourier/react-toast";
import { Formik, Field, FieldProps } from "formik";

const App = () => {
  const [show] = useToast();

  const submitHandler = useCallback(
    ({ notificationTitle, notificationMessage, callToActionCopy }) => {
      const blocks = [
        { type: "text", text: notificationMessage },
        { type: "action", text: callToActionCopy, url: "/" },
      ] as const;

      show({
        title: notificationTitle,
        blocks: blocks.filter((block) => block.text),
      });
    },
    [show]
  );

  return (
    <Container my={8}>
      <Heading as="h4" size="md" textAlign="center">
        Welcome to the React In-App Toast App.
      </Heading>
      <Text textAlign="center" mt={2} mb={12} fontSize="lg">
        Select the options for your toast and try it below.
      </Text>

      <Formik
        initialValues={{
          notificationTitle: "",
          notificationMessage: "",
          callToActionCopy: "",
        }}
        onSubmit={submitHandler}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name="notificationTitle">
              {({ field }: FieldProps) => (
                <FormControl mb={8}>
                  <FormLabel>Notification Name</FormLabel>
                  <Input {...field} />
                </FormControl>
              )}
            </Field>

            <Field name="notificationMessage">
              {({ field }: FieldProps) => (
                <FormControl mb={8}>
                  <FormLabel>Notification Message</FormLabel>
                  <Input {...field} />
                </FormControl>
              )}
            </Field>

            <Field name="callToActionCopy">
              {({ field }: FieldProps) => (
                <FormControl mb={8}>
                  <FormLabel>Call To Action Copy</FormLabel>
                  <Input {...field} />
                </FormControl>
              )}
            </Field>

            <Button type="submit" colorScheme="purple" isFullWidth>
              Trigger Toast
            </Button>
          </form>
        )}
      </Formik>

      <Flex mt={12} justify="center">
        <Link mx={4} href="https://github.com/trycourier/react-inapp-example">
          Checkout on Github
        </Link>
        <Link mx={4} href="https://courier.com">
          Powered by Courier
        </Link>
      </Flex>
    </Container>
  );
};

export default App;
