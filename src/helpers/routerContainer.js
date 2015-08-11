let _router = null;
/**
 * @desc Set and get router
 * @example <caption>Set ReactRouter</caption>
 * routerContainer.set(ReactRouter);
 * @example <caption>Get ReactRouter</caption>
 * routerContainer.get();
 */
const routerContainer = {
  /**
   * Sets router
   * @param {ReactRouter} router - Instance created by ReactRouter.create() method
   */
  set: (router) => _router = router,
  /**
   * Gets router
   * @return {ReactRouter} - Instance created by ReactRouter.create() method
   */
  get: () => _router,
};

export default routerContainer;
