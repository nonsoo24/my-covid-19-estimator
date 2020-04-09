const getInfectionsByRequestedTime = (periodType, timeToElapse) => {
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

  return (2 ** Math.trunc(noOfDays));
};

const covid19ImpactEstimator = (data) => {
  const input = data;
  return {
    data: input,
    impact: {
      currentlyInfected: data.reportedCases * 10,
      infectionsByRequestedTime: (data.reportedCases * 10)
      * getInfectionsByRequestedTime(data.periodType, data.timeToElapse)
    },
    severeImpact: {
      currentlyInfected: data.reportedCases * 50,
      infectionsByRequestedTime: (data.reportedCases * 50)
      * getInfectionsByRequestedTime(data.periodType, data.timeToElapse)
    }
  };
};

export default covid19ImpactEstimator;
