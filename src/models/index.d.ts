import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerMovies = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Movies, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly name_eng?: string | null;
  readonly type?: string | null;
  readonly genre?: string | null;
  readonly description?: string | null;
  readonly description_eng?: string | null;
  readonly screen_language?: string | null;
  readonly captions_language?: string | null;
  readonly origin_country?: string | null;
  readonly length?: number | null;
  readonly created_year?: string | null;
  readonly uploaded_at?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMovies = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Movies, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly name_eng?: string | null;
  readonly type?: string | null;
  readonly genre?: string | null;
  readonly description?: string | null;
  readonly description_eng?: string | null;
  readonly screen_language?: string | null;
  readonly captions_language?: string | null;
  readonly origin_country?: string | null;
  readonly length?: number | null;
  readonly created_year?: string | null;
  readonly uploaded_at?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Movies = LazyLoading extends LazyLoadingDisabled ? EagerMovies : LazyMovies

export declare const Movies: (new (init: ModelInit<Movies>) => Movies) & {
  copyOf(source: Movies, mutator: (draft: MutableModel<Movies>) => MutableModel<Movies> | void): Movies;
}