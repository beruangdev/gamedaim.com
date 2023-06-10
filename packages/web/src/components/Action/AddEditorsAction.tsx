"use client"
import * as React from "react"
import { useForm } from "react-hook-form"

import { toast } from "@/components/UI/Toast"
import { Button } from "@/components/UI/Button"
import { FormErrorMessage, FormLabel, Input } from "@/components/UI/Form"
import { Icon } from "@/components/UI/Icon"

import { UserDataProps } from "@/lib/data-types"
import { searchUsersAction } from "@/lib/api/server/user"

interface FormValues {
  name: string
  content: string
  excerpt?: string
  meta_title?: string
  meta_description?: string
}

interface AddEditorsProps extends React.HTMLAttributes<HTMLDivElement> {
  editors: string[]

  addEditors: React.Dispatch<React.SetStateAction<string[]>>
  selectedEditors: {
    id: string
    name: string
  }[]
  addSelectedEditors: React.Dispatch<
    React.SetStateAction<
      {
        id: string
        name: string
      }[]
    >
  >
}

interface FormValues {
  name: string
}

export function AddEditorsAction(props: AddEditorsProps) {
  const { editors, addEditors, selectedEditors, addSelectedEditors } = props

  const [searchResults, setSearchResults] = React.useState<UserDataProps[]>([])
  const [inputValue, setInputValue] = React.useState<string>("")
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({ mode: "all", reValidateMode: "onChange" })

  const assignEditor = React.useCallback(
    (id: string | never) => {
      const checkedEditors = [...editors]
      const index = checkedEditors.indexOf(id as never)
      if (index === -1) {
        checkedEditors.push(id as never)
      } else {
        checkedEditors.splice(index, 1)
      }
      addEditors(checkedEditors)
    },
    [addEditors, editors],
  )

  const onSubmit = React.useCallback(
    async (value: FormValues) => {
      const { data } = await searchUsersAction(value.name)
      const searchResult = data?.find(
        (editor) =>
          editor.name === value.name && editor.role === ("ADMIN" || "AUTHOR"),
      )

      if (searchResult) {
        if (
          !selectedEditors.some((editor) => editor.name === searchResult.name)
        ) {
          const resultValue = {
            id: searchResult.id,
            name: searchResult.name,
          }

          assignEditor(searchResult.id)
          addSelectedEditors((prev) => [...prev, resultValue])
        }
        setInputValue("")
        setSearchResults([])
      } else {
        toast({
          variant: "danger",
          description: "Editor not found",
        })
      }
    },
    [addSelectedEditors, assignEditor, selectedEditors],
  )

  const handleFormSubmit = React.useCallback(
    (event: { preventDefault: () => void }) => {
      event.preventDefault()
      setValue("name", inputValue)
      handleSubmit(onSubmit)()
    },
    [handleSubmit, inputValue, onSubmit, setValue],
  )

  const handleKeyDown = (event: {
    key: string
    preventDefault: () => void
  }) => {
    if (event.key === "Enter") {
      setValue("name", inputValue)
      event.preventDefault()
      handleSubmit(onSubmit)()
      setInputValue("")
    }
  }

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setInputValue(e.target.value)
    if (e.target.value.length > 1) {
      const { data } = await searchUsersAction(e.target.value)

      if (data) {
        setSearchResults(data as UserDataProps[])
      }
    } else if (e.target.value.length < 1) {
      setSearchResults([])
    }
  }

  const handleSelectandAssign = (value: { id: string; name: string }) => {
    if (!selectedEditors.some((editor) => editor.name === value.name)) {
      setInputValue("")
      setSearchResults([])
      assignEditor(value.id)
      addSelectedEditors((prev) => [...prev, value])
    } else {
      toast({
        variant: "danger",
        description: value.name + " telah dikirimkan",
      })
      setInputValue("")
      setSearchResults([])
    }
  }

  const handleRemoveValue = (value: { id: string }) => {
    const filteredResult = selectedEditors.filter(
      (item) => item.id !== value.id,
    )

    const filteredData = editors.filter((item) => item !== value.id)
    addSelectedEditors(filteredResult)
    addEditors(filteredData)
  }
  return (
    <div>
      <FormLabel>Editors</FormLabel>

      <div className="border-muted/30 bg-muted/100 rounded-md border">
        <div className="parent-focus flex max-w-[300px] flex-row flex-wrap items-center justify-start gap-2 p-2">
          {selectedEditors.length > 0 &&
            selectedEditors.map((editor) => {
              return (
                <div
                  className="bg-muted/20 text-foreground flex items-center gap-2 px-2 py-1 text-[14px]"
                  key={editor.id}
                >
                  <span>{editor.name}</span>
                  <Button
                    disabled={selectedEditors.length === 1}
                    aria-label="Delete Editor"
                    onClick={() => handleRemoveValue(editor)}
                    className="text-foreground hover:bg-warning h-auto min-w-0 bg-transparent p-0"
                  >
                    <Icon.Close />
                  </Button>
                </div>
              )
            })}
          <Input
            type="text"
            {...register("name", {
              required: selectedEditors.length === 0 && "Editor is Required",
            })}
            className="h-auto w-full min-w-[50px] max-w-full shrink grow basis-0 border-none !bg-transparent p-0 focus:border-none focus:ring-0"
            name="name"
            onKeyDown={handleKeyDown}
            id="searchEditor"
            value={inputValue}
            placeholder="Find editors"
            onChange={handleSearchChange}
            onSubmit={handleFormSubmit}
          />

          {errors?.name && (
            <FormErrorMessage>{errors.name.message}</FormErrorMessage>
          )}
        </div>
        {searchResults.length > 0 && (
          <ul className="border-muted/30 border-t">
            {searchResults.map((searchEditor: UserDataProps) => {
              const dataEditors = {
                id: searchEditor.id,
                name: searchEditor.name,
              }
              return (
                <li
                  key={searchEditor.id}
                  className="hover:bg-muted/500 p-2"
                  onClick={() => handleSelectandAssign(dataEditors)}
                >
                  {searchEditor.name}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
