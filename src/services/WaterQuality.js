class WaterQuality {

  constructor({ server }) {
    this.server = server;
  }

  listenUserData(service) {
    return this.server.post('/chemsen/readings', (req, res) => {
      console.log(`Received HTTP message: ${JSON.stringify(req.body)}`);
      const errors = this.checkInvalidData(req.body, ['timestamp', 'data', 'device']);

      if (errors.length > 0)
        return res.status(400).json({ 'messages': errors });

      const deviceId = req.body.device;
      const timestamp = req.body.timestamp ? req.body.timestamp : new Date().getTime();
      const payload = { "data": req.body.temperature }
      service.handleDeviceMessage(timestamp, payload, deviceId);
      return res.status(204).send();
    });
  }

  checkInvalidData(payload, attributes) {
    return attributes.map(attribute => !payload.hasOwnProperty(attribute) ? "Missing mandatory field: " + attribute : undefined)
      .filter(error => error);
  }

}

module.exports = WaterQuality;