import { LoaderFunction, useLoaderData } from 'remix';

import BlocksRenderer from '~/components/base/notion/BlocksRenderer';
import { PostMetaData } from '~/components/base/PostMetaData';
import { Tags } from '~/components/base/Tag';
import type { FullPost } from '~/services/post';
import { getPost } from '~/services/post';

interface LoaderData {
  post: FullPost;
}

export const loader: LoaderFunction = async ({ params }) => {
  const post = await getPost(params.slug);
  return { post };
};

export default function SinglePost() {
  const { post } = useLoaderData<LoaderData>();
  return (
    <>
      <PostMetaData className="mt-20" date={post.date} />
      <h2 className="mt-4 mb-16 text-5xl text-slate-900 dark:text-slate-300 font-bold leading-tight">
        {post.title}
      </h2>
      <article>
        <BlocksRenderer blocks={post.blocks} />

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed
          vehicula elit. Nam congue purus in elit efficitur posuere. Phasellus
          ac turpis quis mauris bibendum accumsan. Phasellus vel laoreet diam.
          Donec ac sollicitudin eros, et venenatis dui. Pellentesque eget lacus
          sem. Nunc a tortor et elit accumsan aliquet. Phasellus ullamcorper
          rhoncus hendrerit. <a href="/#">This is a link</a>
        </p>
        <h2>1. Install npm-check-updates</h2>
        <p>
          Vivamus lectus nunc, interdum id pretium et, malesuada vel leo. Morbi
          sit amet consequat ante, et varius felis. Cras et placerat justo.
          Etiam posuere enim non placerat facilisis. Morbi lectus ex, venenatis
          sed hendrerit quis, tincidunt at eros. In hac habitasse platea
          dictumst. Integer auctor neque eget erat lacinia finibus. Nulla nec
          imperdiet tortor, nec vulputate purus. Curabitur in accumsan sapien,
          quis elementum justo.
          <a href="/#">
            Vivamus lectus nunc, interdum id pretium et, malesuada vel leo
          </a>
        </p>
        <h2>1. Install npm-check-updates</h2>
        <h3>1. Install npm-check-updates</h3>
        <p>
          Vivamus lectus nunc, interdum id pretium et, malesuada vel leo. Morbi
          sit amet consequat ante, et varius felis. Cras et placerat justo.
          Etiam posuere enim non placerat facilisis. Morbi lectus ex, venenatis
          sed hendrerit quis, tincidunt at eros.{' '}
          <code>npm instal -g npm-check-updates</code> In hac habitasse platea
          dictumst. Integer auctor neque eget erat lacinia finibus. Nulla nec
          imperdiet tortor, nec vulputate purus. Curabitur in accumsan sapien,
          quis elementum justo.
        </p>
        <h3>1. Install npm-check-updates</h3>
        <p>
          Vivamus lectus nunc, interdum id pretium et, malesuada vel leo. Morbi
          sit amet consequat ante, et varius felis. Cras et placerat justo.
          Etiam posuere enim non placerat facilisis. Morbi lectus ex, venenatis
          sed hendrerit quis, tincidunt at eros. In hac habitasse platea
          dictumst. Integer auctor neque eget erat lacinia finibus. Nulla nec
          imperdiet tortor, nec vulputate purus. Curabitur in accumsan sapien,
          quis elementum justo.
        </p>
        <h4>1. Install npm-check-updates</h4>
        <p>
          Vivamus lectus nunc, interdum id pretium et, malesuada vel leo. Morbi
          sit amet consequat ante, et varius felis. Cras et placerat justo.
          Etiam posuere enim non placerat facilisis. Morbi lectus ex, venenatis
          sed hendrerit quis, tincidunt at eros. In hac habitasse platea
          dictumst. Integer auctor neque eget erat lacinia finibus. Nulla nec
          imperdiet tortor, nec vulputate purus. Curabitur in accumsan sapien,
          quis elementum justo.
        </p>
        <pre>
          <code>
            <span>.PHONY</span>
            <span>:</span>
            <span> [rule1] [rule2] ...</span>
          </code>
        </pre>
        <h5>1. Install npm-check-updates</h5>
        <p>
          Vivamus lectus nunc, interdum id pretium et, malesuada vel leo. Morbi
          sit amet consequat ante, et varius felis. Cras et placerat justo.
          Etiam posuere enim non placerat facilisis. Morbi lectus ex, venenatis
          sed hendrerit quis, tincidunt at eros. In hac habitasse platea
          dictumst. Integer auctor neque eget erat lacinia finibus. Nulla nec
          imperdiet tortor, nec vulputate purus. Curabitur in accumsan sapien,
          quis elementum justo.
        </p>
        <h6>1. Install npm-check-updates</h6>
        <p>
          Vivamus lectus nunc, interdum id pretium et, malesuada vel leo. Morbi
          sit amet consequat ante, et varius felis. Cras et placerat justo.
          Etiam posuere enim non placerat facilisis. Morbi lectus ex, venenatis
          sed hendrerit quis, tincidunt at eros. In hac habitasse platea
          dictumst. Integer auctor neque eget erat lacinia finibus. Nulla nec
          imperdiet tortor, nec vulputate purus. Curabitur in accumsan sapien,
          quis elementum justo.
        </p>
      </article>
      <Tags
        category={post.category}
        className="mt-14 md:mt-20 mb-20"
        tags={post.tags}
      />
    </>
  );
}
