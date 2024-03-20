import { useEffect } from "react";

import { websocket } from "~/classes/websocket/Websocket";
import { Box, Button, Components, Icon, Input, Typography } from "~/components";
import { useSignIn } from "~/hooks";
import { useAuthStore } from "~/store";
import { OnChangeValidatorFn } from "~/types";
import { utils } from "~/utils";

const SignIn = () => {
  const authStore = useAuthStore();
  const { handler, loading } = useSignIn();

  const isSignInSubmitButtonDisabled = () => utils.isCellphoneValid(authStore);

  useEffect(() => {
    if (websocket.client.disconnected) websocket.client.connect();
  }, []);

  const handleChange: OnChangeValidatorFn = (_value: string, event) => {
    authStore.updateCellphone({
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Box.Container mw="xl">
      <Box.Flex ai="center" col mt={8}>
        <Box.Avatar
          sx={(theme) => ({
            m: 1,
            backgroundColor: theme.palette.secondary.main,
          })}
        >
          <Icon.LockOutlined.Element />
        </Box.Avatar>

        <Typography.H5>Teletalk</Typography.H5>

        <Box.Container mw="xs">
          <Box.Div style={{ marginTop: 1 }}>
            <Typography.GreyTextParagraph>
              Please verify your country code and enter your mobile phone
              number.
            </Typography.GreyTextParagraph>

            <Input.Text.Cellphone
              countryCode={authStore.countryCode}
              countryName={authStore.countryName}
              phoneNumber={authStore.phoneNumber}
              onChange={handleChange}
            />

            <Button.Loading
              disabled={isSignInSubmitButtonDisabled()}
              loading={loading}
              loadingIndicatorText="Sign in..."
              sx={{
                mb: 1,
                mt: 2,
              }}
              onClick={handler}
            >
              Next
            </Button.Loading>
          </Box.Div>
        </Box.Container>
      </Box.Flex>

      <Components.AuthFooter />
    </Box.Container>
  );
};

export default SignIn;
