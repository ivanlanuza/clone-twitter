import Image from "next/image";
import Link from "next/link";
import timeago from "lib/timeago";

export default function Tweet({ tweet, nolink }) {
  return (
    <div>
      <div className="mt-6 pl-6 border-t pt-4 grid grid-cols-12">
        <div className="col-span-1 pt-1">
          {tweet.author.image && (
            <Image
              className="w-64 h-64 rounded-full"
              src={tweet.author.image}
              alt=""
              width="40"
              height="40"
            />
          )}
        </div>
        <div className="col-span-11">
          <div>
            <p className="">
              <Link href={`/${tweet.author.name}`}>
                <a>
                  <span className="text-sm font-medium leading-6 hover:underline">
                    {tweet.author.name}
                  </span>
                </a>
              </Link>
              <span className="pl-1 text-xs font-light leading-5 color-dimmed">
                {nolink ? (
                  <span>{timeago.format(new Date(tweet.createdAt))}</span>
                ) : (
                  <Link href={`/${tweet.author.name}/status/${tweet.id}`}>
                    <a className="hover:underline">
                      {timeago.format(new Date(tweet.createdAt))}
                    </a>
                  </Link>
                )}
              </span>
            </p>
          </div>
          <div>
            <p className="flex-shrink pr-2 text-base font-normal color-primary width-auto">
              {tweet.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
