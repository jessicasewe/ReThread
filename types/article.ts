// types/article.ts
export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string | null;
  tags: string[];
}

// Raw Drupal article structure for reference
export interface DrupalArticle {
  type: string;
  id: string;
  attributes: {
    drupal_internal__nid: number;
    drupal_internal__vid: number;
    langcode: string;
    revision_timestamp: string;
    revision_log: string | null;
    status: boolean;
    title: string;
    created: string;
    changed: string;
    promote: boolean;
    sticky: boolean;
    default_langcode: boolean;
    revision_translation_affected: boolean;
    path: {
      alias: string | null;
      pid: number | null;
      langcode: string;
    };
    body: {
      value: string;
      format: string;
      processed: string;
      summary: string;
    };
    comment: {
      status: number;
      cid: number;
      last_comment_timestamp: number;
      last_comment_name: string | null;
      last_comment_uid: number;
      comment_count: number;
    };
  };
  relationships: {
    node_type: {
      data: {
        type: string;
        id: string;
        meta: {
          drupal_internal__target_id: string;
        };
      };
    };
    revision_uid: {
      data: {
        type: string;
        id: string;
        meta: {
          drupal_internal__target_id: number;
        };
      };
    };
    uid: {
      data: {
        type: string;
        id: string;
        meta: {
          drupal_internal__target_id: number;
        };
      };
    };
    field_image?: {
      data?: {
        type: string;
        id: string;
        meta: {
          alt: string;
          title: string;
          width: number;
          height: number;
          drupal_internal__target_id: number;
        };
      };
    };
    field_tags?: {
      data?: Array<{
        type: string;
        id: string;
        meta: {
          drupal_internal__target_id: number;
        };
      }>;
    };
  };
}