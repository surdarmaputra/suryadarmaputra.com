import React, { ReactElement } from 'react';

import Tag from '../atoms/Tag';

interface TagsProps {
  category?: string;
  className?: string;
  tags?: string[];
}

export function Tags({ category, className = '', tags = [] }: TagsProps): ReactElement | null {
  if (!Array.isArray(tags) || !tags.length) return null;

  return (
    <div className={`flex flex-wrap ${className}`}>
      {category && <Tag>{category}</Tag>}
      {tags?.map((tag) => (
        <Tag key={tag as React.Key}>{tag}</Tag>
      ))}
    </div>
  );
}
