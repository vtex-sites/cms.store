import { Component } from 'react'
import type { ErrorInfo } from 'react'

const getReloads = () =>
  Number(window.sessionStorage.getItem('store:reloads') ?? '0')

const setReloads = (reloads: number) =>
  window.sessionStorage.setItem('store:reloads', `${reloads}`)

const canRecover = () => getReloads() < 2

const isFrameworkLevelError = (error: Error) => error?.name === 'ChunkLoadError'

window.setInterval(() => setReloads(0), 30e3)

class ErrorBoundary extends Component {
  public state = { hasError: false, error: null }

  public static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error,
    }
  }

  public componentDidCatch(error: any, errorInfo: ErrorInfo) {
    console.error(`React Error: ${error.message} ${errorInfo.componentStack}`)

    const errorId = 'unknown'

    // prevent infinite loop
    if (
      window.location.pathname.startsWith('/404') ||
      window.location.pathname.startsWith('/500') ||
      window.location.pathname.startsWith('/offline')
    ) {
      return
    }

    const from = encodeURIComponent(window.location.pathname)

    const isOffline = !window.navigator.onLine
    const is404 = error?.extensions?.exception?.status === 404

    if (isFrameworkLevelError(error) && canRecover()) {
      setReloads(getReloads() + 1)
      window.location.reload()
    } else if (isOffline) {
      window.location.href = `/offline?from=${from}`
    } else if (is404) {
      window.location.href = `/404?from=${from}`
    } else {
      window.location.href = `/500?from=${from}&errorId=${errorId}`
    }
  }

  public render() {
    if (this.state.hasError && process.env.NODE_ENV === 'production') {
      return null
    }

    return this.props.children
  }
}

export default ErrorBoundary
