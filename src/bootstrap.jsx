import Frill from './core';
import Stores from './stores';
// import Actions from './actions';

// export Frill to global
global.Frill = Frill;

// use request service
Frill.Action.use('request', {prefix: '/api'});

// use socket service
// Frill.Action.use('socket', {url: 'http://localhost:3000'});

// load stores and actions.
Frill._Stores = Stores;
Frill._Actions = Actions;
