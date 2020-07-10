const reactotron = {
  configure: () => reactotron,
  useReactNative: () => reactotron,
  use: () => reactotron,
  connect: () => reactotron,
  clear: () => reactotron,
  createEnhancer: () => jest.fn(),
};

module.exports = reactotron;

// export default {
//   configure: () => ({
//     useReactNative: () => ({
//       use: () => ({
//         connect: () => ({
//           createEnhancer: jest.fn(),
//         }),
//         clear: jest.fn(),
//       }),
//     }),
//   }),
// };
