import express from 'express';
import tpLink from './tp-link';

const app = express();

app.post('/tp-link/:deviceName/:action', async function (req, res) {
  try {
    console.log(`Sending ${req.params.action} to ${req.params.deviceName}`);
    res.send(await tpLink.setPowerState(req.params.deviceName, req.params.action === 'on'));
  } catch (err) {
    console.error(err)
    res.statusCode = 500;
    res.send(err);
  }
  res.end();
});

export default app;
