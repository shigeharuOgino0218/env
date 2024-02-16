import { useEffect, useState } from "react";
import "./App.css";

interface Env {
  [key: string]: {
    id: string;
    name: string;
    code?: string;
    value?: string | number;
    values?: {
      name: string;
      code?: string;
      value: string | number;
    }[];
  };
}

function App() {
  const getUACHBrandsValue = () => {
    if (!navigator?.userAgentData) return "";
    return navigator?.userAgentData.brands
      .map((brand) => `${brand.brand} v${brand.version}`)
      .join(", ");
  };

  const getBoundingClientRectHeight = (element: Element | null) => {
    return element?.getBoundingClientRect().height || 0;
  };

  const qs = (selector: string) => {
    return document.querySelector(selector);
  };

  const error = {
    "ua-ch": "取得できませんでした。navigator.userAgentData は非対応です。",
  };

  const userAgentData = navigator?.userAgentData;

  const currentEnv: Env = {
    ua: {
      id: "ua",
      name: "User-Agent",
      code: "navigator.userAgent",
      value: navigator.userAgent,
    },
    "ua-ch": {
      id: "ua-ch",
      name: "User-Agent Client Hints",
      values: userAgentData
        ? [
            {
              name: "brands",
              code: "navigator.userAgentData.brands",
              value: getUACHBrandsValue(),
            },
            {
              name: "mobile",
              code: "navigator.userAgentData.mobile",
              value: userAgentData?.mobile.toString(),
            },
            {
              name: "platform",
              code: "navigator.userAgentData.platform",
              value: userAgentData?.platform,
            },
          ]
        : [{ name: "error", value: error["ua-ch"] }],
    },
    "100svh": { id: "100svh", name: "100svh", value: 0 },
    "100lvh": { id: "100lvh", name: "100lvh", value: 0 },
    window_inner_size: {
      id: "window_inner_size",
      name: "window inner size",
      values: [
        {
          name: "inner width",
          code: "window.innerWidth",
          value: window.innerWidth,
        },
        {
          name: "inner height",
          code: "window.innerHeight",
          value: window.innerHeight,
        },
      ],
    },
    window_outer_size: {
      id: "window_outer_size",
      name: "window outer size",
      values: [
        {
          name: "outer width",
          code: "window.outerWidth",
          value: window.outerWidth,
        },
        {
          name: "outer height",
          code: "window.outerHeight",
          value: window.outerHeight,
        },
      ],
    },
    screen_size: {
      id: "screen_size",
      name: "screen size",
      values: [
        {
          name: "screen width",
          code: "screen.width",
          value: screen.width,
        },
        {
          name: "screen height",
          code: "screen.height",
          value: screen.height,
        },
      ],
    },
    device_pixel_ratio: {
      id: "device_pixel_ratio",
      name: "device pixel ratio",
      code: "window.devicePixelRatio",
      value: window.devicePixelRatio,
    },
  };

  const [env, setEnv] = useState<Env>({});

  useEffect(() => {
    currentEnv["100svh"].value = getBoundingClientRectHeight(qs("#svh"));
    currentEnv["100lvh"].value = getBoundingClientRectHeight(qs("#lvh"));

    setEnv(currentEnv);
  }, []);

  return (
    <>
      <ul data-level="1">
        {Object.keys(env).map((key: string) => {
          return (
            <li key={key}>
              <p className="name">{env[key].name}</p>

              {env[key].values ? (
                <ul data-level="2" className="value">
                  {env[key].values?.map((valueItem) => {
                    return (
                      <li key={valueItem.name}>
                        <p className="name">{valueItem.name}</p>
                        <p className="value">{valueItem.value}</p>
                        {valueItem.code && <code>{valueItem.code}</code>}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="value">{env[key].value}</p>
              )}

              {env[key].code && <code>{env[key].code}</code>}
            </li>
          );
        })}
      </ul>
      <div id="svh"></div>
      <div id="lvh"></div>
    </>
  );
}

export default App;
