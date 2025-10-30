import { describe, it, expect } from 'vitest'
import { toSlide } from '../../../../src/presentation/features/home/mappers/notificationCarouselMapper'
import type { INotificationCarousel } from '../../../../src/domain/entities/ISlide'

describe('notificationCarouselMapper.toSlide', () => {
  const base: INotificationCarousel = {
    notificationTypeId: 42,
    slideName: 'promo',
    title: 'Big Sale',
    description: 'Up to 50% off',
    imagenLink: 'https://img/promo.png',
    buttonText: 'Shop',
    buttonLink: 'https://shop',
    dateUpdated: new Date(),
  }

  it('maps to ISlide with CTA when buttonText present', () => {
    const s = toSlide(base)
    expect(s.id).toBe('42')
    expect(s.title).toBe('Big Sale')
    expect(s.imageUrl).toBe('https://img/promo.png')
    expect(s.isActive).toBe(true)
    expect(s.order).toBe(1)
    expect(s.subtitle).toBe('Up to 50% off')
    expect(s.cta?.label).toBe('Shop')
    expect(s.cta?.href).toBe('https://shop')
    expect(s.cta?.target).toBe('_blank')
  })

  it('omits CTA when buttonText is missing', () => {
    const noBtn: INotificationCarousel = { ...base, buttonText: '', buttonLink: '' }
    const s = toSlide(noBtn)
    expect('cta' in s ? s.cta : undefined).toBeUndefined()
  })
})

