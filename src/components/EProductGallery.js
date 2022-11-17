import { useState } from "react"
import FModal from "./FModal"

const EProductGallery = ({ images }) => {
  const activeStateClass = " border border-dashed border-gray-400 rounded"
  const [selectedImage, setSelectedImage] = useState(0)
  const [fullSelectedImage, setFullSelectedImage] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleImageSelection = (e, isFullPreview) =>
    isFullPreview ? setFullSelectedImage(e) : setSelectedImage(e)

  const buidChoices = (limit = 4, isFullPreviews) => {
    let remain = images.length > 4 && images.length - 4
    console.log({ remain })
    return (
      <>
        {images.slice(0, limit).map((image, index) => (
          <div
            key={index}
            onClick={() => handleImageSelection(index, isFullPreviews)}
            className={`aspect-square w-full rounded-md ${
              !isFullPreviews
                ? selectedImage === index && activeStateClass
                : fullSelectedImage === index && activeStateClass
            } `}
            style={{
              backgroundImage: `URL(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        ))}
        {remain && limit !== images.length && (
          <div
            onClick={() => setIsModalOpen(true)}
            className={
              "f-col aspect-square w-full items-center justify-center rounded-md border bg-gray-200 "
            }
          >
            <span className={""}>+{remain}</span>
          </div>
        )}
      </>
    )
  }

  return (
    <>
      <FModal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <div className={"flex flex-row gap-3"}>
          <div className={"choicesImageWrapper w-5/12 "}>
            <div className={" grid grid-cols-6 grid-rows-3 justify-center  gap-3"}>
              {buidChoices(images.length, true)}
            </div>
          </div>
          <div className={"chosenImageWrapper w-7/12 "}>
            <div
              onClick={() => setIsModalOpen(true)}
              className={" aspect-square w-full rounded-md "}
              style={{
                backgroundImage: `URL(${images[fullSelectedImage]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </div>
        </div>
      </FModal>
      <div className={"flex flex-row gap-3"}>
        <div className={"choicesImageWrapper flex w-2/12 flex-col gap-3 "}>
          {buidChoices(4, false)}
        </div>
        <div className={"chosenImageWrapper w-10/12 "}>
          <div
            onClick={() => setIsModalOpen(true)}
            className={" aspect-square w-full rounded-md "}
            style={{
              backgroundImage: `URL(${images[selectedImage]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      </div>
    </>
  )
}
export default EProductGallery
