# twilio-whatsapp-botbuilder-js

> Twilio WhatsApp Botbuilder Express Server with EchoBot

## To setup Twilio:

- Setup Twilio Account
- Register Phone at Twilio
- Activate Twilio WhatsApp Sandbox
- Rename env example `mv ENV .env` and popluate .env with credentials
- run ngrok
  `ngrok http 5000`
- Copy NGROK URL to [Twilio](https://console.twilio.com/us1/develop/sms/settings/whatsapp-sandbox?frameUrl=%2Fconsole%2Fsms%2Fwhatsapp%2Fsandbox%3Fx-target-region%3Dus1)
- send a WhatsApp message and the Echo bot will echo back.

## References:

[Botbuider JS Community Twilio WhatsApp Botbuilder Adapter](https://github.com/BotBuilderCommunity/botbuilder-community-js/blob/master/libraries/botbuilder-adapter-twilio-whatsapp/README.md)
