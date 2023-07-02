import { FastifyReply, FastifyRequest } from "fastify"
import { UserRole } from "@prisma/client"

import { comparePassword, hashPassword } from "@/utils/password"
import { CreateUserInput, LoginInput, UpdateUserInput } from "./user.schema"
import {
  createUser,
  createUserPasswordResetRequest,
  deleteUserById,
  deleteUserPasswordResetRequest,
  getTotalUsers,
  getUserByEmail,
  getUserById,
  getUserByUsername,
  getUserByUsernameAndGetArticles,
  getUserByUsernameAndGetDownloads,
  getUserPasswordResetRequest,
  getUserPasswordResetRequestByToken,
  getUsers,
  getUsersByRole,
  searchUsers,
  updateUser,
  updateUserPassword,
} from "./user.service"
import { sendVerificationCodeEmail } from "@/utils/nodemailer"
import { diffForHuman } from "@/utils/time"
import { OAuth2Client, TokenPayload } from "google-auth-library"
import env from "env"
const googleClient = new OAuth2Client({
  clientId: env.GOOGLE_CLIENT_ID,
  clientSecret: env.GOOGLE_CLIENT_SECRET,
  redirectUri: env.GOOGLE_OAUTH_REDIRECT_URL,
})

export async function registerUserHandler(
  request: FastifyRequest<{
    Body: CreateUserInput
  }>,
  reply: FastifyReply,
) {
  try {
    const {
      email,
      username,
      name,
      password,
      metaTitle,
      metaDescription,
      phoneNumber,
      profilePictureId,
      about,
      role,
    } = request.body

    const emailExist = await getUserByEmail(email)
    if (emailExist) {
      return reply.code(401).send({
        message: "Email is taken",
      })
    }

    const usernameExist = await getUserByUsername(username)
    if (usernameExist) {
      return reply.code(401).send({
        message: "Username is already exist",
      })
    }

    const generatedMetaTitle = !metaTitle ? name : metaTitle
    const generatedMetaDescription = !metaDescription ? about : metaDescription

    const user = await createUser({
      email,
      username,
      name,
      password,
      metaTitle: generatedMetaTitle,
      metaDescription: generatedMetaDescription,
      phoneNumber,
      profilePictureId,
      about,
      role,
    })
    return reply.code(201).send(user)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function loginHandler(
  request: FastifyRequest<{
    Body: LoginInput
  }>,
  reply: FastifyReply,
) {
  try {
    const { email, password } = request.body

    const user = await getUserByEmail(email)

    if (!user) {
      return reply.code(401).send({
        message: "Invalid email or password",
      })
    }

    const correctPassword = comparePassword(password, user.password)

    if (!correctPassword) {
      return reply.code(401).send({
        message: "Invalid email or password",
      })
    }

    const accessToken = request.jwt.sign(user, {
      expiresIn: "7d",
    })

    return { user, accessToken }
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function loginGoogleHandler(
  request: FastifyRequest<{
    Body: {
      code: string
    }
    Querystring: { code: string; state: string }
  }>,
  reply: FastifyReply,
) {
  const { code, state } = request.query

  try {
    const token = await googleClient.getToken(code)
    const ticket = await googleClient.verifyIdToken({
      idToken: token.tokens.id_token as string,
      audience: env.GOOGLE_CLIENT_ID,
    })
    const payload: TokenPayload | undefined = ticket.getPayload()
    const email = payload?.email ?? ""
    const name = payload?.name ?? ""

    let user = await getUserByEmail(email)

    if (!user) {
      const username = email.split("@")[0]
      const usernameExist = await getUserByUsername(username)
      if (usernameExist) {
        return reply.code(401).send({
          message: "Username is already exist",
        })
      }

      user = await createUser({
        email,
        username,
        name,
        password: "",
      })
    }

    const accessToken = request.jwt.sign(user, {
      expiresIn: "7d",
    })

    if (request.method == "GET") {
      return reply.redirect(state)
    }
    return { user, accessToken }
  } catch (error) {
    console.log(error)
    return reply.code(500).send(error)
  }
}

export async function loginFacebookHandler(
  request: FastifyRequest<{
    Body: {
      code: string
    }
    Querystring: { code: string }
  }>,
  reply: FastifyReply,
) {
  const { code } = request.query

  try {
    const options = {
      client_id: env.FACEBOOK_CLIENT_ID,
      client_secret: env.FACEBOOK_CLIENT_SECRET,
      redirect_uri: env.FACEBOOK_OAUTH_REDIRECT_URL,
      code,
    }
    const queryString: URLSearchParams = new URLSearchParams(options)
    const res_token = await fetch(
      `https://graph.facebook.com/v17.0/oauth/access_token?${queryString}`,
    )
    const data_token = await res_token.json()
    const access_token = data_token.access_token
    const res = await fetch(
      `https://graph.facebook.com/v17.0/me?fields=name,email&access_token=${access_token}`,
    )
    const { name, email } = await res.json()

    let user = await getUserByEmail(email)

    if (!user) {
      const username = email.split("@")[0]
      const usernameExist = await getUserByUsername(username)
      if (usernameExist) {
        return reply.code(401).send({
          message: "Username is already exist",
        })
      }

      user = await createUser({
        email,
        username,
        name,
        password: "",
      })
    }

    const accessToken = request.jwt.sign(user, {
      expiresIn: "7d",
    })

    if (request.method == "GET") {
      const redirect_uri =
        env.NODE_ENV == "production" ? "/" : "http://global.localhost:3000/"
      return reply.redirect(redirect_uri)
    }

    return { user, accessToken }
  } catch (error) {
    console.log(error)
    return reply.code(500).send(error)
  }
}

export async function validityTokenHandler(
  request: FastifyRequest<{
    Body: {
      token: string
    }
  }>,
  reply: FastifyReply,
) {
  const { token } = request.body

  try {
    const userPasswordResetRequestByToken =
      await getUserPasswordResetRequestByToken({
        token,
      })

    if (!userPasswordResetRequestByToken) {
      return reply.code(401).send({
        message: "Invalid token",
      })
    }

    const fifteenMinutesAgo = new Date()
    fifteenMinutesAgo.setMinutes(fifteenMinutesAgo.getMinutes() - 15000)

    if (userPasswordResetRequestByToken.createdAt < fifteenMinutesAgo) {
      const expiredMessage = `Token is expired ${diffForHuman(
        userPasswordResetRequestByToken.createdAt,
      )}. Please request a new one`
      return reply.code(401).send({
        message: expiredMessage,
      })
    }

    return reply.code(200).send(userPasswordResetRequestByToken)
  } catch (error) {
    console.log(error)
    return reply.code(500).send(error)
  }
}

export async function resetPasswordHandler(
  request: FastifyRequest<{
    Body: {
      token: string
      password: string
    }
  }>,
  reply: FastifyReply,
) {
  const { token, password } = request.body

  try {
    const userPasswordResetRequestByToken =
      await getUserPasswordResetRequestByToken({
        token,
      })

    if (!userPasswordResetRequestByToken) {
      return reply.code(401).send({
        message: "Invalid token",
      })
    }

    const fifteenMinutesAgo = new Date()
    fifteenMinutesAgo.setMinutes(fifteenMinutesAgo.getMinutes() - 15000)

    if (userPasswordResetRequestByToken.createdAt < fifteenMinutesAgo) {
      const expiredMessage = `Token is expired ${diffForHuman(
        userPasswordResetRequestByToken.createdAt,
      )}. Please request a new one`
      return reply.code(401).send({
        message: expiredMessage,
      })
    }

    const hashedPassword = hashPassword(password)
    const user = await updateUserPassword(
      userPasswordResetRequestByToken.userId,
      hashedPassword,
    )
    return reply.code(200).send(user)
  } catch (error) {
    console.log(error)
    return reply.code(500).send(error)
  }
}
export async function sendVerificationCodeHandler(
  request: FastifyRequest<{
    Body: {
      email: string
      baseURL: string
    }
  }>,
  reply: FastifyReply,
) {
  const { email, baseURL } = request.body

  const user = await getUserByEmail(email)
  if (!user) {
    return reply.code(401).send({
      message: "Invalid email",
    })
  }

  const GetUserPasswordResetRequest = await getUserPasswordResetRequest({
    userId: user.id,
  })

  const fifteenMinutesAgo = new Date()
  fifteenMinutesAgo.setMinutes(fifteenMinutesAgo.getMinutes() - 15)
  if (
    GetUserPasswordResetRequest &&
    GetUserPasswordResetRequest?.createdAt < fifteenMinutesAgo
  ) {
    deleteUserPasswordResetRequest({
      userId: user.id,
    })
  }

  const CreateUserPasswordResetRequest = await createUserPasswordResetRequest({
    userId: user.id,
  })

  try {
    const SendVerificationCodeEmail = await sendVerificationCodeEmail({
      to: email,
      token: CreateUserPasswordResetRequest.token,
      baseURL,
    })
    return reply
      .code(201)
      .send({ CreateUserPasswordResetRequest, SendVerificationCodeEmail })
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function updateUserHandler(
  request: FastifyRequest<{
    Params: { userId: string }
    Body: UpdateUserInput
  }>,
  reply: FastifyReply,
) {
  try {
    const {
      email,
      username,
      name,
      metaTitle,
      metaDescription,
      phoneNumber,
      profilePictureId,
      about,
    } = request.body

    const user = request.user
    const userId = request.params.userId

    if (user.id !== userId) {
      return reply
        .code(403)
        .send({ message: "You only can update your account" })
    }

    // TODO: check username and email if already exist

    // const emailExist = await findUserByEmail(body.email)
    // if (emailExist) {
    //   return reply.code(401).send({
    //     message: "Email is taken",
    //   })
    // }
    //
    // const usernameExist = await findUserByUsername(body.username)
    // if (usernameExist) {
    //   return reply.code(401).send({
    //     message: "Username is already exist",
    //   })
    // }

    const updatedUser = await updateUser(userId, {
      email,
      username,
      name,
      metaTitle,
      metaDescription,
      phoneNumber,
      profilePictureId,
      about,
    })

    return reply.code(201).send(updatedUser)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function updateUserByAdminHandler(
  request: FastifyRequest<{
    Params: { userId: string }
    Body: UpdateUserInput
  }>,
  reply: FastifyReply,
) {
  try {
    const {
      email,
      username,
      name,
      metaTitle,
      metaDescription,
      phoneNumber,
      profilePictureId,
      role,
      about,
    } = request.body
    const user = request.user
    const userId = request.params.userId

    if (user.role !== "ADMIN") {
      return reply
        .code(403)
        .send({ message: "You only can update your account" })
    }

    // TODO: check username and email if already exist

    // const emailExist = await findUserByEmail(email)
    // if (emailExist) {
    //   return reply.code(401).send({
    //     message: "Email is taken",
    //   })
    // }
    //
    // const usernameExist = await findUserByUsername(username)
    // if (usernameExist) {
    //   return reply.code(401).send({
    //     message: "Username is already exist",
    //   })
    // }

    const updatedUser = await updateUser(userId, {
      email,
      username,
      name,
      metaTitle,
      metaDescription,
      phoneNumber,
      profilePictureId,
      role,
      about,
    })
    return reply.code(201).send(updatedUser)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function deleteUserHandler(
  request: FastifyRequest<{ Params: { userId: string } }>,
  reply: FastifyReply,
) {
  try {
    const { userId } = request.params

    const deleteUser = await deleteUserById(userId)
    return reply.code(201).send(deleteUser)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getUsersHandler(
  request: FastifyRequest<{ Params: { userPage: number } }>,
  reply: FastifyReply,
) {
  try {
    const user = request.user
    const perPage = 10
    const userPage = Number(request.params.userPage || 1)

    if (user.role !== "ADMIN") {
      return reply.code(403).send({ message: "Unauthorized" })
    }

    const users = await getUsers(userPage, perPage)
    return reply.code(201).send(users)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getUsersByRoleHandler(
  request: FastifyRequest<{ Params: { userRole: UserRole; userPage: number } }>,
  reply: FastifyReply,
) {
  try {
    const user = request.user
    const perPage = 10
    const userRole = request.params.userRole
    const userPage = Number(request.params.userPage || 1)

    if (user.role !== "ADMIN") {
      return reply.code(403).send({ message: "Unauthorized" })
    }

    const users = await getUsersByRole(userRole, userPage, perPage)
    return reply.code(201).send(users)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getUserByIdHandler(
  request: FastifyRequest<{
    Params: { userId: string }
  }>,
  reply: FastifyReply,
) {
  try {
    const { userId } = request.params

    const user = await getUserById(userId)
    return reply.code(201).send(user)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getUserByUsernameHandler(
  request: FastifyRequest<{
    Params: { username: string }
  }>,
  reply: FastifyReply,
) {
  try {
    const { username } = request.params

    const user = await getUserByUsername(username)
    return reply.code(201).send(user)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getUserByUsernameAndGetArticlesHandler(
  request: FastifyRequest<{
    Params: { username: string; userPage: number }
  }>,
  reply: FastifyReply,
) {
  try {
    const { username } = request.params

    const perPage = 10
    const userPage = Number(request.params.userPage || 1)

    const user = await getUserByUsernameAndGetArticles(
      username,
      userPage,
      perPage,
    )
    return reply.code(201).send(user)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getUserByUsernameAndGetDownloadsHandler(
  request: FastifyRequest<{
    Params: { username: string; userPage: number }
  }>,
  reply: FastifyReply,
) {
  try {
    const { username } = request.params

    const perPage = 10
    const userPage = Number(request.params.userPage || 1)

    const user = await getUserByUsernameAndGetDownloads(
      username,
      userPage,
      perPage,
    )
    return reply.code(201).send(user)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getTotalUsersHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const user = request.user

    if (user.role !== "ADMIN") {
      return reply.code(403).send({ message: "Unauthorized" })
    }

    const users = await getTotalUsers()
    return reply.code(201).send(users)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function searchUsersHandler(
  request: FastifyRequest<{ Params: { searchUserQuery: string } }>,
  reply: FastifyReply,
) {
  try {
    const searchQuery = request.params.searchUserQuery

    const users = await searchUsers(searchQuery)
    return reply.code(201).send(users)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}
