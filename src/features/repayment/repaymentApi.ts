export const submitMockRepayment = async (caseId: string) => {
  return {
    confirmation_id: "mock-confirmation",
    status: "RECEIVED",
    caseId
  };
};
