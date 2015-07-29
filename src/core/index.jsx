import {extend as _extend} from 'lodash';
import Core from './Core';
import Dispatcher from './Dispatcher';
import Action from './Action';
import Store from './Store';
import Mixin from './Mixin';
import StoreWatchMixin from './StoreWatchMixin';

export default _extend(Core, {
  Dispatcher: Dispatcher,
  Store: Store,
  Action: Action,
  Mixin: Mixin,
  StoreWatchMixin: StoreWatchMixin,
});
