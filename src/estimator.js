const getDaysFromPeriodType = (periodType, timeToElapse) => {
  let noOfDays = 0;

  switch (periodType) {
    case 'days':
      noOfDays = timeToElapse / 3;
      break;

    case 'weeks':
      noOfDays = (timeToElapse * 7) / 3;
      break;

    case 'months':
      noOfDays = (timeToElapse * 30) / 3;
      break;

    default:
      break;
  }

  return Math.trunc(noOfDays);
};

const covid19ImpactEstimator = (data) => {
  const noOfDays = getDaysFromPeriodType(data.periodType, data.timeToElapse);
  const currentlyInfected = data.reportedCases * 10;
  const severeCurrentlyInfected = data.reportedCases * 50;
  const infectionsByRequestedTime = currentlyInfected * (2 ** noOfDays);
  const severeInfectionsByRequestedTime = severeCurrentlyInfected * (2 ** noOfDays);
  const impactSevereCasesByRequestedTime = infectionsByRequestedTime * 0.15;
  const severeImpactSevereCasesByRequestedTime = severeInfectionsByRequestedTime * 0.15;
  const availableBedSpace = data.totalHospitalBeds * 0.35;
  const hospitalBedsByRequestedTime = Math.trunc(
    availableBedSpace - impactSevereCasesByRequestedTime
  );
  const severeHospitalBedsByRequestedTime = Math.trunc(
    availableBedSpace - severeImpactSevereCasesByRequestedTime
  );
  const casesForICUByRequestedTime = Math.trunc(infectionsByRequestedTime * 0.05);
  const severeCasesForICUByRequestedTime = Math.trunc(severeInfectionsByRequestedTime * 0.05);
  const casesForVentilatorsByRequestedTime = Math.trunc(infectionsByRequestedTime * 0.02);
  const severeCasesForVentilatorsByRequestedTime = Math.trunc(severeInfectionsByRequestedTime
    * 0.02);
  const dollarsInFlight = Math.trunc((infectionsByRequestedTime
    * data.region.avgDailyIncomePopulation) * data.region.avgDailyIncomeInUSD * noOfDays);
  const severeDollarsInFlight = Math.trunc((severeInfectionsByRequestedTime
    * data.region.avgDailyIncomePopulation) * data.region.avgDailyIncomeInUSD * noOfDays);

  return {
    data,
    impact: {
      currentlyInfected,
      infectionsByRequestedTime,
      severeCasesByRequestedTime: impactSevereCasesByRequestedTime,
      hospitalBedsByRequestedTime,
      casesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime,
      dollarsInFlight
    },
    severeImpact: {
      currentlyInfected: severeCurrentlyInfected,
      infectionsByRequestedTime: severeInfectionsByRequestedTime,
      severeCasesByRequestedTime: severeImpactSevereCasesByRequestedTime,
      hospitalBedsByRequestedTime: severeHospitalBedsByRequestedTime,
      casesForICUByRequestedTime: severeCasesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime: severeCasesForVentilatorsByRequestedTime,
      dollarsInFlight: severeDollarsInFlight
    }
  };
};

export default covid19ImpactEstimator;
