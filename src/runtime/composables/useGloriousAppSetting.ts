import { useCookie } from "#imports";
import defu from "defu";

interface appSettingInterface {
  dir?: String;
  darkMode?: Boolean;
}

const defaultSetting: appSettingInterface = {
  dir: "rtl",
  darkMode: false,
};

export const useGloriousAppSetting = {
  getSetting: (): appSettingInterface => {
    const appSetting: any = useCookie("glorious-app-setting");
    let result: appSettingInterface = {};
    if (typeof appSetting.value === "undefined") {
      appSetting.value = defaultSetting;
      result = defaultSetting;
    } else result = defu(appSetting.value, defaultSetting);

    return result;
  },
  setSetting: (key: any, value: any): void => {
    const setting: any = useGloriousAppSetting.getSetting();
    setting[key] = value;

    const appSetting: any = useCookie("glorious-app-setting");

    appSetting.value[key] = value;
  },
  setDarkMode: (): void => {
    const html: any = document.getElementsByTagName("html")[0];
    useGloriousAppSetting.setSetting(
      "darkMode",
      !html.classList.contains("dark")
    );
    html.classList.toggle("dark");
  },
  setDir: (type: "rtl" | "ltr"): void => {
    const html: any = document.getElementsByTagName("html")[0];
    html.dir = type;

    useGloriousAppSetting.setSetting("dir", type);
  },
};
