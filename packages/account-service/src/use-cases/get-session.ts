import { sessionRepo } from '../repositories'
import { LoginSession } from '@buy1s/account-entity'
import { BusinessError } from '../error-handler'

export async function getSession(
  ip: string,
  userAgent: string
): Promise<LoginSession> {
  const session = await sessionRepo.get(ip, userAgent)

  if(!session) throw new BusinessError('User has not logged in yet')
  return session
}
