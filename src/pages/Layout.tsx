import { FC } from 'react'
import { HeaderComponent } from '@/components/Header'
import { Outlet } from 'react-router-dom'
import { FooterComponent } from '@/components/Footer'
import ModalErrorTailwind from '@/components/ui/ModalErrorTailwind'
import ModalSucessTailwind from '@/components/ui/ModalSucessTailwind'
import { useAppStore } from '@/stores/appStore'

export const LayoutPage: FC = () => {
  const {
    successModalData,
    errorModalData,
    openErrorModal,
    setOpenErrorModal,
    openSucessModal,
    setOpenSucessModal,
  } = useAppStore()
  return (
    <div>
      <HeaderComponent />
      <main>
        <Outlet />
      </main>
      <FooterComponent />
      <ModalErrorTailwind
        open={openErrorModal}
        setOpen={setOpenErrorModal}
        title={errorModalData.title}
        message={errorModalData.message}
      />
      <ModalSucessTailwind
        open={openSucessModal}
        setOpen={setOpenSucessModal}
        title={successModalData.title}
        message={successModalData.message}
      />
    </div>
  )
}
