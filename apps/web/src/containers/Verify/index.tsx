import { Box, Button, Components, Icon, Input, Typography } from "~/components";
import { useCustomRouter, useVerify } from "~/hooks";
import { useAuthStore } from "~/store";
import { validators } from "~/validators";

const Verify = () => {
  const authStore = useAuthStore();
  const router = useCustomRouter();
  const { handler, loading } = useVerify();

  const isVerifySubmitButtonDisabled = () =>
    validators.verificationCode
      .submitValidator()
      .checkValue(authStore.verificationCode).hasError;

  const handleBackToSignInClick = () => {
    authStore.updateVerificationCode("");
    router.back();
  };

  const handleVerificationCodeInputChange = (value: string) => {
    authStore.updateVerificationCode(value);
  };

  return (
    <Box.Container maxWidth="xl">
      <Box.Div style={{ marginTop: 1 }}>
        <Button.Icon onClick={handleBackToSignInClick}>
          <Icon.ArrowBack.Element />
        </Button.Icon>
      </Box.Div>
      <Box.Div
        style={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box.Avatar
          sx={(theme) => ({
            m: 1,
            backgroundColor: theme.palette.secondary.dark,
          })}
        >
          <Icon.VerifiedUser.Element />
        </Box.Avatar>
        <Box.Container maxWidth="xs">
          <Box.Div style={{ marginTop: 1 }}>
            <Typography.H5>
              +{authStore.countryCode} {authStore.phoneNumber}
            </Typography.H5>

            <Typography.GreyTextParagraph>
              We have sent the code to the Teletalk app to your phone number.
            </Typography.GreyTextParagraph>

            <Input.Text.VerificationCode
              value={authStore.verificationCode}
              onChange={handleVerificationCodeInputChange}
            />

            <Button.Loading
              disabled={isVerifySubmitButtonDisabled()}
              loading={loading}
              loadingIndicatorText="Verifying..."
              sx={{
                mb: 2,
                mt: 2,
              }}
              onClick={handler}
            >
              Verify
            </Button.Loading>
          </Box.Div>
        </Box.Container>
      </Box.Div>

      <Components.AuthFooter />
    </Box.Container>
  );
};

export default Verify;
