import frillCore from 'frill-core';
import Stores from './stores';
import Actions from './actions';

const Frill = frillCore;

// load stores and actions.
Frill._Stores = Stores;
Frill._Actions = Actions;

export default Frill;
