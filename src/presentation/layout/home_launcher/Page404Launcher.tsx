import React from 'react'
import { PageError } from '../../components/widgets/page-error/PageError';

export const Page404Launcher: React.FC = () => {

  return (
      <PageError cod='404' error='Página no encontrada' details='La página a la que intentaste acceder no existe o no está disponible.' redirectPath='/' ></PageError>
  )
}
