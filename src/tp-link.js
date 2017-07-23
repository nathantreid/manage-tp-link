import hs100Api from 'hs100-api';

class TpLink {
  client = new hs100Api.Client({ debug: false});
  plugs = new Map();

  constructor() {
    console.log('start discovery')
    this.client.startDiscovery()
    .on('plug-new', async (plug) => {
      console.log(`Found device ${plug.name}`);
      this.plugs.set(onlyLowerCaseAlphaNumericOrSpace(plug.name), plug);
    })
    .on('plug-offline', async (plug) => console.log('remove plug'))
    ;

    setInterval(() => {
      // console.log('check plugs')
      for (let plug of this.plugs.values()) {
        // console.log('record power consumption');
      }
    }, 30000);
  }

  async setPowerState(deviceName, shouldBeOn) {
    const plug = this.plugs.get(onlyLowerCaseAlphaNumericOrSpace(deviceName));
    if (plug === undefined) {
      console.log(`Plug ${deviceName} not found.`);
      return;
    }
    return await plug.setPowerState(shouldBeOn);
  }
}

function onlyLowerCaseAlphaNumericOrSpace(val) {
  return val.toLowerCase().replace(/[^a-z0-9 ]/g, '');
}

export default new TpLink();
