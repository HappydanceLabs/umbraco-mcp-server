/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * Umbraco Delivery API
 * You can find out more about the Umbraco Delivery API in [the documentation](https://docs.umbraco.com/umbraco-cms/reference/content-delivery-api).
 * OpenAPI spec version: Latest
 */
import type { IApiContentResponseModelProperties } from './iApiContentResponseModelProperties';
import type { IApiContentRouteModel } from './iApiContentRouteModel';
import type { IApiContentResponseModelCultures } from './iApiContentResponseModelCultures';

export interface IApiContentResponseModel {
  readonly id?: string;
  readonly contentType?: string;
  readonly properties?: IApiContentResponseModelProperties;
  /** @nullable */
  readonly name?: string | null;
  readonly createDate?: string;
  readonly updateDate?: string;
  route?: IApiContentRouteModel;
  readonly cultures?: IApiContentResponseModelCultures;
}
