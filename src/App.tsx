import { useEffect, useState } from "react";
import "./App.css";

interface Env {
  [key: string]: {
    id: string;
    name: string;
    value?: string | number;
    values?: {
      name: string;
      value: string;
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

  const currentEnv: Env = {
    ua: { id: "ua", name: "User-Agent", value: navigator.userAgent },
    "ua-ch": {
      id: "ua-ch",
      name: "User-Agent Client Hints",
      values: [
        { name: "brands", value: getUACHBrandsValue() },
        { name: "mobile", value: navigator?.userAgentData.mobile.toString() },
        { name: "platform", value: navigator?.userAgentData.platform },
      ],
    },
    "100svh": { id: "100svh", name: "100svh", value: 0 },
    "100lvh": { id: "100lvh", name: "100lvh", value: 0 },
    window_inner_size: {
      id: "window_inner_size",
      name: "window inner size",
      value: `${window.innerWidth} x ${window.innerHeight}`,
    },
    window_outer_size: {
      id: "window_outer_size",
      name: "window outer size",
      value: `${window.outerWidth} x ${window.outerHeight}`,
    },
    screen_size: {
      id: "screen_size",
      name: "screen size",
      value: `${screen.width} x ${screen.height}`,
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
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="value">{env[key].value}</p>
              )}
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
