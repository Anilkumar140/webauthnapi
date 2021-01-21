// sample arguments for registration

import express from 'express';
import browserEnv from 'browser-env';
import { create } from '@github/webauthn-json';
var port = process.env.PORT || 8080;
browserEnv(['navigator']);
const app = express(); 
app.use(
    express.urlencoded({
      extended: true
    })
  )
  app.use(express.json())
  app.all("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
  });
app.post('/CreateMethod',(req, res) => {
    let data = req.body;
    console.log(data.rp.name);
var createCredentialDefaultArgs = {
    rp : {
      name:data.rp.id,
       id: "ionic.centroxy.com"
      // id:"internet-world.web.app"
    },
    user : {
      name : data.user.name,
      displayName : data.user.displayName,
      id : data.user.id
    },
    challenge : data.challenge,
    pubKeyCredParams : data.pubKeyCredParams,
    excludeCredentials : data.excludeCredentials,
    attestation : data.attestation,
    extensions : {}
  }

// register / create a new credential
navigator.credentials.create(createCredentialDefaultArgs)
    .then((cred) => {
        console.log("NEW CREDENTIAL", cred);

        // normally the credential IDs available for an account would come from a server
        // but we can just copy them from above...
        var idList = [{
            id: cred.rawId,
            transports: ["usb", "nfc", "ble"],
            type: "public-key"
        }];
        getCredentialDefaultArgs.publicKey.allowCredentials = idList;
        return navigator.credentials.get(getCredentialDefaultArgs);
    })
    .then((assertion) => {
        console.log("ASSERTION", assertion);
    })
    .catch((err) => {
        console.log("ERROR", err);
    });
}); 
app.listen(port, function(){ 
    console.log("server is running on port 3000"+port); 
  }) 