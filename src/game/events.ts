import type { GameZoneEvent } from '../types/resume'

export const GAME_READY = 'portfolio:game-ready'
export const ZONE_ENTER = 'portfolio:zone-enter'
export const ZONE_EXIT = 'portfolio:zone-exit'
export const LOADING_PROGRESS = 'portfolio:loading-progress'

export function emitZoneEnter(detail: GameZoneEvent) {
  window.dispatchEvent(new CustomEvent(ZONE_ENTER, { detail }))
}

export function emitZoneExit() {
  window.dispatchEvent(new CustomEvent(ZONE_EXIT))
}

export function emitLoadingProgress(progress: number) {
  window.dispatchEvent(new CustomEvent(LOADING_PROGRESS, { detail: progress }))
}

export function emitGameReady() {
  window.dispatchEvent(new CustomEvent(GAME_READY))
}

export function onZoneEnter(handler: (detail: GameZoneEvent) => void) {
  const listener = (e: Event) => handler((e as CustomEvent<GameZoneEvent>).detail)
  window.addEventListener(ZONE_ENTER, listener)
  return () => window.removeEventListener(ZONE_ENTER, listener)
}

export function onZoneExit(handler: () => void) {
  window.addEventListener(ZONE_EXIT, handler)
  return () => window.removeEventListener(ZONE_EXIT, handler)
}

export function onLoadingProgress(handler: (progress: number) => void) {
  const listener = (e: Event) => handler((e as CustomEvent<number>).detail)
  window.addEventListener(LOADING_PROGRESS, listener)
  return () => window.removeEventListener(LOADING_PROGRESS, listener)
}

export function onGameReady(handler: () => void) {
  window.addEventListener(GAME_READY, handler)
  return () => window.removeEventListener(GAME_READY, handler)
}
