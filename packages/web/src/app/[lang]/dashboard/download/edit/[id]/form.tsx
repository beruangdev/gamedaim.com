"use client"
import * as React from "react"
import NextImage from "next/image"
import NextLink from "next/link"
import { Controller, useForm } from "react-hook-form"

import { useEditor, EditorContent } from "@tiptap/react"
import { useDisclosure } from "@/hooks/use-disclosure"

import {
  DownloadSchemaData,
  DownloadFileDataProps,
  TopicDataProps,
  UserDataProps,
  LanguageTypeData,
} from "@/lib/data-types"
import { EditorKitExtension, EditorMenu } from "@/components/Editor"
import {
  getDownloadByIdAction,
  postDownloadWithPrimaryAction,
} from "@/lib/api/server/download"
import { toast } from "@/components/UI/Toast"
import { Button } from "@/components/UI/Button"
import { Icon } from "@/components/UI/Icon"
import {
  ActionDashboard,
  AddAuthorsAction,
  AddDownloadFileAction,
  AddTopicsAction,
} from "@/components/Action"
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@/components/UI/Form"
import { ModalSelectMedia } from "@/components/Modal/ModalSelectMedia"
import { Textarea } from "@/components/UI/Textarea"
import { Table, Tbody, Td, Th, Thead, Tr } from "@/components/UI/Table"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/Select"
import { DownloadDashboardContainer } from "../../container"
interface FormValues {
  title: string
  content: string
  excerpt?: string
  metaTitle?: string
  metaDescription?: string
  developer: string
  operatingSystem: string
  license: string
  slug: string
  language: string
  officialWeb: string
  schemaType: DownloadSchemaData | ""
  type: string
}
export const EditDownloadForm = (props: {
  downloadId: string
  lang: LanguageTypeData
}) => {
  const { downloadId, lang } = props
  const { isOpen, onToggle } = useDisclosure()

  const [loading, setLoading] = React.useState<boolean>(false)
  const [openModal, setOpenModal] = React.useState<boolean>(false)
  const [editorContent, setEditorContent] = React.useState<string>("")
  const [topics, setTopics] = React.useState<string[]>([])
  const [authors, setAuthors] = React.useState<string[]>([])
  const [selectedAuthors, setSelectedAuthors] = React.useState<
    { id: string; name: string }[] | []
  >([])
  const [selectedTopics, setSelectedTopics] = React.useState<
    { id: string; title: string }[] | []
  >([])
  const [selectedFeaturedImageId, setSelectedFeaturedImageId] =
    React.useState<string>("")
  const [selectedFeaturedImageUrl, setSelectedFeaturedImageUrl] =
    React.useState<string>("")
  const [selectedDownloadFile, setSelectedDownloadFile] = React.useState<
    DownloadFileDataProps[]
  >([])
  const [selectedDownloadFileId, setSelectedDownloadFileId] = React.useState<
    string[]
  >([])
  const [showAddFiles, setShowAddFiles] = React.useState<boolean>(false)
  const [download, setDownload] = React.useState<FormValues & { id: string }>({
    id: "",
    title: "",
    content: "",
    slug: "",
    excerpt: "",
    language: "",
    metaTitle: "",
    metaDescription: "",
    developer: "",
    operatingSystem: "",
    license: "",
    officialWeb: "",
    schemaType: "",
    type: "",
  })
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm<FormValues>({ mode: "onBlur" })

  const loadDownload = async () => {
    const { data } = await getDownloadByIdAction(downloadId)
    if (data) {
      setDownload({
        id: data.id,
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        developer: data.developer,
        language: data.language,
        operatingSystem: data.operatingSystem,
        license: data.license,
        officialWeb: data.officialWeb,
        schemaType: data.schemaType as unknown as DownloadSchemaData,
        type: data.type,
      })
      setSelectedDownloadFile(data.downloadFiles)
      setSelectedDownloadFileId(data.downloadFiles.map((file) => file.id))
      setSelectedFeaturedImageId(data?.featuredImage?.id as string)
      setSelectedFeaturedImageUrl(data?.featuredImage?.url as string)
      setEditorContent(data.content)
      setTopics(data.topics.map((topic: TopicDataProps) => topic.id))
      setSelectedTopics(data.topics)
      editor?.commands.setContent(data.content)
      setAuthors(data.authors.map((author: UserDataProps) => author.id))
      setSelectedTopics(data.topics)
      setSelectedAuthors(
        data?.authors.map((author: UserDataProps) => {
          return { id: author.id, name: author.name }
        }),
      )
    }
  }

  const editor = useEditor({
    extensions: [EditorKitExtension],
    content: "<p></p>",
    onUpdate({ editor }) {
      setEditorContent(editor.getHTML())
    },
  })

  const handleUpdateFile = (value: DownloadFileDataProps) => {
    setSelectedDownloadFile((prev) => [
      ...(prev as DownloadFileDataProps[]),
      value,
    ])
    setSelectedDownloadFileId((prev) => [...prev, value.id])
    setShowAddFiles(false)
  }

  const handleDeleteFile = (value: DownloadFileDataProps) => {
    const filteredResult = selectedDownloadFile?.filter(
      (item) => item.id !== value.id,
    )
    const filteredData = selectedDownloadFileId.filter(
      (item) => item !== value.id,
    )
    setSelectedDownloadFile(filteredResult)
    setSelectedDownloadFileId(filteredData)
  }

  React.useEffect(() => {
    loadDownload()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor])

  React.useEffect(() => {
    reset(download)
  }, [download, reset])

  const onSubmit = async (values: FormValues) => {
    setLoading(true)
    if (selectedDownloadFile && selectedDownloadFile?.length > 0) {
      const mergedValues = {
        ...values,
        content: editorContent,
        topicIds: topics,
        downloadFileIds: selectedDownloadFileId,
        featuredImageId: selectedFeaturedImageId,
        authorIds: authors,
      }

      const { data } = await postDownloadWithPrimaryAction(mergedValues)

      if (data) {
        toast({
          variant: "success",
          description: "Download Successfully created",
        })
        setSelectedDownloadFile([])
        setSelectedDownloadFileId([])
        setSelectedFeaturedImageId("")
        setSelectedFeaturedImageUrl("")
        setSelectedTopics([])
        reset()
        editor?.commands.clearContent()
      }
    } else {
      toast({ variant: "danger", description: "File is empty" })
    }
    setLoading(false)
  }

  const handleUpdateMedia = (data: {
    id: React.SetStateAction<string>
    url: React.SetStateAction<string>
  }) => {
    setSelectedFeaturedImageId(data.id)
    setSelectedFeaturedImageUrl(data.url)
    setOpenModal(false)
  }
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
        className="space-y-4"
      >
        <div className="bg-background sticky top-[0px] z-[90] flex items-center justify-between px-3 py-5">
          <Button aria-label="Go To Downloads" variant="ghost">
            <NextLink aria-label="Go To Downloads" href="/dashboard/downloads">
              Downloads
            </NextLink>
          </Button>
          <div>
            <Button
              aria-label="Publish"
              type="submit"
              onClick={handleSubmit(onSubmit)}
              variant="ghost"
              loading={loading}
            >
              Publish
            </Button>
            <Button
              aria-label="View Sidebar"
              variant="ghost"
              onClick={onToggle}
            >
              <Icon.Menu />
            </Button>
          </div>
        </div>
        <DownloadDashboardContainer
          isOpen={isOpen}
          sidebar={
            <div className="scollbarhide scrollbar bg-background fixed bottom-[95px] right-0 top-[65px] flex min-w-[300px] max-w-[300px] flex-col space-y-4 overflow-x-auto border px-4 py-4 max-sm:min-w-full max-sm:max-w-full">
              <AddTopicsAction
                topics={topics}
                addTopics={setTopics}
                selectedTopics={selectedTopics}
                addSelectedTopics={setSelectedTopics}
                lang={lang}
              />
              {selectedFeaturedImageUrl ? (
                <>
                  <ModalSelectMedia
                    handleSelectUpdateMedia={handleUpdateMedia}
                    open={openModal}
                    setOpen={setOpenModal}
                    triggerContent={
                      <>
                        <FormLabel>Featured Image</FormLabel>
                        <div className="relative">
                          <NextImage
                            src={selectedFeaturedImageUrl}
                            className="border-muted/30 !relative mt-2 aspect-video h-[150px] max-h-[200px] cursor-pointer rounded-sm border-2 object-cover"
                            fill
                            alt="Featured Image"
                            onClick={() => setOpenModal(true)}
                            sizes="(max-width: 768px) 30vw,
            (max-width: 1200px) 20vw,
            33vw"
                            quality={60}
                          />
                        </div>
                      </>
                    }
                  />
                </>
              ) : (
                <>
                  <ModalSelectMedia
                    handleSelectUpdateMedia={handleUpdateMedia}
                    open={openModal}
                    setOpen={setOpenModal}
                    triggerContent={
                      <>
                        <FormLabel>Featured Image</FormLabel>
                        <div className="bg-muted text-success relative m-auto flex aspect-video h-[150px] items-center justify-center">
                          <p>Select Featured Image</p>
                        </div>
                      </>
                    }
                  />
                </>
              )}
              <div className="my-2 flex flex-col px-4">
                <FormLabel>Excerpt</FormLabel>
                <FormControl invalid={Boolean(errors.excerpt)}>
                  <Textarea
                    {...register("excerpt")}
                    placeholder="Enter Meta Title (Optional)"
                  />
                  {errors?.excerpt && (
                    <FormErrorMessage>
                      {errors.excerpt.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </div>
              <div className="my-2 flex flex-col px-4">
                <AddAuthorsAction
                  authors={authors}
                  addAuthors={setAuthors}
                  selectedAuthors={selectedAuthors}
                  addSelectedAuthors={setSelectedAuthors}
                />
              </div>
              <div className="my-2 flex flex-col px-4">
                <FormLabel>Meta Title</FormLabel>
                <FormControl invalid={Boolean(errors.metaTitle)}>
                  <Input
                    {...register("metaTitle")}
                    placeholder="Enter Meta Title (Optional)"
                  />
                  {errors?.metaTitle && (
                    <FormErrorMessage>
                      {errors.metaTitle.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </div>
              <div className="my-2 flex flex-col px-4">
                <FormLabel>Meta Description</FormLabel>
                <FormControl invalid={Boolean(errors.metaDescription)}>
                  <Textarea
                    {...register("metaDescription")}
                    placeholder="Enter Meta Description (Optional)"
                  />
                  {errors?.metaDescription && (
                    <FormErrorMessage>
                      {errors.metaDescription.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </div>
              <div className="my-2 flex flex-col px-4">
                <FormLabel>Developer</FormLabel>
                <FormControl invalid={Boolean(errors.developer)}>
                  <Input
                    {...register("developer")}
                    placeholder="Enter Developer"
                  />
                  {errors?.developer && (
                    <FormErrorMessage>
                      {errors.developer.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </div>
              <div className="my-2 flex flex-col px-4">
                <FormLabel>Operation System</FormLabel>
                <FormControl invalid={Boolean(errors.operatingSystem)}>
                  <Input
                    {...register("operatingSystem")}
                    placeholder="Enter Operation System"
                  />
                  {errors?.operatingSystem && (
                    <FormErrorMessage>
                      {errors.operatingSystem.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </div>
              <div className="my-2 flex flex-col px-4">
                <FormLabel>License</FormLabel>
                <FormControl invalid={Boolean(errors.license)}>
                  <Input {...register("license")} placeholder="Enter License" />
                  {errors?.license && (
                    <FormErrorMessage>
                      {errors.license.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </div>
              <div className="my-2 flex flex-col px-4">
                <FormLabel>Official Web</FormLabel>
                <FormControl invalid={Boolean(errors.officialWeb)}>
                  <Input
                    {...register("officialWeb")}
                    placeholder="Enter License"
                  />
                  {errors?.officialWeb && (
                    <FormErrorMessage>
                      {errors.officialWeb.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </div>
              <div className="my-2 flex flex-col px-4">
                <FormControl invalid={Boolean(errors.schemaType)}>
                  <Controller
                    control={control}
                    name="schemaType"
                    render={({ field }) => (
                      <>
                        <FormLabel>Language</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Schema" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Schema</SelectLabel>
                              <SelectItem value="DownloadApp">
                                Download
                              </SelectItem>
                              <SelectItem value="BusinessApp">
                                Business
                              </SelectItem>
                              <SelectItem value="MultimediaApp">
                                Multimedia
                              </SelectItem>
                              <SelectItem value="MobileApp">Mobile</SelectItem>
                              <SelectItem value="WebApp">Web</SelectItem>
                              <SelectItem value="SocialNetworkingApp">
                                Social
                              </SelectItem>
                              <SelectItem value="TravelApp">Travel</SelectItem>
                              <SelectItem value="ShoppingApp">
                                Shopping
                              </SelectItem>
                              <SelectItem value="SportsApp">Sports</SelectItem>
                              <SelectItem value="LifeStyleApp">
                                Lifestyle
                              </SelectItem>
                              <SelectItem value="DesignApp">Design</SelectItem>
                              <SelectItem value="DeveloperApp">
                                Developer
                              </SelectItem>
                              <SelectItem value="DriverApp">Driver</SelectItem>
                              <SelectItem value="EducationalApp">
                                Education
                              </SelectItem>
                              <SelectItem value="HealthApp">Health</SelectItem>
                              <SelectItem value="FinanceApp">
                                Finance
                              </SelectItem>
                              <SelectItem value="SecurityApp">
                                Security
                              </SelectItem>
                              <SelectItem value="BrowserApp">
                                Browser
                              </SelectItem>
                              <SelectItem value="CommunicationApp">
                                Communication
                              </SelectItem>
                              <SelectItem value="HomeApp">Home</SelectItem>
                              <SelectItem value="UtilitiesApp">
                                Utilities
                              </SelectItem>
                              <SelectItem value="RefereceApp">
                                Referece
                              </SelectItem>
                              <SelectItem value="GameApp">Game</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {errors?.schemaType && (
                          <FormErrorMessage>
                            {errors.schemaType.message}
                          </FormErrorMessage>
                        )}
                      </>
                    )}
                  />
                </FormControl>
              </div>
              <div className="my-2 flex flex-col px-4">
                <Controller
                  control={control}
                  render={({ field }) => (
                    <>
                      <FormLabel>Type</FormLabel>
                      <FormControl invalid={Boolean(errors.type)}>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Type</SelectLabel>
                              <SelectItem value="App">Application</SelectItem>
                              <SelectItem value="Game">Game</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {errors?.type && (
                          <FormErrorMessage>
                            {errors.type.message}
                          </FormErrorMessage>
                        )}
                      </FormControl>
                    </>
                  )}
                  name="type"
                />
              </div>
              <div className="my-2 flex flex-col px-4">
                <FormControl invalid={Boolean(errors.language)}>
                  <Controller
                    control={control}
                    name="language"
                    render={({ field }) => (
                      <>
                        <FormLabel>Language</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Language</SelectLabel>
                              <SelectItem value="id_ID">Indonesia</SelectItem>
                              <SelectItem value="en_US">English</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {errors?.language && (
                          <FormErrorMessage>
                            {errors.language.message}
                          </FormErrorMessage>
                        )}
                      </>
                    )}
                  />
                </FormControl>
              </div>
            </div>
          }
        >
          <div className="relative mt-4 flex items-center justify-center">
            <div className="flex-1 space-y-4">
              <FormControl invalid={Boolean(errors.title)}>
                <Input
                  type="text"
                  size="4xl"
                  variant="plain"
                  className="font-bold"
                  {...register("title", {
                    required: "Title is Required",
                  })}
                  placeholder="Title"
                />
                {errors?.title && (
                  <FormErrorMessage>{errors.title.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl invalid={Boolean(errors.content)}>
                <EditorMenu editor={editor} />
                <EditorContent editor={editor} />
                <p className="absolute bottom-0 right-0">
                  {editor?.storage.characterCount.words()} words
                </p>
              </FormControl>
            </div>
          </div>
        </DownloadDashboardContainer>
      </form>
      <div className="border-t p-4">
        <div className="flex justify-between pb-2">
          <h2>Files</h2>
          <Button aria-label="Add File" onClick={() => setShowAddFiles(true)}>
            Add File
          </Button>
        </div>
        <div>
          {selectedDownloadFile && selectedDownloadFile.length > 0 && (
            <Table>
              <Thead>
                <Tr isTitle>
                  <Th>Title</Th>
                  <Th>Version</Th>
                  <Th>Size</Th>
                  <Th>Price</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {selectedDownloadFile.map(
                  (downloadFile: DownloadFileDataProps) => (
                    <Tr key={downloadFile.id}>
                      <Td className="whitespace-nowrap">
                        <div className="flex">
                          <span className="font-medium">
                            {downloadFile.title}
                          </span>
                        </div>
                      </Td>
                      <Td className="whitespace-nowrap">
                        <div className="flex">
                          <span className="font-medium">
                            {downloadFile.version}
                          </span>
                        </div>
                      </Td>
                      <Td>{downloadFile.fileSize}</Td>
                      <Td>{downloadFile.price}</Td>
                      <Td align="right">
                        <ActionDashboard
                          onDelete={() => handleDeleteFile(downloadFile)}
                          editLink={`/dashboard/download-file/${downloadFile.id}`}
                          content={downloadFile.title}
                        />
                      </Td>
                    </Tr>
                  ),
                )}
              </Tbody>
            </Table>
          )}
        </div>
        {showAddFiles && (
          <div>
            <AddDownloadFileAction updateDownloadFiles={handleUpdateFile} />
          </div>
        )}
      </div>
    </>
  )
}
