require("@testing-library/jest-dom");

const React = require("react");

// Global mock for next/image to avoid DOM warnings about custom props
jest.mock("next/image", () => {
  const { createElement } = require("react");
  return {
    __esModule: true,
    default: (props) => {
      const { fill, priority, ...rest } = props || {};
      return createElement("img", rest);
    },
  };
});

// Global mock for react-redux hooks used in many components
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(() => jest.fn()),
  useSelector: jest.fn(() => []),
}));
