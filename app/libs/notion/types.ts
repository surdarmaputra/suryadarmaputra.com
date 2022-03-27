import type { GetBlockResponse } from '@notionhq/client/build/src/api-endpoints';

export interface BlockWithChildren {
  block: GetBlockResponse;
  children: BlockWithChildren[] | null;
}

type ExtractedBlockType<Type> = Extract<GetBlockResponse, { type: Type }>;

export type AudioBlock = ExtractedBlockType<'audio'>;
export type BookmarkBlock = ExtractedBlockType<'bookmark'>;
export type BreadcrumbBlock = ExtractedBlockType<'breadcrumb'>;
export type BulletedListItemBlock = ExtractedBlockType<'bulleted_list_item'>;
export type CalloutBlock = ExtractedBlockType<'callout'>;
export type ChildDatabaseBlock = ExtractedBlockType<'child_database'>;
export type ChildPageBlock = ExtractedBlockType<'child_page'>;
export type CodeBlock = ExtractedBlockType<'code'>;
export type ColumnBlock = ExtractedBlockType<'column'>;
export type ColumnListBlock = ExtractedBlockType<'column_list'>;
export type DividerBlock = ExtractedBlockType<'divider'>;
export type EmbedBlock = ExtractedBlockType<'embed'>;
export type EquationBlock = ExtractedBlockType<'equation'>;
export type FileBlock = ExtractedBlockType<'file'>;
export type Heading1Block = ExtractedBlockType<'heading_1'>;
export type Heading2Block = ExtractedBlockType<'heading_2'>;
export type Heading3Block = ExtractedBlockType<'heading_3'>;
export type ImageBlock = ExtractedBlockType<'image'>;
export type LinkPreviewBlock = ExtractedBlockType<'link_preview'>;
export type LinkToPageBlock = ExtractedBlockType<'link_to_page'>;
export type NumberedListItemBlock = ExtractedBlockType<'numbered_list_item'>;
export type ParagraphBlock = ExtractedBlockType<'paragraph'>;
export type PdfBlock = ExtractedBlockType<'pdf'>;
export type QuoteBlock = ExtractedBlockType<'quote'>;
export type SyncedBlock = ExtractedBlockType<'synced_block'>;
export type TableBlock = ExtractedBlockType<'table'>;
export type TableOfContentsBlock = ExtractedBlockType<'table_of_contents'>;
export type TableRowBlock = ExtractedBlockType<'table_row'>;
export type TemplateBlock = ExtractedBlockType<'template'>;
export type ToDoBlock = ExtractedBlockType<'to_do'>;
export type ToggleBlock = ExtractedBlockType<'toggle'>;
export type VideoBlock = ExtractedBlockType<'video'>;

export type UnsupportedBlock = ExtractedBlockType<'unsupported'>;