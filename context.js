import React, { useReducer } from 'react';
import RtmAdapter from './RtmAdapter';

interface IAppMutations {
  setChannel(channel: string): void,
  setMessages(messages: any[]): void
}

interface IAppContext {
  channel: string | any,
  messages: any[],
  client: RtmAdapter,
}

const defaultProps: IAppContext & IAppMutations = {
  channel: null,
  messages: [],
  client: new RtmAdapter(),
  setChannel(channel) {},
  setMessages(messages) {},
}

export type AppContextType = IAppContext & IAppMutations

function mutation(state, action) {
  switch(action.type) {
    case 'messages': {
      return {...state, messages: action.payload}
    }
    case 'channel': {
      return {...state, channel: action.payload}
    }
    default:
      throw new Error("mutation type not defined")
  }
}

export const AppContext = React.createContext(defaultProps);
export const AppContainer = ({children}) => {
  const [state, dispatch] = useReducer(mutation, defaultProps)

  const context = {
    ...state,
    setMessages(messages) {
      dispatch({
        type: 'messages', payload: messages
      })
    },
    setChannel(channel) {
      dispatch({
        type: 'channel', payload: channel
      });
    }
  }
  return (
    <AppContext.Provider value={context}>
      {children}
    </AppContext.Provider>
  )
}