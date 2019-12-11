import { MysqlRoutesMap } from "@router/config";
import { flattenRoutesAndGenerateBreadcrumbsData } from "@tools";

export const MysqlRouteProps = flattenRoutesAndGenerateBreadcrumbsData(MysqlRoutesMap)