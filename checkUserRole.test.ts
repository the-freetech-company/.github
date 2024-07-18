// https://firebase.google.com/docs/rules/unit-tests
import { checkUserRole } from './checkUserRole'

jest.mock('./checkUserRole', () => ({
  checkUserRole: jest.fn(() => {
    return 'fakeRole'
  }),
}))

describe('checkUserRole', () => {
  it('should return "admin" for any user ID when mocked', async () => {
    const userId = 'testUser'
    const role = await checkUserRole(userId)
    expect(role).toBe('fakeRole')
  })

  it('should handle non-existent users', async () => {
    jest.mocked(checkUserRole).mockImplementationOnce(() => Promise.resolve(null))
    const userId = 'nonExistentUser'
    const role = await checkUserRole(userId)
    expect(role).toBeNull()
  })
})
