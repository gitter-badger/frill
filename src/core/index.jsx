import {extend as _extend} from 'lodash';
import Core from './Core';
import Dispatcher from './Dispatcher';
import Action from './Action';
import Store from './Store';
import BaseComponent from './BaseComponent';
import StoreWatchComponent from './StoreWatchComponent';

export default _extend(Core, {
  Dispatcher: Dispatcher,
  Store: Store,
  Action: Action,
  BaseComponent: BaseComponent,
  StoreWatchComponent: StoreWatchComponent,
});
