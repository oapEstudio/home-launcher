import React from 'react'
import { render } from '../../test-utils'

// Mock all SVG imports used by the module with named components so we can read their function name
vi.mock('../../../src/presentation/components/ui/icons', () => ({
  SVGIcon: ({ icon }: any) => <div data-testid="svg" data-icon={icon?.name || 'unknown'} />,
}))

function makeIcon(name: string) {
  // create a named function to preserve .name
  const fn = { [name]: () => null }[name] as any
  return { default: fn }
}

vi.mock('./../../../public/assets/img/icons/agro.svg?react', () => makeIcon('AgroIcon'))
vi.mock('./../../../public/assets/img/icons/alerta1.svg?react', () => makeIcon('Alerta1'))
vi.mock('./../../../public/assets/img/icons/alerta2.svg?react', () => makeIcon('Alerta2'))
vi.mock('./../../../public/assets/img/icons/apps.svg?react', () => makeIcon('Apps'))
vi.mock('./../../../public/assets/img/icons/aprendizaje_comercial.svg?react', () => makeIcon('AprendizajeComercial'))
vi.mock('./../../../public/assets/img/icons/caida_sistema.svg?react', () => makeIcon('CaidaSistema'))
vi.mock('./../../../public/assets/img/icons/capacitacion_instructivo.svg?react', () => makeIcon('CapacitacionInstructivo'))
vi.mock('./../../../public/assets/img/icons/chatbot.svg?react', () => makeIcon('ChatBot'))
vi.mock('./../../../public/assets/img/icons/cobranzas.svg?react', () => makeIcon('Cobranzas'))
vi.mock('./../../../public/assets/img/icons/descarga.svg?react', () => makeIcon('Descarga'))
vi.mock('./../../../public/assets/img/icons/encuesta.svg?react', () => makeIcon('Encuesta'))
vi.mock('./../../../public/assets/img/icons/facturacion.svg?react', () => makeIcon('Facturacion'))
vi.mock('./../../../public/assets/img/icons/incentivos.svg?react', () => makeIcon('Incentivos'))
vi.mock('./../../../public/assets/img/icons/industria.svg?react', () => makeIcon('Industria'))
vi.mock('./../../../public/assets/img/icons/link.svg?react', () => makeIcon('Link'))
vi.mock('./../../../public/assets/img/icons/logistica.svg?react', () => makeIcon('Logistica'))
vi.mock('./../../../public/assets/img/icons/mantenimiento_programado.svg?react', () => makeIcon('MantenimientoProgramado'))
vi.mock('./../../../public/assets/img/icons/medio_pago.svg?react', () => makeIcon('MedioPago'))
vi.mock('./../../../public/assets/img/icons/operacion_telefonica.svg?react', () => makeIcon('OperacionTelefonica'))
vi.mock('./../../../public/assets/img/icons/pac.svg?react', () => makeIcon('Pac'))
vi.mock('./../../../public/assets/img/icons/pedidos.svg?react', () => makeIcon('Pedidos'))
vi.mock('./../../../public/assets/img/icons/reporte1.svg?react', () => makeIcon('Reporte1'))
vi.mock('./../../../public/assets/img/icons/reporte2.svg?react', () => makeIcon('Reporte2'))
vi.mock('./../../../public/assets/img/icons/satifaccion.svg?react', () => makeIcon('Satifaccion'))
vi.mock('./../../../public/assets/img/icons/user_pass.svg?react', () => makeIcon('UsuarioContrana'))
vi.mock('./../../../public/assets/img/icons/ypf_ruta.svg?react', () => makeIcon('YPFRuta'))

import { selectedIconsNotificationCommon } from '../../../src/presentation/utils/selected-icon-notification-common'
import { screen } from '../../test-utils'

describe('selectedIconsNotificationCommon', () => {
  it('returns corresponding SVGIcon for known id', () => {
    render(<>{selectedIconsNotificationCommon('1')}</>)
    const el = screen.getByTestId('svg')
    expect(el.getAttribute('data-icon')).toBe('AgroIcon')
  })
  it('falls back to Link icon on unknown id', () => {
    render(<>{selectedIconsNotificationCommon('999')}</>)
    const el = screen.getByTestId('svg')
    expect(el.getAttribute('data-icon')).toBe('Link')
  })
})
