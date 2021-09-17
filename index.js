require('dotenv').config();
let express = require('express');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let app = express();
let port = 5000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
app.use('/images', express.static('images'));

// This bot's main dialog.
const { EchoBot } = require('./bot');
const bot = new EchoBot();

const { TwilioWhatsAppAdapter } = require('./js-adapter-twilio-whatsapp');

const whatsAppAdapter = new TwilioWhatsAppAdapter(
  {
    accountSid: process.env.TWILIO_ACCOUNT_SID, // Account SID
    authToken: process.env.TWILIO_AUTH_TOKEN, // Auth Token
    phoneNumber: process.env.TWILIO_WA, // The From parameter consisting of whatsapp: followed by the sending WhatsApp number (using E.164 formatting)
    endpointUrl: process.env.ENDPOINT_URL, // Endpoint URL you configured in the sandbox, used for validation
  },
  {
    appId: '', // MicrosoftAppId
    appPassword: '', // MicrosoftAppPassword
  }
);

// WhatsApp endpoint for Twilio
app.post('/api/whatsapp/messages', (req, res) => {
  // console.log('REQ.BODY', req.body);
  whatsAppAdapter.processActivity(req, res, async (context) => {
    console.log('CONTEXT', context);
    // Route to main dialog.
    await bot.run(context);
  });
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

// When using Bot Emulator, it receives error: Maybe because it is not coming from Twilio
// TwilioWhatsAppAdapter.processActivity(): request doesn't contain a Twilio Signature.
// Validate if requests are coming from Twilio

app.listen(port, () => {
  console.log(`🌏 Server running at http://localhost:${port}`);
});

/*
REQ.BODY [Object: null prototype] {
  SmsMessageSid: 'SMe9db689829dd83edff0c5ae512a093ad',
  NumMedia: '0',
  ProfileName: 'Kitt Phi',
  SmsSid: 'SMe9db689829dd83edff0c5ae512a093ad',
  WaId: '15754947093',
  SmsStatus: 'received',
  Body: 'Hi',
  To: 'whatsapp:+14155238886',
  NumSegments: '1',
  MessageSid: 'SMe9db689829dd83edff0c5ae512a093ad',
  AccountSid: 'AC6e963ec1eee0a2e542d73bf08d6a3ae3',
  From: 'whatsapp:+15754947093',
  ApiVersion: '2010-04-01'
}
*/

/*
CONTEXT TurnContext {
  _respondedRef: { responded: false },
  _turnState: TurnContextStateCollection(1) [Map] { 'httpStatus' => 200 },
  _onSendActivities: [],
  _onUpdateActivity: [],
  _onDeleteActivity: [],
  _turn: 'turn',
  _locale: 'locale',
  bufferedReplyActivities: [],
  _adapter: TwilioWhatsAppAdapter {
    middleware: MiddlewareSet { middleware: [] },
    BotIdentityKey: Symbol(BotIdentity),
    ConnectorClientKey: Symbol(ConnectorClient),
    OAuthScopeKey: Symbol(OAuthScope),
    name: 'Web Adapter',
    TokenApiClientCredentialsKey: Symbol(TokenApiClientCredentials),
    oAuthSettings: { appId: '', appPassword: '' },
    channel: 'whatsapp',
    settings: {
      accountSid: 'AC6e963ec1eee0a2e542d73bf08d6a3ae3',
      authToken: '65a46494128ed97928422cd0ece5f87b',
      phoneNumber: 'whatsapp:+14155238886',
      endpointUrl: 'https://kittphi.ngrok.io/api/whatsapp/messages'
    },
    client: Twilio {
      username: 'AC6e963ec1eee0a2e542d73bf08d6a3ae3',
      password: '65a46494128ed97928422cd0ece5f87b',
      accountSid: 'AC6e963ec1eee0a2e542d73bf08d6a3ae3',
      _httpClient: RequestClient {},
      edge: undefined,
      region: undefined,
      logLevel: undefined,
      userAgentExtensions: [],
      _accounts: [Accounts],
      _api: [Api],
      _autopilot: [Autopilot],
      _chat: [Chat],
      _conversations: [Conversations],
      _events: [Events],
      _fax: [Fax],
      _flexApi: [FlexApi],
      _frontlineApi: [FrontlineApi],
      _insights: [Insights],
      _ipMessaging: [IpMessaging],
      _lookups: [Lookups],
      _messaging: [Messaging],
      _monitor: [Monitor],
      _notify: [Notify],
      _numbers: [Numbers],
      _preview: [Preview],
      _pricing: [Pricing],
      _proxy: [Proxy],
      _serverless: [Serverless],
      _studio: [Studio],
      _sync: [Sync],
      _taskrouter: [Taskrouter],
      _trunking: [Trunking],
      _trusthub: [Trusthub],
      _verify: [Verify],
      _video: [Video],
      _voice: [Voice],
      _wireless: [Wireless],
      _supersim: [Supersim],
      _bulkexports: [Bulkexports]
    }
  },
  _activity: {
    id: 'SMe9db689829dd83edff0c5ae512a093ad',
    timestamp: 2021-09-15T21:54:01.883Z,
    channelId: 'whatsapp',
    conversation: {
      id: 'whatsapp:+15754947093',
      isGroup: false,
      conversationType: null,
      tenantId: null,
      name: ''
    },
    from: { id: 'whatsapp:+15754947093', name: '' },
    recipient: { id: 'whatsapp:+14155238886', name: '' },
    text: 'Hi',
    channelData: [Object: null prototype] {
      SmsMessageSid: 'SMe9db689829dd83edff0c5ae512a093ad',
      NumMedia: '0',
      ProfileName: 'Kitt Phi',
      SmsSid: 'SMe9db689829dd83edff0c5ae512a093ad',
      WaId: '15754947093',
      SmsStatus: 'received',
      Body: 'Hi',
      To: 'whatsapp:+14155238886',
      NumSegments: '1',
      MessageSid: 'SMe9db689829dd83edff0c5ae512a093ad',
      AccountSid: 'AC6e963ec1eee0a2e542d73bf08d6a3ae3',
      From: 'whatsapp:+15754947093',
      ApiVersion: '2010-04-01'
    },
    localTimezone: null,
    callerId: null,
    serviceUrl: null,
    listenFor: null,
    label: undefined,
    valueType: null,
    type: 'message',
    attachments: []
  }
}
*/
