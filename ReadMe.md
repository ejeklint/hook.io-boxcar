## hook.io-boxcar

Provides a hook to [Boxcar](http://boxcar.io), a notification service for iOS devices. Boxcar has an API for service [providers](http://boxcar.io/help/api/providers) like Twitter, Facebook et. al., and one for boxcar [users](http://boxcar.io/help/api/users) who want to setup notifications for arbitrary events, like what can be done with Growl and the Boxcar Growl plugin on Mac OS X.

If you want to use the [users](http://boxcar.io/help/api/users) API, you must add Growl as a service on your Boxcar account.

## Installation

     npm install hook.io-boxcar

Edit the config.json file with your API key and secret (if you have one). You might want to use one of the existing [generic](http://boxcar.io/help/api/generic_providers) providers in Boxcar. If so, the broadcast functionality will not be available.

Start with

    hookio-boxcar

and you're all set.

## Handled events

| Event | Payload | Description
|:--|:--|:--
| boxcar::subscribe | email (String) | Subscribes a user for notifications
| boxcar::notify | email, message (JSON Object) | Notifies a given user with given message
| boxcar::broadcast | message (String) | Notifies all subscribing users with given message
| boxcar::notifyUser | message (String) | Uses the "User API" to send notification to self

When using `boxcar::notify`, send payload as JSON Object:

``` js
var notification = {
  email: "x@y.com",
  message: "blah-blah"
};

someHook.emit('boxcar::notify', notification);
```

Note: the current implementation of `notify` only supports one email address, and not a collection of addresses which is possible with the Provider API.

## Emitted Events

| Event | Payload | Description
|:--|:--|:--
| boxcar::response | result | HTML result code

## Hook config.json data

``` js
{
  "boxcar": {
    "providerKey": "fF4FiLb...", // Private service key or generic key
    "providerSecret": "3G6k...", // Only needed with private key
    "username": "x@y.com",       // Only needed if using Users API
    "password": "...",           // Only needed if using Users API
    "fromScreenName": "",        // Optional
    "fromRemoteServiceId": "",   // Optional
    "redirectPayload": "",       // Optional
    "sourceUrl": "",             // Optional
    "iconUrl": ""                // Optional
  }
}
```