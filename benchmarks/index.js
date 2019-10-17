const puppeteer = require("puppeteer");

let NETWORK_PRESETS = {
  GPRS: {
    offline: false,
    downloadThroughput: (50 * 1024) / 8,
    uploadThroughput: (20 * 1024) / 8,
    latency: 500
  },
  Regular2G: {
    offline: false,
    downloadThroughput: (250 * 1024) / 8,
    uploadThroughput: (50 * 1024) / 8,
    latency: 300
  },
  Good2G: {
    offline: false,
    downloadThroughput: (450 * 1024) / 8,
    uploadThroughput: (150 * 1024) / 8,
    latency: 150
  },
  Regular3G: {
    offline: false,
    downloadThroughput: (750 * 1024) / 8,
    uploadThroughput: (250 * 1024) / 8,
    latency: 100
  },
  Good3G: {
    offline: false,
    downloadThroughput: (1.5 * 1024 * 1024) / 8,
    uploadThroughput: (750 * 1024) / 8,
    latency: 40
  },
  Regular4G: {
    offline: false,
    downloadThroughput: (4 * 1024 * 1024) / 8,
    uploadThroughput: (3 * 1024 * 1024) / 8,
    latency: 20
  },
  DSL: {
    offline: false,
    downloadThroughput: (2 * 1024 * 1024) / 8,
    uploadThroughput: (1 * 1024 * 1024) / 8,
    latency: 5
  },
  WiFi: {
    offline: false,
    downloadThroughput: (30 * 1024 * 1024) / 8,
    uploadThroughput: (15 * 1024 * 1024) / 8,
    latency: 2
  }
};

const testPage = async (url, options) => {
  options.iterations = options.iterations || 1;
  console.log(`Benchmarking page ${url}`);
  console.log(
    `running ${options.iterations} iterations on network throttling ${options.networkLabel}`
  );

  // let avgLoadtime = 0;
  let loadingTimeArray = [];

  for (let i = 0; i < options.iterations; ++i) {
    // Create a new tab
    const page = await options.browser.newPage();

    // Connect to Chrome DevTools
    const client = await page.target().createCDPSession();

    // Set throttling property
    await client.send("Network.emulateNetworkConditions", options.network);

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
      waitUntil: "networkidle2"
    });
    hrDuration = process.hrtime(hrStart);

    // await page.screenshot({ path: "./output/test.jpg", type: "jpeg" });

    if (options.screenshot) {
      await page.screenshot({ path: options.screenshot, type: "jpeg" });
    }

    loadingTimeArray.push(hrDuration[0] * 1000 + hrDuration[1] / 1000000);
    // console.log(
    //   "page loading time: %ds %dms",
    //   hrDuration[0],
    //   hrDuration[1] / 1000000
    // );
    // output = await page.metrics();
    // console.log(output);
    await page.close();
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

puppeteer
  .launch({ ignoreHTTPSErrors: true, headless: true })
  .then(async browser => {
    const tests = [
      {
        name: "basic",
        server: "NextJS-HTTP",
        url: "http://h2-tests_next:3000/"
      },
      {
        name: "basic",
        server: "ReverseProxy-HTTP2_to_NextJS-HTTP",
        url: "https://next.test/"
      }
    ];

    const testsLocal = [
      {
        name: "medium images",
        server: "NextJS-HTTP",
        url: "http://localhost:3000"
      },
      {
        name: "medium images",
        server: "NextJS+Fastify-HTTP2",
        url: "https://localhost:3003"
      }
    ];

    for await (let t of tests) {
      await testPage(t.url, {
        browser: browser,
        network: NETWORK_PRESETS.Regular4G,
        networkLabel: "Regular4G",
        iterations: 1,
        screenshot: `./output/${t.name}_${t.server}.jpg`
      });
    }

    await browser.close();
  });
