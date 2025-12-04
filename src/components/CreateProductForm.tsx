import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import BInput from "./BInput";
import BButton from "./BButton";
import { toast } from "react-hot-toast";
import { postHooks } from "@/hooks/usePostRequests";

type CreateProductFormProps = {
  show: boolean;
  onClose: () => void;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateProductForm: React.FC<CreateProductFormProps> = ({
  show,
  onClose,
  setRefresh,
}) => {
  const { loading, createProduct } = postHooks.useCreateProduct();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // Keep price and quantity as strings for controlled input handling
  const [price, setPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState<number>(0);

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selected = Array.from(e.target.files);
    setFiles(selected);
    setCurrentPreviewIndex(0);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Prevent leading spaces; remove only leading whitespace
    const v = e.target.value.replace(/^\s+/, "");
    setTitle(v);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only digits, no decimals
    const v = e.target.value.replace(/\D/g, "");
    setQuantity(v);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow digits and at most one decimal point
    let v = e.target.value.replace(/[^0-9.]/g, "");
    const parts = v.split(".");
    if (parts.length > 2) {
      v = parts[0] + "." + parts.slice(1).join("");
    }
    setPrice(v);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Basic validations
      if (!title) {
        toast.error("Product title is required");
        return;
      }

      if (files.length === 0) {
        toast.error("At least one product image must be uploaded");
        return;
      }

      const qty = parseInt(quantity || "0", 10);
      if (isNaN(qty) || qty < 0) {
        toast.error("Quantity must be a non-negative integer");
        return;
      }

      // Price can be decimal
      const pr = parseFloat(price || "0");
      if (isNaN(pr) || pr < 0) {
        toast.error("Price must be a non-negative number");
        return;
      }

      const success = await createProduct(title, qty, pr, description, files);

      if (success) {
        setTitle("");
        setDescription("");
        setPrice("");
        setQuantity("");
        setFiles([]);
        onClose();
        setRefresh((prev) => !prev);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!show) return null;

  return (
    <div
      className={`fixed top-0 left-0 z-50 w-full h-screen bg-[#00000041] backdrop-blur-xs flex justify-center items-center ${
        show ? "animate-fadeIn" : "animate-fadeOut"
      }`}
    >
      <div
        className={`bg-white rounded-[20px] w-[650px] max-w-full flex flex-col justify-center items-center gap-3 ${
          show ? "animate-popupIn" : "animate-popupOut"
        }`}
      >
        <div className="w-full flex justify-between separator p-10 !pb-2">
          <p className="text-3xl font-general-semibold">Add Product</p>

          <IoCloseOutline
            className="cursor-pointer"
            size={28}
            onClick={onClose}
          />
        </div>

        <form onSubmit={handleCreate} className="flex flex-col pb-8 pt-2">
          <div className="w-full px-8">
            <label className="font-general-semibold mb-2 block">
              Product Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFilesChange}
              disabled={loading}
              className="cursor-pointer"
            />

            {/* Thumbnails */}
            <div className="flex gap-2 mt-3 flex-wrap">
              {files.map((f, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setCurrentPreviewIndex(i)}
                  className={`w-20 h-20 overflow-hidden rounded border-2 p-0 ${
                    i === currentPreviewIndex
                      ? "border-green-500"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={URL.createObjectURL(f)}
                    alt={f.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          <BInput
            id={"title"}
            label="Product Title"
            name="title"
            value={title}
            onChange={handleTitleChange}
            disabled={loading}
            placeholder="Enter product title"
          />

          <BInput
            id={"price"}
            label="Price"
            name="price"
            inputType="text"
            value={String(price)}
            onChange={handlePriceChange}
            disabled={loading}
            placeholder="Enter price"
          />

          <BInput
            id={"quantity"}
            label="Quantity"
            name="quantity"
            inputType="text"
            value={String(quantity)}
            onChange={handleQuantityChange}
            disabled={loading}
            placeholder="Enter quantity"
          />

          <div className="w-full flex flex-col">
            <label
              htmlFor={"description"}
              className="font-general-semibold mb-3"
            >
              Description
            </label>
            <div className="flex justify-center items-center h-[140px] bg-white border-2 border-[#00000030] rounded-[12px]">
              <textarea
                name="description"
                id="description"
                onChange={(e) => setDescription(e.target.value)}
                disabled={loading}
                placeholder="Description of product"
                className="p-[15px] w-full h-full rounded-[12px] outline-none"
                value={description}
              />
            </div>
          </div>

          <div className="mx-8 mt-3">
            <BButton
              title="Add Product"
              w="full"
              type="submit"
              loading={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductForm;
