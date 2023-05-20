import { UserRole } from "@prisma/client"

import db from "@/utils/db"
import { hashPassword } from "@/utils/password"
import { CreateUserInput, UpdateUserInput } from "./user.schema"

export async function createUser(input: CreateUserInput) {
  const { password, ...rest } = input
  const hashedPassword = hashPassword(password)

  return await db.user.create({
    data: { ...rest, password: hashedPassword },
  })
}

export async function updateUser(userId: string, data: UpdateUserInput) {
  return await db.user.update({
    where: { id: userId },
    data,
  })
}

export async function deleteUserById(userId: string) {
  return await db.user.delete({
    where: {
      id: userId,
    },
  })
}

export async function getUserByEmail(email: string) {
  return await db.user.findUnique({
    where: {
      email,
    },
  })
}

export async function getUserByUsername(username: string) {
  return await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
      metaTitle: true,
      metaDescription: true,
      phoneNumber: true,
      about: true,
      role: true,
      profilePicture: {
        select: {
          url: true,
        },
      },
      createdAt: true,
    },
  })
}

export async function getUserByUsernameAndGetArticles(
  username: string,
  userPage: number,
  perPage: number,
) {
  return await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      username: true,
      name: true,
      metaTitle: true,
      metaDescription: true,
      profilePicture: {
        select: {
          url: true,
        },
      },
      articleAuthors: {
        skip: (userPage - 1) * perPage,
        take: perPage,
        orderBy: {
          updatedAt: "desc",
        },
        select: {
          id: true,
          title: true,
          excerpt: true,
          slug: true,
          featuredImage: {
            select: {
              url: true,
            },
          },
        },
      },
      _count: {
        select: {
          articleAuthors: true,
        },
      },
    },
  })
}

export async function getUserById(userId: string) {
  return await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
      metaTitle: true,
      metaDescription: true,
      phoneNumber: true,
      about: true,
      role: true,
      profilePicture: {
        select: {
          id: true,
          url: true,
        },
      },
    },
  })
}

export async function getUsers(userPage: number, perPage: number) {
  return await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip: (userPage - 1) * perPage,
    take: perPage,
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
      role: true,
      createdAt: true,
    },
  })
}

export async function getUsersByRole(
  userRole: UserRole,
  userPage: number,
  perPage: number,
) {
  return await db.user.findMany({
    where: {
      role: userRole,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: (userPage - 1) * perPage,
    take: perPage,
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
      role: true,
      createdAt: true,
    },
  })
}

export async function getTotalUsers() {
  return await db.user.count()
}

export async function searchUsers(searchUserQuery: string) {
  return await db.user.findMany({
    where: {
      OR: [
        {
          email: {
            search: searchUserQuery.split(" ").join(" & "),
          },
          name: {
            search: searchUserQuery.split(" ").join(" & "),
          },
          username: {
            search: searchUserQuery.split(" ").join(" & "),
          },
        },
      ],
    },
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
      role: true,
      createdAt: true,
    },
  })
}
