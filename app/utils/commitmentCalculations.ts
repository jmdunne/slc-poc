import { Commitment } from "../data/types";

export function calculateCommitmentSummary(commitments: Commitment[]) {
  const now = new Date();

  const commitmentSummaries = commitments.map((commitment) => {
    const startDate = new Date(commitment.startDate);
    const endDate = new Date(commitment.endDate);
    const totalDuration = endDate.getTime() - startDate.getTime();
    const elapsedDuration = now.getTime() - startDate.getTime();
    const durationFactor = Math.min(elapsedDuration / totalDuration, 1);

    const expectedSpendToDate = commitment.totalCommittedSpend * durationFactor;
    const utilizationRate =
      expectedSpendToDate > 0
        ? (commitment.totalActualSpend / expectedSpendToDate) * 100
        : 0;

    return {
      ...commitment,
      utilizationRate,
    };
  });

  const totalCommittedSpend = commitmentSummaries.reduce(
    (sum, c) => sum + c.totalCommittedSpend,
    0
  );
  const totalActualSpend = commitmentSummaries.reduce(
    (sum, c) => sum + c.totalActualSpend,
    0
  );
  const averageUtilizationRate =
    commitmentSummaries.reduce((sum, c) => sum + c.utilizationRate, 0) /
    commitments.length;
  
    return {
    totalCommittedSpend,
    totalActualSpend,
    averageUtilizationRate,
    commitments:commitmentSummaries,
    totalCommitments:commitments.length,
    activeCommitments:commitments.filter(commitment => commitment.status === "Active").length,
    nearExpiryCommitments:commitments.filter(commitment => commitment.status === "Near Expiry").length,
    expiredCommitments:commitments.filter(commitment => commitment.status === "Expired").length,
    totalSavings:commitments.reduce((sum, c) => sum + c.totalSavings, 0),
  };
}
