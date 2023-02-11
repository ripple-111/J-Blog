import { NextPage } from "next"
import { GetServerSideProps } from "next"
import { SERVERDOMAIN } from "@/utils"
import Navbarview, { navBarViewData } from "@/components/navbar-view"
import MainContent from "@/components/maincontent/maincontent"
import Timelinecontent from "@/components/timelinecontent/timelinecontent"
import Timeline_entrylist, {
  DataAd
} from "@/components/timeline_entrylist/timeline_entrylist"
import Advertisement, {
  AdvertisementItemProps
} from "@/components/Advertisement/Advertisement"
import UserList, { UserListItemProp } from "@/components/UserList/UserList"
import BusinessCard, {
  BusinessCardData
} from "@/components/BusinessCard/BusinessCard"

import style from "./index.module.scss"
import axios from "axios"

import { LOCALDOMAIN } from "@/utils"
import { BusinessCardProps } from "@/components/BusinessCard/BusinessCard"

import { AdvertisementProps } from "@/components/Advertisement/Advertisement"
import { UserListProp } from "@/components/UserList/UserList"
import ArticleNavBar from "@/components/ArticleNavBar/ArticleNavBar"
import { ExtendContextProvider } from "@/stores/expend"
import { Fragment } from "react"

export interface IProps {
  data_nav: navBarViewData
  data_tab: navBarViewData
  data_ad: DataAd
  AdvertisementData: AdvertisementItemProps
  UserListData: UserListItemProp
  IsFixed: boolean
  handlerLoading: () => void
}

const Home: NextPage<IProps> = ({
  data_nav,
  data_tab,
  AdvertisementData,
  UserListData,
  data_ad,
  IsFixed,
  handlerLoading
}) => {
  return (
    <MainContent>
      <>
        <ExtendContextProvider>
          <Fragment>
            <Navbarview dataNav={data_nav} IsFixed={IsFixed} />
          </Fragment>
        </ExtendContextProvider>
        <Timelinecontent>
          <Timeline_entrylist
            dataTab={data_tab}
            dataAd={data_ad}
            handlerLoading={handlerLoading}
          />
          {/*<Sidebar>*/}
          {/*</Sidebar>*/}
          <aside className={style["aside"]}>
            <Advertisement AdvertisementData={AdvertisementData} />
            <UserList UserListData={UserListData} />
          </aside>
        </Timelinecontent>
      </>
    </MainContent>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const tab = axios.get(`${SERVERDOMAIN}/api/article-tabs`)
  const navbarview = axios.get(`${SERVERDOMAIN}/api/article-type-tabs`)
  const advertisement = axios.get(`${SERVERDOMAIN}/api/articles?populate=*`)
  const res_tab = (await tab).data.data
  const res_nav = (await navbarview).data.data
  const res_ad = (await advertisement).data.data
  const { data: res_advertisement } = await axios.get(
    `${SERVERDOMAIN}/api/advertisements?populate=deep`
  )
  const { data: res_userlist } = await axios.get(
    `${SERVERDOMAIN}/api/author-lists?populate=deep`
  )
  return {
    props: {
      data_tab: res_tab,
      data_nav: res_nav,
      AdvertisementData: res_advertisement.data,
      UserListData: res_userlist.data,
      data_ad: res_ad
    }
  }
}
export default Home
