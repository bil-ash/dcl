	const dcl=require('../');
	const fs = require('fs');
	const Express = require('iotjs-express');
	const tcport=14205;
	const udport=14205;
	const ip='127.0.0.1';
  const app = new Express();
  const dgram=require('dgram');
	const udp=dgram.createSocket('udp4');
	const dh=new dcl.Host(ip,udport);
	dh.setUDPWriteFunction((msg, {port, address}) => {
  udp.send(msg, port, address);
});
	var num=0;
	dh.onClientJoin(({clientId, address, port}) => {
  console.log(`client id=${clientId} ${address}:${port} joined`);
});

	dh.onClientLeave(({clientId}) => {
  console.log(`client id=${clientId} left`);
});

	dh.onTextData(({text, clientId, address, port}) => {
  /*if (){
		console.log(`received text data from client ${clientId}: ${text}`);
	}*/
  dh.sendText(clientId, text);
});

	app.post("/", (req, res) => {
  let sdp = dh.exchangeSDP(req.body)||'';
  return res.end(sdp);
});

udp.on("message", (msg, addr) => {
  dh.handleUDP(msg, addr);
});


  app.put('/db/:key', function(req, res) {
    console.log(req.body);
    db[req.params.key] = req.body.value;

    return res.json(db);
  });

  app.get('/~:user', function(req, res) {
    return res.json({user: req.params.user});
  });

  app.get('/:filename', function(req, res) {
    fs.readFile('./public/'+req.params.filename, function(err, data) {
      if (err) {
        data='404:Not Found'
      }

      return res.end(data);
    });
  });
	
  app.listen(tcport);
	udp.bind(udport);
	setInterval(()=>{dh.serve();},10);

