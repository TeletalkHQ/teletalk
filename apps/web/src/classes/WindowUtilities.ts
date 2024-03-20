export class WindowUtilities {
  isOnline() {
    return window.navigator?.onLine;
  }
}

export const windowUtilities = new WindowUtilities();
