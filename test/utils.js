export function generateRandomEmail() {
  return `${Math.random().toString(36).substring(7)}@${Math.random().toString(36).substring(3)}.com`;
}

export const TEST_PASSWORD = "NDU#$HF(DJOWDWKF()#$IJFPEOWFCWMEOIF.CWEOIF)";