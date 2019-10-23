const LineByLineReader = require("line-by-line");
const path = require("path");
const fs = require("fs");
const baseDir = "/output/h2load/";

let output = {};

const parseFile = async file => {
  return new Promise((resolve, reject) => {
    const lr = new LineByLineReader(path.join(baseDir, file));
    let arrSection = file.split("_");
    let modeName = arrSection[2].substring(0, arrSection[2].indexOf(".txt"));
    let testType = (output[arrSection[1]] = output[arrSection[1]] || {});
    let testMode = (testType[modeName] = testType[modeName] || {});
    let testLoad = (testMode[arrSection[0]] = {});

    lr.on("line", line => {
      if (line.startsWith("finished in")) {
        let arrLine = line.split(", ");
        testLoad.reqSpeed = arrLine[1].substring(0, arrLine[1].indexOf(" req"));
        testLoad.duration = arrLine[0].substring(12);
        testLoad.trafficSpeed = arrLine[2];
      } else if (line.startsWith("TLS Protocol:")) {
        testLoad.tlsProtocol = line.substring(14);
      } else if (line.startsWith("Application protocol:")) {
        testLoad.appProtocol = line.substring(22);
      } else if (line.startsWith("traffic:")) {
        testLoad.trafficSummary = line.substring(9);
      } else if (line.startsWith("time for request:")) {
        let trimmedLine = line
          .substring(18)
          .replace(/ +(?= )/g, "")
          .trim();
        let arrLine = trimmedLine.split(" ");
        testLoad.timeForReq = arrLine[2];
      } else if (line.startsWith("time for connect:")) {
        let trimmedLine = line.substring(18).replace(/ +(?= )/g, "");
        let arrLine = trimmedLine.split(" ");
        testLoad.timeForCon = arrLine[2];
      } else if (line.startsWith("time to 1st byte:")) {
        let trimmedLine = line.substring(18).replace(/ +(?= )/g, "");
        let arrLine = trimmedLine.split(" ");
        testLoad.timeForData = arrLine[2];
      }
    });

    lr.on("error", err => {
      console.log(err);
      reject();
    });

    lr.on("end", () => {
      resolve();
    });
  });
};

(async () => {
  let filesList = [];

  const files = fs.readdirSync(baseDir);

  files.forEach(file => {
    filesList.push(file);
  });

  // console.log(filesList);

  for (let f of filesList) {
    await parseFile(f);
  }

  let data = JSON.stringify(output, null, 2);
  fs.writeFileSync("/output/h2load-summary.json", data);
})();
