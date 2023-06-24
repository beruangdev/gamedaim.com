"use client"

import * as React from "react"

import { FormControl, FormLabel, Input } from "@/components/UI/Form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/Select"

interface AddTopUpServerFormProps extends React.HTMLAttributes<HTMLDivElement> {
  brand: string
  addTopUpServer: (value: React.SetStateAction<string>) => void
}

export const AddTopUpServerForm = React.forwardRef<
  HTMLDivElement,
  AddTopUpServerFormProps
>((props, ref) => {
  const { brand, addTopUpServer } = props
  const [queryServerTopUp, setQueryServerTopUp] = React.useState("")

  React.useEffect(() => {
    // Cek apakah ada data query yang tersimpan di local storage saat komponen dimuat
    const savedQuery = localStorage.getItem(`queryServer-${brand}`)
    if (savedQuery) {
      addTopUpServer(savedQuery)
      setQueryServerTopUp(savedQuery)
    }
  }, [addTopUpServer, brand])

  const listTopUpServer = topUpGamesWithServer.find(
    (list) => list.name === brand,
  )

  React.useEffect(() => {
    if (listTopUpServer) {
      addTopUpServer(listTopUpServer.gameServers[0].value)
      setQueryServerTopUp(listTopUpServer.gameServers[0].value)
    }
  }, [addTopUpServer, listTopUpServer])

  const handleChangeSelect = (value: string) => {
    addTopUpServer(value)
    setQueryServerTopUp(value)
    localStorage.setItem(`queryServer-${brand}`, value)
  }

  const handleChangeInput = (event: { target: { value: string } }) => {
    addTopUpServer(event.target.value)
    setQueryServerTopUp(event.target.value)
    localStorage.setItem(`queryServer-${brand}`, event.target.value)
  }

  if (listTopUpServer) {
    return (
      <FormControl ref={ref}>
        <FormLabel>Server</FormLabel>
        <Select onValueChange={handleChangeSelect}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Server" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Server</SelectLabel>
              {listTopUpServer.gameServers.map((list) => {
                return (
                  <>
                    <SelectItem key={list.value} value={list.value}>
                      {list.name}
                    </SelectItem>
                  </>
                )
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </FormControl>
    )
  }
  return (
    <FormControl ref={ref}>
      <FormLabel>Server</FormLabel>
      <Input
        onChange={handleChangeInput}
        type="number"
        value={queryServerTopUp}
        placeholder="Enter Server"
      />
    </FormControl>
  )
})

export const topUpGamesWithServer = [
  {
    name: "Genshin Impact",
    gameServers: [
      { value: "001", name: "Asia" },
      { value: "002", name: "Europe" },
      { value: "003", name: "America" },
      { value: "004", name: "TW, HK, MO" },
    ],
  },
  {
    name: "Tower of Fantasy",
    gameServers: [
      { value: "Phantasia", name: "Southeast Asia-Phantasia" },
      { value: "Mechafield", name: "Southeast Asia-Mechafield" },
      { value: "Ethereal Dream", name: "Southeast Asia-Ethereal Dream" },
      { value: "Odyssey", name: "Southeast Asia-Odyssey" },
      { value: "Aestral-Noa", name: "Southeast Asia-Aestral-Noa" },
      { value: "Osillron", name: "Southeast Asia-Osillron" },
      { value: "Chandra", name: "Southeast Asia-Chandra" },
      { value: "Saeri", name: "Southeast Asia-Saeri" },
      { value: "Aeria", name: "Southeast Asia-Aeria" },
      { value: "Scarlet", name: "Southeast Asia-Scarlet" },
      { value: "Gumi Gumi", name: "Southeast Asia-Gumi Gumi" },
      { value: "Fantasia", name: "Southeast Asia-Fantasia" },
      { value: "Oryza", name: "Southeast Asia-Oryza" },
      { value: "Stardust", name: "Southeast Asia-Stardust" },
      { value: "Arcania", name: "Southeast Asia-Arcania" },
      { value: "Animus", name: "Southeast Asia-Animus" },
      { value: "Mistilteinn", name: "Southeast Asia-Mistilteinn" },
      { value: "Valhalla", name: "Southeast Asia-Valhalla" },
      { value: "Illyrians", name: "Southeast Asia-Illyrians" },
      { value: "Florione", name: "Southeast Asia-Florione" },
      { value: "Oneiros", name: "Southeast Asia-Oneiros" },
      { value: "Famtosyana", name: "Southeast Asia-Famtosyana" },
      { value: "Edenia", name: "Southeast Asia-Edenia" },
    ],
  },
  {
    name: "Ragnarok M: Eternal Love",
    gameServers: [
      { value: "90001", name: "Eternal Love" },
      { value: "90002", name: "Midnight Party" },
      { value: "90002003", name: "Memory of Faith" },
      { value: "90002004", name: "Valhalla Glory" },
    ],
  },
]
