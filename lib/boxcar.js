// The modules this hook requires
var Hook = require('hook.io').Hook,
    util = require('util'),
    Provider = require('boxcar').Provider,
    User = require('boxcar').User;

// Things we need to access in different functions   
var settings, provider, user;

// Set up the boxcar hook, and export it at the same time
var BoxcarHook = exports.BoxcarHook = function(options) {
  var self = this;
  Hook.call(self, options); // Basic initializations

  settings = self.boxcar; // Read the configuration file

  provider = new Provider(settings.providerKey,
    settings.providerSecret);
  user = new User(settings.username,
    settings.password);

  // Register callback for hook::ready event
  self.on('hook::ready', function() {
    // When hook is ready, register callbacks for boxcar events
    self.on('*::boxcar::subscribe', function(data) {
      self.subscribe(data);
    });
    self.on('*::boxcar::notify', function(data) {
      self.notify(data);
    });
    self.on('*::boxcar::broadcast', function(data) {
      self.broadcast(data);
    });
    self.on('*::boxcar::notifyUser', function(data) {
      self.notifyUser(data);
    });
  });
  
  // Make boxcar-api module catch it's own events
  // and re-emit them as hook events
  provider.on('response', function (responseBody) {
    self.emit('boxcar::response', responseBody);
  });
  user.on('response', function (responseBody) {
    self.emit('boxcar::response', responseBody);
  });
  
};

// Set up inheritance from Hook
util.inherits(BoxcarHook, Hook);

// Callbacks defined below

BoxcarHook.prototype.subscribe = function(email) {
  provider.subscribe(email);
}

BoxcarHook.prototype.notify = function(options) {
  provider.notify(
    options.email,
    options.message,
    settings.fromScreenName,
    settings.fromRemoteServiceId,
    settings.redirectPayload,
    settings.sourceUrl,
    settings.iconUrl
  );
}

BoxcarHook.prototype.broadcast = function(message) {
  provider.broadcast(
    message,
    settings.fromScreenName,
    settings.fromRemoteServiceId,
    settings.redirectPayload,
    settings.sourceUrl,
    settings.iconUrl
  );
}

BoxcarHook.prototype.notifyUser = function(message) {
  user.notify(
    message,
    settings.fromScreenName,
    settings.fromRemoteServiceId,
    settings.sourceUrl,
    settings.iconUrl
  );
}