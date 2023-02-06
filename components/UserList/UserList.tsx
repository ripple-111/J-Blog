import Link from "next/link"
import style from "./UserList.module.scss"
import { NextPage } from "next"
import Image from "next/image"
import { SERVERDOMAIN } from "@/utils"

export interface UserListItemProp {
  id: number
  attributes: {
    title: string
    description: string
    createdAt: Date
    updatedAt: Date
    publishedAt: Date
    level: number
    image: any
  }
}
export interface UserListProp {
  UserListData: UserListItemProp[]
}

const UserList: NextPage<UserListProp> = ({ UserListData }) => {
  return (
    <div className={style["container"]}>
      <header className={style["user-block-header"]}>🎖️作者榜</header>
      <div>
        {UserListData.map((user) => {
          return (
            <div key={user.id} className={style["user-item"]}>
              <div className={style["link"]}>
                {/* <Image
                  src={`${user.attributes.attributes.img}`}
                  className={style["avatar"]}
                  alt="作者头像"
                  width={500}
                  height={500}
                ></Image> */}
                <div className={style["user-info"]}>
                  <Link href="/userlist" className={style["user-name"]}>
                    <span className={style["name"]}>
                      {user.attributes.title}
                    </span>
                  </Link>
                  <div className={style["description"]}>
                    {user.attributes.description}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <footer className={style["user-more"]}>完整榜单 {">"}</footer>
    </div>
  )
}

export default UserList