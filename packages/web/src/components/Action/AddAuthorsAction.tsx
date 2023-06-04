"use client"
import * as React from "react"
import { useForm } from "react-hook-form"

import { UserDataProps } from "@/lib/data-types"
import { searchUsersAction } from "@/lib/api/server/user"
import { toast } from "../UI/Toast"
import { Button } from "../UI/Button"
import { FormErrorMessage, Input } from "../UI/Form"
import { ScrollArea } from "../UI/ScrollArea"

interface FormValues {
  name: string
  content: string
  excerpt?: string
  meta_title?: string
  meta_description?: string
}

interface AddAuthorsProps extends React.HTMLAttributes<HTMLDivElement> {
  authors: string[]

  addAuthors: React.Dispatch<React.SetStateAction<string[]>>
  selectedAuthors: {
    id: string
    name: string
  }[]
  addSelectedAuthors: React.Dispatch<
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

export function AddAuthorsAction(props: AddAuthorsProps) {
  const { authors, addAuthors, selectedAuthors, addSelectedAuthors } = props

  const [searchResults, setSearchResults] = React.useState<UserDataProps[]>([])
  const [inputValue, setInputValue] = React.useState<string>("")
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({ mode: "all", reValidateMode: "onChange" })

  const assignAuthor = React.useCallback(
    (id: string | never) => {
      const checkedAuthors = [...authors]
      const index = checkedAuthors.indexOf(id as never)
      if (index === -1) {
        checkedAuthors.push(id as never)
      } else {
        checkedAuthors.splice(index, 1)
      }
      addAuthors(checkedAuthors)
    },
    [addAuthors, authors],
  )

  const onSubmit = React.useCallback(
    async (value: FormValues) => {
      const { data } = await searchUsersAction(value.name)
      const searchResult = data?.find(
        (author) =>
          author.name === value.name && author.role === ("ADMIN" || "AUTHOR"),
      )

      if (searchResult) {
        if (
          !selectedAuthors.some((author) => author.name === searchResult.name)
        ) {
          const resultValue = {
            id: searchResult.id,
            name: searchResult.name,
          }

          assignAuthor(searchResult.id)
          addSelectedAuthors((prev) => [...prev, resultValue])
        }
        setInputValue("")
        setSearchResults([])
      } else {
        toast({
          variant: "danger",
          description: "Author not found",
        })
      }
    },
    [addSelectedAuthors, assignAuthor, selectedAuthors],
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
    if (!selectedAuthors.some((author) => author.name === value.name)) {
      setInputValue("")
      setSearchResults([])
      assignAuthor(value.id)
      addSelectedAuthors((prev) => [...prev, value])
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
    const filteredResult = selectedAuthors.filter(
      (item) => item.id !== value.id,
    )

    const filteredData = authors.filter((item) => item !== value.id)
    addSelectedAuthors(filteredResult)
    addAuthors(filteredData)
  }
  return (
    <div>
      <h3 className="text-base">Authors</h3>
      {selectedAuthors.length > 0 && (
        <ScrollArea className="mb-2 mt-2 max-h-72 rounded-md border">
          <div>
            {selectedAuthors.map((author) => {
              return (
                <div
                  className="bg-theme-200 dark:bg-theme-800 flex items-center gap-2 px-2 py-1 text-[14px] text-black dark:text-white"
                  key={author.id}
                >
                  <span>{author.name}</span>
                  <Button
                    disabled={selectedAuthors.length === 1}
                    aria-label="Delete Author"
                    onClick={() => handleRemoveValue(author)}
                    className="h-auto min-w-0 bg-transparent p-0 text-inherit"
                  >
                    <div>
                      <svg
                        height="1em"
                        width="1em"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 1024 1024"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" />
                      </svg>
                    </div>
                  </Button>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      )}
      <div className="border-theme-300 bg-theme-100 dark:border-theme-700 dark:bg-theme-700 rounded-md border">
        <div className="parent-focus flex max-w-[300px] flex-row flex-wrap items-center justify-start gap-2 p-2">
          <Input
            type="text"
            {...register("name", {
              required: selectedAuthors.length === 0 && "Author is Required",
            })}
            className="h-auto w-full min-w-[50px] max-w-full shrink grow basis-0 border-none !bg-transparent p-0 focus:border-none focus:ring-0"
            name="name"
            onKeyDown={handleKeyDown}
            id="searchAuthor"
            value={inputValue}
            placeholder="Find authors"
            onChange={handleSearchChange}
            onSubmit={handleFormSubmit}
          />

          {errors?.name && (
            <FormErrorMessage>{errors.name.message}</FormErrorMessage>
          )}
        </div>
        {searchResults.length > 0 && (
          <ul className="border-theme-300 border-t">
            {searchResults.map((searchAuthor: UserDataProps) => {
              const dataAuthors = {
                id: searchAuthor.id,
                name: searchAuthor.name,
              }
              return (
                <li
                  key={searchAuthor.id}
                  className="hover:bg-theme-500 p-2"
                  onClick={() => handleSelectandAssign(dataAuthors)}
                >
                  {searchAuthor.name}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
