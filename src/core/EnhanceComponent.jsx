export function Enhance(ComposedComponent: Component, mixins: Array<Component>): Component {
  return mixins.reduce((ComposedComponent, Mixin) => {
    class extends Mixin {
      render() {
        return <ComposedComponent {...this.props} {...this.state} />;
      }
    };
    return Mixin;
  }, ComposedComponent);
}
