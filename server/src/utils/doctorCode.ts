export const generateDoctorCode = (rounds = 1): string => {
  let uid = '';
  while (rounds > 0) {
    uid += Math.random().toString(10).substring(3, 10);
    rounds -= 1;
  }
  return uid;
};
