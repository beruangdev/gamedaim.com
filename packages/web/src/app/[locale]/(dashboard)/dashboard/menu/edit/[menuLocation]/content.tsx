"use client"

import * as React from "react"
import { Controller, useForm } from "react-hook-form"

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
import { Modal, ModalSelectMedia } from "@/components/Modal"
import { ScrollArea } from "@/components/UI/ScrollArea"
import { Icon } from "@/components/UI/Icon"
import { Image } from "@/components/Image"
import { Checkbox } from "@/components/UI/Checkbox"

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
              <FormSubmit
                location={location}
                onSuccess={setOpenNewForm}
                setMenus={setMenus}
              />
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
                                onSuccess={setOpenEditForm}
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
  onSuccess: React.Dispatch<React.SetStateAction<boolean>>
}

const FormSubmit = (props: FormSubmitProps) => {
  const { location, setMenus, onSuccess } = props

  const [openModal, setOpenModal] = React.useState<boolean>(false)

  const [selectedIconUrl, setSelectedIconUrl] = React.useState<string>("")
  const handleUpdateMedia = (data: {
    id: React.SetStateAction<string>
    url: React.SetStateAction<string>
  }) => {
    setSelectedIconUrl(data.url)
    toast({ variant: "success", description: "Image has been selected" })
    setOpenModal(false)
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<MenuDataProps>({ defaultValues: { location: location } })

  const onSubmit = async (data: MenuDataProps) => {
    const { data: newMenu, error } = await postMenu({
      ...data,
      icon: selectedIconUrl,
    })

    if (newMenu) {
      reset()
      setMenus((prevMenus) => [...prevMenus, newMenu])
      toast({ variant: "success", description: "Menu Successfully Created" })
      onSuccess(false)
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
        {selectedIconUrl ? (
          <>
            <FormLabel>Icon</FormLabel>
            <ModalSelectMedia
              handleSelectUpdateMedia={handleUpdateMedia}
              open={openModal}
              setOpen={setOpenModal}
              triggerContent={
                <div className="border-muted/30 relative mt-2 aspect-[4/4] h-[50px] cursor-pointer rounded-sm border-2 ">
                  <Image
                    src={selectedIconUrl}
                    className="object-cover"
                    fill
                    alt="Icon"
                    onClick={() => setOpenModal(true)}
                    sizes="(max-width: 768px) 30vw, (max-width: 1200px) 20vw, 33vw"
                  />
                </div>
              }
            />
          </>
        ) : (
          <ModalSelectMedia
            handleSelectUpdateMedia={handleUpdateMedia}
            open={openModal}
            setOpen={setOpenModal}
            triggerContent={
              <>
                <FormLabel>Icon</FormLabel>
                <div
                  onClick={() => setOpenModal(true)}
                  className="bg-muted text-success relative mr-auto flex aspect-[4/4] h-[50px] items-center justify-center"
                >
                  <p>Select Icon</p>
                </div>
              </>
            }
          />
        )}
      </FormControl>
      <FormControl invalid={Boolean(errors.active)}>
        <FormLabel>
          Active
          <RequiredIndicator />
        </FormLabel>
        <Controller
          control={control}
          name="active"
          render={({ field }) => (
            <Checkbox
              checked={field.value}
              onCheckedChange={(value: boolean) => field.onChange(value)}
            />
          )}
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
  onSuccess: React.Dispatch<React.SetStateAction<string | null>>
}

const FormEdit = (props: FormEditProps) => {
  const { location, setMenus, id, menu, onSuccess } = props
  const [openModal, setOpenModal] = React.useState<boolean>(false)

  const [selectedIconUrl, setSelectedIconUrl] = React.useState<string>("")
  const handleUpdateMedia = (data: {
    id: React.SetStateAction<string>
    url: React.SetStateAction<string>
  }) => {
    setSelectedIconUrl(data.url)
    toast({ variant: "success", description: "Image has been selected" })
    setOpenModal(false)
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<MenuDataProps>({ defaultValues: { location: location } })

  React.useEffect(() => {
    if (menu) reset(menu)
  }, [menu])

  const onEdit = async (data: MenuDataProps) => {
    const { data: editedMenu, error } = await putMenu(id as string, {
      ...data,
      icon: selectedIconUrl,
    })
    if (editedMenu) {
      toast({ variant: "success", description: "Menu has been edited" })
      onSuccess(null)
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
        {selectedIconUrl ? (
          <>
            <FormLabel>Icon</FormLabel>
            <ModalSelectMedia
              handleSelectUpdateMedia={handleUpdateMedia}
              open={openModal}
              setOpen={setOpenModal}
              triggerContent={
                <div className="border-muted/30 relative mt-2 aspect-[4/4] h-[50px] cursor-pointer rounded-sm border-2 ">
                  <Image
                    src={selectedIconUrl}
                    className="object-cover"
                    fill
                    alt="Icon"
                    onClick={() => setOpenModal(true)}
                    sizes="(max-width: 768px) 30vw, (max-width: 1200px) 20vw, 33vw"
                  />
                </div>
              }
            />
          </>
        ) : (
          <ModalSelectMedia
            handleSelectUpdateMedia={handleUpdateMedia}
            open={openModal}
            setOpen={setOpenModal}
            triggerContent={
              <>
                <FormLabel>Icon</FormLabel>
                <div
                  onClick={() => setOpenModal(true)}
                  className="bg-muted text-success relative mr-auto flex aspect-[4/4] h-[50px] items-center justify-center"
                >
                  <p>Select Icon</p>
                </div>
              </>
            }
          />
        )}
      </FormControl>
      <FormControl invalid={Boolean(errors.active)}>
        <FormLabel>
          Active
          <RequiredIndicator />
        </FormLabel>
        <Controller
          control={control}
          name="active"
          render={({ field }) => (
            <Checkbox
              checked={field.value}
              onCheckedChange={(value: boolean) => field.onChange(value)}
            />
          )}
        />
        {errors?.active && (
          <FormErrorMessage>{errors.active.message}</FormErrorMessage>
        )}
      </FormControl>
      <Button type="submit">Edit Menu</Button>
    </form>
  )
}
