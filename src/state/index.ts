import {assign, setup} from 'xstate';

export const videoPlayerMachine = setup({
    actions: {
        playVideo: assign({ isPlaying: (context) => context.isPlaying = true }),
        pauseVideo: assign({ isPlaying: (context) => context.isPlaying = false }),
    }
}).createMachine({
        id: 'videoPlayer',
        initial: 'closed',
        context: {isPlaying: false},
        states: {
            closed: {
                on: {
                    OPEN_PLAYER: {
                        target: 'opened',
                        actions: 'playVideo'
                    }
                }
            },
            opened: {
                type: 'parallel',
                states: {
                    player: {
                        initial: 'playing',
                        states: {
                            playing: {
                                on: {
                                    TOGGLE_PAUSED: {
                                        target: 'paused',
                                        actions: 'pauseVideo'
                                    },
                                }
                            },
                            paused: {
                                on: {
                                    TOGGLE_PLAYING: {
                                        target: 'playing',
                                        actions: 'playVideo'
                                    }
                                }
                            }
                        }
                    },
                    size: {
                        initial: 'default',
                        states: {
                            default: {
                                on: {
                                    TOGGLE_MINI: {
                                        target: 'mini'
                                    },
                                }
                            },
                            mini: {
                                on: {
                                    TOGGLE_DEFAULT: {
                                        target: 'default'
                                    }
                                }
                            }
                        }
                    },
                },
                on: {
                    CLOSE_PLAYER: {
                        target: 'closed',
                        actions: 'pauseVideo'
                    }
                }
            }
        },
    },
);