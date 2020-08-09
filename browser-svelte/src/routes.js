import Login from './Login.svelte'

export default {
  // Exact path
  '/login': Login,

  // Using named parameters, with last being optional
  // '/author/:first/:last?': Author,

  // Wildcard parameter
  // '/book/*': Book,

  // Catch-all
  // This is optional, but if present it must be the last
  // '*': NotFound,
}
