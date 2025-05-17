import { createContext, useState, useContext } from 'react';
import axios from 'axios'

const SessionContext = createContext();

export function SessionProvider({ children }) {
  const [userData, setUserData] = useState(null);

  const domain = 'https://neroapi.ignorelist.com/'

  const clearSession = () => {
    setUserData(null);
  };

  const goalTookIn = async (data) => {
    // data - {'goal': '', 'desc': ''}
    await axios.post(`${domain}took_goal_in`, {
      'auth': userData.auth,
      'data': data
    })
  }

  const goalCompleted = async (data) => {
    // data - {'goal': '', 'desc': ''}
   await axios.post(`${domain}goal_completed`, {
    'auth': userData.auth,
    'data': data
    })

  }

  const chatbotChatting = async (data) => {
    // data - {"conversation": [... // whole conversation]}
    response = await axios.post(`${domain}conversation`, {
    'auth': userData.auth,
    'data': data
    })
    return response.data.response
  }

  const customizationPost = async () => {
   await axios.post(`${domain}customization_post`, {
    'auth': userData.auth,
    'data': userData.customization
    })
  }

  const accountDeletion = async () => {
    await axios.post(`${domain}delete_acc`, {
      'auth': userData.auth
    })
  }

  return (
    <SessionContext.Provider value={{ userData, setUserData, clearSession, accountDeletion, customizationPost, chatbotChatting, goalCompleted, goalTookIn }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
