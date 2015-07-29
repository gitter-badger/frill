import Context from './Context';

export default {
  attach: (stores, actions) => new Context(stores, actions),
  
};
