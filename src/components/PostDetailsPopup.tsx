import React, { useEffect, useState } from "react";
import Attachment from "./icons/Attachment";
import BButton from "./BButton";
import { IoCloseOutline } from "react-icons/io5";
import DangerPopup from "./DangerPopup";
import { getHooks } from "@/hooks/useGetRequests";
import { LuLoaderCircle } from "react-icons/lu";
import { utils } from "@/lib/utils";
import { FaFileAlt } from "react-icons/fa";
import { deleteHooks } from "@/hooks/useDeleteRequests";

type PostDetailsPopupProps = {
  postDetails: { id: string | null; type: string | null };
  show: boolean;
  onClose: () => void;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};

const PostDetailsPopup: React.FC<PostDetailsPopupProps> = ({
  postDetails,
  show,
  onClose,
  setRefresh,
}) => {
  if (!show) return null;

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const { loading, post, getPostById } = getHooks.useGetPostDetails();
  const { loading: deletLoading, deletePost } = deleteHooks.useDeletePost();

  const handleDeletePost = async () => {
    if (!postDetails.id || !postDetails.type) {
      console.error("Post ID or type is missing");
      return;
    }

    const success = await deletePost(postDetails?.id, postDetails.type);

    if (success) {
      setRefresh((prev: boolean) => !prev);
      setShowAlert(false);
      onClose();
    }
  };

  useEffect(() => {
    postDetails.id &&
      postDetails.type &&
      getPostById(postDetails.id, postDetails.type);
  }, [postDetails]);
  return (
    <>
      <div
        className={`fixed top-0 left-0 z-50 w-full h-screen bg-[#00000041] backdrop-blur-xs flex justify-center items-center ${
          show ? "animate-fadeIn" : "animate-fadeOut"
        }`}
      >
        <div
          className={`relative bg-white max-w-[450px] w-full p-8 rounded-[20px] flex flex-col justify-center items-start gap-3 ${
            show ? "animate-popupIn" : "animate-popupOut"
          }`}
        >
          <IoCloseOutline
            className="absolute top-8 right-8 cursor-pointer"
            size={28}
            onClick={onClose}
          />

          <p className="font-general-semibold text-2xl">Post Detail</p>

          {loading ? (
            <div className="max-h-[90vh] h-[400px] w-full flex justify-center items-center">
              <LuLoaderCircle className="animate-spin text-desc2" size={30} />
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <div
                  className="h-[48px] w-[48px] min-h-[48px] min-w-[48px] rounded-full bg-cover bg-center border border-white"
                  style={{
                    backgroundImage: `url(${post?.user?.profilePicture})`,
                  }}
                />
                <div>
                  <p className="font-general-medium">{post?.user?.fullName}</p>
                  <p className="text-[#181818] text-sm">
                    {post?.user?.Bio}{" "}
                    <span className="text-[#6A6A6A]">
                      •{" "}
                      {post?.createdAt
                        ? utils.formatTimeTo12Hour(post?.createdAt)
                        : ""}
                    </span>
                  </p>
                </div>
              </div>

              {post?.type && (
                <div className="bg-[#257CFF] py-1 px-2 rounded-[5px] text-white text-sm">
                  {utils.toTitleCase(post?.type)}
                </div>
              )}

              <p className="text-xl font-general-semibold">
                {post?.jobTitle || post?.title}
              </p>

              <p className="text-[#6D6D6D]">{post?.description}</p>

              {(post?.document?.length ||
                post?.files?.length ||
                post?.media?.length ||
                post?.file?.length) && (
                <p className="text-[#464646]">Attachments</p>
              )}

              <div className="flex items-center gap-5 flex-wrap">
                {post?.document?.map((attachment, index) => (
                  <a
                    key={index}
                    className="bg-lime-400/15 p-3 rounded-lg cursor-pointer"
                    href={attachment?.URL}
                    download
                  >
                    <FaFileAlt className="text-primary" size={35} />
                  </a>
                ))}
                {post?.file?.map((attachment, index) => (
                  <a
                    key={index}
                    className="bg-lime-400/15 p-3 rounded-lg cursor-pointer"
                    href={attachment?.URL}
                    download
                  >
                    <FaFileAlt className="text-primary" size={35} />
                  </a>
                ))}
                {post?.files?.map((attachment, index) => (
                  <a
                    key={index}
                    className="bg-lime-400/15 p-3 rounded-lg cursor-pointer"
                    href={attachment?.URL}
                    download
                  >
                    <FaFileAlt className="text-primary" size={35} />
                  </a>
                ))}
                {post?.media?.map((attachment, index) => (
                  <a
                    key={index}
                    className="bg-lime-400/15 p-3 rounded-lg cursor-pointer"
                    href={attachment?.URL}
                    download
                  >
                    <FaFileAlt className="text-primary" size={35} />
                  </a>
                ))}
              </div>

              <div className="w-full flex items-center justify-between gap-2 text-sm text-[#181818]">
                <p className="font-general-medium">{post?.likeCount} likes</p>

                <div className="w-fit flex items-center gap-2">
                  <p className="font-general-medium">
                    {post?.commentCount} Comments
                  </p>
                  <span>•</span>
                  <p className="font-general-medium">
                    {post?.shareCount} Shares
                  </p>
                </div>
              </div>

              <div className="separator w-full" />

              <div className="w-full flex justify-center mt-5">
                <BButton
                  title="Delete Post"
                  onBtnClick={() => setShowAlert(true)}
                />
              </div>
            </>
          )}
        </div>
      </div>

      <DangerPopup
        title="Delete Post"
        desc="Are you sure you want to permanently delete this post?"
        doneTitle="Yes, Delete Now"
        show={showAlert}
        onClose={() => setShowAlert(false)}
        onContinue={handleDeletePost}
        loading={deletLoading}
      />
    </>
  );
};

export default PostDetailsPopup;
