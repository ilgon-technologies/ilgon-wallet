const fetch = require('node-fetch');
const fs = require('fs');
const configs = require('./configs');

if (!fs.existsSync(configs.GENERATED_FOLDER_PATH)) {
  fs.mkdirSync(configs.GENERATED_FOLDER_PATH);
}

const fetchAddressDarkList = async () => {
  try {
    if (!fs.existsSync(configs.ADDRESS_DARKLIST_PATH)) {
      fs.mkdirSync(configs.ADDRESS_DARKLIST_PATH);
    }

    const darkList = await fetch(
      'https://cdn.jsdelivr.net/gh/MyEtherWallet/ethereum-lists@master/src/addresses/addresses-darklist.json'
    )
      .then(res => res.json())
      .catch(console.log);
    const jsonToStore = {
      data: darkList,
      timestamp: Date.now()
    };
    console.log('Writing address darklist');
    fs.writeFileSync(
      `${configs.ADDRESS_DARKLIST_PATH}/address-darklist.json`,
      JSON.stringify(jsonToStore)
    );
  } catch (e) {
    console.error(e); // Not captured by sentry
  }
};

const fetchUrlDarklist = async () => {
  const sources = [
    {
      repo:
        'https://raw.githubusercontent.com/409H/EtherAddressLookup/master/blacklists/domains.json',
      identifier: 'eal'
    },
    {
      repo:
        'https://raw.githubusercontent.com/phishfort/phishfort-lists/master/blacklists/domains.json',
      identifier: 'phishfort'
    },
    {
      repo:
        'https://raw.githubusercontent.com/MyEtherWallet/ethereum-lists/master/src/urls/urls-darklist.json',
      identifier: 'mew'
    }
  ];
  try {
    const promises = [];
    if (!fs.existsSync(configs.URL_DARKLIST_PATH)) {
      fs.mkdirSync(configs.URL_DARKLIST_PATH);
    }

    for (let i = 0; i < sources.length; i++) {
      console.log(`Writing url darklist from ${sources[i].identifier}`);
      const fetchedProm = await fetch(sources[i].repo).then(res => res.json());
      promises.push(fetchedProm);
    }

    await Promise.all(promises).then(values => {
      values.forEach((res, idx) => {
        if (sources[idx].identifier === 'mew') {
          const newRes = res.map(item => {
            return item.id;
          });

          fs.writeFileSync(
            `${configs.URL_DARKLIST_PATH}/${sources[idx].identifier}-blacklisted-domains.json`,
            JSON.stringify(newRes)
          );
        } else {
          fs.writeFileSync(
            `${configs.URL_DARKLIST_PATH}/${sources[idx].identifier}-blacklisted-domains.json`,
            JSON.stringify(res)
          );
        }
      });
    });
  } catch (e) {
    console.error(e); // Not captured by sentry
  }
};

const fetchUrlLightlist = async () => {
  const sources = [
    {
      repo:
        'https://raw.githubusercontent.com/409H/EtherAddressLookup/master/whitelists/domains.json',
      identifier: 'eal'
    },
    {
      repo:
        'https://raw.githubusercontent.com/MyEtherWallet/ethereum-lists/master/src/urls/urls-lightlist.json',
      identifier: 'mew'
    }
  ];
  try {
    const promises = [];
    if (!fs.existsSync(configs.URL_LIGHTLIST_PATH)) {
      fs.mkdirSync(configs.URL_LIGHTLIST_PATH);
    }
    for (let i = 0; i < sources.length; i++) {
      console.log(`Writing url lightlist from ${sources[i].identifier}`);
      const fetchedProm = await fetch(sources[i].repo).then(res => res.json());
      promises.push(fetchedProm);
    }

    await Promise.all(promises).then(values => {
      values.forEach((res, idx) => {
        if (sources[idx].identifier === 'mew') {
          const newRes = res.map(item => {
            return item.id;
          });

          fs.writeFileSync(
            `${configs.URL_LIGHTLIST_PATH}/${sources[idx].identifier}-whitelisted-domains.json`,
            JSON.stringify(newRes)
          );
        } else {
          fs.writeFileSync(
            `${configs.URL_LIGHTLIST_PATH}/${sources[idx].identifier}-whitelisted-domains.json`,
            JSON.stringify(res)
          );
        }
      });
    });
  } catch (e) {
    console.error(e); // Not captured by sentry
  }
};

const run = async () => {
  await fetchAddressDarkList().then(fetchUrlDarklist).then(fetchUrlLightlist);
};

(async () => {
  try {
    await run();
    console.log('Done');
  } catch (e) {
    console.error(e);
  }
})();
