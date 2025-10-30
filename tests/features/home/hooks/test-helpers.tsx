import React from 'react'
import type { PropsWithChildren } from 'react'
import { DependencyContext, type IDependencies } from '../../../../src/presentation/contexts/DependencyContext'

export function createDeps(overrides: Partial<Record<keyof IDependencies, any>> = {}): IDependencies {
  const dummy = { execute: () => Promise.resolve(undefined) }
  return {
    getNotificationCarousel: overrides.getNotificationCarousel || dummy,
    getMenuesHome: overrides.getMenuesHome || dummy,
    getHighlighteds: overrides.getHighlighteds || dummy,
    getNotificationAlert: overrides.getNotificationAlert || dummy,
    getNotificationCommon: overrides.getNotificationCommon || dummy,
    updateNotificationCommon: overrides.updateNotificationCommon || dummy,
  } as unknown as IDependencies
}

export function withDeps(deps: IDependencies) {
  return function Wrapper({ children }: PropsWithChildren) {
    return (
      <DependencyContext.Provider value={deps}>{children}</DependencyContext.Provider>
    )
  }
}

