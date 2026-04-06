import { useEffect, useState } from 'react'
import { CODAR_UNLOCKS_EVENT, readCodarUnlocks } from '../utils/codarUnlockStorage'

export function useCodarUnlocks() {
  const [unlocks, setUnlocks] = useState(readCodarUnlocks)

  useEffect(() => {
    const sync = () => setUnlocks(readCodarUnlocks())
    window.addEventListener(CODAR_UNLOCKS_EVENT, sync)
    return () => window.removeEventListener(CODAR_UNLOCKS_EVENT, sync)
  }, [])

  return unlocks
}
