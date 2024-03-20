export function AutoBind(
  _target: any,
  _methodName: string,
  descriptor: PropertyDescriptor
) {
  return {
    configurable: true,
    enumerable: false,
    get() {
      return descriptor.value.bind(this);
    },
    set(v) {
      descriptor.value = v.bind(this);
    },
  } as PropertyDescriptor;
}
