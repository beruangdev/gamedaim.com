"use client"

import * as React from "react"
import { useForm } from "react-hook-form"

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  RequiredIndicator,
} from "@/components/UI/Form"
import { toast } from "@/components/UI/Toast"
import { Table, Tbody, Td, Th, Thead, Tr } from "@/components/UI/Table"
import { Button } from "@/components/UI/Button"
import { Modal } from "@/components/Modal"
import { ScrollArea } from "@/components/UI/ScrollArea"
import { Icon } from "@/components/UI/Icon"

import { MenuDataProps, MenuLocation } from "@/lib/data-types"
import { postMenu, putMenu } from "@/lib/api/server/menu"

interface MenuContentProps {
  initialMenus: MenuDataProps[] | null
  location: MenuLocation
}

export const MenuContent = (props: MenuContentProps) => {
  const { initialMenus, location } = props
  const [menus, setMenus] = React.useState<MenuDataProps[]>(
    initialMenus ? [...initialMenus] : [],
  )
  const [openNewForm, setOpenNewForm] = React.useState(false)
  const [openEditForm, setOpenEditForm] = React.useState<string | null>(null)
  const title = location.replace(/_/g, " ")
  return (
    <div className="min-h-screen px-2 py-5">
      <h1 className="mb-4">{title}</h1>
      <Modal
        content={
          <ScrollArea className="h-[80vh]">
            <div className="px-4">
              <FormSubmit location={location} setMenus={setMenus} />
            </div>
          </ScrollArea>
        }
        title={"Add Menu"}
        trigger={
          <Button type="button" onClick={() => setOpenNewForm(true)}>
            Add Menu
          </Button>
        }
        onOpenChange={setOpenNewForm}
        open={openNewForm}
      />
      <div>
        {menus && menus.length > 0 ? (
          <>
            <Table className="!table-fixed border-collapse border-spacing-0">
              <Thead>
                <Tr isTitle>
                  <Th>Title</Th>
                  <Th>Link</Th>
                  <Th>Active</Th>
                  <Th>Icon</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {menus.map((menu) => (
                  <Tr key={menu.id}>
                    <Td className="line-clamp-3 max-w-[120px]">
                      <div className="flex">
                        <span className="font-medium">{menu.title}</span>
                      </div>
                    </Td>
                    <Td>{menu.link}</Td>
                    <Td>{menu.active ? "Yes" : "No"}</Td>
                    <Td>{menu.icon}</Td>
                    <Td>
                      <Modal
                        content={
                          <ScrollArea className="h-[80vh]">
                            <div className="px-4">
                              <FormEdit
                                location={location}
                                setMenus={setMenus}
                                menus={menus}
                                menu={menu}
                                id={menu.id}
                              />
                            </div>
                          </ScrollArea>
                        }
                        title={"Edit Menu"}
                        trigger={
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpenEditForm(menu.id as string)}
                          >
                            <Icon.Edit />
                          </Button>
                        }
                        onOpenChange={(isOpen) => {
                          if (!isOpen) {
                            setOpenEditForm(null)
                          }
                        }}
                        open={openEditForm === (menu.id as string)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </>
        ) : (
          <div className="my-48 flex items-center justify-center">
            <h3 className="text-center font-bold">No Menus</h3>
          </div>
        )}
      </div>
    </div>
  )
}
interface FormSubmitProps {
  location: MenuLocation
  setMenus: (value: React.SetStateAction<MenuDataProps[]>) => void
}

const FormSubmit = (props: FormSubmitProps) => {
  const { location, setMenus } = props
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MenuDataProps>({ defaultValues: { location: location } })

  const onSubmit = async (data: MenuDataProps) => {
    const { data: newMenu, error } = await postMenu(data)

    if (newMenu) {
      reset()
      setMenus((prevMenus) => [...prevMenus, newMenu])
      toast({ variant: "success", description: "Menu Successfully Created" })
    } else {
      toast({ variant: "danger", description: error })
    }
  }

  return (
    <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
      <FormControl invalid={Boolean(errors.title)}>
        <FormLabel>
          Title
          <RequiredIndicator />
        </FormLabel>
        <Input
          type="text"
          {...register("title", {
            required: "Title is Required",
          })}
          id="title-menu"
          className="max-w-xl"
          placeholder="Enter Title"
        />
        {errors?.title && (
          <FormErrorMessage>{errors.title.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl invalid={Boolean(errors.link)}>
        <FormLabel>
          Link
          <RequiredIndicator />
        </FormLabel>
        <Input
          type="text"
          {...register("link", {
            required: "Link is required",
            pattern: {
              value: /^(http|https):\/\/[^ "]+$/,
              message: "Invalid link format",
            },
          })}
          id="link-menu"
          className="max-w-xl"
          placeholder="https://domain.com/path"
        />
        {errors?.link && (
          <FormErrorMessage>{errors.link.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl invalid={Boolean(errors.order)}>
        <FormLabel>
          Order
          <RequiredIndicator />
        </FormLabel>
        <Input
          type="number"
          {...register("order", {
            required: "Order is Required",
          })}
          id="order-menu"
          className="max-w-xl"
          placeholder="Enter Order"
        />
        {errors?.order && (
          <FormErrorMessage>{errors.order.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl invalid={Boolean(errors.icon)}>
        <FormLabel>
          Icon
          <RequiredIndicator />
        </FormLabel>
        <Input
          type="text"
          {...register("icon", {
            required: "Icon is Required",
          })}
          className="max-w-xl"
          placeholder="Enter Icon"
        />
        {errors?.icon && (
          <FormErrorMessage>{errors.icon.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl invalid={Boolean(errors.active)}>
        <FormLabel>
          Active
          <RequiredIndicator />
        </FormLabel>
        <Input
          type="checkbox"
          {...register("active", {
            required: "Active is Required",
          })}
          placeholder="Enter Active"
        />
        {errors?.active && (
          <FormErrorMessage>{errors.active.message}</FormErrorMessage>
        )}
      </FormControl>
      <Button type="submit">Add Menu</Button>
    </form>
  )
}

interface FormEditProps {
  location: MenuLocation
  setMenus: (value: React.SetStateAction<MenuDataProps[]>) => void
  id?: string
  menus: MenuDataProps[]
  menu?: MenuDataProps
}

const FormEdit = (props: FormEditProps) => {
  const { location, setMenus, id, menu } = props
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MenuDataProps>({ defaultValues: { location: location } })

  React.useEffect(() => {
    if (menu) reset(menu)
  }, [menu])

  const onEdit = async (data: MenuDataProps) => {
    const { data: editedMenu, error } = await putMenu(id as string, data)
    if (editedMenu) {
      toast({ variant: "success", description: "Menu has been edited" })
      setMenus((prevMenus) =>
        prevMenus.map((prevMenu) => {
          if (prevMenu.id === id && editedMenu) {
            return editedMenu
          }
          return prevMenu
        }),
      )
    } else {
      toast({ variant: "danger", description: error })
    }
  }

  return (
    <form className="space-y-2" onSubmit={handleSubmit(onEdit)}>
      <FormControl invalid={Boolean(errors.title)}>
        <FormLabel>
          Title
          <RequiredIndicator />
        </FormLabel>
        <Input
          type="text"
          {...register("title", {
            required: "Title is Required",
          })}
          id="title-menu"
          className="max-w-xl"
          placeholder="Enter Title"
        />
        {errors?.title && (
          <FormErrorMessage>{errors.title.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl invalid={Boolean(errors.link)}>
        <FormLabel>
          Link
          <RequiredIndicator />
        </FormLabel>
        <Input
          type="text"
          {...register("link", {
            required: "Link is required",
            pattern: {
              value: /^(http|https):\/\/[^ "]+$/,
              message: "Invalid link format",
            },
          })}
          id="link-menu"
          className="max-w-xl"
          placeholder="https://domain.com/path"
        />
        {errors?.link && (
          <FormErrorMessage>{errors.link.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl invalid={Boolean(errors.order)}>
        <FormLabel>
          Order
          <RequiredIndicator />
        </FormLabel>
        <Input
          type="number"
          {...register("order", {
            required: "Order is Required",
          })}
          id="order-menu"
          className="max-w-xl"
          placeholder="Enter Order"
        />
        {errors?.order && (
          <FormErrorMessage>{errors.order.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl invalid={Boolean(errors.icon)}>
        <FormLabel>
          Icon
          <RequiredIndicator />
        </FormLabel>
        <Input
          type="text"
          {...register("icon", {
            required: "Icon is Required",
          })}
          className="max-w-xl"
          placeholder="Enter Icon"
        />
        {errors?.icon && (
          <FormErrorMessage>{errors.icon.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl invalid={Boolean(errors.active)}>
        <FormLabel>
          Active
          <RequiredIndicator />
        </FormLabel>
        <Input
          type="checkbox"
          {...register("active", {
            required: "Active is Required",
          })}
          placeholder="Enter Active"
        />
        {errors?.active && (
          <FormErrorMessage>{errors.active.message}</FormErrorMessage>
        )}
      </FormControl>
      <Button type="submit">Add Menu</Button>
    </form>
  )
}
