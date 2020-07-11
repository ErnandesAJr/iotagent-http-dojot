# About

An IoT Agent is a custom microservice required to integrate a device that is not supported by default on Dojot.

<!-- <p align="center">
<img src="https://stash.atlantico.com.br/projects/IOT/repos/dojot-iot-agent-http/raw/docs/images/architecture.png?at=refs%2Fheads%2Fsafe2go" alt="drawing" width="900"/>
</p> -->


## Build Image

First, let's start this microservice:

```bash
$ sudo docker build -t dojot/iotagent-http .
```

Then you need to regenerate the docker-compose.yml of the Dojot to include this new microservice (compose.yaml), and start it:

```bash
# cd ../docker-compose
$ sudo docker-compose up
```

Wait some seconds and check its log:

```bash
# cd ../docker-compose
$ sudo docker-compose logs -f iotagent-http
```