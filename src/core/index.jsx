import {extend as _extend} from 'lodash';
import Core from './Core';
import Dispatcher from './Dispatcher';
import Action from './Action';
import Store from './Store';
import EnhanceComponent from './EnhanceComponent';
import Mixin from './Mixin';
import StoreWatchMixin from './StoreWatchMixin';

export default _extend(Core, {
  Dispatcher: Dispatcher,
  Store: Store,
  Action: Action,
  EnhanceComponent: EnhanceComponent,
  FrillMixin: FrillMixin,
  StoreWatchMixin: StoreWatchMixin,
});
