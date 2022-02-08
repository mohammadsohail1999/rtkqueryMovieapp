import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const styles = {
  global: (props) => ({
    fonts: {
      heading: "Open Sans",
      body: "Monteserrat",
    },
    body: {
      bg: mode("white", "gray.900")(props),
    },
    div: {
      color: "#ba8fff",
    },
    ".nav": {
      bg: mode("white", "#171923")(props),
      boxShadow: mode("0 5px 3px #000", "0 5px 3px #fff")(props),
    },
  }),
};

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({ config, styles });

export default theme;
