Accounts.oauth.registerService('franceconnect');

if (Meteor.isClient) {
  Meteor.loginWithFranceconnect = function(options, callback) {
    // support a callback without options
    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
    Franceconnect.requestCredential(options, credentialRequestCompleteCallback);
  };
} else {
  Accounts.addAutopublishFields({
    // publish all fields including access token, which can legitimately
    // be used from the client (if transmitted over ssl or on
    // localhost). https://developers.facebook.com/docs/concepts/login/access-tokens-and-types/,
    // "Sharing of Access Tokens"
    forLoggedInUser: ['services.franceconnect'],
    forOtherUsers: [
    //   // https://www.facebook.com/help/167709519956542
      'services.franceconnect.id', 'services.franceconnect.name'
    ]
  });
}