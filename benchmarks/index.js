const puppeteer = require("puppeteer");
const NETWORK_PRESETS = require("./network.presets");
const testsBasic = require("./tests.basic");
const testsLow = require("./tests.low");
const testsMedium = require("./tests.medium");
const testsHeavy = require("./tests.heavy");

const testPage = async (url, options) => {
  options.iterations = options.iterations || 1;
  console.log(`Benchmarking page ${url}`);
  console.log(
    `running ${options.iterations} iterations on network throttling ${options.networkLabel}`
  );

  let loadingTimeArray = [];

  for (let i = 0; i < options.iterations; ++i) {
    const page = await options.browser.newPage();
    const client = await page.target().createCDPSession();

    if (options.network) {
      await client.send("Network.emulateNetworkConditions", options.network);
    }
    await client.send("Network.setCacheDisabled", {
      cacheDisabled: true
    });

    process.stdout.write(
      `running ${i + 1}/${options.iterations} iterations...\r`
    );

    let hrDuration;
    let hrStart = process.hrtime();
    await page.goto(url, {
      timeout: 0,
      waitUntil: "networkidle0"
    });
    hrDuration = process.hrtime(hrStart);

    if (options.screenshot) {
      await page.screenshot({ path: options.screenshot, type: "jpeg" });
    }

    loadingTimeArray.push(hrDuration[0] * 1000 + hrDuration[1] / 1000000);

    // output = await page.metrics();
    // console.log(output);

    await page.close();

    return {};
  }
  const avgLoadingTime =
    loadingTimeArray.reduce((a, b) => a + b) / options.iterations;
  console.log(
    `Average loading page time: ${Math.round(
      avgLoadingTime / 1000
    )}s ${Math.round(avgLoadingTime % 1000)}ms `
  );
  console.log("");
};

const bachTest = async tests => {
  for await (let t of tests) {
    let errCount = 0;

    if (enableLocalTests && !t.localUrl) {
      continue;
    }
    try {
      const results = await testPage(enableLocalTests ? t.localUrl : t.url, {
        browser: browser,
        // network: NETWORK_PRESETS.WiFi,
        networkLabel: "WiFi",
        iterations: 100
        // screenshot: `${enableLocalTests ? "./" : "/"}output/${t.name}_${
        //   t.server
        // }.jpg`
      });
    } catch (err) {
      errCount++;
    }
  }
};

puppeteer
  .launch({
    args: ["--disable-dev-shm-usage"],
    executablePath: "/usr/bin/google-chrome-unstable",
    ignoreHTTPSErrors: true,
    headless: true
  })
  .then(async browser => {
    const enableLocalTests = false;

    let testsAll = testsBasic.concat(
      testsLow.concat(testsMedium.concat(testsHeavy))
    );

    // const tests = testsAll;
    // const tests = testsBasic;
    // const tests = testsLow;
    const tests = testsMedium;
    // const tests = testsHeavy;

    await bachTest(test);

    await browser.close();
  });
