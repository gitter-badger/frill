import frillCore from 'frill-core';
import Stores from './stores';
import Actions from './actions';

/**
 * FrillCore
 */
const FrillCore = frillCore;

console.log(process.env.NODE_ENV);

// load stores and actions.
FrillCore._Stores = Stores;
FrillCore._Actions = Actions;

export default FrillCore;
