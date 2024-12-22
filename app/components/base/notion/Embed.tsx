import Codepen from 'react-codepen-embed';
import { GithubGist } from 'react-gistlab';
import { Tweet } from 'react-twitter-widgets';

import { BlockComponentProps, EmbedBlock } from '~/libs/notion';

enum EmbedType {
  codepen,
  gist,
  twitter,
}

interface EmbedProps extends BlockComponentProps {
  block: EmbedBlock;
}

const urlTypeMap: Record<string, EmbedType> = {
  'codepen.io': EmbedType.codepen,
  'gist.github.com': EmbedType.gist,
  'twitter.com': EmbedType.twitter,
};

function getType(url: string): EmbedType | null {
  const urlDomain = Object.keys(urlTypeMap).find((domain) =>
    url.includes(domain),
  );
  return urlDomain ? urlTypeMap[urlDomain] : null;
}

export function Embed({ block }: EmbedProps) {
  if (!block.embed?.url) return null;

  const type: EmbedType | null = getType(block.embed.url);
  let EmbeddedItem;

  if (type === EmbedType.codepen) {
    const hash = /pen\/(.*?)(\?|$)/.exec(block.embed.url)?.[1];
    const user = /codepen\.io\/(.*?)(\/pen)/.exec(block.embed.url)?.[1];
    EmbeddedItem =
      hash && user ? <Codepen hash={hash} height={500} user={user} /> : null;
  }

  if (type === EmbedType.gist) {
    EmbeddedItem = <GithubGist url={block.embed.url} />;
  }

  if (type === EmbedType.twitter) {
    const tweetId = /status\/(.*?)(\?|$)/.exec(block.embed.url)?.[1];
    EmbeddedItem = tweetId ? <Tweet tweetId={tweetId} /> : null;
  }

  return (
    <div className="mt-4 flex justify-center">
      <div
        className={type === EmbedType.twitter ? 'w-full md:w-4/5' : 'w-full'}
      >
        {EmbeddedItem}
      </div>
    </div>
  );
}
