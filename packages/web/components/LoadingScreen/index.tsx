import Logo from '@web/components/svg/Logo.svg'
import { useLoadingScreen } from '@web/hooks/useLoadingScreen'

import React from 'react'

import style from './index.module.scss'

type ContainerProps = {
  className?: string
}

const Presenter: React.FC<PresenterProps<typeof Container>> = ({
  className,
  isLoading,
  message,
}) =>
  isLoading ? (
    <div className={`${className} ${style['screen']}`}>
      <div className={style['logo']}>
        <Logo />
        <div className={style['smokes']}>
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className={`${style['smoke']} ${style['smoke-' + (i + 1)]}`}
            ></span>
          ))}
        </div>
      </div>
      <div className={style['message']}>{message}</div>
    </div>
  ) : null

const Container = (props: ContainerProps) => {
  const { isLoading, message } = useLoadingScreen()

  const presenterProps = {
    isLoading,
    message,
  }
  return { ...props, ...presenterProps }
}

export default function LoadingScreen(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
