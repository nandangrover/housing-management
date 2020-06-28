/**
 * Configuration
 */

const isLocal = !!window.location.host.match(/localhost/g);

export const SERVER = isLocal ? 'http://localhost:4020/graphql' : `https://${window.location.host}/graphql`;
export const WEB_SOCKET_LINK = isLocal ? 'ws://localhost:4020/graphql' : `wss://${window.location.host}/graphql`;
