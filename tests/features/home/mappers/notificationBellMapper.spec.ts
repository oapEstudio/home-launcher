import { describe, it, expect } from 'vitest'
import { mapCommonToGroups } from '../../../../src/presentation/features/home/mappers/notificationBellMapper'
import type { INotificationCommon } from '../../../../src/domain/entities/INotificationCommon'

const make = (over: Partial<INotificationCommon>): INotificationCommon => ({
  notificationTypeId: 1,
  name: 'n',
  title: 't',
  buttonText: 'Open',
  buttonLink: 'example.com',
  description: 'd',
  notificationCommonTypeId: 99,
  notificationCommonType: 'type',
  dateUpdated: new Date(),
  read: false,
  ...over,
})

describe('notificationBellMapper.mapCommonToGroups', () => {
  it('groups by day relative to now and normalizes URL when coerceHttps', () => {
    const now = new Date('2025-01-15T12:00:00Z')
    const today = make({ title: 'today', dateUpdated: new Date('2025-01-15T08:00:00Z') })
    const yesterday = make({ title: 'yesterday', dateUpdated: new Date('2025-01-14T23:59:00Z') })
    const older = make({ title: 'older', dateUpdated: new Date('2025-01-10T12:00:00Z') })

    const groups = mapCommonToGroups([older, yesterday, today], { tz: 'UTC', now, coerceHttps: true })
    expect(groups.today.length).toBe(1)
    expect(groups.yesterday.length).toBe(1)
    expect(groups.others.length).toBe(1)
    // cta normalized
    expect(groups.today[0].cta?.href).toBe('https://example.com')
  })

  it('keeps buttonLink when already absolute and uses name when title missing', () => {
    const now = new Date('2025-01-15T12:00:00Z')
    const n = make({ title: '', name: 'fallback', buttonLink: 'http://abc.com', dateUpdated: now })
    const groups = mapCommonToGroups([n], { tz: 'UTC', now, coerceHttps: true })
    expect(groups.today[0].title).toBe('fallback')
    expect(groups.today[0].cta?.href).toBe('http://abc.com')
  })
})

