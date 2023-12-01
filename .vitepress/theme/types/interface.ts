import { Mapping, InputPosition, BooleanString } from "@giscus/vue";

export interface NavItem {
    text: string;
    link?: string;
    items?: NavItem[];
}

export interface PageData {
    path: string;
    description: string;
    title?: string;
    date?: number;
    category?: string[];
    top?: number;
    home?: boolean;
    customPage?: boolean;
    related?: boolean;
    hideComment?: boolean;
    footer?: boolean;
}

export type CommentConfig = {
    type: 'giscus';
    options: GiscusOptions;
} | {
    type: 'valine';
    options: ValineOptions;
}

export interface GiscusOptions {
    repo: `${string}/${string}`;
    repoId: string;
    category?: string;
    categoryId?: string;
    mapping: Mapping;
    term?: string;
    reactionsEnabled: BooleanString;
    emitMetadata: BooleanString;
    inputPosition?: InputPosition;
    lang?: string;
    [key: string]: any;
}

export interface ValineOptions {
    appId: string;
    appKey: string;
    [key: string]: any;
}