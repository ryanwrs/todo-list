import React from 'react'

export function useEscapeKey  (visible:boolean, onClose: () => void)  {

  React.useEffect(() => {
    if(!visible ) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    }
  },[visible,onClose])


}

  