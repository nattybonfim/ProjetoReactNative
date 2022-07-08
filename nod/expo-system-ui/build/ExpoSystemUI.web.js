import { Platform } from 'expo-modules-core';
// @ts-ignore: untyped
import normalizeColor from 'react-native-web/dist/cjs/modules/normalizeColor';
export default {
    get name() {
        return 'ExpoSystemUI';
    },
    getBackgroundColorAsync() {
        if (Platform.isDOMAvailable) {
            return normalizeColor(document.body.style.backgroundColor);
        }
        else {
            return null;
        }
    },
    setBackgroundColorAsync(color) {
        if (Platform.isDOMAvailable) {
            document.body.style.backgroundColor = color;
        }
    },
};
//# sourceMappingURL=ExpoSystemUI.web.js.map