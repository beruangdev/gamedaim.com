import { FastifyReply, FastifyRequest } from "fastify"

import { comparePassword } from "../../utils/password"
import { CreateUserInput, LoginInput, UpdateUserInput } from "./user.schema"
import {
  createUser,
  deleteUserById,
  getUserByEmail,
  getUserById,
  getUserByUsername,
  getUsers,
  updateUser,
  getTotalUsers,
  searchUsers,
  getUserByUsernameAndGetArticles,
} from "./user.service"

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
