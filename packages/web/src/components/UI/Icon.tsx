import * as React from "react"
import { IconType } from "react-icons"
import {
  BiCheckSquare,
  BiListOl,
  BiMovie,
  BiNews,
  BiStar,
  BiTrophy,
  BiTv,
} from "react-icons/bi"
import { BsArrowLeft } from "react-icons/bs"
import {
  FaAndroid,
  FaApple,
  FaAppleAlt,
  FaCoffee,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaLinux,
  FaPinterestP,
  FaPlaystation,
  FaRedditAlien,
  FaRegTimesCircle,
  FaTelegramPlane,
  FaWhatsapp,
  FaWindows,
  FaXbox,
  FaYoutube,
} from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { ImBook } from "react-icons/im"
import { IoGameController } from "react-icons/io5"
import {
  LuChevronDown,
  LuCircle,
  LuLoader2,
  LuTrash,
  LuTwitter,
  LuAlertCircle,
} from "react-icons/lu"
import {
  MdAccessTime,
  MdAccountCircle,
  MdAddShoppingCart,
  MdAnalytics,
  MdCategory,
  MdChevronLeft,
  MdChevronRight,
  MdClose,
  MdCode,
  MdContentCopy,
  MdCurrencyExchange,
  MdDarkMode,
  MdDashboard,
  MdDeveloperBoard,
  MdDiamond,
  MdDiscount,
  MdDownload,
  MdFolder,
  MdFormatBold,
  MdFormatItalic,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatQuote,
  MdFormatStrikethrough,
  MdFormatUnderlined,
  MdHelpOutline,
  MdHorizontalRule,
  MdImage,
  MdLightMode,
  MdLocationOn,
  MdLogin,
  MdLogout,
  MdOutlineAdd,
  MdOutlineAdsClick,
  MdOutlineArrowBack,
  MdOutlineArrowForward,
  MdOutlineArticle,
  MdOutlineBalance,
  MdOutlineBrokenImage,
  MdOutlineCheck,
  MdOutlineComment,
  MdOutlineCreditCard,
  MdOutlineDelete,
  MdOutlineEdit,
  MdOutlineEditNote,
  MdOutlineHome,
  MdOutlineKeyboardArrowDown,
  MdOutlineLink,
  MdOutlineMenu,
  MdOutlineMoreVert,
  MdOutlinePermMedia,
  MdOutlineSave,
  MdOutlineSearch,
  MdOutlineSettings,
  MdOutlineTopic,
  MdOutlineViewSidebar,
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
  MdPerson,
  MdStore,
  MdSupervisedUserCircle,
  MdUpdate,
  MdUploadFile,
  MdVpnKey,
  MdThumbUp,
  MdThumbDown,
} from "react-icons/md"
import { SiNintendoswitch } from "react-icons/si"

const GamedaimShop: IconType = (props: React.SVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      width="135"
      height="27"
      viewBox="0 0 135 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="135" height="27" fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_1_27"
            transform="matrix(0.00333333 0 0 0.0166667 0 -0.166667)"
          />
        </pattern>
        <image
          id="image0_1_27"
          width="300"
          height="80"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAABQCAYAAACj6kh7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAJVmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4xLWMwMDAgNzkuZWRhMmIzZiwgMjAyMS8xMS8xNC0xMjozMDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMy4xIChXaW5kb3dzKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjMtMDMtMDNUMTY6Mzg6NDMrMDc6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjMtMDMtMDNUMTY6Mzk6MjErMDc6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIzLTAzLTAzVDE2OjM5OjIxKzA3OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1ODFjZGQwMi1lN2RmLTRmNGYtYTgzMi0xYzk1YzdjYWI3MmMiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDozNGE2ODA0YS0xMzI4LWYwNDgtOWVkNi1mODRjNjU0OTMwNjYiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1NjIzYjI4NC1hZDEzLTE4NDktYTk1ZS04OTM2ZTg1ZmRlMGEiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjU2MjNiMjg0LWFkMTMtMTg0OS1hOTVlLTg5MzZlODVmZGUwYSIgc3RFdnQ6d2hlbj0iMjAyMy0wMy0wM1QxNjozODo0MyswNzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIzLjEgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDplNGZjOWRkMS1lOTQ4LWU1NGMtYTUwNi01YzYwYmI2OTkwZTgiIHN0RXZ0OndoZW49IjIwMjMtMDMtMDNUMTY6Mzk6MjErMDc6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMy4xIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY29udmVydGVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NTgxY2RkMDItZTdkZi00ZjRmLWE4MzItMWM5NWM3Y2FiNzJjIiBzdEV2dDp3aGVuPSIyMDIzLTAzLTAzVDE2OjM5OjIxKzA3OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjMuMSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmU0ZmM5ZGQxLWU5NDgtZTU0Yy1hNTA2LTVjNjBiYjY5OTBlOCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1NjIzYjI4NC1hZDEzLTE4NDktYTk1ZS04OTM2ZTg1ZmRlMGEiIHN0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1NjIzYjI4NC1hZDEzLTE4NDktYTk1ZS04OTM2ZTg1ZmRlMGEiLz4gPHBob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8cmRmOkJhZz4gPHJkZjpsaSBwaG90b3Nob3A6TGF5ZXJOYW1lPSJHYW1lZGFpbSIgcGhvdG9zaG9wOkxheWVyVGV4dD0iR2FtZWRhaW0iLz4gPHJkZjpsaSBwaG90b3Nob3A6TGF5ZXJOYW1lPSJzdG9yZSIgcGhvdG9zaG9wOkxheWVyVGV4dD0ic3RvcmUiLz4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsVdKmQAAAUaSURBVHja7Z09cuJKFEY/vfIGVBNN6rcEbQEvQV7C5DgxOJvEQGJyqt4GrCVYW2AJ1haUTN4vAAzSGNBPS+pG51S5PGJo0ZavT93bP1JgjBEAgA/8wyUAAIQFAICwAABhAQAgLAAAhAUAI+Ou6hv//Pej6lsjSZOe+r+VlJ4cPw9wDV3oQ/M+msO3oHB8/Hew+2aKr0nS14oYc2xrSsdf5zb7PhzOafZ9OB4fz31oVzrenb/UT1PuX6lvu/arQv+O53y+eg3ciZdc0sb1OPv5+zPt8gOCquuwaghr2ePFnEn7YOwj1NztQ7M+9ierXR+MVl9ykkxPsvr6QUqyOulDb7JqEy+ppAfX4+zn78+VbyVhTOLqAf3KqphJ9ZdZ6Uxmdf0agJPYFtb9/guQFbIC54VFdoWsXJRVhKwQ1ndEXFJk5WBmFSIrhEWGhawoA8FbYSErZOWqrEJkhbAoB5GVL5nVPbJCWGRYyIoyELwUFssZkBWygs65s3SeOtnVTLvtCTbIGrbb7vtxqbxddnztT/sQS/pV8/qd76M9WW1lNLMkq6yhrLYyweyMrJYyiirIKmopKxfixb0481hYdcavNtrtixqSXMX9XEP3IaoZgGlPmVVupHTgzCqXlJ7JrPKKmVV4A/HiVpyNJMNKS7Jqu0k6a5FlUQZeLwNDmWBiSVaZFGSUgTC0sOqUg6fGDiV9tPzs8kZSZGV3zCqS9GEps5oV75rQq6xCAuQ2sDHoHjUUFrOKbstqyDLQdmbFkhuEVVs8mYqD7QQRsqIMhF6FVWc5Q3kAb8LlR1YtZbVFVgiri+yqLKxIrNtCVu0zq7yGrMjob4C2g+5Nx6+Gzq52g8nnCZHVzZWB4WjjBWHVzrBsL2doS+htSYqshhiz8jdeKAlbl4P88pHVELIiCxq5sHwtB5HVODMrxkzJsCpRXs6AsJCVLVnlBMe4aDqG1WY5w7WNpPeqvkETWXUrq0xGG0uy2naQWbEtC2FZza6+E9bmyvsnCMuZzCqTgtWNDLCzrGHEJWHT8SugDBxCVhKD7mRYFcglvRNY3soqktGHJVklxhyy61qyKmzAJlYQVpflIEsY/M6sQimYWMqs0oaZVShjJYaQ20hLQsYCKAN9XBRK3I5UWLdwW5h0/5d+7usBWXHXBafjBWFVgodNICtuEQPeCIub7iErn2VFWTgyYfELR1Y+Z1YMvJNhAbKiDAT3hIWskJXvsiLDGpGwKAeRle+ZFRNGZFiArCgDoR8CY4gYALi9DAsAAGEBACAsAEBYAAAICwAAYQHALXDHJQC4zMvT47OkZd12i3USzKdx3bbpYp08NGjX5jNbt319ew/IsAAAEBYAICwAgA5hDAugGZmqPcg1V/FRd5H+vmvE6f9va3zmpEV/Jx38rAgLwFE2r2/vqyC4PNa8WCcbnTw8eD6NP8qyWKyTqveE3yzWyerkXHU2Altre0rfe5ERFkAzli9Pj8v5NL4kq8Cl/s6n8dJ225enR0nMEgIAICwAQFgAAAgLAOAAg+4AV3h9e19J+naW7DBLWHPWbQhm2s1Wfqq4rCJbrJN/r7VllhDAEy7tJbw0S9gBbWb6tFgn+XwaJ5J+nbx8P5/Gk8U6SZt8LrOEANAlyTevefOAGYQFMCL2mVR51Xo8n8ZePLMRYQGMj03pOPQly0JYAJSF3pSFPJcQALyBDAsAEBYAAMICAIQFAICwAAAQFgAgLAAAhAUAgLAAAGEBALjF/0DMXyu5WuqTAAAAAElFTkSuQmCC"
        />
      </defs>
    </svg>
  )
}
const IndonesiaFlag: IconType = (props: React.SVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      zoomAndPan="magnify"
      viewBox="0 0 30 30.000001"
      preserveAspectRatio="xMidYMid meet"
      version="1.0"
    >
      <defs>
        <clipPath id="id1">
          <path
            d="M 2.128906 5.222656 L 27.53125 5.222656 L 27.53125 15 L 2.128906 15 Z M 2.128906 5.222656 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="id2">
          <path
            d="M 2.128906 14 L 27.53125 14 L 27.53125 23.371094 L 2.128906 23.371094 Z M 2.128906 14 "
            clipRule="nonzero"
          />
        </clipPath>
      </defs>
      <g clipPath="url(#id1)">
        <path
          fill="rgb(86.268616%, 12.159729%, 14.898682%)"
          d="M 24.703125 5.222656 L 4.957031 5.222656 C 3.398438 5.222656 2.132812 6.472656 2.132812 8.015625 L 2.132812 14.296875 L 27.523438 14.296875 L 27.523438 8.015625 C 27.523438 6.472656 26.261719 5.222656 24.703125 5.222656 Z M 24.703125 5.222656 "
          fillOpacity="1"
          fillRule="nonzero"
        />
      </g>
      <g clipPath="url(#id2)">
        <path
          fill="rgb(93.328857%, 93.328857%, 93.328857%)"
          d="M 27.523438 20.578125 C 27.523438 22.121094 26.261719 23.371094 24.703125 23.371094 L 4.957031 23.371094 C 3.398438 23.371094 2.132812 22.121094 2.132812 20.578125 L 2.132812 14.296875 L 27.523438 14.296875 Z M 27.523438 20.578125 "
          fillOpacity="1"
          fillRule="nonzero"
        />
      </g>
    </svg>
  )
}

const USAFlag: IconType = (props: React.SVGAttributes<SVGSVGElement>) => {
  return (
    <>
      <svg
        {...props}
        id="Layer_1"
        version="1.1"
        viewBox="0 0 55.2 38.4"
        x="0px"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        y="0px"
      >
        <g
          style={{
            border: "0px solid rgb(229, 231, 235)",
            boxSizing: "border-box",
            borderColor: "hsl(214.3 31.8% 91.4%)",
          }}
        >
          <path
            className="st0"
            d="M3.03,0h49.13c1.67,0,3.03,1.36,3.03,3.03v32.33c0,1.67-1.36,3.03-3.03,3.03H3.03C1.36,38.4,0,37.04,0,35.37 V3.03C0,1.36,1.36,0,3.03,0L3.03,0z"
            style={{
              border: "0px solid rgb(229, 231, 235)",
              boxSizing: "border-box",
              borderColor: "hsl(214.3 31.8% 91.4%)",
              fill: "rgb(178, 34, 52)",
            }}
          />
          <path
            className="st1"
            d="M0.02,2.73h55.17c0.01,0.1,0.02,0.2,0.02,0.31v2.94H0V3.03C0,2.93,0.01,2.83,0.02,2.73L0.02,2.73z M55.2,8.67 v3.24H0V8.67H55.2L55.2,8.67z M55.2,14.61v3.24H0v-3.24H55.2L55.2,14.61z M55.2,20.55v3.24H0v-3.24H55.2L55.2,20.55z M55.2,26.49 v3.24H0v-3.24H55.2L55.2,26.49z M55.2,32.43v2.93c0,0.1-0.01,0.21-0.02,0.31H0.02C0.01,35.58,0,35.47,0,35.37v-2.93H55.2 L55.2,32.43z"
            style={{
              border: "0px solid rgb(229, 231, 235)",
              boxSizing: "border-box",
              borderColor: "hsl(214.3 31.8% 91.4%)",
              fill: "rgb(255, 255, 255)",
            }}
          />
          <path
            className="st2"
            d="M20.8,0v20.68H0V3.03C0,1.36,1.36,0,3.03,0H20.8L20.8,0L20.8,0z"
            style={{
              border: "0px solid rgb(229, 231, 235)",
              boxSizing: "border-box",
              borderColor: "hsl(214.3 31.8% 91.4%)",
              fill: "rgb(60, 59, 110)",
            }}
          />
          <polygon
            className="st1"
            points="1.23,2.86 1.92,5.01 0.1,3.68 2.36,3.68 0.53,5.01 1.23,2.86"
            style={{
              border: "0px solid rgb(229, 231, 235)",
              boxSizing: "border-box",
              borderColor: "hsl(214.3 31.8% 91.4%)",
              fill: "rgb(255, 255, 255)",
            }}
          />
          <polygon
            className="st1"
            points="1.23,7.02 1.92,9.17 0.1,7.84 2.36,7.84 0.53,9.17 1.23,7.02"
            style={{
              border: "0px solid rgb(229, 231, 235)",
              boxSizing: "border-box",
              borderColor: "hsl(214.3 31.8% 91.4%)",
              fill: "rgb(255, 255, 255)",
            }}
          />
          <polygon
            className="st1"
            points="1.23,11.18 1.92,13.33 0.1,12 2.36,12 0.53,13.33 1.23,11.18"
            style={{
              border: "0px solid rgb(229, 231, 235)",
              boxSizing: "border-box",
              borderColor: "hsl(214.3 31.8% 91.4%)",
              fill: "rgb(255, 255, 255)",
            }}
          />
          <polygon
            className="st1"
            points="1.23,15.34 1.92,17.49 0.1,16.16 2.36,16.16 0.53,17.49 1.23,15.34"
            style={{
              border: "0px solid rgb(229, 231, 235)",
              boxSizing: "border-box",
              borderColor: "hsl(214.3 31.8% 91.4%)",
              fill: "rgb(255, 255, 255)",
            }}
          />
          <polygon
            className="st1"
            points="3.67,0.78 4.37,2.93 2.54,1.6 4.81,1.6 2.97,2.93 3.67,0.78"
            style={{
              border: "0px solid rgb(229, 231, 235)",
              boxSizing: "border-box",
              borderColor: "hsl(214.3 31.8% 91.4%)",
              fill: "rgb(255, 255, 255)",
            }}
          />
          <polygon
            className="st1"
            points="3.67,4.94 4.37,7.09 2.54,5.76 4.81,5.76 2.97,7.09 3.67,4.94"
            style={{
              border: "0px solid rgb(229, 231, 235)",
              boxSizing: "border-box",
              borderColor: "hsl(214.3 31.8% 91.4%)",
              fill: "rgb(255, 255, 255)",
            }}
          />
          <polygon
            className="st1"
            points="3.67,9.1 4.37,11.25 2.54,9.92 4.81,9.92 2.97,11.25 3.67,9.1"
            style={{
              border: "0px solid rgb(229, 231, 235)",
              boxSizing: "border-box",
              borderColor: "hsl(214.3 31.8% 91.4%)",
              fill: "rgb(255, 255, 255)",
            }}
          />
          <polygon
            className="st1"
            points="3.67,13.26 4.37,15.41 2.54,14.08 4.81,14.08 2.97,15.41 3.67,13.26"
            style={{
              border: "0px solid rgb(229, 231, 235)",
              boxSizing: "border-box",
              borderColor: "hsl(214.3 31.8% 91.4%)",
              fill: "rgb(255, 255, 255)",
            }}
          />
          <polygon
            className="st1"
            points="3.67,17.42 4.37,19.57 2.54,18.24 4.81,18.24 2.97,19.57 3.67,17.42"
            style={{
              border: "0px solid rgb(229, 231, 235)",
              boxSizing: "border-box",
              borderColor: "hsl(214.3 31.8% 91.4%)",
              fill: "rgb(255, 255, 255)",
            }}
          />
          <polygon
            className="st1"
            points="6.12,2.86 6.82,5.01 4.99,3.68 7.25,3.68 5.42,5.01 6.12,2.86"
            style={{
              border: "0px solid rgb(229, 231, 235)",
              boxSizing: "border-box",
              borderColor: "hsl(214.3 31.8% 91.4%)",
              fill: "rgb(255, 255, 255)",
            }}
          />
          <polygon
            className="st1"
            points="6.12,7.02 6.82,9.17 4.99,7.84 7.25,7.84 5.42,9.17 6.12,7.02"
            style={{
              border: "0px solid rgb(229, 231, 235)",
              boxSizing: "border-box",
              borderColor: "hsl(214.3 31.8% 91.4%)",
              fill: "rgb(255, 255, 255)",
            }}
          />
          <polygon
            className="st1"
            points="6.12,11.18 6.82,13.33 4.99,12 7.25,12 5.42,13.33 6.12,11.18"
            style={{
              border: "0px solid rgb(229, 231, 235)",
              boxSizing: "border-box",
              borderColor: "hsl(214.3 31.8% 91.4%)",
              fill: "rgb(255, 255, 255)",
            }}
          />
          <polygon
            className="st1"
            points="6.12,15.34 6.82,17.49 4.99,16.16 7.25,16.16 5.42,17.49 6.12,15.34"
            style={{
              border: "0px solid rgb(229, 231, 235)",
              boxSizing: "border-box",
              borderColor: "hsl(214.3 31.8% 91.4%)",
              fill: "rgb(255, 255, 255)",
            }}
          />
          <polygon
            className="st1"
            points="8.57,0.78 9.26,2.93 7.44,1.6 9.7,1.6 7.87,2.93 8.57,0.78"
            style={{
              border: "0px solid rgb(229, 231, 235)",
              boxSizing: "border-box",
              borderColor: "hsl(214.3 31.8% 91.4%)",
              fill: "rgb(255, 255, 255)",
            }}
          />
          <polygon
            className="st1"
            points="8.57,4.94 9.26,7.09 7.44,5.76 9.7,5.76 7.87,7.09 8.57,4.94"
            style={{
              border: "0px solid rgb(229, 231, 235)",
              boxSizing: "border-box",
              borderColor: "hsl(214.3 31.8% 91.4%)",
              fill: "rgb(255, 255, 255)",
            }}
          />
          <polygon
            className="st1"
            points="8.57,9.1 9.26,11.25 7.44,9.92 9.7,9.92 7.87,11.25 8.57,9.1"
            style={{
              border: "0px solid rgb(229, 231, 235)",
              boxSizing: "border-box",
              borderColor: "hsl(214.3 31.8% 91.4%)",
              fill: "rgb(255, 255, 255)",
            }}
          />
          <polygon
            className="st1"
            points="8.57,13.26 9.26,15.41 7.44,14.08 9.7,14.08 7.87,15.41 8.57,13.26"
            style={{
              border: "0px solid rgb(229, 231, 235)",
              boxSizing: "border-box",
              borderColor: "hsl(214.3 31.8% 91.4%)",
              fill: "rgb(255, 255, 255)",
            }}
          />
          <polygon
            className="st1"
            points="8.57,17.42 9.26,19.57 7.44,18.24 9.7,18.24 7.87,19.57 8.57,17.42"
            style={{
              border: "0px solid rgb(229, 231, 235)",
              boxSizing: "border-box",
              borderColor: "hsl(214.3 31.8% 91.4%)",
              fill: "rgb(255, 255, 255)",
            }}
          />
          <polygon
            className="st1"
            points="11.01,2.86 11.71,5.01 9.88,3.68 12.14,3.68 10.31,5.01 11.01,2.86"
            style={{
              border: "0px solid rgb(229, 231, 235)",
              boxSizing: "border-box",
              borderColor: "hsl(214.3 31.8% 91.4%)",
              fill: "rgb(255, 255, 255)",
            }}
          />
          <polygon
            className="st1"
            points="11.01,7.02 11.71,9.17 9.88,7.84 12.14,7.84 10.31,9.17 11.01,7.02"
            style={{
              border: "0px solid rgb(229, 231, 235)",
              boxSizing: "border-box",
              borderColor: "hsl(214.3 31.8% 91.4%)",
              fill: "rgb(255, 255, 255)",
            }}
          />
          <polygon
            className="st1"
            points="11.01,11.18 11.71,13.33 9.88,12 12.14,12 10.31,13.33 11.01,11.18"
            style={{
              border: "0px solid rgb(229, 231, 235)",
              boxSizing: "border-box",
              borderColor: "hsl(214.3 31.8% 91.4%)",
              fill: "rgb(255, 255, 255)",
            }}
          />
          <polygon
            className="st1"
            points="11.01,15.34 11.71,17.49 9.88,16.16 12.14,16.16 10.31,17.49 11.01,15.34"
            style={{
              border: "0px solid rgb(229, 231, 235)",
              boxSizing: "border-box",
              borderColor: "hsl(214.3 31.8% 91.4%)",
              fill: "rgb(255, 255, 255)",
            }}
          />
          <polygon
            className="st1"
            points="13.46,0.78 14.16,2.93 12.33,1.6 14.59,1.6 12.76,2.93 13.46,0.78"
            style={{
              border: "0px solid rgb(229, 231, 235)",
              boxSizing: "border-box",
              borderColor: "hsl(214.3 31.8% 91.4%)",
              fill: "rgb(255, 255, 255)",
            }}
          />
          <polygon
            className="st1"
            points="13.46,4.94 14.16,7.09 12.33,5.76 14.59,5.76 12.76,7.09 13.46,4.94"
            style={{
              border: "0px solid rgb(229, 231, 235)",
              boxSizing: "border-box",
              borderColor: "hsl(214.3 31.8% 91.4%)",
              fill: "rgb(255, 255, 255)",
            }}
          />
          <polygon
            className="st1"
            points="13.46,9.1 14.16,11.25 12.33,9.92 14.59,9.92 12.76,11.25 13.46,9.1"
            style={{
              border: "0px solid rgb(229, 231, 235)",
              boxSizing: "border-box",
              borderColor: "hsl(214.3 31.8% 91.4%)",
              fill: "rgb(255, 255, 255)",
            }}
          />
          <polygon
            className="st1"
            points="13.46,13.26 14.16,15.41 12.33,14.08 14.59,14.08 12.76,15.41 13.46,13.26"
            style={{
              border: "0px solid rgb(229, 231, 235)",
              boxSizing: "border-box",
              borderColor: "hsl(214.3 31.8% 91.4%)",
              fill: "rgb(255, 255, 255)",
            }}
          />
          <polygon
            className="st1"
            points="13.46,17.42 14.16,19.57 12.33,18.24 14.59,18.24 12.76,19.57 13.46,17.42"
            style={{
              border: "0px solid rgb(229, 231, 235)",
              boxSizing: "border-box",
              borderColor: "hsl(214.3 31.8% 91.4%)",
              fill: "rgb(255, 255, 255)",
            }}
          />
          <polygon
            className="st1"
            points="15.9,2.86 16.6,5.01 14.77,3.68 17.03,3.68 15.21,5.01 15.9,2.86"
            style={{
              border: "0px solid rgb(229, 231, 235)",
              boxSizing: "border-box",
              borderColor: "hsl(214.3 31.8% 91.4%)",
              fill: "rgb(255, 255, 255)",
            }}
          />
          <polygon
            className="st1"
            points="15.9,7.02 16.6,9.17 14.77,7.84 17.03,7.84 15.21,9.17 15.9,7.02"
            style={{
              border: "0px solid rgb(229, 231, 235)",
              boxSizing: "border-box",
              borderColor: "hsl(214.3 31.8% 91.4%)",
              fill: "rgb(255, 255, 255)",
            }}
          />
          <polygon
            className="st1"
            points="15.9,11.18 16.6,13.33 14.77,12 17.03,12 15.21,13.33 15.9,11.18"
            style={{
              border: "0px solid rgb(229, 231, 235)",
              boxSizing: "border-box",
              borderColor: "hsl(214.3 31.8% 91.4%)",
              fill: "rgb(255, 255, 255)",
            }}
          />
          <polygon
            className="st1"
            points="15.9,15.34 16.6,17.49 14.77,16.16 17.03,16.16 15.21,17.49 15.9,15.34"
            style={{
              border: "0px solid rgb(229, 231, 235)",
              boxSizing: "border-box",
              borderColor: "hsl(214.3 31.8% 91.4%)",
              fill: "rgb(255, 255, 255)",
            }}
          />
          <polygon
            className="st1"
            points="18.35,0.78 19.05,2.93 17.22,1.6 19.48,1.6 17.65,2.93 18.35,0.78"
            style={{
              border: "0px solid rgb(229, 231, 235)",
              boxSizing: "border-box",
              borderColor: "hsl(214.3 31.8% 91.4%)",
              fill: "rgb(255, 255, 255)",
            }}
          />
          <polygon
            className="st1"
            points="18.35,4.94 19.05,7.09 17.22,5.76 19.48,5.76 17.65,7.09 18.35,4.94"
            style={{
              border: "0px solid rgb(229, 231, 235)",
              boxSizing: "border-box",
              borderColor: "hsl(214.3 31.8% 91.4%)",
              fill: "rgb(255, 255, 255)",
            }}
          />
          <polygon
            className="st1"
            points="18.35,9.1 19.05,11.25 17.22,9.92 19.48,9.92 17.65,11.25 18.35,9.1"
            style={{
              border: "0px solid rgb(229, 231, 235)",
              boxSizing: "border-box",
              borderColor: "hsl(214.3 31.8% 91.4%)",
              fill: "rgb(255, 255, 255)",
            }}
          />
          <polygon
            className="st1"
            points="18.35,13.26 19.05,15.41 17.22,14.08 19.48,14.08 17.65,15.41 18.35,13.26"
            style={{
              border: "0px solid rgb(229, 231, 235)",
              boxSizing: "border-box",
              borderColor: "hsl(214.3 31.8% 91.4%)",
              fill: "rgb(255, 255, 255)",
            }}
          />
          <polygon
            className="st1"
            points="18.35,17.42 19.05,19.57 17.22,18.24 19.48,18.24 17.65,19.57 18.35,17.42"
            style={{
              border: "0px solid rgb(229, 231, 235)",
              boxSizing: "border-box",
              borderColor: "hsl(214.3 31.8% 91.4%)",
              fill: "rgb(255, 255, 255)",
            }}
          />
        </g>
      </svg>
    </>
  )
}

export const Icon = {
  AccessTime: MdAccessTime,
  Account: MdAccountCircle,
  Add: MdOutlineAdd,
  Ads: MdOutlineAdsClick,
  Analytics: MdAnalytics,
  Android: FaAndroid,
  Apple: FaApple,
  AppleAlt: FaAppleAlt,
  Alert: LuAlertCircle,
  ArrowBack: MdOutlineArrowBack,
  ArrowLeft: BsArrowLeft,
  ArrowForward: MdOutlineArrowForward,
  Article: MdOutlineArticle,
  Balance: MdOutlineBalance,
  Book: ImBook,
  BrokenImage: MdOutlineBrokenImage,
  Category: MdCategory,
  Check: MdOutlineCheck,
  CheckSquare: BiCheckSquare,
  ChevronLeft: MdChevronLeft,
  ChevronRight: MdChevronRight,
  ChevronDown: LuChevronDown,
  Circle: LuCircle,
  Close: MdClose,
  Code: MdCode,
  Coffe: FaCoffee,
  Comment: MdOutlineComment,
  Copy: MdContentCopy,
  CreditCard: MdOutlineCreditCard,
  Currency: MdCurrencyExchange,
  Dashboard: MdDashboard,
  Developer: MdDeveloperBoard,
  Diamond: MdDiamond,
  Discount: MdDiscount,
  Download: MdDownload,
  Delete: MdOutlineDelete,
  EditNote: MdOutlineEditNote,
  Edit: MdOutlineEdit,
  Email: FaEnvelope,
  USAFlag: USAFlag,
  Facebook: FaFacebook,
  Folder: MdFolder,
  FormatBold: MdFormatBold,
  FormatItalic: MdFormatItalic,
  FormatListBulleted: MdFormatListBulleted,
  FormatListNumbered: MdFormatListNumbered,
  FormatQuote: MdFormatQuote,
  FormatStrikethrough: MdFormatStrikethrough,
  FormatUnderlined: MdFormatUnderlined,
  Game: IoGameController,
  Google: FcGoogle,
  GamedaimShop: GamedaimShop,
  Help: MdHelpOutline,
  Home: MdOutlineHome,
  HorizontalRule: MdHorizontalRule,
  Image: MdImage,
  IndonesiaFlag: IndonesiaFlag,
  Instagram: FaInstagram,
  KeyboardArrowDown: MdOutlineKeyboardArrowDown,
  Link: MdOutlineLink,
  Linkedin: FaLinkedinIn,
  Linux: FaLinux,
  ListOl: BiListOl,
  Location: MdLocationOn,
  Login: MdLogin,
  Logout: MdLogout,
  Media: MdOutlinePermMedia,
  Menu: MdOutlineMenu,
  MoreVert: MdOutlineMoreVert,
  Moon: MdDarkMode,
  Movie: BiMovie,
  News: BiNews,
  NintendoSwitch: SiNintendoswitch,
  Person: MdPerson,
  Pinterest: FaPinterestP,
  PlayStation: FaPlaystation,
  Reddit: FaRedditAlien,
  Save: MdOutlineSave,
  Settings: MdOutlineSettings,
  Search: MdOutlineSearch,
  Shop: MdStore,
  ShoppingCart: MdAddShoppingCart,
  Spinner: LuLoader2,
  Star: BiStar,
  Sun: MdLightMode,
  Telegram: FaTelegramPlane,
  Topic: MdOutlineTopic,
  Trash: LuTrash,
  Trophy: BiTrophy,
  TV: BiTv,
  ThumbUp: MdThumbUp,
  ThumbDown: MdThumbDown,
  TimesCircle: FaRegTimesCircle,
  Twitter: LuTwitter,
  Update: MdUpdate,
  UploadFile: MdUploadFile,
  Users: MdSupervisedUserCircle,
  ViewSidebar: MdOutlineViewSidebar,
  Visibility: MdOutlineVisibility,
  VisibilityOff: MdOutlineVisibilityOff,
  VpnKey: MdVpnKey,
  Xbox: FaXbox,
  WhatsApp: FaWhatsapp,
  Windows: FaWindows,
  Youtube: FaYoutube,
}
