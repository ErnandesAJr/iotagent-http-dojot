'use strict';

// Libraries
const IotAgent = require('@dojot/iotagent-nodejs');
const Express = require('express');
const bodyParser = require('body-parser');

const SERVER_PORT = process.env.SERVER_PORT || 3124;

// Initialize the IoT Agent.
let iotAgent = new IotAgent.IoTAgent();
iotAgent.init().then(() => {
  /**
   * Para a solução é preciso criar um match entre o nome do dispositvo e o id dele na Dojot
   * Para isso todas as funções que lidam com criação, atualização ou remoção de um dispositivo tem que atualizar a lista de mapDojotIdToDeviceName
   */
  let mapDojotIdToDeviceName = {}
  let dojotDevicesInfo = {}
  console.log('Succeeded to start the HTTP IoT Agent ');
  /**
   * event.meta.service = tenant
   * event.data.id = deviceId
   * event.data.label = deviceNaem
   */
  // Handle device.create event
  iotAgent.messenger.on('iotagent.device', 'device.create', (tenant, event) => {
    console.log(`Received device.create event ${JSON.stringify(event)} for tenant ${tenant}.`);
    // TODO handle this event
    //Solution
    // let deviceId = event.data.id;
    // let deviceName = event.data.label;

    // dojotDevicesInfo[deviceName] = {
    //   tenant,
    //   deviceId
    // };

    // mapDojotIdToDeviceName[tenant + ":" + deviceId] = deviceName;
  });

  // Handle device.update event
  iotAgent.messenger.on('iotagent.device', 'device.update', (tenant, event) => {
    console.log(`Received device.update event ${JSON.stringify(event)} for tenant ${tenant}.`);
    // TODO handle this event
    // let tenant = event.meta.service;
    // let deviceId = event.data.id;
    // let deviceName = event.data.label;

    // let previousDeviceName = mapDojotIdToDeviceName[tenant + ":" + deviceId];
    // if ((previousDeviceName) && (previousDeviceName === deviceName)) {
    //   // device name continues the same
    //   return;
    // }

    // // the device name has been changed

    // // update the map
    // mapDojotIdToDeviceName[tenant + ":" + deviceId] = deviceName;

    // // remove the previous device info
    // delete dojotDevicesInfo[previousDeviceName];

    // // add the band new info
    // dojotDevicesInfo[deviceName] = {
    //   tenant,
    //   deviceId
    // };
  });

  // Handle device.remove event
  iotAgent.messenger.on('iotagent.device', 'device.remove', (tenant, event) => {
    console.log(`Received device.update event ${JSON.stringify(event)} for tenant ${tenant}.`);
    // TODO handle this event
    // let deviceName = mapDojotIdToDeviceName[event.meta.service + ':' + event.data.id];
    //Solution
    // if (deviceName) {
    //   delete dojotDevicesInfo[deviceName];
    //   delete mapDojotIdToDeviceName[event.meta.service + ':' + event.data.id];
    // }
  });

  // force device.create events for devices created before starting the iotagent
  iotAgent.messenger.generateDeviceCreateEventForActiveDevices();

  // HTTP server
  let server = Express();
  server.use(bodyParser.json());

  // handle HTTP post
  // TODO: replace by your endpoint /chemsen/readings
  //
  server.post('/teste/data', (req, res) => {

    console.log(`Received HTTP message: ${JSON.stringify(req.body)}`);


    // TODO: validate the message.
    // res.status(400).json({'message': 'missing x attribute'});
    // return;
    //Solution
    // function validateMandatoryFields(body, fields) {
    //   for (let f of fields) {
    //     if (!body.hasOwnProperty(f)) {
    //       return "Missing mandatory field: " + f;
    //     }
    //   }
    // }
    // const error = validateMandatoryFields(req.body, ['timestamp', 'data', 'device']);
    // if (error) {
    //   return res.status(400).send({ 'message': error });
    // }


    // TODO: validate if the message belongs to some device

    // res.status(400).json({'message': 'not found the device associated with this message'});
    // return;
    //Soluction

    // if (!dojotDeviceInfo[req.body.device]) {
    //   console.log('Discarding message to unknown device: ', req.body.device);
    //    res.status(400).json({ 'message': 'not found the device associated with this message' })
    //   return;
    // }


    // TODO: generate the internal message
    // let tenant = '';    // the tenant associated with the device
    // let deviceId = '';  // the device identifier in dojot
    // let msg = {};       // dictionary of dynamic attributes
    // let metada = {};    // dictionary of metada, here you can, for instance, overwrite the timestamp
    //Solution
    // let jsonData = {
    //   timestamp: req.body.timestamp,
    //   data: req.body.data,
    //   device: req.body.device
    // };

    // send data to dojot internal services
    // iotAgent.updateAttrs(deviceId, tenant, msg, metada);
    //Solution
    // iotAgent.updateAttrs(dojotDeviceInfo[req.body.device].deviceId, dojotDeviceInfo[req.body.device].tenant, jsonData, {});


    // 204 - Success/No content
    res.status(204).send();
  });

  // start HTTP server
  server.listen(SERVER_PORT, () => {
    console.log(`IotAgent HTTP listening on port ${SERVER_PORT}!`);
  });

}).catch((error) => {
  console.error(`Failed to initialize the HTTP IoT Agent (${error})`);
  process.exit(1);
});