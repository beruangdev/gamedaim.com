"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import NextLink from "next/link"

import { Badge } from "@/components/UI/Badge"
import { Button, IconButton } from "@/components/UI/Button"
import { Icon } from "@/components/UI/Icon"
import { Table, Tbody, Td, Th, Thead, Tr } from "@/components/UI/Table"
import { UserDataProps } from "@/lib/data-types"
import { withAuth } from "@/components/Auth"
import { useGetUsers, useGetUsersCount } from "@/lib/api/client/user"
import { formatDate } from "@/lib/date"
import { handleDeleteUser } from "./actions"

const ActionDashboard = dynamic(() =>
  import("@/components/Action").then((mod) => mod.ActionDashboard),
)

function UsersDashboard() {
  const { users } = useGetUsers()
  const { usersCount } = useGetUsersCount()

  const lastPage = usersCount && Math.ceil(usersCount / 10)

  const [page, setPage] = React.useState<number>(1)

  return (
    <>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <NextLink href="/dashboard/user/new">
            <Button variant="ghost">
              <Icon.Add />
              Add New
            </Button>
          </NextLink>
        </div>
      </div>
      <div className="mb-[80px] mt-6 rounded">
        {users !== undefined && users.length > 0 ? (
          <>
            <Table className="table-fixed border-collapse border-spacing-0">
              <Thead>
                <Tr isTitle>
                  <Th>Username</Th>
                  <Th>Name</Th>
                  <Th className="hidden md:table-cell">Email</Th>
                  <Th>Role</Th>
                  <Th className="hidden md:table-cell">Date Joined</Th>
                  <Th align="center">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.map((user: UserDataProps) => (
                  <Tr key={user.id}>
                    <Td className="line-clamp-3 max-w-[120px]">
                      <div className="flex">
                        <span className="font-medium">{user.username}</span>
                      </div>
                    </Td>
                    <Td className="white-space-nowrap">
                      <div className="flex">
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </Td>
                    <Td className="hidden whitespace-nowrap md:table-cell">
                      <div className="flex">
                        <span className="font-medium">{user.email}</span>
                      </div>
                    </Td>
                    <Td className="whitespace-nowrap">
                      <div className="flex">
                        <span className="font-medium">
                          <Badge>{user.role}</Badge>
                        </span>
                      </div>
                    </Td>
                    <Td className="hidden md:table-cell">
                      {formatDate(user.createdAt, "LL")}
                    </Td>
                    <Td align="right">
                      <ActionDashboard
                        viewLink={`/user/${user.username}`}
                        onDelete={() => {
                          handleDeleteUser(user.id)
                        }}
                        editLink={`/dashboard/user/${user.id}`}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            {page && (
              <div className="align-center mt-2 flex items-center justify-center space-x-2">
                <>
                  {page !== 1 && (
                    <IconButton
                      variant="ghost"
                      onClick={() => setPage((old) => Math.max(old - 1, 0))}
                      disabled={page === 1}
                      className="rounded-full px-0"
                    >
                      <Icon.ChevronLeft />
                    </IconButton>
                  )}
                  {usersCount === false && page !== lastPage && (
                    <IconButton
                      variant="ghost"
                      onClick={() => {
                        setPage((old) => old + 1)
                      }}
                      className="rounded-full px-0"
                    >
                      <Icon.ChevronRight />
                    </IconButton>
                  )}
                </>
              </div>
            )}
          </>
        ) : (
          <div className="my-48 flex items-center justify-center">
            <h3 className="text-center text-4xl font-bold">Users Not found</h3>
          </div>
        )}
      </div>
    </>
  )
}

export default withAuth(UsersDashboard, "admin")
