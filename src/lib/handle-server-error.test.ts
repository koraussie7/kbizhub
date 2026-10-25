import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ApiException } from '@/lib/api-client'
import { handleServerError } from './handle-server-error'

const toastError = vi.hoisted(() => vi.fn())
vi.mock('sonner', () => ({
  toast: {
    error: toastError,
  },
}))

beforeEach(() => {
  vi.mocked(toastError).mockClear()
})

describe('handleServerError', () => {
  it('shows a generic message when the error is not recognised', () => {
    handleServerError(new Error('network'))
    expect(toastError).toHaveBeenCalledWith('Something went wrong!')
  })

  it('maps a plain object with status 204 to the no-content message', () => {
    handleServerError({ status: 204 })
    expect(toastError).toHaveBeenCalledWith('No content.')
  })

  it('prefers the API message when the error is an ApiException with a body', () => {
    handleServerError(new ApiException('Validation failed', 422))
    expect(toastError).toHaveBeenCalledWith('Validation failed')
  })

  it('falls back to the generic message when ApiException has an empty message', () => {
    handleServerError(new ApiException('', 500))
    expect(toastError).toHaveBeenCalledWith('Something went wrong!')
  })

  it('falls back to the HTTP status phrase when ApiException message is whitespace', () => {
    handleServerError(new ApiException('   ', 400))
    expect(toastError).toHaveBeenCalledWith('Something went wrong!')
  })

  it('logs the error to the console in development', () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {})
    const err = new Error('logged')
    handleServerError(err)
    expect(log).toHaveBeenCalledTimes(1)
    expect(log).toHaveBeenCalledWith(err)
    log.mockRestore()
  })

  it('does not log the error to the console in production', () => {
    vi.stubEnv('DEV', false)
    const log = vi.spyOn(console, 'log').mockImplementation(() => {})
    const err = new Error('not logged')
    handleServerError(err)
    expect(log).not.toHaveBeenCalled()
    log.mockRestore()
  })
})
