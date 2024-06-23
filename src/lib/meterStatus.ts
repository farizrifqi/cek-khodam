const loveMeterStatus = {
  1: "Waduh, Jauh Banget",
  2: "Nggak Nyambung",
  3: "Kurang Klik",
  4: "Masih Galau",
  5: "Lumayan Lah",
  6: "Boleh Juga",
  7: "Udah Pas",
  8: "Cocok Banget",
  9: "Klop Abis",
  10: "Jodoh Nih!",
};

export function getLoveMeterStatus(percentage: number) {
  if (percentage >= 1 && percentage <= 10) {
    return loveMeterStatus[1];
  } else if (percentage >= 11 && percentage <= 20) {
    return loveMeterStatus[2];
  } else if (percentage >= 21 && percentage <= 30) {
    return loveMeterStatus[3];
  } else if (percentage >= 31 && percentage <= 40) {
    return loveMeterStatus[4];
  } else if (percentage >= 41 && percentage <= 50) {
    return loveMeterStatus[5];
  } else if (percentage >= 51 && percentage <= 60) {
    return loveMeterStatus[6];
  } else if (percentage >= 61 && percentage <= 70) {
    return loveMeterStatus[7];
  } else if (percentage >= 71 && percentage <= 80) {
    return loveMeterStatus[8];
  } else if (percentage >= 81 && percentage <= 90) {
    return loveMeterStatus[9];
  } else if (percentage >= 91 && percentage <= 100) {
    return loveMeterStatus[10];
  } else {
    return "Wah belum dapat menemukan untukmu!";
  }
}
