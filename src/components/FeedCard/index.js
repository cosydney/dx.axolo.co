import { CalendarIcon, LinkIcon, MapPinIcon } from '@heroicons/react/24/outline'

function FeedCard({ data }) {
  console.log('data', data)
  return (
    <div className="rounded-lg">
      <div className="my-6 rounded-lg border border-red-200 ">
        <div className={`w-full rounded-t-lg pb-10`}>
          <img
            src="https://pbs.twimg.com/profile_banners/956561538621542400/1620652297/1500x500"
            // src={data.bannerUrlCurrent}
            alt=""
          />
        </div>
        <div className={`-mt-28 ml-12  bg-sa-black`}>
          <img className="w-32 rounded-full" src={data.avatarUrlCurrent} alt="" />
          <div className="">
            <p className="text-xl font-bold">{data.name}</p>
            <p className="text-light-gray">@{data.username}</p>
            <p className="pt-3">{data.description}</p>
            <div className="flex pt-3">
              <div className="flex">
                <MapPinIcon className="h-5 w-5 text-light-gray" />
                <p className="pl-1">{data.location}</p>
              </div>
              <div className="flex pl-1">
                <LinkIcon className="h-5 w-5 text-light-gray" />
                <p className="pl-1 text-primary">{data.websiteUrl}</p>
              </div>
              <div className="flex pl-1">
                <CalendarIcon className="h-5 w-5 text-light-gray" />
                <p className="pl-1 text-primary">{data.createdAt}</p>
              </div>
            </div>
            <div className="flex pt-3">
              {/* todo before and after */}
              <p className="font-bold">{data.accountFollowing.after}</p>
              <p className="pl-1 text-primary">Following</p>
              <p className="pl-3 font-bold">{data.accountFollowers.after}</p>
              <p className="pl-1 text-primary">Followers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedCard
