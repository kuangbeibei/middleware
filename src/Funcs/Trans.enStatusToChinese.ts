/*
 * 把集群状态由英文转换成中文
 * @Date: 2019-12-12 15:42:08 
 * @Last Modified: 2019-12-12 15:42:08 
 */

import { clusterStatus } from "@utils/data";

export const transEnStatusToChinese = status => clusterStatus[status].text || status
