import React from 'react';

const CurrentBowlContext = React.createContext({
  currentBowl: {
    tobacco1: '',
    percent1: 0,
    tobacco2: '',
    percent2: 0,
    tobacco3: '',
    percent3: 0,
    tobacco4: '',
    percent4: 0,
    tobacco5: '',
    percent5: 0
  },
  setCurrentBowl: () => {}
});

export default CurrentBowlContext;